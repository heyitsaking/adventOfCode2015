const fs = require('fs')

let input = fs.readFileSync(__dirname + '/input.txt').toString().split('')

console.log(input)

function checkOne(test) {
    let first = false;
    let count = 0;

    test.forEach((letter, i) => {
        if((i + 1) <= test.length - 1) {
            let currentLetter = letter.charCodeAt(0);
            let nextLetter = test[i + 1].charCodeAt(0);

            if (currentLetter == (nextLetter - 1)){
                count++;
            } else {
                count = 0
            }

            if (count == 2) {
                first = true;
            }
        }
    })

    return first;
}

function checkTwo(test) {
    let second = false;

    if (!(test.includes('i') || test.includes('l') || test.includes('o'))) {
        second = true;
    }

    return second;
}

function checkThree(test) {
    let third = false;
    let dup_regex = /(.)\1/g;

    let string = test.join('');
    let count = string.match(dup_regex);

    if (count && count.length >= 2) {
        third = true;
    }

    return third;
}

function nextChar(c) {
    if(c == 'z') {
        return 'a'
    }
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function looper(array, index) {
    // console.log(array)
    array[index] = nextChar(array[index]);
    if (array[index] == 'a') {
        looper(array, index - 1)
    }
}

let valid = false;
valid = checkOne(input) && checkTwo(input) && checkThree(input);

let lastIndex = input.length - 1;

while(!valid) {
    looper(input, lastIndex);
    valid = checkOne(input) && checkTwo(input) && checkThree(input);
}

console.log(input.join(''))

valid = false;

while(!valid) {
    looper(input, lastIndex);
    valid = checkOne(input) && checkTwo(input) && checkThree(input);
}

console.log(input.join(''))