const lr = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
})

let total = [];

let reg_vowels = /[aeiou]/g
let naughty_combos = /(ab)|(cd)|(pq)|(xy)/g

let vowel_count = [];
let pass_one = [];

let duplicate_array = [];

let not_naughty = [];
let filtered_naughty = [];

lr.on('line', (line) => {

    total.push(line);

    let duplicate = false;
    // Check for vowels condition
    vowel_count.push(line.match(reg_vowels))
    pass_one = vowel_count.map(word => {
        if(word) {
            return word.length > 2
        }
    })

    // Check for duplicate 
    function duplicate_check(element, index, array) {
        return element == array[index + 1]
    }

    let line_array = line.split('')
    duplicate_array.push(
        line_array.some(duplicate_check)
    )
    
    // Check for naughty values
    not_naughty.push(line.match(naughty_combos))
    filtered_naughty = not_naughty.map(word => {
        if(word) {
            return false
        } else {
            return true
        }
    })
    
})

setTimeout(() => {
    let nice_strings = filtered_naughty.filter((word, i) => {
        if(word && duplicate_array[i] && pass_one[i]) {
            return total[i];
        }
    })
    console.log(nice_strings.length)
}, 1000);