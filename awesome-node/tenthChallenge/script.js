const fs = require('fs')

let input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')

let digit_regex = /[0-9]/g;

let digits = input[0].match(digit_regex);
let start = JSON.parse(JSON.stringify(digits));

for (let i = 0; i < 50; i++) {
    next = [];
    let amount = 1;
    start.forEach((number, i) => {
        if (number == start[i + 1]) {
            amount++;
        } else {
            next.push(amount)
            next.push(number)
            amount = 1
        }
    })
    start = next;
}

console.log(start.length)