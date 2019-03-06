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
var Queue = require('./util/Queue');

var BinaryTree = function(value) {
  this.value = value;
  this.left = null;
  this.right = null;
};

BinaryTree.prototype.insert = function(value) {
  if (this.value === undefined) {
    this.value = value;
  } else if (value < this.value) {
    if (this.left === null) {
      this.left = new BinaryTree(value);
    } else {
      this.left.insert(value);
    }
  } else {
    if (this.right === null) {
      this.right = new BinaryTree(value);
    } else {
      this.right.insert(value);
    }
  }
};

BinaryTree.prototype.find = function(value) {
  if (value === this.value) {
    return this;
  } else {
    if (value < this.value) {
      if (this.left === null) {
        return null;
      } else {
        this.left.find(value);
      }
    } else {
      if (this.right === null) {
        return null;
      } else {
        this.right.find(value);
      }
    }
  }
};

BinaryTree.prototype.rebuild = function() {
  if (this.left === null && this.right === null) {
    return null;
  }
  var newBt = new BinaryTree();
  var q = new Queue();
  if (this.left !== null) {
    q.add(this.left);
  }
  if (this.right !== null) {
    q.add(this.right);
  }
  var node;
  while (!q.isEmpty) {
    node = q.remove();
    newBt.insert(node.value);
    if (node.left !== null) {
      q.add(node.left);
    }
    if (this.right !== null) {
      q.add(node.right);
    }
  }
  return newBt;
};

BinaryTree.prototype.delete = function(value) {
  if (value === this.value) {
    var reb = this.rebuild();
    this.value = reb.value;
    this.left = reb.left;
    this.right = reb.right;
  } else {
    var q = new Queue();
    var built = false;
    var node;
    q.add(this);
    while (!q.isEmpty() && !built) {
      node = q.remove();
      if (node.left !== null) {
        if (node.left.value === value) {
          node.left = node.left.rebuild();
          built = true;
        } else {
          q.add(node.left);
        }
      }
      if (node.right !== null) {
        if (node.right.value === value) {
          node.right = node.right.rebuild();
          built = true;
        } else {
          q.add(node.right);
        }
      }
    }
    if (!built) {
      return null;
    }
  }
};

BinaryTree.prototype.count = function() {
  var q = new Queue();
  q.add(this);
  var node;
  var count = 0;
  while (!q.isEmpty()) {
    node = q.remove();
    count++;
    if (node.left !== null) {
      q.add(node.left);
    }
    if (node.right !== null) {
      q.add(node.right);
    }
  }
  return count;
};

BinaryTree.prototype.iterateToN = function(n) {
  var q = new Queue();
  q.add(this);
  var node;
  var count = 0;
  while (!q.isEmpty()) {
    node = q.remove();
    count++;
    if (count === n) {
      return node;
    }
    if (node.left !== null) {
      q.add(node.left);
    }
    if (node.right !== null) {
      q.add(node.right);
    }
  }
  return undefined;
};

BinaryTree.prototype.getRandomNode = function() {
  // do a BFS count
  var count = this.count();
  // use BFS to iterate random node
  var random = Math.floor(Math.random() * count) + 1;
  return this.iterateToN(random);
};

/* TEST */
var bt = new BinaryTree();
bt.insert(4);
bt.insert(2);
bt.insert(6);
bt.insert(1);
bt.insert(3);
bt.insert(5);
bt.insert(7);
console.log(bt);
bt.delete(5);
console.log(bt);
var counts = {};
var randomnum;
for (var i = 0; i < 100000; i++) {
  randomnum = bt.getRandomNode().value;
  if (counts[randomnum] === undefined) {
    counts[randomnum] = 1;
  } else {
    counts[randomnum]++;
  }
}
for (var num in counts) {
  console.log(`${num}: ${counts[num] / 100000}%`); // random enough
}

