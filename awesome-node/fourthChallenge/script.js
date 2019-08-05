const md5 = require('js-md5')

let key = "bgvyzdsv";
let index_one = 0;

const five_zeroes = data => data.slice(0, 5) === '00000'

while(!five_zeroes(md5(`${key}${index_one}`))) {
    index_one++
}
console.log(index_one)

let index_two = 0;

const six_zeroes = data => data.slice(0, 6) === '000000'

while(!six_zeroes(md5(`${key}${index_two}`))) {
    index_two++
}
console.log(index_two)