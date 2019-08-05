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

    // setTimeout(() => {
    //     console.log(houses)
    // }, 500);
})