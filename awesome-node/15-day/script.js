const fs = require('fs')

let input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')

let ing_regex = /([A-Z]\w+)|(\d|-\d)/g

let ingredients = [];

input.forEach(line => {
    let args = line.match(ing_regex)

    let ingredient = {
        name: args[0],
        capacity: args[1],
        durability: args[2],
        flavor: args[3],
        texture: args[4],
        calories: args[5]
    }

    ingredients.push(ingredient)
})

let bestCookie = 0;
let healthiestCookie = 0;

for (let sprinkles = 0; sprinkles <= 100; sprinkles++) {
    for (let butterscotch = 0; butterscotch <= 100 - sprinkles; butterscotch++) {
        for (let chocolate = 0; chocolate <= 100 - sprinkles - butterscotch; chocolate++) {
            let candy = 100 - chocolate - butterscotch - sprinkles;

            let capacity = (sprinkles * ingredients[0].capacity) + (butterscotch * ingredients[1].capacity) + (chocolate * ingredients[2].capacity) + (candy * ingredients[3].capacity);
            let durability = (sprinkles * ingredients[0].durability) + (butterscotch * ingredients[1].durability) + (chocolate * ingredients[2].durability) + (candy * ingredients[3].durability);
            let flavor = (sprinkles * ingredients[0].flavor) + (butterscotch * ingredients[1].flavor) + (chocolate * ingredients[2].flavor) + (candy * ingredients[3].flavor);
            let texture = (sprinkles * ingredients[0].texture) + (butterscotch * ingredients[1].texture) + (chocolate * ingredients[2].texture) + (candy * ingredients[3].texture);
            let calories = (sprinkles * ingredients[0].calories) + (butterscotch * ingredients[1].calories) + (chocolate * ingredients[2].calories) + (candy * ingredients[3].calories);

            capacity = capacity < 0 ? 0 : capacity;
            durability = durability < 0 ? 0 : durability;
            flavor = flavor < 0 ? 0 : flavor;
            texture = texture < 0 ? 0 : texture;
            calories = calories == 500 ? true : false;      
                  
            let cookie = capacity * durability * flavor * texture; 

            bestCookie = bestCookie == 0 ? cookie : bestCookie < cookie ? cookie : bestCookie;

            if (calories) {
                if (healthiestCookie == 0) {
                    healthiestCookie = cookie;
                } else {
                    healthiestCookie = healthiestCookie < cookie ? cookie : healthiestCookie;
                }
            }
        }
    }
}

console.log(bestCookie)
console.log(healthiestCookie)