/*
// CTCI JS Sol1
// import { TreeNode } from './helpers';
var TreeNode = require('./c4_basic.js');


  // BALANCED TREE: TIME - O(log N) for insert, delete, find, and randomNode
  // WORST CASE: O(N) TIME

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

class RandomTreeNode1 {
  constructor() {
    this.root = null;
    this.values = new Set();
  }

  insert(value) {
    this.values.add(value);

    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
    } else {
      let node = this.root,
        branch;

      while (node) {
        branch = this._branch(node.value, value);
        if (!node[branch]) break;
        node = node[branch];
      }
      newNode.parent = node;
      node[branch] = newNode;
    }
  }

  randomNode() {
    const values = [...this.values],
      randomIndex = Math.floor(Math.random() * values.length);

    return this.findNode(values[randomIndex]);
  }

  findNode(value) {
    let node = this.root;

    while (node) {
      if (node.value === value) return node;
      node = node[this._branch(node.value, value)];
    }

    return node;
  }

  delete(value) {
    this.values.delete(value);
    this._deleteNode(this.root, value);
  }

  _deleteNode(node, value, parentBranch = '') {
    if (node) {
      if (node.value === value) {
        if (!node.left && !node.right) {
          if (node.parent) node.parent[parentBranch] = null;
          else this.root = null;
        } else if ((node.left && !node.right) || (!node.left && node.right)) {
          const branch = node.left ? 'left' : 'right';
          if (node.parent) node.parent[parentBranch] = node[branch];
          else this.root = this.root[branch];
          this.root.parent = null;
        } else {
          let minNode = node.right;
          while (minNode.left) minNode = minNode.left;
          node.value = minNode.value;
          node.size--;

          this._deleteNode(node.right, minNode.value, 'right');
        }
      } else {
        const branch = this._branch(node.value, value);
        node.size--;
        this._deleteNode(node[branch], value, branch);
      }
    }
  }

  _branch(nodeValue, value) {
    return value <= nodeValue ? 'left' : 'right';
  }
}

// CTCI JS Sol2
class TreeNodeSize extends TreeNode {
  constructor(value) {
    super(value);
    this.size = 1;
  }
}

class RandomTreeNode2 {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNodeSize(value);

    if (!this.root) {
      this.root = newNode;
    } else {
      let node = this.root,
        branch;

      while (node) {
        branch = this._branch(node.value, value);
        node.size++;
        if (!node[branch]) break;
        node = node[branch];
      }
      newNode.parent = node;
      node[branch] = newNode;
    }
  }

  findNode(value) {
    let node = this.root;

    while (node) {
      if (node.value === value) return node;
      node = node[this._branch(node.value, value)];
    }

    return node;
  }

  randomNode(node = this.root) {
    const leftSize = node.left ? node.left.size : 0,
      randomIndex = Math.floor(Math.random() * node.size);

    if (randomIndex < leftSize) return this.randomNode(node.left);
    else if (randomIndex === leftSize) return node;
    else return this.randomNode(node.right);
  }

  delete(value) {
    this._deleteNode(this.root, value);
  }

  _deleteNode(node, value, parentBranch = '') {
    if (node) {
      if (node.value === value) {
        if (!node.left && !node.right) {
          if (node.parent) node.parent[parentBranch] = null;
          else this.root = null;
        } else if ((node.left && !node.right) || (!node.left && node.right)) {
          const branch = node.left ? 'left' : 'right';
          if (node.parent) node.parent[parentBranch] = node[branch];
          else this.root = this.root[branch];
          this.root.parent = null;
        } else {
          let minNode = node.right;
          while (minNode.left) minNode = minNode.left;
          node.value = minNode.value;
          node.size--;

          this._deleteNode(node.right, minNode.value, 'right');
        }
      } else {
        const branch = this._branch(node.value, value);
        node.size--;
        this._deleteNode(node[branch], value, branch);
      }
    }
  }

  _branch(nodeValue, value) {
    return value <= nodeValue ? 'left' : 'right';
  }
}

// CTCI JS Sol3
class RandomTreeNode3 {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNodeSize(value);

    if (!this.root) {
      this.root = newNode;
    } else {
      let node = this.root,
        branch;

      while (node) {
        branch = this._branch(node.value, value);
        node.size++;
        if (!node[branch]) break;
        node = node[branch];
      }
      newNode.parent = node;
      node[branch] = newNode;
    }
  }

  findNode(value) {
    let node = this.root;

    while (node) {
      if (node.value === value) return node;
      node = node[this._branch(node.value, value)];
    }

    return node;
  }

  randomNode() {
    const randomIndex = Math.floor(Math.random() * this.root.size);
    return this.getKthNode(randomIndex);
  }

  getKthNode(index, node = this.root) {
    const leftSize = node.left ? node.left.size : 0;

    if (index < leftSize) return this.getKthNode(index, node.left);
    else if (index === leftSize) return node;
    else return this.getKthNode(index - (leftSize + 1), node.right);
  }

  delete(value) {
    this._deleteNode(this.root, value);
  }

  _deleteNode(node, value, parentBranch = '') {
    if (node) {
      if (node.value === value) {
        if (!node.left && !node.right) {
          if (node.parent) node.parent[parentBranch] = null;
          else this.root = null;
        } else if ((node.left && !node.right) || (!node.left && node.right)) {
          const branch = node.left ? 'left' : 'right';
          if (node.parent) node.parent[parentBranch] = node[branch];
          else this.root = this.root[branch];
          this.root.parent = null;
        } else {
          let minNode = node.right;
          while (minNode.left) minNode = minNode.left;
          node.value = minNode.value;
          node.size--;

          this._deleteNode(node.right, minNode.value, 'right');
        }
      } else {
        const branch = this._branch(node.value, value);
        node.size--;
        this._deleteNode(node[branch], value, branch);
      }
    }
  }

  _branch(nodeValue, value) {
    return value <= nodeValue ? 'left' : 'right';
  }
}
*/

