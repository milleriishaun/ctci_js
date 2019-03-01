// CTCI JS
// var LinkedList = require('./../util/LinkedList');

// var loopDetection = (head) => {
//   var hare = head;
//   var tortoise = head;
//   while (hare !== null) {
//     tortoise = tortoise.next;
//     hare = hare.next;
//     if (hare === tortoise && hare !== head.next) {
//       return true;
//     }
//     if (hare !== null) {
//       hare = hare.next;
//       if (hare === tortoise) {
//         return true;
//       }
//     }
//   }
//   return false;
// };

// /* TEST */
// // A -> B -> C -> D -> E -> C

// var a = new LinkedList();
// var b = new LinkedList();
// var c = new LinkedList();
// var d = new LinkedList();
// var e = new LinkedList();
// var f = new LinkedList();

// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;
// e.next = f;
// f.next = c;

// console.log(loopDetection(a), true);

// var A = new LinkedList();
// var B = new LinkedList();
// var C = new LinkedList();
// var D = new LinkedList();
// var E = new LinkedList();
// var F = new LinkedList();

// A.next = B;
// B.next = C;
// C.next = D;
// D.next = E;
// E.next = F;

// console.log(loopDetection(A), false);

// ctci
const List = require('./c2_List.js');

function cycle(list) {
  let slow = list.head;
  let fast = list.head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      fast = list.head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }

  return null;
}

let l = new List();
l.add(1);
l.add(2);
l.add(3);
l.add(4);
l.add(5);
l.add(6);
l.add(7);
l.find(7).next = l.find(3);
console.log(cycle(l));

// stackhouse ... (blank)

/*
// CTCI JS Sol
// O(N) TIME -- O(1) SPACE
function getLoopStartNode(list) {
  if (!list || !list.next) return null;

  let slowPointer = list, fastPointer = list;

  // Check if pointers collide
  while (fastPointer && fastPointer.next) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
    if (slowPointer === fastPointer) break;
  }

  // Check if it is not a circular list
  if (!fastPointer || !fastPointer.next) return null;

  // Move slow pointer to head and traverse to the beginning of the loop
  slowPointer = list;
  while (slowPointer !== fastPointer) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next;
  }

  return slowPointer;
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// O(N) TIME -- O(N) SPACE
function circularList1(list) {
  if (!list || !list.next) return null;

  let head = list;
  const set = new Set();

  while (head) {
    if (set.has(head)) return head;
    set.add(head);
    head = head.next;
  }

  return null;
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// THIS ONLY DEDECTS A CIRCULAR LIST AND RETURNS WHERE THE POINTERS COLLIDE. DOESN'T RETURN THE BEGINNING OF THE LOOP.
// O(N) TIME -- O(1) SPACE
function circularList2(list) {
  if (!list || !list.next) return null;
  let slowPointer = list, fastPointer = list;

  while (fastPointer) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
    if (slowPointer === fastPointer) return slowPointer;
  }

  return null;
}
*/
