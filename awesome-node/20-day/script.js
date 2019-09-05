// Got solution for part 1 from https://github.com/ghaiklor/advent-of-code-2015/blob/master/day-20/part-1/solution.js
let INPUT = 36000000 / 10;
let houses = new Uint32Array(INPUT);
let houseNumber = INPUT;

for (let i = 1; i < INPUT; i++) {
    for (let j = i; j < INPUT; j += i) {
        if ((houses[j] += i) >= INPUT && j < houseNumber) {
            houseNumber = j;
        }
    }
}

console.log(houseNumber);

// Part 2
INPUT = 36000000 / 11;
houses = new Uint32Array(INPUT);
houseNumber = INPUT;
let elves = new Uint32Array(INPUT);

for (let elf = 1; elf < INPUT; elf++) {
    for (let house = elf; house < INPUT; house += elf) {
        if (elves[elf] < 50) {
            if ((houses[house] += elf) >= INPUT && house < houseNumber) {
                houseNumber = house;
            }
        }
        elves[elf]++;
    }
}

console.log(houseNumber);