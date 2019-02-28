// // CTCI JS
// var LinkedList = require('./../util/LinkedList');

// var peek = function(stack) {
//   return stack[stack.length - 1];
// };

// var intersection = function(head1, head2) {
//   var stack1 = [];
//   var stack2 = [];

//   while (head1 !== null) {
//     stack1.push(head1);
//     head1 = head1.next;
//   }

//   while (head2 !== null) {
//     stack2.push(head2);
//     head2 = head2.next;
//   }

//   // if not intersecting return undefined.
//   if (stack1.length === 0 || stack2.length === 0) {
//     return undefined;
//   } else if (peek(stack1) !== peek(stack2)) {
//     return undefined;
//   } else {
//     var intersect;
//     while (peek(stack1) === peek(stack2)) {
//       intersect = peek(stack1);
//       stack1.pop();
//       stack2.pop();
//     }
//     return intersect;
//   }
//   // if intersecting, return intersecting node.
// };

// /* TEST */

// var a = new LinkedList('a');
// var b = new LinkedList('b');
// var c = new LinkedList('c');
// var d = new LinkedList('d');
// var e = new LinkedList('e');
// var f = new LinkedList('f');
// var g = new LinkedList('g');
// var h = new LinkedList('h');

// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;
// e.next = f;
// f.next = g;
// g.next = h;

// var a1 = new LinkedList('a1');
// var b1 = new LinkedList('b1');
// var c1 = new LinkedList('c1');

// a1.next = b1;
// b1.next = c1;
// c1.next = d;

// var intersectNode = intersection(a, a1);

// console.log(intersectNode.value);

// ctci .. blank so use stackhouse

// stackhouse
function intersection(l1, l2) {
  // Cracking the Coding Interview 2.7
  // Given two (singly) linked lists, determine if the two lists intersect. Return the intersecting node.
  // Note that the intersection is defined based on reference, not value. That is, if the kth node of the
  // first linked list is the exact same node (by reference) as the jth node of the second linked list,
  // then they are intersecting.

  let current_1 = l1;
  let current_2 = l2;
  let visited_nodes = new Set();
  while (current_1 || current_2) {
    // Check if either ListNode has been seen before. If so, return it.
    if (visited_nodes.has(current_1)) {
      return current_1;
    } else if (visited_nodes.has(current_2)) {
      return current_2;
    }

    // Continue traversing the lists and adding nodes to the visited set.
    if (current_1) {
      visited_nodes.add(current_1);
      current_1 = current_1.next;
    } else if (current_2) {
      visited_nodes.add(current_2);
      current_2 = current_2.next;
    }
  }
  return undefined;
}

// attempt ctci-style test
const List = require('./c2_List.js');
let l1 = new List();
let l2 = new List();
l1.add(0);
l1.add(1);
l1.add(2);
l1.add(3);
l1.add(4);
l1.print();

l2.add(5);
l2.add(6);
l2.add(1);
l2.add(8);
l2.add(9);
l2.print();

console.log('===========');

result = intersection(l1, l2);
l1.print();
l2.print();
// kinda borked, need fix
console.log(result);

/*
// CTCI JS Sol
import { getListLength } from './helpers';

// (O(A + B)) O(N) TIME -- O(1) SPACE
export function intersection1(list1, list2) {
  if (!list1 || !list2) return;

  const length1 = getListLength(list1),
        length2 = getListLength(list2);

  let longerList = length1 > length2 ? list1 : list2,
      shorterList = longerList === list1 ? list2 : list1,
      traverseCounter = Math.abs(length1 - length2);

  while (traverseCounter-- > 0) longerList = longerList.next;

  while (shorterList) {
    if (shorterList === longerList) return shorterList;
    shorterList = shorterList.next;
    longerList = longerList.next;
  }
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// (O(A + B)) O(N) TIME -- O(N) SPACE
export function intersection2(list1, list2) {
  if (!list1 || !list2) return;

  let head1 = list1, head2 = list2;
  const set = new Set();

  while (head1) {
    set.add(head1);
    head1 = head1.next;
  }

  while (head2) {
    if (set.has(head2)) return head2;
    head2 = head2.next;
  }

}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// O(AB) TIME --- O(1) SPACE
export function intersection3(list1, list2) {
  if (!list1 || !list2) return;

  let head1 = list1, head2 = list2;

  while (head1) {
    while (head2) {
      if (head1 === head2) return head1;
      head2 = head2.next;
    }
    head2 = list2;
    head1 = head1.next;
  }
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// BOOKS SOLUTION
// (O(A + B)) O(N) TIME -- O(1) SPACE
function getTailAndSize(list) {
  let size = 1;

  while (list) {
    size++;
    list = list.next;
  }

  return {tail: list, size};
}

function getKthNode(list, k) {
  while (list && k--) list = list.next;
  return list;
}

export function BookSolutionIntersection(list1, list2) {
  if (!list1 || !list2) return;

  const head1 = getTailAndSize(list1),
        head2 = getTailAndSize(list2);

  if (head1.tail !== head2.tail) return;

  let longerList = head1.size > head2.size ? list1 : list2,
      shorterList = longerList === list1 ? list2 : list1;

  longerList = getKthNode(longerList, Math.abs(head1.size - head2.size));

  while (shorterList) {
    if (shorterList === longerList) return shorterList;
    shorterList = shorterList.next;
    longerList = longerList.next;
  }
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// IF BOTH LISTS ARE THE SAME LENGTH
function intersection(list1, list2) {
  let head1 = list1, head2 = list2;

  while (head1) {
    if (head1 === head2) return head1;
    head1 = head1.next;
    head2 = head2.next;
  }
}
*/
