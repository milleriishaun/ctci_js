// // CTCI JS
// // if doubly - move to middle, and then extend front and back to check
// // if singly - make a reversed linkedlist from the first half

// var LinkedList = require('./../util/LinkedList');

// var palindrome = function(head) {
//   var mid = head;
//   var end = head;
//   var isEven = true;
//   var firstHalf = null;
//   var frontNode = null;

//   while (end.next !== null) {
//     isEven = true;
//     if (firstHalf === null) {
//       firstHalf = new LinkedList(mid.value);
//     } else {
//       frontNode = firstHalf;
//       firstHalf = new LinkedList(mid.value);
//       firstHalf.next = frontNode;
//     }
//     mid = mid.next;
//     end = end.next;
//     if (end.next !== null) {
//       end = end.next;
//       isEven = false;
//     }
//   }

//   if (!isEven) {
//     mid = mid.next;
//   }

//   while(mid !== null) {
//     // console.log(mid.value, firstHalf.value);
//     if (mid.value !== firstHalf.value) {
//       return false;
//     }
//     mid = mid.next;
//     if (firstHalf!== null) {
//       firstHalf = firstHalf.next;
//     }
//   }
//   return true;

// };

// /* TEST */

// var a = new LinkedList('a');
// var b = new LinkedList('b');
// var c = new LinkedList('c');
// var d = new LinkedList('d');
// var e = new LinkedList('c');
// var f = new LinkedList('b');
// var g = new LinkedList('a');

// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;
// e.next = f;
// f.next = g;

// console.log(palindrome(a));

// ctci
const List = require('./c2_List.js');

function palindrome(list) {
  let stack = [];
  let current = list.head;

  while (current) {
    stack.push(current.value);
    current = current.next;
  }

  current = list.head; // reset current;
  while (stack.length) {
    let val = stack.pop();
    if (current.value != val) {
      return false;
    }
    current = current.next;
  }

  return true;
}

let l = new List();
l.add(0);
l.add(1);
l.add(2);
l.add(3);
l.add(1);
l.add(0);

console.log(palindrome(l));

/*
// stackhouse
function palindrome(list) {
  // Cracking the Coding Interview 2.6
  // Implement a function to check if a linked list is a palindrome.
  
  let reverse_list = null;
  let current = list;
  let length = 0;

  // Iterate through the original list and build a new one in reverse order. Keep track of length.
  while (current) {
    length++;
    let node_clone = ListNode(current.data);
    node_clone.next = reverse_list;
    reverse_list = node_clone;
    current = current.next;
  }

  current = list;
  reverse_current = reverse_list;
  let i = 0;
  // Compare the original list to the reverse list. If the first half is the same so is the second.
  while (i < Math.floor(length / 2)) {
    i++;
    if (current.data !== reverse_current.data) {
      return false;
    }
    current = current.next;
    reverse_current = reverse_current.next;
  }
  return true;
}
*/

/*
// CTCI JS Sol
import { createNode, getListLength } from './helpers';

// RECURSIVE SOLUTION
function isPalindromeRecursive(list) {
  const palindrome = recursiveIsPalindrome(list, getListLength(list));
  return palindrome.result;
}

function recursiveIsPalindrome(list, length) {
  // If length is even
  if (!list || length === 0) return {node: list, result: true};
  // If length is odd
  else if (length === 1) return {node: list.next, result: true};

  const compareNodes = recursiveIsPalindrome(list.next, length - 2);
  if (!compareNodes.result || !compareNodes.node) return compareNodes;

  compareNodes.result = list.value === compareNodes.node.value;
  compareNodes.node = compareNodes.node.next;

  return compareNodes;
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// O(N) TIME -- ONLY KEEPS TRACK OF HALF THE LIST
// USES A STACK
function linkedListPalindrome1(list) {
  let slowPointer = list, fastPointer = list;
  const stack = [];

  while (fastPointer && fastPointer.next) {
    stack.push(slowPointer.value);
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
  }

  // If list length is odd, move slow pointer past the middle node.
  if (fastPointer) slowPointer = slowPointer.next;

  while (stack.length) {
    if (stack.pop() !== slowPointer.value) return false;
    slowPointer = slowPointer.next;
  }

  return true;
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// O(N) TIME -- O(N) SPACE
function linkedListPalindrome2(list) {
  let head = null, node = list, lengthCounter = 0;

  // Create reversed list and keep track of its length
  while (node) {
    const newNode = createNode(node.value, head);
    head = newNode;
    node = node.next;
    lengthCounter++;
  }

  // Only need to check to half of length
  const halfLength = lengthCounter / 2;
  node = list;

  while (lengthCounter-- > halfLength) {
    if (node.value !== head.value) return false;
    node = node.next;
    head = head.next;
  }

  return true;
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// USES AN ARRAY TO KEEP TRACK OF THE VALUES
// O(N) TIME -- O(N) SPACE
function linkedListPalindrome3(list) {
  const valuesArr = [];
  let head = list;

  while (head) {
    valuesArr.unshift(head.value);
    head = head.next;
  }

  const valuesArrHalfLength = valuesArr.length / 2;
  head = list;

  for (let i = 0; i < valuesArrHalfLength; head = head.next, i++) {
    if (head.value !== valuesArr[i]) return false;
  }

  return true;
}
*/
