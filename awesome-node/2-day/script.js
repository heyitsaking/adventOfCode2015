const lr = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
})

let totalWrap = 0;
let totalRibbon = 0;

lr.on('line', (line) => {
    // Convert input lines to arrays for easier manipulation
    let digits = line.split('x')
    
    // Convert array values from strings to integers for easier sorting
    let converted = digits.map(digit => parseInt(digit, 10))
    function ascSort(a,b) { return a > b ? 1 : b > a ? -1 : 0; }
    let sorted = converted.sort(ascSort);

    // Calculate total area + smallest side measure
    let measure = 2*((sorted[0] * sorted[1]) + (sorted[1] * sorted[2]) + (sorted[0] * sorted[2])) + (sorted [0] * sorted[1]);
    totalWrap += measure;

    let length = 2*(sorted[0] + sorted[1]) + (sorted[0]*sorted[1]*sorted[2])
    totalRibbon += length;
})

setTimeout(() => {
    console.log(totalWrap)
    console.log(totalRibbon)
}, 20);