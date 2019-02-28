// // CTCI JS
// var LinkedList = function(value) {
//   this.value = value;
//   this.next = null;
// };

// var deleteMidNode = function(midNode) {
//   var node = midNode;
//   while (node !== null && node.next !== null) {
//     node.value = node.next.value;
//     if (node.next.next === null) {
//       node.next = null;
//     }
//     node = node.next;
//   }
// };

// // a -> b -> c -> d -> e -> f, input c
// // a -> b -> *d -> d -> e -> f
// // a -> b -> d -> *e -> e -> f
// // a -> b -> d -> e -> *f -> f
// // a -> b -> d -> e -> f -> *null

// /* TEST */

// var printList = function(head) {
//   while(head !== null) {
//     console.log(head.value);
//     head = head.next;
//   }
//   console.log('done printing');
// };

// var a = new LinkedList('a');
// var b = new LinkedList('b');
// var c = new LinkedList('c');
// var d = new LinkedList('d');
// var e = new LinkedList('e');
// var f = new LinkedList('f');

// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;
// e.next = f;

// printList(a);
// deleteMidNode(c);
// printList(a);

// ctci
const List = require('./c2_List.js');

function deleteNode(node) {
  node.value = node.next.value;
  node.next = node.next.next;
}

let l = new List();
l.add(1);
l.add(2);
l.add(3);
l.add(4);
l.add(5);
l.add(6);

l.print();
console.log('===========');

let f = l.find(3);
deleteNode(f);

l.print();

/*
// stackhouse
function delete_middle_node(list, node) {
  // Cracking the Coding Interview problem 2.3
  // Implement an algorithm to delete a node in the middle (i.e., any node but the first and last node,
  // not necessarily the exact middle) of a singly linked list, given only access to that node.
  // EXAMPLE
  // Input: the node c from the linked list a->b->c->d->e->f
  // Result: nothing is returned by the new linked list looks like a->b->d->e->f

  let previous = list;
  let current = list.next;

  while (current) {
    if (node === current) {
      previous.next = current.next;
      break;
    } else {
      previous = current;
      current = current.next;
    }
  }
}
*/

/*
// CTCI JS Sol
function deleteMiddleNode(node) {
  if (!node || !node.next) throw Error('invalid node');
  node.value = node.next.value;
  node.next = node.next.next;
}
*/
