const fs = require('fs')

let input = fs.readFileSync(__dirname + '/input.txt').toString()

let dig_regex = /(\d)+|-(\d)+/g;

let digits = input.match(dig_regex)

let total = 0;
digits.forEach(number => {
    total += +number;
})

console.log(total)

let json = fs.readFileSync(__dirname + '/input.txt').toString();
json = JSON.parse(json)

let total_2 = 0;

function valueSummation(arr, wasObject) {
    let sum = 0;
    
    // Checks for two conditions
    // 1. Was this an object without a 'red' property
    // 2. Was this an array
    if (wasObject && !arr.includes('red') || !wasObject) {
        arr.forEach(element => {
            if (typeof(element) == 'object') {
                if (Array.isArray(element)) {
                    sum += valueSummation(element, false)
                } else {
                    let new_array = Object.values(element, true);
                    sum += valueSummation(new_array, true)
                }
            }
            if (typeof(element) == 'number') sum += +element;
        })
    }

    return sum
}

console.log(valueSummation(Object.values(json, true)))