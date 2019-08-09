const fs = require('fs')

let input = fs.readFileSync('./input.txt').toString().split('\n')
let total_big = 0;
let total_small = 0;

let hex_regex = /(\\x[a-z0-9][a-z0-9])/g
let slash_regex = /(\\[^a-z0-9])/g

let encode_regex = /[^a-z0-9]/g

// Function found at https://www.w3resource.com/javascript-exercises/javascript-string-exercise-28.php
function hex_to_ascii(str1)
{
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
}

// Prototype found at https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index
String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

// Answer messes up when hex values are in the x80+ range, was off on correct answer by 9
// Did not want to use eval(), but here is an answer using it https://github.com/ghaiklor/advent-of-code-2015/blob/master/day-08/part-1/solution.js
input.forEach(line => {
    line = line.replace(/'/g, '');

    let big = line.length;

    let escapes = line.match(slash_regex);
    if(escapes) {
        escapes.forEach((escape, i) => {
            line = line.replace(escape, escape.substring(1));
        })
    }

    let hexes = line.match(hex_regex);
    if(hexes) {
        let converted = hexes.filter(value => {
            let newValue = hex_to_ascii(value.substring(2));
            return newValue;
        })
        hexes.forEach((hex, i) => {
            line = line.replace(hex, converted[i]);
        })
    }

    let small = line.substring(1, line.length-1).length;

    total_big += big;
    total_small += small;
})

console.log(total_big - total_small)

let total_new_big = 0;

input.forEach(line => {
    line = line.replace(/'/g, '');

    let specials = line.match(encode_regex)

    let new_big = line.length + 2 + (specials.length)
    total_new_big += new_big;
})

console.log(total_new_big - total_big)