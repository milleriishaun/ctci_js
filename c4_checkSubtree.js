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
var Tree = function(value) {
  this.value = value;
  this.left = null;
  this.right = null;
};

var isSame = function(tree1, tree2) {
  var answer = tree1.value === tree2.value;
  if (!answer) {
    return answer;
  }

  if (tree1.left !== null && tree2.left !== null) {
    answer = answer && isSame(tree1.left, tree2.left);
  } else if (
    (tree1.left === null && tree2.left !== null) ||
    (tree1.left !== null && tree2.left === null)
  ) {
    answer = answer && false;
  }

  if (tree1.right !== null && tree2.right !== null) {
    answer = answer && isSame(tree1.right, tree2.right);
  } else if (
    (tree1.right === null && tree2.right !== null) ||
    (tree1.right !== null && tree2.right === null)
  ) {
    answer = answer && false;
  }

  return answer;
};

Tree.prototype.isSubtree = function(tree2) {
  if (isSame(this, tree2)) {
    return true;
  } else {
    var answer = false;
    if (this.left !== null) {
      answer = answer || this.left.isSubtree(tree2);
    }
    if (this.right !== null) {
      answer = answer || this.right.isSubtree(tree2);
    }
    return answer;
  }
};

/* TEST */
var a1 = new Tree(1);
var a2 = new Tree(2);
var a3 = new Tree(3);
var a4 = new Tree(4);
var a5 = new Tree(5);
var a6 = new Tree(6);
var a7 = new Tree(7);

var b3 = new Tree(3);
var b6 = new Tree(6);
var b7 = new Tree(7);

var c3 = new Tree(3);
var c6 = new Tree(6);
var c8 = new Tree(8);

a1.left = a2;
a1.right = a3;
a2.left = a4;
a2.right = a5;
a3.left = a6;
a3.right = a7;

b3.left = b6;
b3.right = b7;

c3.left = c6;
c3.right = c8;

console.log(a1.isSubtree(b3), true);
console.log(a1.isSubtree(c3), false);

/*
// CTCI JS Sol1

  // N: Number of nodes in larger tree
  // M: Number of nodes in smaller tree
  // K: Number of occurrences of smaller tree's root in larger tree
  // ABOUT O(N + KM) TIME --- O(log(N) + log(M)) SPACE


function checkIfSubtree1(tree1, tree2) {
  if (!tree1 || !tree1.root) throw Error('invalid input for tree1');
  if (!tree2 || !tree2.root) return true;
  return findSubtreeRoot(tree1.root, tree2.root);
}

function findSubtreeRoot(tree1, tree2) {
  if (!tree1) return false;

  if (tree1.value === tree2.value && matchTrees(tree1, tree2)) return true;

  return findSubtreeRoot(tree1.left, tree2) || findSubtreeRoot(tree1.right, tree2);
}

function matchTrees(tree1, tree2) {
  if (!tree2 && !tree1) return true;
  if (!tree1 || !tree2) return false;
  if (tree1.value !== tree2.value) return false;

  return matchTrees(tree1.left, tree2.left) && matchTrees(tree1.right, tree2.right);
}

// CTCI JS Sol2
// O(N + M) TIME AND SPACE

function checkIfSubtree2(tree1, tree2) {
  if (!tree1 || !tree1.root) throw Error('invalid input for tree1');
  if (!tree2 || !tree2.root) return true;

  const arr1 = [], arr2 = [];

  getPreOrderArr(tree1.root, arr1);
  getPreOrderArr(tree2.root, arr2);

  return arr1.join``.includes(arr2.join``);
  // return !!~arr1.join``.indexOf(arr2.join``);
}

function getPreOrderArr(tree, arr) {
  if (!tree) return arr.push('X');

  arr.push(tree.value + ' ');
  getPreOrderArr(tree.left, arr);
  getPreOrderArr(tree.right, arr);
}
*/

// ctci ... none(q2 was the last of the solutions for this)

/*
// algo sol
// 00_Check_Identical(actually a part of c4_basic.js) is important to understand before solving this problem
// https://www.youtube.com/watch?v=73PQ9raLEVs

function Tree() {
  this.root = null;
}

function Node(value) {
  this.value = value;
  this.right = null;
  this.left = null;
}

Tree.prototype.addValue = function(val) {
  let n = new Node(val);
  if (this.root === null) {
    this.root = n;
  } else {
    this.root.addNode(n);
  }
};
let n;
Node.prototype.addNode = function(node) {
  if (node.value < this.value) {
    if (this.left === null) {
      this.left = node;
    } else {
      this.left.addNode(node);
    }
  } else if (node.value > this.value) {
    if (this.right === null) {
      this.right = node;
    } else {
      this.right.addNode(node);
    }
  }
};

let tree1 = new Tree();
tree1.addValue(20);
tree1.addValue(10);
tree1.addValue(5);
tree1.addValue(3);
tree1.addValue(7);
tree1.addValue(30);
tree1.addValue(15);
tree1.addValue(17);
let tree2 = new Tree();
tree2.addValue(10);
tree2.addValue(15);
tree2.addValue(17);
tree2.addValue(5);
tree2.addValue(3);
tree2.addValue(7);

function check_identical(p1, p2) {
  if (p1 === null && p2 === null) return true;
  if ((p1 !== null && p2 === null) || (p1 === null && p2 !== null))
    return false;
  if (p1.value === p2.value) {
    let left = check_identical(p1.left, p2.left);
    let right = check_identical(p1.right, p2.right);
    return left && right;
  }
}

function check_subtree(main, sub) {
  if (main === null && sub === null) return true;
  if (main !== null && sub === null) return true;
  if (main === null && sub !== null) return false;
  if (check_identical(main, sub)) return true;
  else {
    return check_subtree(main.left, sub) || check_subtree(main.right, sub);
  }
}
console.log(tree1, tree2);
console.log(check_subtree(tree1.root, tree2.root));
*/

// // CTCI ES5
// /**
//  * To check if tree2 is a subtree of tree1 this algorithm basically searches
//  * through tree1 looking for a potential root node (a node whose value matches
//  * the root node of tree2). Once found go through node for node comparing from
//  * that found root down to the nodes in tree2. If they all match then tree2 is
//  * a subtree.
//  *
//  * N = |tree1|
//  * M = |tree2|
//  * Time: O(NM)
//  * Additional space: O(lg N) - space cost is due to recursive nature of algorithm
//  * and assumes a balanced tree, worst case is O(N)
//  */
// export function isSubtree(tree1, tree2) {
//   if (!tree1 || !tree1.root) {
//     throw new Error('trees1 must be valid non-empty trees');
//   }
//   if (!tree2 || !tree2.root) {
//     return true;
//   }
//   return findRoot(tree1.root, tree2.root);
// }

// function findRoot(node1, node2) {
//   if (!node1 || !node2) {
//     return false;
//   }
//   else if (node1.val === node2.val && sameTree(node1, node2)) {
//     return true;
//   }
//   else {
//     return findRoot(node1.left, node2) || findRoot(node1.right, node2);
//   }
// }

// function sameTree(node1, node2) {
//   if (!node1 && !node2) {
//     return true;
//   }
//   else if (!node1 && node2 || node1 && !node2) {
//     return false;
//   }
//   else if (node1.val === node2.val) {
//     return sameTree(node1.left, node2.left) && sameTree(node1.right, node2.right);
//   }
//   else {
//     return false;
//   }
// }
