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
var BinaryTree = function(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
};

BinaryTree.prototype.isAncestor = function(node2) {
  if (this === node2) {
    return true;
  } else {
    var answer1 = false;
    var answer2 = false;
    if (this.left !== null) {
      answer1 = this.left.isAncestor(node2);
    }
    if (this.right !== null) {
      answer2 = this.right.isAncestor(node2);
    }
    return false || answer1 || answer2;
  }
};

var firstCommonAncestor = function(node1, node2) {
  var currNode = node1;
  while (!currNode.isAncestor(node2)) {
    if (currNode === null) {
      throw Error;
    } else {
      currNode = currNode.parent;
    }
  }
  return currNode.value;
};

/* TEST */
var a = new BinaryTree('a');
var b = new BinaryTree('b');
var c = new BinaryTree('c');
var d = new BinaryTree('d');
var e = new BinaryTree('e');
var f = new BinaryTree('f');
var g = new BinaryTree('g');
var h = new BinaryTree('h');
var i = new BinaryTree('i');
var j = new BinaryTree('j');
var k = new BinaryTree('k');
var l = new BinaryTree('l');

a.left = b;
b.parent = a;
a.right = c;
c.parent = a;
b.left = d;
d.parent = b;
d.left = g;
g.parent = d;
d.right = h;
h.parent = d;
h.right = k;
k.parent = h;
k.left = l;
l.parent = k;
c.left = e;
e.parent = c;
c.right = f;
f.parent = c;
f.left = i;
i.parent = f;
f.right = j;
j.parent = f;
//
console.log(firstCommonAncestor(g, k), 'd');
console.log(firstCommonAncestor(b, i), 'a');

/* // Again, hard to dicipher.
// CTCI JS Sol1
// USING PARENT REFERENCE
// O(DEPTH OF DEEPER NODE) TIME --- O(1) SPACE

const getDepth = (node, depth = 0) => node.parent ? getDepth(node.parent, depth + 1) : depth;

function firstCommonAncestor1(node1, node2) {
  if (!node1 || !node2) throw Error('invalid node(s)');

  const depth1 = getDepth(node1), depth2 = getDepth(node2);

  let depthDiff = Math.abs(depth1 - depth2),
      deeper = depth1 > depth2 ? node1 : node2,
      shallower = deeper === node1 ? node2 : node1;

  while (depthDiff--) deeper = deeper.parent;

  while (deeper) {
    if (deeper === shallower) return deeper.value;
    shallower = shallower.parent;
    deeper = deeper.parent;
  }

  return null;
}

// CTCI JS Sol2
// USING PARENT REFERENCE
// O(SUBTREE SIZE OF FIRST COMMON ANCESTOR) TIME --- O(1) SPACE
// WORST CASE O(N) TIME

function firstCommonAncestor2(node1, node2, tree) {
  if (!node1 || !node2) throw Error('invalid node(s)');
  else if (!covers(tree, node1) || !covers(tree, node2)) return null;
  else if (covers(node1, node2)) return node1.value;
  else if (covers(node2, node1)) return node2.value;

  let sibling = getSibling(node1), parent = node1.parent;

  while (!covers(sibling, node2)) {
    sibling = getSibling(parent);
    parent = parent.parent;
  }

  return parent.value;
}

function getSibling(node) {
  if (!node || !node.parent) return null;
  const parent = node.parent;
  return parent.left === node ? parent.right : parent.left;
}

function covers(tree, node) {
  if (!tree) return false;
  if (tree === node) return true;
  return covers(tree.left, node) || covers(tree.right, node);
}

// CTCI JS Sol3
// NOT OPTIMIZED --- NOT USING PARENT REFERENCE
// O(N) TIME (covers() function is called first on 2n nodes, then 2n/2, 2n/4, ...)

function firstCommonAncestor3(node1, node2, tree) {
  if (!node1 || !node2) throw Error('invalid node(s)');
  else if (!covers(tree, node1) || !covers(tree, node2)) return null;

  return findAncestor(node1, node2, tree).value;
}

function findAncestor(node1, node2, tree) {
  if (tree === node1 || tree === node2) return tree;

  const node1onLeft = covers(tree.left, node1), node2onLeft = covers(tree.left, node2);

  if (node1onLeft !== node2onLeft) return tree;

  const childSide = node1onLeft ? tree.left : tree.right;
  return findAncestor(node1, node2, childSide);
}

// CTCI JS Sol4
// OPTIMIZED --- NOT USING PARENT REFERENCE

  // Wraps node in 'AncestorWrapper' class with a 'isAncestor' property to
  // indicate if the returned node is actually the ancestor.
  // Inputting a node that isn't in the tree without the wrapper class or without
  // checking first if the nodes
  // actually exist in the tree, the function would return a false value.
  // (See also solution after this one)


class AncestorWrapper {
  constructor(node, isAncestor) {
    this.node = node;
    this.isAncestor = isAncestor;
  }
}

function firstCommonAncestor4(node1, node2, tree) {
  if (!node1 || !node2) throw Error('invalid node(s)');
  const result = findCommonAncestor(node1, node2, tree);
  return result.isAncestor ? result.node.value : null;
}

function findCommonAncestor(node1, node2, tree) {
  if (!tree) return new AncestorWrapper(null, false);
  if (tree === node1 && tree === node2) return new AncestorWrapper(tree, true);

  const checkLeft = findCommonAncestor(node1, node2, tree.left);
  if (checkLeft.isAncestor) return checkLeft; // Already found ancestor. Don't check anymore.

  const checkRight = findCommonAncestor(node1, node2, tree.right);
  if (checkRight.isAncestor) return checkRight; // Already found ancestor. Don't check anymore.

  if (checkLeft.node && checkRight.node) { // node1 and node2 found in different subtrees
    return new AncestorWrapper(tree, true); // 'tree' we are at is the common ancestor
  }
  else if (tree === node1 || tree === node2) { // We are at node1 or node2
    const isAncestor = checkLeft.node || checkRight.node; // We found node1 or node2 in a subtree
    return new AncestorWrapper(tree, isAncestor); // 'tree' is ancestor if 'isAncestor' is true
  }
  else { // Return non-null node
    return new AncestorWrapper(checkLeft.node ? checkLeft.node : checkRight.node, false);
  }

}

// CTCI JS Sol5
// NOT USING PARENT REFERENCE
// OPTIMIZED BUT STILL CHECKS FIRST THAT NODES EXIST IN THE TREE

function firstCommonAncestor5(node1, node2, tree) {
  if (!node1 || !node2) throw Error('invalid node(s)');
  if (!covers(tree, node1) || !covers(tree, node2)) return null;
  return fca(node1, node2, tree).value;
}

function fca(node1, node2, tree) {
  if (!tree) return null;
  if (tree === node1 && tree === node2) return tree;

  const checkLeft = fca(node1, node2, tree.left);
  if (checkLeft && checkLeft !== node1 && checkLeft !== node2) return checkLeft; // Already found ancestor. Don't check anymore.

  const checkRight = fca(node1, node2, tree.right);
  if (checkRight && checkRight !== node1 && checkRight !== node2) return checkRight; // Already found ancestor. Don't check anymore.

  if (checkLeft && checkRight) return tree; // node1 and node2 found in diff. subtrees, return common ancestor
  else if (tree === node1 || tree === node2) return tree;
  else return checkLeft ? checkLeft : checkRight; // Return non-null node
}
*/

