const fs = require('fs')

let input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')

let regex = /\w+/g;

let values = [];
let toReplace = '';

input.map(line => {
    let args = line.match(regex);
    if (args) {
        if (args.length > 1) values.push(args);
        if (args.length == 1) toReplace = args[0];
    }
})

class Graph {
    constructor() {
        this.value = [];
        this.replacements = [];
    }

    addMolecule(name) {
        this.value.push(name);
        this.replacements[name] = [];
    }

    addReplacement(name, replacement) {
        this.replacements[name].push(replacement);
    }
}

let molecules = new Graph();

values.map(element => {
    let moleculeName = element[0];
    let moleculeReplacement = element[1];

    if (!molecules.value.includes(moleculeName)) {
        molecules.addMolecule(moleculeName);
    }
    if (!molecules.replacements[moleculeName].includes(moleculeReplacement)) {
        molecules.addReplacement(moleculeName, moleculeReplacement);
    }
})

let combinations = [];

String.prototype.replaceAt=function(indexStart, indexEnd, replacement) {
    return this.substr(0, indexStart) + replacement + this.substr(indexEnd);
}

molecules.value.map(molecule => {
    let lastIndex = 0;
    let length = molecule.length;
    molecules.replacements[molecule].map(replacement => {
        while (toReplace.indexOf(molecule, lastIndex) != -1) {
            let start = toReplace.indexOf(molecule, lastIndex);
            let end = start + length;
            let newString = toReplace.replaceAt(start, end, replacement); 
            if (!combinations.includes(newString)) combinations.push(newString);
            lastIndex = start + 1;
        }
        lastIndex = 0;
    })
})

console.log(combinations.length)

// Got from https://github.com/ghaiklor/advent-of-code-2015/blob/master/day-19/part-2/solution.js
let ENTRY = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const REPLACEMENTS = ENTRY.split('\n\n')[0].split('\n').reduce((map, r) => map.set(r.split(' => ')[1], r.split(' => ')[0]), new Map());
console.log(REPLACEMENTS)

let MOLECULE = toReplace;
let count = 0;

while (MOLECULE !== 'e') {
    const randomMolecule = Array.from(REPLACEMENTS.keys())[Math.round(Math.random() * REPLACEMENTS.size)];
  
    MOLECULE = MOLECULE.replace(randomMolecule, match => {
      count++;
      return REPLACEMENTS.get(match);
    });
  
    console.log(`${MOLECULE} -> ${count}`);
  }