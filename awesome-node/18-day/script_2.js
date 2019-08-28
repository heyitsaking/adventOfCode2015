const fs = require('fs')

let input = fs.readFileSync(__dirname + '/input_2.txt').toString().split('\n')

let grid = new Array(100)

input.forEach((line, i) => {
    let values = line.split('')

    grid[i] = values
})

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
            if (!((x == 0 || x == 99) && (y == 0 || y == 99))) {
                adjacent = checkLeftRight(temp, x, y) + checkUpDown(temp, x, y)
                newRow.push(((currentState == "off" && adjacent == 3) || (currentState == "on" && (adjacent == 2 || adjacent == 3))) ? "#" : ".")
            } else {
                newRow.push('#')
            }
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
