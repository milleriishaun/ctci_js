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

var bstSequences = function(bst) {
  var sequences = [];
  var recurse = function(nodes, travelled) {
    var noChild = true;
    nodes.forEach(node => {
      if (node.left !== null && travelled[node.left.value] === undefined) {
        noChild = false;
        travelled[node.left.value] = true;
        recurse(nodes.concat([node.left]), travelled);
        delete travelled[node.left.value];
      }
      if (node.right !== null && travelled[node.right.value] === undefined) {
        noChild = false;
        travelled[node.right.value] = true;
        recurse(nodes.concat([node.right]), travelled);
        delete travelled[node.right.value];
      }
    });
    if (noChild) {
      sequences.push(nodes.map(node => node.value));
    }
  };
  var startTravelled = {};
  startTravelled[bst.value] = true;
  recurse([bst], startTravelled);
  return sequences;
};

/* TEST */

/* 1, 2, 3, 4, 5, 6, 7 */

var b = new BST(4);
b.insert(2);
b.insert(6);
b.insert(1);
b.insert(3);
b.insert(5);
b.insert(7);

console.log(bstSequences(b));

/*
// CTCI JS Sol
function BSTsequences(tree) {
  if (!tree) return [];
  if (!tree.left && !tree.right) return [[tree.value]];

  // In-Order Traversal to create sequence lists
  const leftSequence = BSTsequences(tree.left),
        rightSequence = BSTsequences(tree.right);

  return weaveArrayPerms(tree.value, leftSequence, rightSequence);
}

function weaveArrayPerms(nodeValue, leftSequence, rightSequence) {
  const permsResult = [];

  if (leftSequence[0] && rightSequence[0]) {
    for (const leftSeq of leftSequence) {
      for (const rightSeq of rightSequence) {
        const weaved = weave(leftSeq, rightSeq);
        for (const perm of weaved) {
          permsResult.push([nodeValue, ...perm]);
        }
      }
    }
  }
  else { // Any remaining sequence
    for (const perm of [...leftSequence, ...rightSequence]) {
      permsResult.push([nodeValue, ...perm]);
    }
  }

  return permsResult;
}

function weave(leftSeq, rightSeq, prefix = [], sequences = []) {
  if (leftSeq.length && rightSeq.length) {
    // Shift leftSeq head to prefix. Weave, and put back to leftSeq.
    prefix.push(leftSeq.shift());
    weave(leftSeq, rightSeq, prefix, sequences);
    leftSeq.unshift(prefix.pop());

    // Shift rightSeq head to prefix. Weave, and put back to rightSeq.
    prefix.push(rightSeq.shift());
    weave(leftSeq, rightSeq, prefix, sequences);
    rightSeq.unshift(prefix.pop());
  }
  else {
    sequences.push([...prefix, ...leftSeq, ...rightSeq]);
  }

  return sequences;
}
*/

// ctci ... none(q2 was the last of the solutions for this)

// algo sol ... none

// // CTCI ES5
// /**
//  * The basic premise here is to get all permutations of each subtree's left and
//  * right children. Then create a new list of all the permutations from combining
//  * each permutation from the left subtree with each in the right subtree. The
//  * new set of permutations all need to be prefixed with the current nodes value
//  * as it must be added before its left or right children.
//  *
//  * The process of creating permutations requires combinging a list from the set
//  * of left child permutations and those of the right child. Each permutation
//  * needs to keep the items in their relative lists from their source lists.
//  *
//  * N = |tree|
//  * Time: O(N!) - this isn't really accurate and is definitely a high upper bound.
//  * Due to the fact that the permutations have some ordering required the true
//  * number isn't just the normal way to count permutations.
//  * Additional space: O(N!) - again like the time complexity this is a high upper
//  * bound
//  */
// function sequencesToCreateBST(tree) {
//   if (!tree || !tree.root) {
//     return null;
//   }
//   return sequencesRecursive(tree.root);
// }

// function sequencesRecursive(node) {
//   if (!node) {
//     return null;
//   }
//   else {
//     let perms = permutations(sequencesRecursive(node.left), sequencesRecursive(node.right));
//     if (!perms) {
//       perms = [[node.val]];
//     }
//     else {
//       perms.forEach(p => p.unshift(node.val));
//     }
//     return perms;
//   }
// }

// function permutations(left, right) {
//   if (!left || !right) {
//     return left || right;
//   }
//   else {
//     let perms = [];
//     for (let i = 0; i < left.length; ++i) {
//       for (let j = 0; j < right.length; ++j) {
//         perms.push.apply(perms, permutationsRecursive([], left[i], right[j], [], 0, 0));
//       }
//     }
//     return perms;
//   }
// }

// function permutationsRecursive(perms, list1, list2, prefix, i, j) {
//   if (i === list1.length && j === list2.length) {
//     perms.push(prefix.slice(0));
//   }
//   else {
//     if (i < list1.length) {
//       prefix.push(list1[i]);
//       permutationsRecursive(perms, list1, list2, prefix, i + 1, j);
//       prefix.pop();
//     }

//     if (j < list2.length) {
//       prefix.push(list2[j]);
//       permutationsRecursive(perms, list1, list2, prefix, i, j + 1);
//       prefix.pop();
//     }
//   }
//   return perms;
// }