// ctci ... none(q2 was the last of the solutions for this)

// algo sol ... no real sol since unclear
// clarify the questions with interviewer
// whether or not we are implementing the tree by ourselves
// or writing a method that uses some existing tree data structure

// if we care implementing ourselves, there are more flexibility <- THIS CASE
// What kind of values in that tree ?

// // CTCI ES5
// class Node {
//   constructor(value, parent) {
//     this.left = this.right = null;
//     this.parent = parent || null;
//     this.val = value;
//     this.size = 1; // including itself
//   }
// }

// /**
//  * RandomNode routine first gets a random number between 1 and the number of
//  * elements in the tree. Every node in the tree keeps track of the size of the
//  * subtree that is it a part of (number of nodes in left and right subtrees
//  * as well as itself). Using these counts we can go through the tree and find
//  * the node whose index would match that random number if the trees values
//  * where considered in order.
//  *
//  * If the random number is:
//  *   1. smaller than the nodes left subtree size then go left.
//  *   2. equal to the left subtree size + 1 then return current node.
//  *   3. otherwise go right and subtract the left subtree size from the random
//  *   	number as we have already skipped over that many values.
//  *
//  * N = |tree|
//  * Time: insert O(lg N), delete O(lg N), find O(lg N), randomNode O(lg N) - this
//  * assumes a balanced tree, otherwise all of these would be O(N) in the worst case
//  * Additional space: insert O(N) - to hold values and keep track of subtree sizes
//  * delete O(lg N), find O(1), randomNode O(1)
//  */
// class RandomBinarySearchTree {
//   constructor() {
//     this.root = null;
//   }

//   insert(value) {
//     let node = this,
//       branch = 'root';
//     while (node[branch]) {
//       node = node[branch];
//       ++node.size;
//       branch = value < node.val ? 'left' : 'right';
//     }
//     node[branch] = new Node(value, node);
//   }

//   delete(value) {
//     return this._deleteRecursive(this.root, 'root', value);
//   }

//   _deleteRecursive(node, parentBranch, value) {
//     if (node) {
//       if (node.val === value) {
//         if (!node.left && !node.right) {
//           node.parent[parentBranch] = null;
//           return true;
//         }
//         else if (node.left && !node.right) {
//           node.parent[parentBranch] = node.left;
//           return true;
//         }
//         else if (!node.left && node.right) {
//           node.parent[parentBranch] = node.right;
//           return true;
//         }
//         else {
//           let minNode = node.right;
//           while (minNode.left) {
//             minNode = minNode.left;
//           }
//           node.val = minNode.val;
//           --node.size;
//           return this._deleteRecursive(node.right, 'right', minNode.val);
//         }
//       }
//       else {
//         let branch = value < node.val ? 'left' : 'right';
//         if (this._deleteRecursive(node[branch], branch, value)) {
//           --node.size;
//           return true;
//         }
//       }
//     }

//     return false;
//   }

//   find(value) {
//     let node = this.root,
//       branch;
//     while (node) {
//       if (node.val === value) {
//         return node;
//       }
//       branch = value < node.val ? 'left' : 'right';
//       node = node[branch];
//     }
//     return undefined;
//   }

//   randomNode() {
//     if (!this.root) {
//       return undefined;
//     }

//     let idx = Math.ceil(Math.random() * this.root.size),
//       node = this.root;
//     while (idx > 0) {
//       if (node.left) {
//         if (idx === node.left.size + 1) {
//           return node;
//         }
//         else if (idx <= node.left.size) {
//           node = node.left;
//         }
//         else if (node.right) {
//           idx -= node.left.size + 1;
//           node = node.right;
//         }
//       }
//       else {
//         if (idx <= 1) {
//           return node;
//         }
//         else if (node.right) {
//           --idx;
//           node = node.right;
//         }
//       }
//     }

//     throw new Error('Should never reach this code, this is just an assertion that we dont');
//   }
// }