// ctci ... none(q2 was the last of the solutions for this)

/*
// algo sol
// https://www.youtube.com/watch?v=13m9ZCB8gjw&t=577


function Tree() {
  this.root = null
}

function Node(value) {
  this.value = value
  this.right = null
  this.left = null
}

Tree.prototype.addValue = function(val) {
  let n = new Node(val)
  if (this.root === null) {
      this.root = n
  } else {
      this.root.addNode(n)
  }
}
let n;
Node.prototype.addNode = function(node) {
  if (node.value < this.value) {
      if (this.left === null) {
          this.left = node
      } else {
          this.left.addNode(node)
      }
  } else if (node.value > this.value) {
      if (this.right === null) {
          this.right = node
      } else {
          this.right.addNode(node)
      }
  }
}

let tree = new Tree()
tree.addValue(20)
tree.addValue(10)
tree.addValue(5)
tree.addValue(3)
tree.addValue(7)
tree.addValue(30)
tree.addValue(15)
tree.addValue(17)


function first_common_ancestor(node, n1, n2) {
  // (1) leaf case
  if (node === null) {return null}
  if (n1 === node.value || n2 === node.value) {
      return node
  }

  // (2) NOT leaf case
  let left = first_common_ancestor(node.left, n1, n2)
  let right = first_common_ancestor(node.right, n1, n2)

  // (3) To return the item
  // 1:common ancestor
  if (left !== null && right !== null) return node;
  // 2:null
  if (left === null && right === null) return null;
  // 3:
  return left !== null ? left : right
}
console.log(first_common_ancestor(tree.root, 3, 17))
console.log(tree)
/*

// // CTCI ES5
// /**
//  * The two given nodes could be anywhere within the tree and travelling upwards
//  * we will eventually find the point at which the paths to the nodes diverge. As
//  * we don't want to use extra space (so a map of nodes isn't an option) we first
//  * need to figure out the different in depth of the two nodes. We then travel up
//  * from the lower node, if there is one, so that we start at the same depth down
//  * the path of each node. After we're at equal depths we just follow parent
//  * pointers until we find a node that is common to both paths, that is the first
//  * common ancestor.
//  *
//  * N = |tree|
//  * Time: O(lg N) - assumes balanced tree, worst case O(N)
//  * Additional space: O(1)
//  */
// function findFirstCommonAnscestor(node1, node2) {
//   if (!node1 || !node2) {
//     throw new Error('node1 and node2 must both be valid nodes');
//   }

//   let h1 = height(node1),
//     h2 = height(node2);
//   node1 = moveUp(node1, h1 - h2);
//   node2 = moveUp(node2, h2 - h1);
//   while (node1 !== node2) {
//     node1 = node1.parent;
//     node2 = node2.parent;
//   }

//   return node1.val;
// }

// function height(node) {
//   let count = 0;
//   while (node) {
//     node = node.parent;
//     ++count;
//   }
//   return count;
// }

// function moveUp(node, count) {
//   for (let i = count; i > 0; --i) {
//     node = node.parent;
//   }
//   return node;
// }
