const fs = require('fs')

const input = fs.readFileSync('./input.txt').toString().split('\n');

function one_between_check(element, index, array) {
    return element == array[index + 2]
}

let one_between = [];

input.forEach(line => {
    line = line.split('')
    one_between.push(
        line.some(one_between_check)
    )
})

let multiple_pair = []

function check_pair(string) {
    let pair_match = false

    for(let i = 0; i < string.length; i++) {
        let pair = ''
        if(string[i+1] != undefined) {
            pair = string.substring(i, i + 2)
            if((string.lastIndexOf(pair) != i) && (string.lastIndexOf(pair) != i+1)) {
                pair_match = true
            }
        }
    }
    multiple_pair.push(pair_match)
}

input.forEach(line => {
    check_pair(line) 
})

setTimeout(() => {
    let nice_strings = one_between.filter((string, i) => {
        if(string && multiple_pair[i]) {
            return true
        }
    })
    console.log(nice_strings.length)
}, 1000)