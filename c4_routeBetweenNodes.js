var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

/*
// add tests
suite
  .add('isUnique1', function() {
    isUnique1('striggnp');
  })
  .add('isUnique2', function() {
    isUnique2('striggnp');
  })
  .add('isUnique3', function() {
    isUnique3('striggnp');
  })
  .add('isUnique4', function() {
    isUnique4('striggnp');
  })
  .add('isUnique5', function() {
    isUnique5('striggnp');
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });
  */

// CTCI JS (good full c4, with DataStructures clearly shown, great tests included)
// CTCI JS Sol (great for c4, uses 'this' so has multiple applications, multi-sol)
// ctci (best format w/ readability for c4, missing q:3-12, actually lack of info makes it confusing)
// algo sol (2nd best format for c4, missing q:1,3,5,7,9,12, <10 months old... still not bad though)
// CTCI ES5 (useful c4 even though 3 years old, very concise and well-described)

// Just try to have CTCI JS and CTCI JS Sol easily accessible and tested. Have
// ctci and algo sol as commented out for quick reference later, when I understand
// these trees/graphs better.

// CTCI JS
// CTCI JS Sol
// ctci ... none(q2 was the last of the solutions for this)
// algo sol
// CTCI ES5

// CTCI JS
var Graph = require('./util/Graph');
var Queue = require('./util/Queue');

// concurrently implement BFS on both sides of the graph
// intention is to minimise the levels that the graph has to search

var checkRoute = function(value1, value2, graph) {
  var q1 = new Queue();
  var q2 = new Queue();
  var visited1 = {};
  var visited2 = {};
  // insert values into qs
  visited1[value1] = true;
  visited2[value2] = true;
  if (graph.hasNode(value1)) {
    for (var edge in graph.findEdges(value1)) {
      q1.add(edge);
    }
  }
  if (graph.hasNode(value2)) {
    for (var edge in graph.findEdges(value2)) {
      q2.add(edge);
    }
  }
  // take turns dequeueing until empty
  var nextEdge1;
  var nextEdge2;
  while (!q1.isEmpty() || !q2.isEmpty()) {
    // if has queue, return true
    if (!q1.isEmpty()) {
      nextEdge1 = q1.remove();
      if (nextEdge1 === value2) {
        return true;
      }
      if (visited1[nextEdge1] === undefined) {
        visited1[nextEdge1] = true;
        if (graph.hasNode(nextEdge1)) {
          for (var edge in graph.findEdges(nextEdge1)) {
            q1.add(edge);
          }
        }
      }
    }
    if (!q2.isEmpty()) {
      nextEdge2 = q2.remove();
      if (nextEdge2 === value1) {
        return true;
      }
      if (visited2[nextEdge2] === undefined) {
        visited2[nextEdge2] = true;
        if (graph.hasNode(nextEdge2)) {
          for (var edge in graph.findEdges(nextEdge2)) {
            q2.add(edge);
          }
        }
      }
    }
  }
  // return false
  return false;
};

/* TEST */
var graph = new Graph();
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');

graph.addEdge('D', 'E');

console.log(checkRoute('A', 'C', graph), true);
console.log(checkRoute('A', 'E', graph), false);
console.log(checkRoute('B', 'A', graph), true);
console.log(checkRoute('D', 'E', graph), true);

// CTCI JS Sol1
const errorCheck = (graph, start) => {
  if (!Array.isArray(graph)) throw Error('invalid graph');
  if (!graph[start]) throw Error('invalid start node');
};
// E = Edges
// V = Vertices

// O(E) TIME --- O(V) SPACE
// ITERATIVE BREADTH FIRST SEARCH

function graphSearchBFS(graph, start, target) {
  errorCheck(graph, start);

  if (start === target) return true;

  const visited = new Set(),
    queue = [start];

  while (queue.length) {
    const currentNode = queue.shift();
    for (const neighbour of graph[currentNode]) {
      if (!visited.has(neighbour)) {
        if (neighbour === target) return true;
        visited.add(neighbour);
        queue.push(neighbour);
      }
    }
  }

  return false;
}

// CTCI JS Sol2

// O(E) TIME --- O(V) SPACE
// RECURSIVE DEPTH FIRST SEARCH

function graphSearchDFS(graph, start, target) {
  errorCheck(graph, start);
  return searchDFS(graph, start, target);
}

function searchDFS(graph, start, target, visited = new Set()) {
  if (start === target) return true;

  visited.add(start);

  for (const neighbour of graph[start]) {
    if (!visited.has(neighbour)) {
      if (searchDFS(graph, neighbour, target, visited)) return true;
    }
  }

  return false;
}

// ctci
function route(node, target) {
  let output = false;
  const seed = Math.random() * 10000;

  function recurse(n, t) {
    if (output || n.visited === seed) return; // already visited, break

    n.visited = seed; // set visited flag to random seed

    if (n === t) {
      return (output = true); // base case if route found
    }

    for (let i = 0; i < node.children.length; i++) {
      recurse(n.children[i], t); // recurse over children
    }
  }

  recurse(node, target);
  return output;
}

// algo sol ... none

// // CTCI ES5

// /**
//  * One way to check if two nodes are connected is to do a BFS of the graph
//  * from the source node. BFS would be useful where the nodes have many out
//  * edges (degrees) and paths between pairs are not exceedingly deep as it will
//  * visit neighbours from the source node radiating outwards.
//  *
//  * N = |vertices|
//  * M = |edges|
//  * Time: O(M)
//  * Additional space: O(N)
//  */
// export function isConnectedBFS(graph, source, target) {
//   let discovered = new Set(),
//     queue = [source];

//   while (queue.length > 0) {
//     let node = queue.shift();
//     for (let neighbour of graph[node]) {
//       if (!discovered.has(neighbour)) {
//         if (neighbour === target) {
//           return true;
//         }
//         discovered.add(neighbour);
//         queue.push(neighbour);
//       }
//     }
//   }

//   return false;
// }

// /**
//  * One way to check if two nodes are connected is to do a DFS of the graph
//  * from the source node. DFS would be useful where the graph has really long
//  * paths and we want to travel as far as we can through that graph as quickly as
//  * possible. DFS can be recursive or use a stack and iteration.
//  *
//  * N = |vertices|
//  * M = |edges|
//  * Time: O(M)
//  * Additional space: O(N)
//  */
// export function isConnectedDFS(graph, source, target) {
//   return dfs(graph, new Set(), source, target);
// }

// function dfs(graph, discovered, source, target) {
//   if (source === target) {
//     return true;
//   }
//   discovered.add(source);
//   for (let neighbour of graph[source]) {
//     if (!discovered.has(neighbour)) {
//       if (dfs(graph, discovered, neighbour, target)) {
//         return true;
//       }
//     }
//   }
//   return false;
// }
