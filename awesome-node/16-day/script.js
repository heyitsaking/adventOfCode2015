const fs = require('fs')

let input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')

let aunt_regex = /(\d+)|[a-z]{3,}/g

let known = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
}

let possibleAunts = []

input.forEach(line => {
    let args = line.match(aunt_regex);

    let aunt = {
        possessions: []
    }

    args.forEach((value, i) => {
        if (i == 0) {
            aunt["number"] = value;
        }
        if (i % 2 == 1) {
            aunt.possessions[value] = 0;
        }
        if (i % 2 == 0 && i != 0) {
            aunt.possessions[args[i - 1]] = value;
        }
    })

    possibleAunts.push(aunt)
})

possibleAunts.forEach(aunt => {
    let match = true;
    let possessions = Object.entries(aunt.possessions)
    
    possessions.forEach(possesion => {
        if (!(possesion[0] in known)) {
            match = false;
        } else {
            if (known[possesion[0]] != possesion[1]) {
                match = false;
            }
        }
    })

    if (match) console.log("First match: " + aunt.number)
})

possibleAunts.forEach(aunt => {
    let match = true;
    let possessions = Object.entries(aunt.possessions)
    
    possessions.forEach(possesion => {
        if (!(possesion[0] in known)) {
            match = false;
        } else {
            if (possesion[0] == 'trees' || possesion[0] == 'cats') {
                if (!(known[possesion[0]] < possesion[1])) {
                    match = false;
                }
            } else if (possesion[0] == 'pomeranians' || possesion[0] == 'goldfish') {
                if (!(known[possesion[0]] > possesion[1])) {
                    match = false;
                }
            } else if (known[possesion[0]] != possesion[1]) {
                match = false;
            }
        }
    })

    if (match) console.log("Second match: " + aunt.number)
})