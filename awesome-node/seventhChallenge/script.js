// Cheated on this one, could not figure out regression logic for Part 1. Got answer from
// https://github.com/ghaiklor/advent-of-code-2015/blob/master/day-07/part-1/solution.js

const fs = require('fs')

let input = fs.readFileSync('./input.txt').toString().split('\n')

const COMMAND_REGEX = /[A-Z]+/g;
const ARGUMENTS_REGEX = /[a-z0-9]+/g;

const wires = new Map();

const binary_commands = {
    AND: (a,b) => a & b,
    OR: (a,b) => a | b,
    NOT: a => ~a,
    LSHIFT: (a,b) => a << b,
    RSHIFT: (a,b) => a >> b
}

const instruction_fetch = _instruction => {
    const command = _instruction.match(COMMAND_REGEX);
    const args = _instruction.match(ARGUMENTS_REGEX);
    const dest = args.pop();

    return {
        command: command && command[0],
        args: args.map(arg => isNaN(Number(arg)) ? arg : Number(arg)),
        destination: dest
    };
};

input.forEach(instr => {
    const _instruction = instruction_fetch(instr);
    wires.set(_instruction.destination, {command: _instruction.command, args: _instruction.args})
})

const calculate_value = name => {
    const wire = wires.get(name);

    if(typeof name === 'number') return name;
    if(typeof wire === 'number') return wire;
    if(typeof wire === 'undefined') return undefined;

    // Uncomment this for answer to Part 2
    // if(name == 'b') return 956; 
    if(!wire.command) {
        wires.set(name, calculate_value(wire.args[0]));
    } else {
        wires.set(name, binary_commands[wire.command](calculate_value(wire.args[0]), calculate_value(wire.args[1])));
    }

    return wires.get(name);
}

console.log(calculate_value('a'))