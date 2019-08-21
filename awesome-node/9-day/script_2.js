const fs = require('fs')

let input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')

const location_regex = /(AlphaCentauri)|([A-Z])([a-z])*/g
const distance_regex = /([0-9])+/g

// I liked the idea of making it a class for simplicity, got it from
// https://medium.com/@adriennetjohnson/a-walkthrough-of-dijkstras-algorithm-in-javascript-e94b74192026
// However, their execution did not apply to the problem at hand

class Graph {
    constructor() {
        this.nodes = [];
        this.adjacencyList = [];
    }
    
    addNode(name) {
        this.nodes.push(name);
        this.adjacencyList[name] = [];
    }
    
    addEgde(node1, node2, weight) {
        this.adjacencyList[node1].push({node:node2, weight: weight});
        this.adjacencyList[node2].push({node:node1, weight: weight});
    }
}

let map = new Graph();

// Just to have a base to copy
let queue = [];

function recursiveShortestPath(currentNode, adjacent, visitedNodes) {
    let previous = JSON.parse(JSON.stringify(visitedNodes))

    // Add to list to keep track of where I have visited
    previous.push(currentNode);

    // Holds the possible values after each iteration
    let distances = [];
    let allVisited = true;

    // Checks which nodes have been visited
    adjacent.forEach(adjacentNode => {
        let newDistance = 0;
        let nextNode = '';

        // If node has not been visited, apply function to new node
        if (!previous.includes(adjacentNode.node)) {
            allVisited = false;
            newDistance = (recursiveShortestPath(adjacentNode.node, map.adjacencyList[adjacentNode.node], previous)) + +adjacentNode.weight;
            distances.push(newDistance)
        }
    })

    // Base case, a.k.a all nodes visited 
    if (allVisited) {
        return 0;
    }

    // Return minimum from all posibilities
    return Math.min.apply(Math, distances);
}


function recursiveLongestPath(currentNode, adjacent, visitedNodes) {
    let previous = JSON.parse(JSON.stringify(visitedNodes))

    // Add to list to keep track of where I have visited
    previous.push(currentNode);

    // Holds the possible values after each iteration
    let distances = [];
    let allVisited = true;

    // Checks which nodes have been visited
    adjacent.forEach(adjacentNode => {
        let newDistance = 0;
        let nextNode = '';

        // If node has not been visited, apply function to new node
        if (!previous.includes(adjacentNode.node)) {
            allVisited = false;
            newDistance = (recursiveLongestPath(adjacentNode.node, map.adjacencyList[adjacentNode.node], previous)) + +adjacentNode.weight;
            distances.push(newDistance)
        }
    })

    // Base case, a.k.a all nodes visited 
    if (allVisited) {
        return 0;
    }

    // Return maximum from all posibilities
    return Math.max.apply(Math, distances);
}

input.forEach(line => {
    let temp = line.match(location_regex);
    let dist = line.match(distance_regex);

    // Add first two
    if (!map.nodes.length) {
        map.addNode(temp[0])
        map.addNode(temp[1])
    } else {
        let exists_1 = false;
        let exists_2 = false;

        map.nodes.forEach(node => {
            if (node == temp[0]) {
                exists_1 = true;
            }
            if (node == temp[1]) {
                exists_2 = true;
            }
        })

        if (!exists_1) map.addNode(temp[0]);
        if (!exists_2) map.addNode(temp[1]);
    }
    
    map.addEgde(temp[0], temp[1], dist[0])    
})

console.log("Minimum paths: ")
map.nodes.forEach(node =>
    {
        console.log(node + ": " + recursiveShortestPath(node, map.adjacencyList[node], queue))
    }
)

console.log("\nMaximum paths: ")
map.nodes.forEach(node =>
    {
        console.log(node + ": " + recursiveLongestPath(node, map.adjacencyList[node], queue))
    }
)
