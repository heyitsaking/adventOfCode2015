const fs = require('fs')

let input = fs.readFileSync('./input.txt').toString().split('\n')

const location_regex = /(AlphaCentauri)|([A-Z])([a-z])*/g
const distance_regex = /([0-9])+/g

class Graph {
    constructor() {
        this.nodes = [];
        this.adjacencyList = [];
    }
    
    addNode(name) {
        let node = {name: name, visited: false};
        this.nodes.push(node);
        this.adjacencyList[node.name] = [];
    }
    
    addEgde(node1, node2, weight) {
        this.adjacencyList[node1].push({node:node2, weight: weight});
        this.adjacencyList[node2].push({node:node1, weight: weight});
    }

    shortestPath(startNode) {
        let times = {}

        times[startNode] = 0;
        this.nodes.forEach(node => {
            if(node.name !== startNode) times[node.name] = Infinity;
        })
    }
}

let map = new Graph();

function recursiveShortestPath(currentNode, visitedNodes) {
    let temp = JSON.parse(JSON.stringify(visitedNodes));
    let times = [];
    let allVisited = true;

    let log = [];

    console.log(currentNode)

    temp.forEach(node => {
        if(currentNode.name == node.name) {
            node.visited = true;
            log.push(node.name)
        }
    })

    temp.forEach(node => {

        if (!node.visited) {
            console.log("Nodes before:")
            console.log(temp)
            allVisited = false;
            map.adjacencyList[currentNode.name].forEach(adjacent => {
                if (adjacent.node == node.name) {
                    log.push(node.name)
                    times.push(recursiveShortestPath(node, temp) +  +adjacent.weight)
                    node.visited = true;
                    console.log("Nodes after:")
                    console.log(temp)
                }
            })
        }
    })

    if (allVisited) {
        // console.log(log)
        console.log('base case')
        return 0;
    };

    // console.log(log)
    console.log(times)
    return Math.min.apply(Math, times);
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
            if (node.name == temp[0]) {
                exists_1 = true;
            }
            if (node.name == temp[1]) {
                exists_2 = true;
            }
        })

        if (!exists_1) map.addNode(temp[0]);
        if (!exists_2) map.addNode(temp[1]);
    }
    
    map.addEgde(temp[0], temp[1], dist[0])    
})

console.log(map.nodes[0].name + ": " + recursiveShortestPath(map.nodes[0], map.nodes))

// map.nodes.forEach(node =>
//     {
//         console.log(node.name + ": " + recursiveShortestPath(node, map.nodes))
//     }
// )

// console.log(map.dijkstraWithEndpoints('Faerun', 'Arbre'))