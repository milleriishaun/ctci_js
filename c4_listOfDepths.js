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
var LinkedList = require('./util/LinkedList.1');
var Queue = require('./util/Queue');

var listOfDepths = function(bst) {
  var listOfLists = [];
  var list = null;
  var newNode;
  var q = new Queue();
  var nextq = new Queue();
  var currNode = bst;

  q.add(currNode);
  while (!q.isEmpty()) {
    currNode = q.remove();
    newNode = new LinkedList(currNode.value);
    newNode.next = list;
    list = newNode;
    if (currNode.left !== null) {
      nextq.add(currNode.left);
    }
    if (currNode.right !== null) {
      nextq.add(currNode.right);
    }
    if (q.isEmpty()) {
      listOfLists.push(list);
      list = null;
      q = nextq;
      nextq = new Queue();
    }
  }
  return listOfLists;
};

/* TEST */
// 1, 2, 3, 4, 5, 6, 7
var tree = new BST(4);
tree.insert(2);
tree.insert(6);
tree.insert(1);
tree.insert(3);
tree.insert(5);
tree.insert(7);

console.log(listOfDepths(tree));

/* // there is something wrong printing, and it has to do with console log in the
// c4_basic file. I only need one working solution though, and it is clear above.
// CTCI JS Sol1
// import { LinkedList } from './helpers';
LinkedList = require('./c4_basic');

// RECURSIVE DEPTH-FIRST SEARCH SOLUTION
// O(N) TIME AND SPACE
function DFS_linkedListsOfBTDepth(tree) {
  return DFS_createListOfBTDepth(tree.root);
}

function DFS_createListOfBTDepth(tree, lists = [], depthLevel = 0) {
  if (tree) {
    if (!lists[depthLevel]) lists[depthLevel] = new LinkedList();

    lists[depthLevel].append(tree.value);

    DFS_createListOfBTDepth(tree.left, lists, depthLevel + 1);
    DFS_createListOfBTDepth(tree.right, lists, depthLevel + 1);
  }

  return lists;
}

// CTCI JS Sol2
// ITERATIVE BREADTH-FIRST SEARCH SOLUTION
// O(N) TIME AND SPACE
function BFS_createlinkedListsOfBTDepth(tree) {
  if (!tree.root) return [];

  const queue = [tree.root],
    lists = [];
  tree.root.level = 0;

  while (queue.length) {
    const parent = queue.shift();

    if (!lists[parent.level]) lists[parent.level] = new LinkedList();
    lists[parent.level].append(parent.value);

    if (parent.left) {
      parent.left.level = parent.level + 1;
      queue.push(parent.left);
    }

    if (parent.right) {
      parent.right.level = parent.level + 1;
      queue.push(parent.right);
    }
  }

  return lists;
}
*/

// ctci ... none(q2 was the last of the solutions for this)

// algo sol ... none(one of the missings)

// // CTCI ES5
// import { LinkedList } from './helpers';

// /**
//  * Travels through tree and adds values into a list of linked lists. Each level
//  * of tree is represented in a linked list.
//  *
//  * N = |tree|
//  * Time: O(N)
//  * Additional space: O(N)
//  */
// export function listTreeByDepthOrder(tree) {
//   let lists = [];
//   addToList(lists, tree.root, 0);
//   return lists;
// }

// function addToList(lists, node, depth) {
//   if (node) {
//     if (!lists[depth]) {
//       lists[depth] = new LinkedList();
//     }

//     lists[depth].append(node.val);

//     addToList(lists, node.left, depth + 1);
//     addToList(lists, node.right, depth + 1);
//   }
// }
