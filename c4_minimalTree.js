var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
// CTCI JS Sol
var TreeNode = require('./c4_basic.js');
// import { TreeNode } from './c4_basic.js';
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
// Approach: divide and conquer, array and insert into tree
var Queue = require('./util/Queue');
var BST = require('./util/BST');

var insertBalanced = function(array) {
  var bst = new BST();
  var q = new Queue();
  var currArr;
  var floor = Math.floor;
  q.add(array);
  while (!q.isEmpty()) {
    currArr = q.remove();
    bst.insert(currArr[floor(currArr.length / 2)]);
    if (currArr.slice(0, floor(currArr.length / 2)).length > 0) {
      q.add(currArr.slice(0, floor(currArr.length / 2)));
    }
    if (currArr.slice(floor(currArr.length / 2) + 1).length > 0) {
      q.add(currArr.slice(floor(currArr.length / 2) + 1));
    }
  }
  return bst;
};

/* TEST */
var arr1 = [1, 2, 3, 4, 5, 6];
var tree1 = insertBalanced(arr1);
tree1.printLevelOrder();

var arr2 = [1, 2, 3, 4, 5, 6, 7];
var tree2 = insertBalanced(arr2);
tree2.printLevelOrder();

// CTCI JS Sol ... this is not working because idk how to test it. But I need
// to move on for now. One solution works and that is good enough for me(for now).

// O(N) TIME AND SPACE

function minimalHeightBST(arr) {
  if (!arr || !arr.length) return null;
  return createMinimalHeightBST(arr, 0, arr.length - 1);
}

function createMinimalHeightBST(arr, start, end) {
  if (start > end) return null;

  const middleIndex = Math.ceil((start + end) / 2),
    rootNode = new TreeNode(arr[middleIndex]);

  // console.log('rootNode', rootNode);

  rootNode.left = createMinimalHeightBST(arr, start, middleIndex - 1);
  rootNode.right = createMinimalHeightBST(arr, middleIndex + 1, end);
  // console.log(rootNode);
  return rootNode;
}

var arr3 = [1, 2, 3, 4, 5, 6, 7];
var tree3 = minimalHeightBST(arr3);
// console.log('treeeeeee3', tree3);
// tree3.printLevelOrder();

/*
// ctci
class treeNode {
  constructor (v) {
    this.value = v;
    this.left = null;
    this.right = null;
  }

  dft () {
    if (this.left) this.left.dft();
    console.log(this.value);
    if (this.right) this.right.dft();
  }
}

function minimalTree(arr) {
  function recurse(a, start, end) {
    if (end < start) return null;

    const mid = Math.floor((start + end) / 2);
    let n = new treeNode(a[mid]);

    n.left = recurse(a, start, mid - 1);
    n.right = recurse(a, mid + 1, end);
    return n;
  }

  return recurse(arr, 0, arr.length - 1);
}

let t = minimalTree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
t.dft();
*/

/*
// algo sol
function minimal_tree(array) {
  return createMinimalBST(array, 0, array.length - 1);
}

function Node(val) {
  this.value = val;
  this.right = null;
  this.left = null;
}

function createMinimalBST(arr, start, end) {
  if (end < start) {
    return null;
  }

  let mid = Math.floor((start + end) / 2);
  let n = new Node(arr[mid]);
  n.left = createMinimalBST(arr, start, mid - 1);
  n.right = createMinimalBST(arr, mid + 1, end);
  return n; // do not forget to return n
}
// given a sorted array
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let ans = minimal_tree(array);
console.log(ans); // where is 9 in this solution!
*/

// // CTCI ES5
// import { Tree } from './helpers';

// /**
//  * As the list is already sorted the best way to create a balanced tree is by
//  * adding the middle node (parent) then the children. The algorithm is basically
//  * involves adding the middle element of which split of the array so that the
//  * parent is added before the left and right children of each subtree.
//  *
//  * N = |values|
//  * Time: O(N lg N)
//  * Additional space: O(N)
//  */
// export function makeBalancedTree(values) {
//   let tree = new Tree();
//   if (values && values.length) {
//     add(tree, values, 0, values.length - 1);
//   }
//   return tree;
// }

// function add(tree, values, start, end) {
//   if (start === end) {
//     tree.add(values[start]);
//   }
//   else if (start < end) {
//     let mid = start + Math.floor((end - start) / 2);
//     tree.add(values[mid]);
//     add(tree, values, start, mid - 1);
//     add(tree, values, mid + 1, end);
//   }
// }
