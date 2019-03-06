// for CTCI JS Sol ... with helpers
class TreeNode {
  constructor(value) {
    this.value = value;
    this.parent = this.left = this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  add(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      let node = this.root,
        branch;
      while (node) {
        branch = value <= node.value ? 'left' : 'right';
        if (!node[branch]) {
          break;
        }
        node = node[branch];
      }
      newNode.parent = node;
      node[branch] = newNode;
    }
  }
}

class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    // this.size = 0;
    this.head = this.tail = null;
  }

  prepend(value) {
    if (!this.head) {
      this.head = this.tail = new LinkedListNode(value);
    } else {
      this.head = new LinkedListNode(value, this.head);
    }
    // this.size++;
  }

  append(value) {
    if (!this.head) {
      this.head = this.tail = new LinkedListNode(value);
    } else {
      this.tail = this.tail.next = new LinkedListNode(value);
    }
    // this.size++;
  }

  toArray() {
    let arr = [],
      node = this.head;
    while (node) {
      arr.push(node.value);
      node = node.next;
    }
    return arr;
  }
}

function findDepth(cache, node, depth) {
  if (!node) {
    if (depth < cache.min) {
      cache.min = depth;
    }
    if (depth > cache.max) {
      cache.max = depth;
    }
  } else {
    findDepth(cache, node.left, depth + 1);
    findDepth(cache, node.right, depth + 1);
  }
}

function isBalanced(tree) {
  if (!tree) return true;

  const cache = {
    min: Number.MAX_SAFE_INTEGER,
    max: Number.MIN_SAFE_INTEGER
  };

  findDepth(cache, tree, 0);
  return cache.max - cache.min <= 1;
}

// for ctci
class BST {
  constructor() {
    this._root = null;
  }

  add(v) {
    if (!this._root) {
      this._root = new node(v);
      return;
    }

    let current = this._root;
    while (current) {
      // left path
      if (v < current.value) {
        if (!current.left) {
          current.left = new node(v);
          return;
        }

        current = current.left;
      }

      // right path
      if (v > current.value) {
        if (!current.right) {
          current.right = new node(v);
          return;
        }

        current = current.right;
      }
    }
  }

  contains(v) {}

  remove(v) {}

  dft(n = this._root) {
    if (!n) return;
    // in-order
    this.dft(n.left);
    console.log(n.value);
    this.dft(n.right);
  }
}

class node {
  constructor(v) {
    this.value = v;
    this.left = null;
    this.right = null;
  }
}

module.exports = BST;

// for algo sol
// https://www.youtube.com/watch?v=ZNH0MuQ51m4
// Delete a node from a binary tree

function Tree1() {
  this.root = null;
}

let n;
// add
Tree1.prototype.addValue = function(val) {
  n = new Node(val);
  if (this.root === null) {
    this.root = n;
  } else {
    this.root.addNode(n); // NG: this.root.addNode = n
  }
};

function Node(val) {
  this.value = val;
  this.right = null;
  this.left = null;
}

Node.prototype.addNode = function(n) {
  if (n.value < this.value) {
    if (this.left === null) {
      this.left = n;
    } else {
      this.left.addNode(n);
    }
  } else if (n.value > this.value) {
    if (this.right === null) {
      this.right = n;
    } else {
      this.right.addNode(n);
    }
  }
};

// print
Tree1.prototype.traverse = function() {
  this.root.visit();
};

Node.prototype.visit = function() {
  if (this.left !== null) {
    this.left.visit();
  }
  console.log(this.value);
  if (this.right !== null) {
    this.right.visit();
  }
};
let tree = new Tree1();
for (let i = 0; i < 100; i++) {
  let item = Math.floor(Math.random() * 100);
  tree.addValue(item);
}

console.log(tree.traverse());

//  // EXTRA check_identical function for algo sol
//  // to check two trees are identical or not
//  // https://www.youtube.com/watch?v=kL5Gs1YTwMM
//  // important to remember

//  function Tree() {
//   this.root = null
// }

// function Node(value) {
//   this.value = value
//   this.right = null
//   this.left = null
// }

// Tree.prototype.addValue = function(val) {
//   let n = new Node(val)
//   if (this.root === null) {
//       this.root = n
//   } else {
//       this.root.addNode(n)
//   }
// }
// let n;
// Node.prototype.addNode = function(node) {
//   if (node.value < this.value) {
//       if (this.left === null) {
//           this.left = node
//       } else {
//           this.left.addNode(node)
//       }
//   } else if (node.value > this.value) {
//       if (this.right === null) {
//           this.right = node
//       } else {
//           this.right.addNode(node)
//       }
//   }
// }

// let tree1 = new Tree()
// tree1.addValue(20)
// tree1.addValue(10)
// tree1.addValue(5)
// tree1.addValue(3)
// tree1.addValue(7)
// tree1.addValue(30)
// tree1.addValue(15)
// tree1.addValue(17)
// let tree2 = new Tree()
// tree2.addValue(20)
// tree2.addValue(10)
// tree2.addValue(5)
// tree2.addValue(3)
// tree2.addValue(7)
// tree2.addValue(30)
// tree2.addValue(15)
// tree2.addValue(17)

// function check_identical(p1, p2) {
//   if (p1 === null && p2 === null) return true
//   if ((p1 !== null && p2 === null) || (p1 === null && p2 !== null)) return false
//   if (p1.value === p2.value) {
//       let left = check_identical(p1.left, p2.left)
//       let right = check_identical(p1.right, p2.right)
//       return right === true && left === true
//   }
// }
// console.log(tree1, tree2)
// console.log(check_identical(tree1.root, tree2.root))

// // for CTCI ES5 ... helpers (this is for whenever ES5 would be useful)
// 'use strict';

// class TreeNode {
//   constructor(value) {
//     this.val = value;
//     this.parent = this.left = this.right = null;
//   }
// }

// export class Tree {
//   constructor() {
//     this.root = null;
//   }

//   add(value) {
//     let node = new TreeNode(value);
//     if (!this.root) {
//       this.root = node;
//     }
//     else {
//       let n = this.root,
//         branch;
//       while (n) {
//         branch = value < n.val ? 'left' : 'right';
//         if (!n[branch]) {
//           break;
//         }
//         n = n[branch];
//       }
//       node.parent = n;
//       n[branch] = node;
//     }
//   }
// }

// class LinkedListNode {
//   constructor(value, next) {
//     this.val = value;
//     this.next = next || null;
//   }
// }

// export class LinkedList {
//   constructor() {
//     this.head = this.tail = null;
//   }

//   prepend(value) {
//     if (!this.head) {
//       this.head = this.tail = new LinkedListNode(value);
//     }
//     else {
//       this.head = new LinkedListNode(value, this.head);
//     }
//   }

//   append(value) {
//     if (!this.head) {
//       this.head = this.tail = new LinkedListNode(value);
//     }
//     else {
//       this.tail = this.tail.next = new LinkedListNode(value);
//     }
//   }

//   toArray() {
//     let arr = [],
//       node = this.head;
//     while (node) {
//       arr.push(node.val);
//       node = node.next;
//     }
//     return arr;
//   }
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

// export function isBalanced(tree) {
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
