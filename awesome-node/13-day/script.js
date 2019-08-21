const fs = require('fs')

let input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')

let info_regex = /([A-Z])([a-z])*|(gain|lose)|(\d)+/g;

// Reussed from ninth challenge
class Graph {
    constructor() {
        this.guests = [];
        this.happinessIndex = [];
    }
    
    addGuest(name) {
        this.guests.push(name);
        this.happinessIndex[name] = [];
    }
    
    addHappiness(guest1, guest2, happiness) {
        this.happinessIndex[guest1].push({name:guest2, happiness: happiness});
    }
}

let map = new Graph();
let map_2 = new Graph();

let queue = [];

// Modified version of recursiveLongestPath function from ninth challenge
function happinessOptimizer(currentGuest, adjacent, visitedNodes, run) {
    let previous = JSON.parse(JSON.stringify(visitedNodes))

    // Selects correct happiness index graph depending on which run is being performed
    let adjacentArr = run == 1 ? map.happinessIndex : map_2.happinessIndex;
    previous.push(currentGuest);

    let happy = [];
    let allVisited = true;

    adjacent.forEach(adjacentGuest => {
        let newHappiness = 0;

        let temp = adjacentArr[adjacentGuest.name];
        let adjacentHappiness = 0;
        temp.forEach(possible => {
            if (possible.name == currentGuest) adjacentHappiness = possible.happiness;
        })

        if (!previous.includes(adjacentGuest.name)) {
            allVisited = false;
            newHappiness = (happinessOptimizer(adjacentGuest.name, adjacentArr[adjacentGuest.name], previous, run)) + adjacentGuest.happiness + adjacentHappiness;
            happy.push(newHappiness)
        }
    })
    
    if (allVisited) {
        let first = previous[0];
        let happiness_1 = 0;
        let happiness_2 = 0;

        if (run == 1) {
            map.happinessIndex[currentGuest].forEach(guest => {
                if (guest.name == first) happiness_1 = guest.happiness;
            })
            map.happinessIndex[first].forEach(guest => {
                if (guest.name == currentGuest) happiness_2 = guest.happiness;
            })
            return happiness_1 + happiness_2;
        } else {
            map_2.happinessIndex[currentGuest].forEach(guest => {
                if (guest.name == first) happiness_1 = guest.happiness;
            })
            map_2.happinessIndex[first].forEach(guest => {
                if (guest.name == currentGuest) happiness_2 = guest.happiness;
            })
            return happiness_1 + happiness_2;
        }
    }

    return Math.max.apply(Math, happy);
}

input.forEach(line => {
    let info = line.match(info_regex);

    if(!map.guests.includes(info[0])) {
        map.addGuest(info[0]);
        map_2.addGuest(info[0]);
    }

    let happiness = info[1] == "gain" ? +info[2] : -(+info[2]);
    map.addHappiness(info[0], info[3], happiness)
    map_2.addHappiness(info[0], info[3], happiness)
})

map_2.addGuest('Me');
map_2.guests.forEach(guest => {
    if (!(guest == 'Me')) {
        map_2.addHappiness('Me', guest, 0)
        map_2.addHappiness(guest, 'Me', 0)
    }
})

console.log("Optimal happiness w/o me: ")
console.log(+ happinessOptimizer('Alice', map.happinessIndex['Alice'], queue, 1))

console.log("Optimal happiness w/ me: ")
console.log(happinessOptimizer('Alice', map_2.happinessIndex['Alice'], queue, 2))

