const fs = require('fs');

fs.readFile('./hello.txt', (err, data) => {
    if (err) {
        console.log("errroooooorrr");
    }

    let file = data.toString()
    
    console.log('Final Floor')
    console.time('SingleOp')
    let regOpen = /(\()/g
    let regClose = /(\))/g
    let resultOpen = file.match(regOpen)
    let resultClose = file.match(regClose)
    let final = resultOpen.length - resultClose.length;
    console.log(final)
    console.timeEnd('SingleOp')

    console.time('Final Floor v2')
    console.time('MultiOp')
    let index_one = 0;
    let floor_one = 0;
    for (index_one; index_one < file.length; index_one++) {
        let current = file[index_one];
        (current === "(") ? floor_one++ : floor_one--;
    }
    console.log(floor_one)
    console.timeEnd('MultiOp')

    console.time('First Basement')
    console.time('Basement')
    let index_two = 0;
    let floor_two = 0;
    for (index_two; index_two < file.length; index_two++) {
        let current = file[index_two];
        (current === "(") ? floor_two++ : floor_two--;
        if (floor_two == -1) {
            console.log(index_two + 1)
            break
        }
    }
    console.timeEnd('Basement')
})