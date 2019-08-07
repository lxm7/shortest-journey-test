/*
 * With more time, I would have liked this to have built the adjacencyGraph object automatically WITH the
 * weight/distances built into the recursive function findAllRoutes.
 * I feel this would have reduced the complexity and peer dependancies of getIntersectingStopsFromDistanceObject,
 * getRoutesWithDistances, getAllStops and getStops methods from ./utils needed to retrieve
 * total distances from our routes generated.
 *
 * I do have an adjacencyGraph object but only with the destinations / stops, SEE ./constants.ts.
 */
class BuildGraph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = {};
  }

  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList[node] = [];
  }

  addEdge(node1, node2, weight) {
    this.adjacencyList[node1].push({ node: node2, weight: weight });
    this.adjacencyList[node2].push({ node: node1, weight: weight });
  }
}

// Example
let map = new BuildGraph();
map.addNode('A');
map.addNode('B');
map.addNode('C');
map.addNode('D');
map.addNode('E');
map.addNode('F');
map.addNode('G');
map.addNode('H');
map.addEdge('A', 'C', 2);
map.addEdge('C', 'D', 1);
map.addEdge('C', 'F', 4);
map.addEdge('B', 'D', 4);
map.addEdge('B', 'E', 7);
map.addEdge('D', 'F', 1);
map.addEdge('D', 'G', 2);
map.addEdge('F', 'G', 3);
map.addEdge('G', 'H', 4);
map.addEdge('E', 'H', 10);

// export const adjacencyGraph = {
//   "nodes":["A","B","C","D","E","F","G","H"],
//   "adjacencyList":{
//     "A":[{"node":"C","weight":2}],
//     "B":[{"node":"D","weight":4},{"node":"E","weight":7}],
//     "C":[{"node":"A","weight":2},{"node":"D","weight":1},{"node":"F","weight":4}],
//     "D":[{"node":"C","weight":1},{"node":"B","weight":4},{"node":"F","weight":1},{"node":"G","weight":2}],
//     "E":[{"node":"B","weight":7},{"node":"H","weight":10}],
//     "F":[{"node":"C","weight":4},{"node":"D","weight":1},{"node":"G","weight":3}],
//     "G":[{"node":"D","weight":2},{"node":"F","weight":3},{"node":"H","weight":4}],
//     "H":[{"node":"G","weight":4},{"node":"E","weight":10}],
//   },
// }
