const fs = require('fs')

let input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')

let sizes = [];

input.forEach(jug => {
    sizes.push(+jug)
})

// Got function from https://codereview.stackexchange.com/questions/7001/generating-all-combinations-of-an-array
// Finds all possible combinations
function getCombinations(values) {
    let result = [];
    let f = function (previous, values) {
        for (let i = 0; i < values.length; i++) {
            result.push(+previous + +values[i]);
            f(+previous + +values[i], values.slice(i + 1));
        }
    }
    f('', values);
    return result;
}

// Checks how many combinations equals 150
let possibles = getCombinations(input);
let total_1 = possibles.filter(value => value == 150)
console.log(total_1.length)

// Got function at https://stackoverflow.com/questions/5752002/find-all-possible-subset-combos-in-an-array
// Finds combinations of arrays of the given size
function* generateCombinations(arr, minSize) {
    function* doGenerateCombinations(offset, combo) {
        if (combo.length == minSize) {
            yield combo;
        }
        for (let i = offset; i < arr.length; i++) {
            yield* doGenerateCombinations(i + 1, combo.concat(arr[i]));
        }
    }
    yield* doGenerateCombinations(0, []);
}

// Got function at https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
const arrSum = arr => arr.reduce((a,b) => +a + +b, 0)

// Iterates through all possible combinations of array sizes up to the size of the original input array
// Prints the amount of arrays in the combination which sum equals 150
for (let index = 0; index <= input.length; index++) {
    console.log("Array length: " + index)
    let total_2 = 0;
    for (let combo of generateCombinations(input, index)) {
        if (arrSum(combo) == 150) total_2++;
    }
    console.log(total_2)
}