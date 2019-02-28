// CTCI JS
var linkedList = function(value) {
  this.value = value;
  this.next = null;
};

var findKthToLast = function(k, head) {
  // do recursively
  if (head === null || k < 1) {
    return;
  } else if (k === 1) {
    console.log(head.value);
    findKthToLast(k, head.next);
  } else {
    findKthToLast(k - 1, head.next);
  }
};

/* TESTS */
var a = new linkedList('1');
var b = new linkedList('2');
var c = new linkedList('3');
var d = new linkedList('4');
var e = new linkedList('5');
var f = new linkedList('6');
var g = new linkedList('7');

a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = f;
f.next = g;

findKthToLast(3, a);

findKthToLast(10, a);

findKthToLast(-1, a);

findKthToLast(0, a);

findKthToLast(1, a);

// ctci
const List = require('./00_List.js');

function kToLast(list, k) {
  let current = list.head;
  let runner = getRunner(current, k);

  while (runner) {
    current = current.next;
    runner = runner.next;
  }

  return current;
}

function getRunner(head, k) {
  let current = head;
  for (let i = 0; i < k; i++) {
    if (!current.next) break;

    current = current.next;
  }

  return current;
}

let l = new List();
l.add(1);
l.add(2);
l.add(3);
l.add(4);
l.add(5);
l.add(6);
l.add(7);

console.log('==========');

console.log(kToLast(l, 5).value);

// stackhouse
function return_kth_to_last(list, k) {
  // Cracking the Coding Interview problem 2.2
  // Implement an algorithm to find the kth to last element of a singly linked list.

  let size = 0;
  let current = list;
  while (current) {
    size++;
    current = current.next;
  }
  let index = 0;
  current = list;
  while (index < size - k) {
    current = current.next;
    index++;
  }
  return current;
}
