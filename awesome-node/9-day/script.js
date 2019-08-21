// This file shows previous mistakes and ideas, kept it because some things I had the right idea and wanted to reuse them

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

    paths.forEach(location => {
        console.log(location.origin)
        temp[location.origin] = true;

        paths.forEach(destination => {
            if(!locations[destination.origin]) {
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

// class PriorityQueue {
//     constructor() {
//         this.collection = [];
//     }

//     enqueue(element) {
//         if (this.isEmpty()) {
//             this.collection.push(element)
//         } else {
//             let added = false;
//             for (let i = 1; i <= this.collection.length; i++) {
//                 if (element[1] < this.collection[i-1][1]) {
//                     this.collection.splice(i-1, 0, element);
//                     added = true;
//                     break;
//                 }
//             }
//             if (!added) {
//                 this.collection.push(element);
//             }
//         }
//     }

//     dequeue() {
//         let value = this.collection.shift();
//         return value;
//     }

//     isEmpty() {
//         return (this.collection.length === 0)
//     }
// }

// dijkstraAll(startNode, endNode) {
//     let times = {};
//     let backtrace = {};
//     let pq = new PriorityQueue();

//     times[startNode] = 0;

//     this.nodes.forEach(node => {
//         if (node !== startNode) {
//             times[node] = Infinity;
//         }
//     });

//     pq.enqueue([startNode, 0]);

//     while(!pq.isEmpty()) {
//         let shortestStep = pq.dequeue();
//         let currentNode = shortestStep[0];

//         this.adjacencyList[currentNode].forEach(neighbor => {
//             let time = times[currentNode] + neighbor.weight;
//             if (time < times[neighbor.node]) {
//                 times[neighbor.node] = time;
//                 backtrace[neighbor.node] = currentNode;
//                 pq.enqueue([neighbor.node, time])
//             }
//         })

//         let path = [endNode];
//         let lastStep = endNode;

//         while(lastStep != startNode) {
//             path.unshift(backtrace[lastStep])
//             lastStep = backtrace[lastStep];
//         }

//         return `Path is ${path} and time is ${times[endNode]}`
//     }
// }

// dijkstraWithEndpoints(startNode, endNode) {
//     let times = {};
//     let backtrace = {};
//     let pq = new PriorityQueue();

//     times[startNode] = 0;

//     this.nodes.forEach(node => {
//         if (node !== startNode) {
//             times[node] = Infinity;
//         }
//     });

//     pq.enqueue([startNode, 0]);

//     while(!pq.isEmpty()) {
//         let shortestStep = pq.dequeue();
//         let currentNode = shortestStep[0];

//         this.adjacencyList[currentNode].forEach(neighbor => {
//             let time = times[currentNode] + neighbor.weight;
//             if (time < times[neighbor.node]) {
//                 times[neighbor.node] = time;
//                 backtrace[neighbor.node] = currentNode;
//                 pq.enqueue([neighbor.node, time])
//             }
//         })

//         let path = [endNode];
//         let lastStep = endNode;

//         while(lastStep != startNode) {
//             path.unshift(backtrace[lastStep])
//             lastStep = backtrace[lastStep];
//         }

//         return `Path is ${path} and time is ${times[endNode]}`
//     }
// }

//////////////////////////////////////////////////////

// let temp = JSON.parse(JSON.stringify(visitedNodes));
//     let times = [];
//     let allVisited = true;

//     let log = [];

//     // console.log(currentNode)

//     temp.forEach(node => {
//         if(currentNode.name == node.name) {
//             node.visited = true;
//             log.push(node.name)
//         }
//     })

//     temp.forEach(node => {
//         if (!node.visited) {
//             console.log(currentNode)
//             console.log(node.name)
//             // console.log("Nodes before:")
//             // console.log(temp)
//             allVisited = false;
//             map.adjacencyList[currentNode.name].forEach(adjacent => {
//                 if (adjacent.node == node.name) {
//                     log.push(node.name)
//                     times.push(recursiveShortestPath(node, temp) +  +adjacent.weight)
//                     node.visited = true;
//                     // console.log("Nodes after:")
//                     // console.log(temp)
//                 }
//             })
//         }
//     })

//     if (allVisited) {
//         // console.log(log)
//         console.log('base case')
//         return 0;
//     };

//     // console.log(log)
//     console.log(times)
//     return Math.min.apply(Math, times);

///////////////////////////////////////////////////////

// let temp = JSON.parse(JSON.stringify(visitedNodes));
// let allVisited = true;

// let times = 0;
// let distances = [];

// temp.forEach(node => {
//     if(currentNode.name == node.name) {
//         node.visited = true;
//     }
// })


// queue.push(currentNode.name)

// // If no more adjacent A.K.A last node
// // return null if not all nodes have been visited
// // return 0 if all nodes have been visited
// console.log(adjacent.length)
// if (adjacent.length < 1) {
//     temp.forEach(node => {
//         console.log(node)
//         if (!node.visited) {
//             console.log("Didn't visit all.")
//             return null;
//         }
//     })
//     return 0;
// }

// // If not last node, check adjacent nodes for shortest distance to last node
// adjacent.forEach(adjacentNode => {
//     let newDistance = 0;

//     // Iterate to find if adjacent node has been visited
//     temp.forEach(node => {
//         if (!node.visited) {
//             allVisited = false;
//             // If adjacent node has no been visited, test adjacent node
//             if (node.name == adjacentNode.node) {
//                 node.visited = true;
//                 let result = (recursiveShortestPath(node, map.adjacencyList[node.name], temp));
//                 // console.log(result)
//                 // If adjacent visited all nodes, save distance value
//                 if (!(result == null)) {
//                     newDistance = result + +adjacentNode.weight;
//                     distances.push(+newDistance)
//                 }
//             }
//         }
//     })
// })

// times = Math.min.apply(Math, distances)

// return times;