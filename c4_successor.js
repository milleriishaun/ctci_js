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
var BSTp = function(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
};

var findSuccessor = function(node) {
  var successor = null;
  if (node.right !== null) {
    successor = node.right;
    while (successor.left !== null) {
      successor = successor.left;
    }
  } else if (node.parent !== null) {
    var currNode = node;
    while (currNode.parent !== null && successor === null) {
      if (currNode.parent.left === currNode) {
        successor = currNode.parent;
      }
      currNode = currNode.parent;
    }
  }
  return successor;
};

/* TEST */
var a = new BSTp(10);
var b = new BSTp(2);
var c = new BSTp(3);
var d = new BSTp(4);
var e = new BSTp(6);
var f = new BSTp(5);
var g = new BSTp(7);

a.left = b;
b.parent = a;
b.right = c;
c.parent = b;
c.right = d;
d.parent = c;
d.right = e;
e.parent = d;
e.left = f;
f.parent = e;
e.right = g;
g.parent = e;

console.log(findSuccessor(f).value, 6);
console.log(findSuccessor(g).value, 10);

/*
// CTCI JS Sol... I think they fumbled with this one since they couldn't spell.
function findSuccessor(node) {
  if (!node) throw Error('node cannot be null');

  if (node.right) {
    node = node.right;
    while (node.left) node = node.left;
    return node.value;
  } else if (node.parent) {
    if (node.parent.value > node.value) return node.parent.value;
    else {
      let parent = node.parent;
      while (parent) {
        if (parent.value > node.value) return parent.value;
        parent = parent.parent;
      }
    }
  }
}
*/

// ctci ... none(q2 was the last of the solutions for this)

/*
// algo sol
//The way of logic about Inorder Successor : https://www.youtube.com/watch?v=5cPbNCrdotA&t=7s
// Recommended: https://www.youtube.com/watch?v=JdmAYw5h3G8
function inOrderSuccessor(node) {
  if (n === null) return null;
  if (n.right != null) {
      return leftMostChild(n.right)
  } else {
      let q = n;
      x = q.parent;
      while(x !== null && x.left !== q) {
          q = x
          x = x.parent
      }
      return x
  }
}

function leftMostChild(n) {
  if (n === null) {
      return null;
  }
  while(n.left !== null) {
      n = n.left;
  }
  return n;
}
*/

// // CTCI ES5
// /**
//  * Finding the successor as a few different scenarios:
//  *   1. Where a right child exists:
//  *     a. If it has no left child then it is the successor.
//  *     b. If it has a left child then keep following left child pointers until
//  *     you've got the left most child, this is the successor.
//  *   2. Where no right child exists:
//  *     a. If this node is a left child then the successor is its parent.
//  *     b. Otherwise follow parent pointers until we find a node that is a left
//  *     child of its parent, then the parent is the successor.
//  *
//  * N = |tree|
//  * Time: O(lg N) - assumes balanced tree, worst cast O(N)
//  * Additional space: O(1)
//  */
// function findSuccessor(node) {
//   if (!node) {
//     throw new Error('node cannot be null');
//   }

//   let snode;
//   if (node.right) {
//     snode = node.right;
//     while (snode.left) {
//       snode = snode.left;
//     }
//     return snode.val;
//   }
//   else {
//     // go up until we find left path
//     snode = node;
//     while (snode.parent && snode !== snode.parent.left) {
//       snode = snode.parent;
//     }
//     return snode.parent ? snode.parent.val : undefined;
//   }
// }
