// // CTCI JS
// var LinkedList = require('./../util/LinkedList');
// var printList = require('./../util/printList');

// var sumList = function(head1, head2) {

//   var node1 = head1;
//   var node2 = head2;
//   var node3 = null;
//   var head3 = null;

//   var ones;
//   var tens = 0;
//   var sum;

//   while (node1 !== null && node2 !== null) {
//     if (node1 === null) {
//       sum = node2.value;
//     } else if (node2 === null) {
//       sum = node1.value;
//     } else {
//       sum = node1.value + node2.value;
//     }

//     sum += tens;
//     ones = sum % 10;
//     if (node3 === null) {
//       head3 = new LinkedList(ones);
//       node3 = head3;
//     } else {
//       node3.next = new LinkedList(ones);
//       node3 = node3.next;
//     }

//     tens = Math.floor(sum / 10);

//     if (node1 !== null) {
//       node1 = node1.next;
//     }

//     if (node2 !== null) {
//       node2 = node2.next;
//     }

//   }
//   if (tens > 0) {
//     node3.next = new LinkedList(tens);
//     node3 = node3.next;
//   }

//   return head3;
// };

// /* TEST */

// // Input: (7 -> 1 -> 6) + (5 -> 9 -> 2). this case refers to 617 + 295
// // Output: 2 -> 1 -> 9. the answer refers to 912

// var a = new LinkedList(7);
// var b = new LinkedList(1);
// var c = new LinkedList(6);

// a.next = b;
// b.next = c;

// var d = new LinkedList(5);
// var e = new LinkedList(9);
// var f = new LinkedList(2);

// d.next = e;
// e.next = f;

// var newHead = sumList(a, d);

// printList(newHead);

// // Input: (7 -> 1 -> 6) + (5 -> 9 -> 9). this case refers to 617 + 995
// // Output: 2 -> 1 -> 9. the answer refers to 1612

// var a = new LinkedList(7);
// var b = new LinkedList(1);
// var c = new LinkedList(6);

// a.next = b;
// b.next = c;

// var d = new LinkedList(5);
// var e = new LinkedList(9);
// var f = new LinkedList(2);

// d.next = e;
// e.next = f;

// var newHead = sumList(a, d);

// printList(newHead);

/*
// CTCI JS ... recursion
const LinkedList = require('./../util/LinkedList')
const printList = require('./../util/printList')

function sumLinkedLists(node1, node2, carry=0){
  if(!node1 && !node2 && carry===0){
    return null
  }
  let value = carry
  value += node1 ? node1.value : 0
  value += node2 ? node2.value : 0
  const node  = new LinkedList(value%10)
  node.next = sumLinkedLists(
    node1 ? node1.next : null,
    node2 ? node2.next : null,
    value > 10 ? 1 : 0)
  return node
}

// Input: (7 -> 1 -> 6) + (5 -> 9 -> 2). this case refers to 617 + 295
// Output: 2 -> 1 -> 9. the answer refers to 912

var a = new LinkedList(7)
var b = new LinkedList(1)
var c = new LinkedList(6)

a.next = b
b.next = c

var d = new LinkedList(5)
var e = new LinkedList(9)
var f = new LinkedList(2)

d.next = e
e.next = f

printList(sumLinkedLists(a,d))
*/

/*
// CTCI JS ... forward
const LinkedList = require('./../util/LinkedList')
const printList = require('./../util/printList')

function sumLinkedListsForward(list1, list2) {
  if (!list1 && !list2) {
    return null
  }
  let length1 = length(list1)
  let length2 = length(list2)

  if (length1 > length2) {
    list2 = padList(list2, length1 - length2)
  } else if (length1 < length2) {
    list1 = padList(list1, length2 - length1)
  }

  const { head, nextDigitValue } = carryBase10(sumAndAppendNodes(list1, list2), 0)
  return nextDigitValue ? appendToStart(head, new LinkedList(nextDigitValue)) : head
}

function length(node) {
  let count = 0
  while (node) {
    count++
    node = node.next
  }
  return count
}

function padList(shortList, padding) {
  while (padding > 0) {
    shortList = appendToStart(shortList, new LinkedList(0))
    padding--
  }
  return shortList
}

function appendToStart(head, node) {
  node.next = head
  return node
}

function sumAndAppendNodes(node1, node2) {
  let value = (node1 ? node1.value : 0) + (node2 ? node2.value : 0)
  if (!node1.next && !node2.next) {
    return new LinkedList(value)
  }
  const {
    head,
    nextDigitValue
  } = carryBase10(sumAndAppendNodes(node1.next, node2.next), value)
  return appendToStart(head, new LinkedList(nextDigitValue))
}

function carryBase10(head, nextDigitValue) {
  if (head.value >= 10) {
    head.value = head.value % 10
    nextDigitValue += 1
  }
  return {
    head,
    nextDigitValue
  }
}

// Input: (6 -> 1 -> 7) + (2 -> 9 -> 5). this case refers to 617 + 295
// Output: 9 -> 1 -> 2. the answer refers to 912

var a = new LinkedList(6)
var b = new LinkedList(1)
var c = new LinkedList(7)

a.next = b
b.next = c

var d = new LinkedList(2)
var e = new LinkedList(9)
var f = new LinkedList(5)

d.next = e
e.next = f

printList(sumLinkedListsForward(a, d))
*/

