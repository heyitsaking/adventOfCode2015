const fs = require('fs');

fs.readFile('input.txt', (err, data) => {

    if (err) {
        console.log("errroooooorrr");
    }

    let file = data.toString()
    let house = {
        'position': [0,0],
        'gift': 0
    }
    let indexX = 0;
    let indexY = 0;

    let instr = file.split('')

    instr.forEach((value,i) => {
        if(value === "v") {

        } else if (value === ">") {

        } else if (value === "^") {

        } else {

        }
    })

    console.log(i + ": " + value + " => ")
    houses[indexX][indexY]++
    if(value === "v") {
        if(isNaN(houses[indexX][++indexY])) {
            houses[indexX][indexY]= 0;
        }
        houses[indexX][indexY]++
    } else if (value === ">") {
        if(isNaN(houses[++indexX][indexY])) {
            houses[indexX][indexY]= 0;
        }
        houses[indexX][indexY]++
    } else if (value === "^") {
        if(isNaN(houses[indexX][--indexY])) {
            houses[indexX][indexY]= 0;
        }
        houses[indexX][indexY]++
    } else {
        if(isNaN(houses[--indexX][indexY])) {
            houses[indexX][indexY]= 0;
        }
        houses[indexX][indexY]++
    }
    console.log(houses)

    // setTimeout(() => {
    //     console.log(houses)
    // }, 500);
})