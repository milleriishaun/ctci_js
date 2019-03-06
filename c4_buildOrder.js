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
// directed graph
var Graph = require('./util/Graph');

Graph.prototype.findNodeWithNoChildren = function() {
  for (var node in this.nodes) {
    if (Object.keys(this.nodes[node]).length === 0) {
      return node;
    }
  }
  return undefined;
};

var buildOrder = function(projects, dependencies) {
  var graph = new Graph();
  projects.forEach(project => {
    graph.addNode(project);
  });
  dependencies.forEach(dependency => {
    graph.addEdge(dependency[1], dependency[0]);
  });
  var answer = [];
  var currNode = graph.findNodeWithNoChildren();
  while (currNode !== undefined) {
    answer.push(currNode);
    graph.removeNode(currNode);
    currNode = graph.findNodeWithNoChildren();
  }
  if (answer.length === projects.length) {
    return answer;
  } else {
    throw Error;
  }
};

/* TEST */
// Not sure how valid this test is, since first point is not correct.
var projects = ['a', 'b', 'c', 'd', 'e', 'f'];
var dependencies = [['a', 'd'], ['f', 'b'], ['b', 'd'], ['f', 'a'], ['d', 'c']];

console.log(buildOrder(projects, dependencies));

/* // Again, not stable solution.
// CTCI JS Sol
function buildOrder(projects, dependencies) {
  const adjList = {}, result = new Set();

  // create adjacency list
  projects.forEach(project => adjList[project] = []);
                                    // project     // dependent
  dependencies.forEach(edge => adjList[edge[0]].push(edge[1]));

  // run topological sort
  projects.forEach(project => topologicalSort(project, adjList, result));

  return [...result].reverse();
}

function topologicalSort(project, adjList, result, path = new Set()) {
  if (!result.has(project)) {

    path.add(project);

    for (const dependent of adjList[project]) {
      if (path.has(dependent)) throw Error('dependencies are cyclic');
      topologicalSort(dependent, adjList, result, path);
    }

    path.delete(project);
    result.add(project);
  }
}
/*

// ctci ... none(q2 was the last of the solutions for this)

// algo sol ... none

// // CTCI ES5
// /**
//  * To get the order of the projects we just need to create a graph of the
//  * projects and their dependencies and do a topological sort. To detect if an
//  * order can be determined we also need to check for cycles as topological sort
//  * will only work on DAGs.
//  *
//  * N = |projects|
//  * M = |dependencies|
//  * Time: O(N+M) - this assumes that the objects and we use as hashmaps and the
//  * Set data type have operations that take O(1) time.
//  * Additional space: O(N)
//  */
// export function buildOrder(projects, dependencies) {
//   let adj = {},
//     finished = [],
//     discovered = new Set(),
//     path = new Set();

//   // create adjacency matrix
//   projects.forEach(project => adj[project] = []);
//   dependencies.forEach(edge => adj[edge[1]].push(edge[0]));
//   // run topological sort
//   projects.forEach(project => topologicalSort(adj, discovered, finished, path, project));

//   return finished.reverse();
// }

// function topologicalSort(adj, discovered, finished, path, project) {
//   if (discovered.has(project)) {
//     return;
//   }

//   discovered.add(project);
//   path.add(project);
//   for (let neighbour of adj[project]) {
//     if (path.has(neighbour)) {
//       throw new Error('dependencies are cyclic');
//     }

//     topologicalSort(adj, discovered, finished, path, neighbour);
//   }
//   path.delete(project);
//   finished.push(project);
// }
