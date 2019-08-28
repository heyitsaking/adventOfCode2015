const fs = require('fs')

let input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')

let grid = new Array(100)

input.forEach((line, i) => {
    let values = line.split('')

    grid[i] = values
})

function checkCorners(grid, xPos, yPos) {
    const arrSum = arr => arr.reduce((a, b) => +a + +b, 0)

    let bulbs = [0, 0, 0];
    if (xPos == 0 && yPos == 0) {
        bulbs[0] = grid[yPos][xPos + 1] == "#" ? bulbs[0] + 1 : bulbs[0];
        bulbs[1] = grid[yPos + 1][xPos + 1] == "#" ? bulbs[1] + 1 : bulbs[1];
        bulbs[2] = grid[yPos + 1][xPos] == "#" ? bulbs[2] + 1 : bulbs[2];
    } else if (xPos == 0 && yPos == 99) {
        bulbs[0] = grid[yPos - 1][xPos] == "#" ? bulbs[0] + 1 : bulbs[0];
        bulbs[1] = grid[yPos - 1][xPos + 1] == "#" ? bulbs[1] + 1 : bulbs[1];
        bulbs[2] = grid[yPos][xPos + 1] == "#" ? bulbs[2] + 1 : bulbs[2];
    } else if (xPos == 99 && yPos == 0) {
        bulbs[0] = grid[yPos + 1][xPos] == "#" ? bulbs[0] + 1 : bulbs[0];
        bulbs[1] = grid[yPos + 1][xPos - 1] == "#" ? bulbs[1] + 1 : bulbs[1];
        bulbs[2] = grid[yPos][xPos - 1] == "#" ? bulbs[2] + 1 : bulbs[2];
    } else if (xPos == 99 && yPos == 99) {
        bulbs[0] = grid[yPos][xPos - 1] == "#" ? bulbs[0] + 1 : bulbs[0];
        bulbs[1] = grid[yPos - 1][xPos - 1] == "#" ? bulbs[1] + 1 : bulbs[1];
        bulbs[2] = grid[yPos - 1][xPos] == "#" ? bulbs[2] + 1 : bulbs[2];
    }

    return arrSum(bulbs)
}

function checkLeftRight(grid, xPos, yPos) {
    let bulbs = 0;
    if (xPos == 0) {
        bulbs = grid[yPos][xPos + 1] == "#" ? bulbs + 1 : bulbs;
    } else if (xPos == grid[yPos].length - 1) {
        bulbs = grid[yPos][xPos - 1] == "#" ? bulbs + 1 : bulbs;
    } else {
        bulbs = grid[yPos][xPos + 1] == "#" ? bulbs + 1 : bulbs;
        bulbs = grid[yPos][xPos - 1] == "#" ? bulbs + 1 : bulbs;
    }

    return bulbs
}

function checkUpDown(grid, xPos, yPos) {
    let bulbs = 0;

    for (let i = -1; i < 2; i++) {
        if (yPos == 0) {
            bulbs = grid[yPos + 1][xPos + i] == "#" ? bulbs + 1 : bulbs;
        } else if (yPos == grid.length - 1) {
            bulbs = grid[yPos - 1][xPos + i] == "#" ? bulbs + 1 : bulbs;
        } else {
            bulbs = grid[yPos + 1][xPos + i] == "#" ? bulbs + 1 : bulbs;
            bulbs = grid[yPos - 1][xPos + i] == "#" ? bulbs + 1 : bulbs;
        }
    }

    return bulbs
}

function gridStep(grid) {
    let temp = JSON.parse(JSON.stringify(grid));

    let newGrid = [];

    temp.forEach((row, y) => {
        let newRow = [];
        row.forEach((bulb, x) => {
            let currentState = bulb == "#" ? "on" : "off";
            let adjacent = 0;
            if ((x == 0 || x == 99) && (y == 0 || y == 99)) {
                adjacent = checkCorners(temp, x, y);
            } else {
                adjacent = checkLeftRight(temp, x, y) + checkUpDown(temp, x, y)
            }
            newRow.push(((currentState == "off" && adjacent == 3) || (currentState == "on" && (adjacent == 2 || adjacent == 3))) ? "#" : ".")
        })
        newGrid.push(newRow)
    })
    return newGrid
}

let finalGrid = [];
let temp = [];
let on_regex = /#/g

for (let i = 0; i < 99; i++) {
    if (i == 0) {
        temp = gridStep(grid);
    } else if (i == 98) {
        finalGrid = gridStep(temp);
    }
    temp = gridStep(temp);
}

let onBulbs = 0;
finalGrid.forEach((row, i) => {
    let count = row.toString().match(on_regex)
    if (count) onBulbs += count.length;
})
console.log(onBulbs)
