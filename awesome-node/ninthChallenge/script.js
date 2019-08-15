const fs = require('fs')

let input = fs.readFileSync('./input.txt').toString().split('\n')

const location_regex = /(AlphaCentauri)|([A-Z])([a-z])*/g
const distance_regex = /([0-9])+/g

const locations = {
    'Faerun': {
        number: 0,
        visited:false
    },
    'Tristram': {
        number: 1,
        visited:false
    },
    'Tambi': {
        number: 2,
        visited:false
    },
    'Norrath': {
        number: 3,
        visited:false
    },
    'Snowdin': {
        number: 4,
        visited:false
    },
    'Straylight': {
        number: 5,
        visited:false
    },
    'AlphaCentauri': {
        number: 6,
        visited:false
    },
    'Arbre': {
        number: 7,
        visited:false
    }
}

let paths = [];

// All path objects have all the information
function update_paths(origin, destination, distance) {
    paths.forEach(path => {
        if(path.origin == destination) {
            let new_destination = {
                name: origin,
                distance: parseInt(distance),
                visited: false
            }
            path.ends.push(new_destination)
        }
    })
}

input.forEach(line => {
    let temp = line.match(location_regex);
    let dist = line.match(distance_regex)

    let exists = false;
    let exists_index = 0;
    if(paths) {
        paths.forEach((path,i) => {
            if(path.origin == temp[0]) {
                exists = true;
                exists_index = i;
            }
        })

        if(!exists) {
            let new_path = {
                origin: temp[0],
                ends: [{
                    name: temp[1],
                    distance: parseInt(dist[0]),
                    visited: false
                }],
            }
            paths.push(new_path)  
        } else {
            let new_destination = {
                name: temp[1],
                distance: parseInt(dist[0]),
                visited: false
            }
            paths[exists_index].ends.push(new_destination)
        }
    }
});

paths.forEach(path => {
    path.ends.forEach(destination => {
        update_paths(path.origin, destination.name, destination.distance )
    })
});

let distances = [];

function calculate_shortest(origin, visits) {
    let temp = JSON.parse(JSON.stringify(visits));
    let distance = 0;

    paths.forEach(location => {
        console.log(location.origin)
        temp[location.origin] = true;
        paths.forEach(destination => {
            if(!locations[destination.name]) {
                distance += location.ends[destination].distance;
                calculate_shortest(destination.name, temp);
            }
        });
        distances.push(distance)
    });
};

paths.forEach(location => {
    calculate_shortest(location.name, locations)
})

console.log(distances)