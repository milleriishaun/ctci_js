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
/* helper function - sum of an array */
var SumArr = function(arr) {
  return arr.reduce((total, num) => total + num, 0);
};

var BinaryTree = function(value) {
  this.value = value;
  this.left = null;
  this.right = null;
};

BinaryTree.prototype.countPathsWithRoot = function(value, path) {
  var pathCount = 0;
  if (path === undefined) {
    path = [this.value];
  } else {
    path = [...path, this.value];
  }
  if (SumArr(path) === value) {
    pathCount++;
  }
  if (this.left !== null) {
    pathCount += this.left.countPathsWithRoot(value, path);
  }
  if (this.right !== null) {
    pathCount += this.right.countPathsWithRoot(value, path);
  }
  return pathCount;
};

BinaryTree.prototype.pathsWithSum = function(value) {
  var pathCount = 0;
  pathCount += this.countPathsWithRoot(value);
  if (this.left !== null) {
    pathCount += this.left.countPathsWithRoot(value);
  }
  if (this.right !== null) {
    pathCount += this.right.countPathsWithRoot(value);
  }
  return pathCount;
};

/* TEST */
var a = new BinaryTree(1);
var b = new BinaryTree(1);
var c = new BinaryTree(1);
var d = new BinaryTree(10);

a.left = b;
a.right = c;
c.left = d;

console.log(a.pathsWithSum(12), 1);
console.log(a.pathsWithSum(2), 2);
console.log(a.pathsWithSum(1), 3);

/*
// CTCI JS Sol1
// BALANCED TREE: O(N log N) TIME
// WORST CASE: O(Nˆ2) TIME

function treePathsWithSumX_1(tree, value) {
  if (!tree || !tree.root) throw Error('invalid tree');
  return countPaths1(tree.root, value);
}

function countPaths1(tree, targetValue, path = []) {
  let paths = 0;

  if (tree) {
    path.push(tree.value);

    let sum = 0,
    pathIndex = path.length - 1;

    while (!!~pathIndex) {
      sum += path[pathIndex];
      if (sum === targetValue) paths++;
      pathIndex--;
    }

    paths += countPaths1(tree.left, targetValue, path) + countPaths1(tree.right, targetValue, path);
    path.pop();
  }

  return paths;
}


// CTCI JS Sol2
// BALANCED TREE: O(N log N) TIME
// WORST CASE: O(Nˆ2) TIME

function treePathsWithSumX_2(tree, value) {
  if (!tree || !tree.root) throw Error('invalid tree');
  return countPaths2(tree.root, value);
}

function countPaths2(tree, value) {
  if (!tree) return 0;

  const pathsFromRoot = countFromNode(tree, value),
  leftPaths = countPaths2(tree.left, value),
  rightPaths = countPaths2(tree.right, value);

  return pathsFromRoot + leftPaths + rightPaths;
}

function countFromNode(tree, targetValue, sum = 0) {
  if (!tree) return 0;

  sum += tree.value;

  let paths = 0;
  if (sum === targetValue) paths++;

  paths += countFromNode(tree.left, targetValue, sum) + countFromNode(tree.right, targetValue, sum);

  return paths;
}

// CTCI JS Sol3
// SECOND BOOK SOLUTION

// O(NUMBER OF NODES IN THE TREE) TIME
// O(log N) SPACE FOR BALANCED TREE. WORST CASE O(N).

function treePathsWithSumX_3(tree, value) {
  if (!tree || !tree.root) throw Error('invalid tree');
  return countPaths3(tree.root, value);
}

function countPaths3(node, targetSum, runningSum = 0, pathCount = new Map()) {
  if (!node) return 0;

  runningSum += node.value;

  // Count paths with sum ending at the current node.
  const sum = runningSum - targetSum;
  let totalPaths = pathCount.get(sum) || 0;

  // If runningSum equals targetSum, then one additional path starts at root.
  if (runningSum === targetSum) totalPaths++;

  // Add runningSum to pathCounts.
  incrementMap(pathCount, runningSum, 1);

  // Count paths with sum on the left and right.
  totalPaths += countPaths3(node.left, targetSum, runningSum, pathCount);
  totalPaths += countPaths3(node.right, targetSum, runningSum, pathCount);

  incrementMap(pathCount, runningSum, -1); // Remove runningSum

  return totalPaths;
}

function incrementMap(map, key, delta) {
  const newCount = delta + (map.get(key) || 0);
  if (!newCount) map.delete(key); // Remove when 0 to reduce space usage
  else map.set(key, newCount);
}
*/

// ctci ... none(q2 was the last of the solutions for this)

// algo sol ... none

// // CTCI ES5
// /**
//  * To find all the paths where node values add up to a given sum we need to
//  * travel all paths of the tree and basically look upwards from the current node
//  * summing up the values. Where the sum matches the requested sum then increment
//  * counter. Even if we match the requested sum or go over we still need to keep
//  * going up the path as negative values are also allowed.
//  *
//  * N = |tree|
//  * Time: O(N lg N) - assuming a balanced tree, worst case O(N^2)
//  * Additional space: O(lg N) - assuming a balanced tree, worst case O(N)
//  */
// export function findPathWithSum(tree, value) {
//   if (!tree || !tree.root) {
//     throw new Error('tree must be valid and non-empty');
//   }

//   return findPathWithSumRecurse([], tree.root, value);
// }

// function findPathWithSumRecurse(path, node, value) {
//   let count = 0;
//   if (node) {
//     path.push(node.val);
//     let sum = 0;
//     for (let i = path.length - 1; i >= 0; --i) {
//       sum += path[i];
//       if (sum === value) {
//         ++count;
//       }
//     }
//     count += findPathWithSumRecurse(path, node.left, value) +
//       findPathWithSumRecurse(path, node.right, value);
//     path.pop();
//   }
//   return count;
// }
