const fs = require('fs')

let input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')

let data_regex = /([A-Z])([a-z])*|(\d)+/g

class Graph {
    constructor() {
        this.reindeer = [];
        this.raceInfo = [];
    }
    
    addReindeer(name) {
        this.reindeer.push(name);
        this.raceInfo[name] = {};
    }
    
    addInfo(name, speed, runTime, restTime) {
        this.raceInfo[name] = {speed:speed, run: runTime, rest: restTime};
    }
}

let reindeers = new Graph();

input.forEach(reindeer => {
    let info = reindeer.match(data_regex)
    
    reindeers.addReindeer(info[0]);
    reindeers.addInfo(info[0], +info[1], +info[2], +info[3])
})

let time = 2503;
let distances = [];

reindeers.reindeer.forEach(reindeer => {
    let currentInfo = reindeers.raceInfo[reindeer];
    
    let block = currentInfo.run + currentInfo.rest;
    
    let circuits = Math.floor(time / block);
    let leftover = time - (circuits * block);

    let final = 0;
    if (leftover < currentInfo.run) {
        final = leftover * currentInfo.speed;
    } else {
        final = currentInfo.run * currentInfo.speed;
    }
    final += (circuits * (currentInfo.run * currentInfo.speed))

    distances.push(final)
})

console.log(Math.max.apply(Math, distances))

let points = new Array(reindeers.reindeer.length).fill(0);
let distAtTime = new Array(reindeers.reindeer.length).fill(0);

for (let currentTime = 0; currentTime <= time; currentTime++) {
    // Calculate current distance for each reindeer
    reindeers.reindeer.forEach((reindeer, i) => {
        let currentInfo = reindeers.raceInfo[reindeer];
        let moving = ((currentTime % (currentInfo.run + currentInfo.rest) <= currentInfo.run) && (currentTime % (currentInfo.run + currentInfo.rest) !== 0));

        distAtTime[i] = moving ? distAtTime[i] + currentInfo.speed : distAtTime[i];
    })
    
    // Calculate who is currently in the lead
    if (currentTime !== 0) {
        let winner = [0,0];
        distAtTime.forEach((distance, i) => {
            if (winner[1] < distance) {
                winner[0] = i;
                winner[1] = distance;
            }
        })

        // Increase lead's points
        points[winner[0]]++;
    }
}

reindeers.reindeer.forEach((reindeer,i) => {
    console.log("Reindeer: " + reindeer + " -> Points: " + points[i] + "\n")
})