// ctci
const List = require('./c2_List.js');

function sum(l1, l2) {
  return reduce(l1) + reduce(l2);
}

function reduce(list) {
  let s = '';
  let current = list.head;

  while (current) {
    s += current.value;
    current = current.next;
  }

  return parseInt(s);
}

let l1 = new List();
l1.add(6);
l1.add(1);
l1.add(7);

let l2 = new List();
l2.add(2);
l2.add(9);
l2.add(5);

console.log(sum(l1, l2));

/*
// stackhouse
function sum_lists(addend_1, addend_2) {
  // Cracking the Coding Interview 2.5
  // You have two numbers represented by a linked list, where each node contains a single digit.
  // The digits are stored in reverse order, such that the 1's digit is at the head of the list. Write
  // a function that adds the two numbers and returns the sum as a linked list.
  // EXAMPLE Input: (7 -> 1 -> 6) + (5 -> 9 -> 2). That is, 617 + 295.
  // Output: 2 -> 1 -> 9. That is, 912.
  // FOLLOW UP Suppose the digits are stored in forward order. Repeat the above problem.
  
  let digit_node_1 = addend_1;
  let digit_node_2 = addend_2;
  let result;
  let carry = 0;
  
  while (digit_node_1 || digit_node_2) {
    let new_digit = 0;
    if (digit_node_1) {
      new_digit += digit_node_1.data;
      digit_node_1 = digit_node_1.next;
    }
    if (digit_node_2) {
      new_digit += digit_node_2.data;
      digit_node_2 = digit_node_2.next;
    }
    new_node = ListNode(new_digit % 10 + carry);
    carry = Math.floor(new_digit / 10);
    new_node.next = result;
    result = new_node;
  }
  return result;
}
*/

/*
// CTCI JS Sol
import { arrayToLinkedList, createNode, getListLength } from './helpers';

// FIRST SOLUTION
function sumListsIterative(list1, list2) {
  const list1Arr = [], list2Arr = [];

  while (list1 || list2) {
    if (list1) {
      list1Arr.unshift(list1.value);
      list1 = list1.next;
    }
    if (list2) {
      list2Arr.unshift(list2.value);
      list2 = list2.next;
    }
  }

  const convertToNum = arr => +arr.join``;

  const total = convertToNum(list1Arr) + convertToNum(list2Arr);
  const numberArr = [...total.toString()].reduceRight((acc, nextValue) => acc.concat(+nextValue), []);

  return arrayToLinkedList(numberArr);
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// RECURSIVE SOLUTION (Digits stored in reverse order)
function sumListsRecursive(list1, list2, carry = 0) {
  if (!list1 && !list2 && !carry) return null;

  const resultNode = createNode();
  let value = carry;

  if (list1) value += list1.value;
  if (list2) value += list2.value;
  resultNode.value = value % 10;

  if (list1 || list2) {
    const nextNode = sumListsRecursive(
      list1 ? list1.next : null,
      list2 ? list2.next : null,
      value >= 10 ? 1 : 0
    );
    resultNode.next = nextNode;
  }

  return resultNode;
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// THIS SOLUTION IS FOR LISTS THAT STORE DIGITS IN REGULAR RIGHT TO LEFT ORDER

class PartialSum {
  constructor() {
    this.nodeSum = null;
    this.carry = 0;
  }
}

function addLists(list1, list2) {
  const len1 = getListLength(list1);
  const len2 = getListLength(list2);

  if (len1 < len2) list1 = padList(list1, len2 - len1);
  else list2 = padList(list2, len1 - len2);

  const sum = addListsHelper(list1, list2);

  if (!sum.carry) return sum.nodeSum;
  else return insertBefore(sum.nodeSum, sum.carry);
}

function addListsHelper(list1, list2) {
  if (!list1 && !list2) return new PartialSum();

  const sum = addListsHelper(list1.next, list2.next),
        value = sum.carry + list1.value + list2.value,
        fullResult = insertBefore(sum.nodeSum, value % 10);

  sum.nodeSum = fullResult;
  sum.carry = Math.floor(value / 10);
  return sum;
}

function padList(list, padding) {
  for (let i = 0; i < padding; i++) {
    list = insertBefore(list, 0);
  }
  return list;
}

function insertBefore(list, value) {
  const node = createNode(value);
  if (list) node.next = list;
  return node;
}

const list1 = {value: 6, next: {value: 1, next: {value: 7, next: {value: 8, next: null}}}};
const list2 = {value: 2, next: {value: 9, next: {value: 5, next: null}}};
// const list1 = {value: 7, next: {value: 1, next: {value: 6, next: null}}};
// const list2 = {value: 5, next: {value: 9, next: {value: 2, next: null}}};
// console.log(addLists(list1, list2));
*/
