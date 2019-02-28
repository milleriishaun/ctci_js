// // CTCI JS
// var LinkedList = function(value) {
//   this.value = value;
//   this.next = null;
// };

// var partition = function(head, partition) {
//   // approach is to create left and right threads
//   // and attach nodes with values less than partition value to the left
//   // and nodes with vallues more than partition value to the right
//   var left;
//   var right;
//   var currLeft = null;
//   var currRight = null;

//   var node = head;
//   while (node !== null) {
//     if (node.value < partition) {
//       if (currLeft === null) {
//         left = node;
//         currLeft = left;
//       } else {
//         currLeft.next = node;
//         currLeft = currLeft.next;
//       }
//     } else {
//       if (currRight === null) {
//         right = node;
//         currRight = right;
//       } else {
//         currRight.next = node;
//         currRight = currRight.next;
//       }
//     }
//     node = node.next;
//   }
//   currRight.next = null;
//   currLeft.next = right; // connect two partitions together
//   return left; // return head of new linkedList
// };

// /* TESTS */
// // Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1 [partition = 5]
// // Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8

// var printList = function(a) {
//   while (a !== null) {
//     console.log(a.value);
//     a = a.next;
//   }
// };

// var a = new LinkedList(3);
// var b = new LinkedList(5);
// var c = new LinkedList(8);
// var d = new LinkedList(5);
// var e = new LinkedList(10);
// var f = new LinkedList(2);
// var g = new LinkedList(1);

// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;
// e.next = f;
// f.next = g;

// var newa = partition(a, 5);
// printList(newa);

// ctci
// this one is actually different results from the CtCI book results.
const List = require('./c2_List.js');

function partition(list, pivot) {
  let storage = new List();
  let current = list.head;
  while (current) {
    if (current.value >= pivot) {
      storage.add(current.value);
    } else {
      storage.addToHead(current.value);
    }

    current = current.next;
  }

  return storage;
}

List.prototype.addToHead = function(value) {
  this.head = { value: value, next: this.head };
  if (!this.head.next) {
    this.tail = this.head;
  }
};

let l = new List();
l.add(3);
l.add(5);
l.add(8);
l.add(5);
l.add(10);
l.add(2);
l.add(1);
l.print();
console.log('===========');
let parted = partition(l, 5);
parted.print();

/*
// stackhouse
function partition(x, list) {
  // Cracking the Coding Interview 2.4
  // Write code to partition a linked list around a value x, such that all nodes less than x come
  // before all nodes greater than or exual to x. If x is contained within the list, the values of x 
  // only need to be after the elements less than x (see below). The partition element x can appear
  // anywhere in the "right partition"; it does not need to appear between the left and right partitions.
  
  let right_partition;
  let previous = list;
  let current = list;
  let front = list;
  while (current) {
    if (current.data >= x) {
      if (current === front) {
        front = previous.next;
        current.next = right_partition;
        right_partition = current;
        previous = front;
        current = front;
      } else {
        previous.next = current.next;
        current.next = right_partition;
        right_partition = current;
        current = previous.next;
      }
    } else {
      previous = current;
      current = current.next;
    }
  }
  previous.next = right_partition;
  return front;
}
*/

/*
// CTCI JS Sol
function partition(list, partitionNum) {

  let smallerHead, smallerTail, largerHead, largerTail;
  smallerHead = smallerTail = largerHead = largerTail = null;

  while (list) {
    const nextNode = list.next;
    list.next = null;
    if (list.value < partitionNum) {
      if (smallerHead) {
        smallerTail = smallerTail.next = list;
      } else {
        smallerHead = smallerTail = list;
      }
    } else {
      if (largerHead) {
        largerTail = largerTail.next = list;
      } else {
        largerHead = largerTail = list;
      }
    }
    list = nextNode;
  }

  if (smallerTail) {
    smallerTail.next = largerHead;
  }
  return smallerHead || largerHead;

  // if (!smallerHead) return largerHead;
  //
  // smallerTail.next = largerHead;
  // return smallerHead;
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// IF WE DON'T CARE ABOUT KEEPING ALL ELEMENTS "STABLE", ONLY ONES THAT NEED TO BE MOVED...
function unstablePartition(list, num) {
  let head = list, tail = list;

  while (list) {
    const next = list.next;
    if (list.value < num) {
      list.next = head;
      head = list;
    } else {
      tail.next = list;
      tail = list;
    }

    list = next;
  }

  tail.next = null;
  return head;

}
*/
