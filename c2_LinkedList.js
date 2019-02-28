// JS Algos

l; //singly linked list

// listNode
var ListNode = function(value) {
  this.value = value;
  this.next = null;
};

// linkedList
var LinkedList = function() {
  this.head = null;
  this.tail = null;
  this.listLength = 0;
};

// append
LinkedList.prototype.append = function(value) {
  // Initialize our linked list
  if (this.listLength === 0) {
    this.head = new listNode(value);
    this.tail = this.head;
  } else {
    // adding value to a linked list with one or more
    this.tail.next = new listNode(value);
    this.tail = this.tail.next;
  }
  this.listLength++;
};

// insert
LinkedList.prototype.insert = function(insertValue, searchValue) {
  var work = this.head;
  while (work !== null) {
    if (work.value === searchValue) {
      var reference = work.next;
      work.next = new listNode(insertValue);
      work.next.next = reference;

      if (reference === null) {
        // when the search value is the last element
        this.tail = work.next;
      }

      this.listLength++;
      return;
    }
    work = work.next;
  }
  console.log('searchValue ' + searchValue + ' was not found in linkedList');
};

// delete
LinkedList.prototype.delete = function(location) {
  // 1) when linkedList consists of single element
  if (location === 0 && this.listLength === 1) {
    this.head = null;
    this.tail = null;
    this.listLength--;
    return;
  } else if (location === 0) {
    // 2) when linkedList has more than 1 element but
    //  we're still trying to remove the zeroth element
    this.head = this.head.next;
    this.listLength--;
    return;
  }

  var work = this.head;
  var counter = 0;

  while (work !== null) {
    // 3) when we're removing the last element of the linkedList
    if (
      counter === location - 1 &&
      work.next !== null &&
      work.next === this.tail
    ) {
      work.next = work.next.next;
      this.tail = work;
      this.listLength--;
      return;
    } else if (counter === location - 1 && work.next !== null) {
      // 4) case when removing nodes that are neither the head or tail
      work.next = work.next.next;
      this.listLength--;
      return;
    }
    counter++;
    work = work.next;
  }
  // when location is out of our linkedIist range
  console.log(
    'Error: Index ' +
      "'" +
      location +
      "'" +
      ' falls out of range of the linkedlist'
  );
};

// contains
LinkedList.prototype.contains = function(value) {
  var work = this.head;
  while (work !== null) {
    if (work.value === value) {
      return true;
    }
    work = work.next;
  }
  return false;
};
