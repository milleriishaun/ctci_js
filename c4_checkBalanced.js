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
var BST = require('./util/BST');

var checkBalanced = function(bst) {
  // case where left is null and right is not null
  if (bst.left === null && bst.right !== null) {
    if (bst.right.left !== null || bst.right.right !== null) {
      return false;
    }
  }
  // case where left is not null and right is null
  if (bst.left !== null && bst.right === null) {
    if (bst.left.left !== null || bst.left.right !== null) {
      return false;
    }
  }
  // initialize answer variable as true
  var answer = true;
  //  if bst.left is not null, recursively call checkBalanced on bst.left
  if (bst.left !== null) {
    answer = answer && checkBalanced(bst.left);
  }
  //  if bst.left is not null, recursively call checkBalanced on bst.left
  if (bst.right !== null) {
    answer = answer && checkBalanced(bst.right);
  }
  // return answer
  return answer;
};

/* TEST */

var b1 = new BST(1);
b1.insert(2);
b1.insert(3);
b1.insert(4);
console.log(checkBalanced(b1), false);

var b2 = new BST(4);
b2.insert(2);
b2.insert(6);
b2.insert(1);
b2.insert(3);
b2.insert(5);
b2.insert(7);
console.log(checkBalanced(b2), true);

/* // again, these 3 solutions cannot be operated on just yet. Need more info.
// CTCI JS Sol1
// O(N) TIME --- O(log N) SPACE - WORST CASE O(N)
function validateBalancedBT_1(tree) {
  if (!tree || !tree.root) return true;

  const depthCache = {
    minLevel: Number.MAX_SAFE_INTEGER,
    maxLevel: Number.MIN_SAFE_INTEGER
  };

  findTreeDepth(depthCache, tree.root);
  return depthCache.maxLevel - depthCache.minLevel <= 1;
}

function findTreeDepth(depthCache, node, depthLevel = 0) {
  if (!node) {
    if (depthLevel < depthCache.minLevel) depthCache.minLevel = depthLevel;
    if (depthLevel > depthCache.maxLevel) depthCache.maxLevel = depthLevel;
  } else {
    findTreeDepth(depthCache, node.left, depthLevel + 1);
    findTreeDepth(depthCache, node.right, depthLevel + 1);
  }
}

// CTCI JS Sol2
// FIRST BOOK SOLUTION
// O(N log N) TIME

const getHeight = (tree) => tree ? Math.max(getHeight(tree.left), getHeight(tree.right)) + 1 : -1;

function validateBalancedBT_2(tree) {
  if (!tree || !tree.root) return true;
  return isBalanced(tree.root);
}

function isBalanced(tree) {
  if (!tree) return true;

  const heightDiff = Math.abs(getHeight(tree.left) - getHeight(tree.right));

  if (heightDiff > 1) return false;

  return isBalanced(tree.left) && isBalanced(tree.right);
}

// CTCI JS Sol3
// SECOND BOOK SOLUTION
// O(N) TIME AND SPACE

const checkHeightError = (height) => height === Number.MIN_SAFE_INTEGER;

function validateBalancedBT_3(tree) {
  if (!tree || !tree.root) return true;
  return checkHeight(tree.root) !== Number.MIN_SAFE_INTEGER;
}

function checkHeight(tree) {
  if (!tree) return -1;

  const leftHeight = checkHeight(tree.left);
  if (checkHeightError(leftHeight)) return Number.MIN_SAFE_INTEGER;

  const rightHeight = checkHeight(tree.right);
  if (checkHeightError(rightHeight)) return Number.MIN_SAFE_INTEGER;

  const heightDiff = Math.abs(leftHeight - rightHeight);

  if (heightDiff > 1) return Number.MIN_SAFE_INTEGER;

  return Math.max(leftHeight, rightHeight) + 1;
}
*/

// ctci ... none(q2 was the last of the solutions for this)

/*
// algo sol ... untested
function Node(value) {
  this.value = value;
  this.right = right;
  this.left = left;
}

function isBalanced(n) {
  return balancedHeight(n) > -1;
}
function balancedHeight(n) {
  // base case
  if ((n = null)) return -1;

  // recursive case
  let h1 = balancedHeight(n.right);
  let h2 = balancedHeight(n.left);
  // These are the cases that that return -1
  // whether their child is -1 or not
  if (h1 === -1 || h1 === -1) {
    return -1;
  }
  if (Math.abs(h1 - h2) > 1) {
    return -1;
  }

  // return the final answer
  if (h1 > h2) return h1 + 1;
  if (h2 > h1) return h2 + 1;
}
*/

// // CTCI ES5

// /**
//  * This function attempts to check if the tree is completely balanced by finding
//  * the shortest and longest paths from root to leaf. If the difference between
//  * these two paths is greater than 1 then the tree is not balanced.
//  *
//  * N = |tree|
//  * Time: O(N)
//  * Additional space: O(lg N) - space cost is due to call stack size while using
//  * recursion, this may be O(N) in the worst case.
//  */
// function isBalanced(tree) {
//   if (!tree || !tree.root) {
//     return true;
//   }

//   let node = tree.root,
//     cache = {
//       min: Number.MAX_SAFE_INTEGER,
//       max: Number.MIN_SAFE_INTEGER
//     };

//   findDepth(cache, node, 0);
//   return cache.max - cache.min <= 1;
// }

// function findDepth(cache, node, depth) {
//   if (!node) {
//     if (depth < cache.min) {
//       cache.min = depth;
//     }
//     if (depth > cache.max) {
//       cache.max = depth;
//     }
//   } else {
//     findDepth(cache, node.left, depth + 1);
//     findDepth(cache, node.right, depth + 1);
//   }
// }
