const fs = require('fs')

let input = fs.readFileSync('./input.txt').toString().split('\n')

let lights = new Array(1000).fill(null).map(() => (new Array(1000).fill(null).map(() => (0))))
let brightness = new Array(1000).fill(null).map(() => (new Array(1000).fill(null).map(() => (0))))

const cond_regex = /(on|off|toggle)/
const coord_regex = /(\d+),(\d+)/g

input.forEach((line) => {

    // Get command and coordinates to be used
    let cond = line.match(cond_regex)
    let coord = line.match(coord_regex)

    coord = [coord[0].split(','), coord[1].split(',')]

    // Save them in an object for easier reading
    let instr = {
        'comm': cond[0],
        'start_x': +coord[0][0],
        'start_y': +coord[0][1],
        'end_x': +coord[1][0],
        'end_y': +coord[1][1]
    }

    for(x= instr.start_x; x <= instr.end_x; x++) {
        for(y= instr.start_y; y <= instr.end_y; y++) {

            if(instr.comm === 'on') lights[x][y] = 1;
            if(instr.comm === 'off') lights[x][y] = 0;
            if(instr.comm === 'toggle') lights[x][y] = lights[x][y] === 0 ? 1 : 0;
        }
    }

    for(x= instr.start_x; x <= instr.end_x; x++) {
        for(y= instr.start_y; y <= instr.end_y; y++) {

            if(instr.comm === 'on') brightness[x][y]++;
            if(instr.comm === 'off') {
                if(brightness[x][y] > 0) brightness[x][y]--;
            }
            if(instr.comm === 'toggle') brightness[x][y] += 2;
        }
    }
})

setTimeout(() => {
    let result_one = 0;
    lights.forEach(row => {
        let arr = row.filter(light => {
            if(light == 1) {
                return true
            }
        })
        result_one += arr.length
    })
    console.log(result_one)

    let result_two = 0;
    brightness.forEach(row => {
        let arr = row.filter(light => {
            result_two += light;
        })
    })
    console.log(result_two)
}, 500)