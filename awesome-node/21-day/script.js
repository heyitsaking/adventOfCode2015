const fs = require('fs');

let INPUT = fs.readFileSync('./input.txt', 'utf-8').split('\n')

let enemy = {
    'hp': 0,
    'damage': 0,
    'armor': 0
};

INPUT.forEach(stat => {
    let value = stat.split(': ')
    if (value[0].includes('Hit')) enemy.hp = +value[1];
    if (value[0].includes('Damage')) enemy.damage = +value[1];
    if (value[0].includes('Armor')) enemy.armor = +value[1];
})

class Player {
    constructor() {
        this.life = 100;
        this.damage = 0;
        this.armor = 0
    }

    setDamage(value) {
        this.damage = value;
    }

    getDamage() {
        return this.damage;
    }

    setArmor(value) {
        this.armor = value;
    }

    getArmor() {
        return this.armor;
    }
}

let weapons = [
    {
        name: "Dagger",
        cost: 8,
        damage: 4,
        armor: 0
    },
    {
        name: "Shortsword",
        cost: 10,
        damage: 5,
        armor: 0
    },
    {
        name: "Warhammer",
        cost: 25,
        damage: 6,
        armor: 0
    },
    {
        name: "Longsword",
        cost: 40,
        damage: 7,
        armor: 0
    },
    {
        name: "Greataxe",
        cost: 74,
        damage: 8,
        armor: 0
    }
];

let armors = [
    {
        name: "None",
        cost: 0,
        armor: 0,
        armor: 0
    },
    {
        name: "Leather",
        cost: 13,
        damage: 0,
        armor: 1
    },
    {
        name: "Chainmail",
        cost: 31,
        damage: 0,
        armor: 2
    },
    {
        name: "Splintmail",
        cost: 53,
        damage: 0,
        armor: 3
    },
    {
        name: "Bandedmail",
        cost: 75,
        damage: 0,
        armor: 4
    },
    {
        name: "Platemail",
        cost: 102,
        damage: 0,
        armor: 5
    }
];

let rings = [
    {
        name: "Damage +1",
        cost: 25,
        damage: 1,
        armor: 0
    },
    {
        name: "Damage +2",
        cost: 50,
        damage: 2,
        armor: 0
    },
    {
        name: "Damage +3",
        cost: 100,
        damage: 3,
        armor: 0
    },
    {
        name: "Armor +1",
        cost: 20,
        damage: 0,
        armor: 1
    },
    {
        name: "Armor +2",
        cost: 40,
        damage: 0,
        armor: 2
    },
    {
        name: "Armor +3",
        cost: 80,
        damage: 0,
        armor: 3
    }
];

let player = new Player();

function fight(player, boss) {
    let turn = 0;
    let damageDealt = 0;
    let playerHP = player.life;
    let bossHP = boss.hp;
    while (true) {
        if (turn % 2) {
            damageDealt = (boss.damage - player.getArmor()) <= 0 ? 1 : boss.damage - player.getArmor();
            playerHP = playerHP - damageDealt;
            if (playerHP <= 0) return false;
            turn--;
        } else {
            damageDealt = (player.getDamage() - boss.armor) <= 0 ? 1 : player.getDamage() - boss.armor;
            bossHP = bossHP - damageDealt;
            if (bossHP <= 0) return true;
            turn++;
        }
    }
}

let minCost = Infinity;
let maxCost = 0;

let rignCount = 0;
while (rignCount < 3) {
    weapons.forEach(weapon => {
        armors.forEach(armor => {
            player.setDamage(weapon.damage);
            player.setArmor(armor.armor);
            let newCost = 0;
            if (rignCount == 0) {
                newCost = weapon.cost + armor.cost;
                if (fight(player, enemy)) {
                    minCost = minCost > (newCost) ? newCost : minCost;
                } else {
                    maxCost = maxCost < newCost ? newCost : maxCost;
                }
            }
            if (rignCount == 1) {
                rings.forEach(ring => {
                    player.setDamage(weapon.damage + ring.damage);
                    player.setArmor(armor.armor + ring.armor);
                    newCost = weapon.cost + armor.cost + ring.cost;
                    if (fight(player, enemy)) {
                        minCost = minCost > (newCost) ? newCost : minCost;
                    } else {
                        maxCost = maxCost < newCost ? newCost : maxCost;
                    }
                })
            }
            if (rignCount == 2) {
                rings.forEach((ring1, i) => {
                    rings.forEach((ring2, j) => {
                        if (j != i) {
                            player.setDamage(weapon.damage + ring1.damage + ring2.damage);
                            player.setArmor(armor.armor + ring1.armor + ring2.armor);
                            newCost = weapon.cost + armor.cost + ring1.cost + ring2.cost;
                            if (fight(player, enemy)) {
                                minCost = minCost > (newCost) ? newCost : minCost;
                            } else {
                                maxCost = maxCost < newCost ? newCost : maxCost;
                            }
                        }
                    })
                })
            }
        })
    })
    rignCount++;
}

console.log(minCost)
console.log(maxCost)