// CTCI JS
// ctci
// stackhouse
// CTCI JS Sol
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
  .add('isUnique6', function() {
    isUnique6('striggnp');
  })
  .add('isUnique7', function() {
    isUnique7('striggnp');
  })
  .add('isUnique8', function() {
    isUnique8('striggnp');
  })
  .add('isUnique9', function() {
    isUnique9('striggnp');
  })
  .add('isUnique10', function() {
    isUnique10('striggnp');
  })
  .add('isUnique11', function() {
    isUnique11('striggnp');
  })
  .add('isUnique12', function() {
    isUnique12('striggnp');
  })
  .add('isUnique13', function() {
    isUnique13('striggnp');
  })
  .add('isUnique14', function() {
    isUnique14('striggnp');
  })
  .add('isUnique15', function() {
    isUnique15('striggnp');
  })
  .add('isUnique16', function() {
    isUnique16('striggnp');
  })
  .add('isUnique17', function() {
    isUnique17('striggnp');
  })
  .add('isUnique18', function() {
    isUnique18('striggnp');
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

// algos sol (ok for chap2)
// CTCI JS Sol (good for chap2, checks off stackhouse sometimes)
// ctci  (really good for chap2)
// CTCI JS (really good for chap2, but slightly older)
// CTCI ES5 (ok for chap2)
// JS Algos (really good for chap2,but summarized)
// stackhouse (best for chap2, will need to take list from ctci though)

// Determined to use CTCI JS, ctci, and stackhouse, since their direction is clearer.
// Good to check JS Algos every so often.

// // CTCI JS
// /* CLASS */
// var LinkedList = function(value) {
//   this.value = value;
//   this.next = null;
// };

// /* FUNCTIONS */
// var checkDups = function(head, node) {
//   var currNode = head;
//   while (currNode !== node) {
//     if (currNode.value === node.value) {
//       return true;
//     }
//     currNode = currNode.next;
//   }
//   return false;
// };

// var printLinkedList = function(head) {
//   var node = head;
//   console.log('start of linked list');
//   while (node !== null) {
//     console.log(node.value);
//     node = node.next;
//   }
//   console.log('end of linked list');
// };

// var removeDups = function(head) {
//   var node = head;
//   while (node !== null) {
//     if (node.next !== null && checkDups(head, node.next)) {
//       node.next = node.next.next;
//     } else {
//       node = node.next;
//     }
//   }
//   return head;
// };

// /* TESTS */
// var a = new LinkedList('a');
// var b = new LinkedList('b');
// var c = new LinkedList('c');
// var d = new LinkedList('d');
// var e = new LinkedList('e');

// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;

// removeDups(a);
// printLinkedList(a);

// var f = new LinkedList('f');
// var g = new LinkedList('g');
// var h = new LinkedList('g');
// var i = new LinkedList('g');
// var j = new LinkedList('g');

// f.next = g;
// g.next = h;
// h.next = i;
// i.next = j;

// removeDups(f);
// printLinkedList(f);

// var k = new LinkedList('g');
// var l = new LinkedList('g');
// var m = new LinkedList('g');
// var n = new LinkedList('b');
// var o = new LinkedList('g');

// k.next = l;
// l.next = m;
// m.next = n;
// n.next = o;

// removeDups(k);
// printLinkedList(k);

// ctci
const List = require('./c2_List.js');

// This uses memoization, which may increase speed of evaluation.
function removeDups(list) {
  const memo = {};
  let current = list.head;
  memo[current.value] = 1; // add first value to memo

  while (current.next) {
    const value = current.next.value;
    if (memo[value]) {
      current.next = current.next.next;
    } else {
      memo[value] = 1;
    }
    current = current.next;
  }

  return list;
}

let l = new List();
l.add(1);
l.add(2);
l.add(3);
l.add(2);
l.add(4);
l.print();

console.log('===========');

removeDups(l);
l.print();

/*
// stackhouse
function remove_dupes(list) {
  // Cracking the Coding Interview problem 2.1
  // Write code to remove duplicates from an unsorted linked list
  // FOLLOW UP: How would you solve this problem if a temporary buffer is not allowed?

  let encountered_nodes = new Set();
  let previous = list;
  let current = list.next;
  encountered_nodes.add(previous.data);

  while (current) {
    if (encountered_nodes.has(current.data)) {
      previous.next = current.next;
      current = previous.next;
    } else {
      encountered_nodes.add(current.data);
      previous = current;
      current = current.next;
    }
  }
  return list;
}
*/

/*
// CTCI JS
// O(N) TIME --- O(N) SPACE

function removeDupes1(list) {
  if (!list || !list.next) return list;

  const set = new Set();
  set.add(list.value);

  while (list.next) {
    if (set.has(list.next.value)) {
      list.next = list.next.next;
    } else {
      set.add(list.next.value);
      list = list.next;
    }
  }

}
// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// O(Nˆ2) TIME --- O(1) SPACE

function removeDupes2(head) {
  if (!head || !head.next) return head;

  while (head) {
    let current = head;
    while (current.next) {
      if (current.next.value === head.value) {
        current.next = current.next.next;
      } else {
        current = current.next;
      }
    }
    head = head.next;
  }

}
*/
