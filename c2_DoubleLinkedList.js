// doubly linked list

// listNode
var ListNode = function(value) {
  this.value = value;
  this.next = null;
  this.previous = null;
};

// linkedList
var DoubleLinkedList = function() {
  this.head = null;
  this.tail = null;
  this.listLength = 0;
};

// append
DoubleLinkedList.prototype.append = function(value) {
  var node = new Node(value);
  if (this.listLength === 0) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    node.previous = this.tail;
    this.tail = node;
  }
  this._length++;
  return node;
};

// contains
DoubleLinkedList.prototype.contains = function(position) {
  var currentNode = this.head,
    length = this.listLength,
    count = 1,
    message = { failure: 'Failure: non-existent node in this list.' };
  if (length === 0 || position < 1 || position > length) {
    throw new Error(message.failure);
  }
  while (count < position) {
    currentNode = currentNode.next;
    count++;
  }
  return currentNode;
};

// delete
DoubleLinkedList.prototype.delete = function(position) {
  var currentNode = this.head,
    length = this._length,
    count = 1,
    message = { failure: 'Failure: non-existent node in this list.' },
    beforeNodeToDelete = null,
    nodeToDelete = null,
    deletedNode = null;

  if (length === 0 || position < 1 || position > length) {
    throw new Error(message.failure);
  }
  if (position === 1) {
    this.head = currentNode.next;
    if (!this.head) {
      this.head.previous = null;
    } else {
      this.tail = null;
    }
  } else if (position === this._length) {
    this.tail = this.tail.previous;
    this.tail.next = null;
  } else {
    while (count < position) {
      currentNode = currentNode.next;
      count++;
    }
    beforeNodeToDelete = currentNode.previous;
    nodeToDelete = currentNode;
    afterNodeToDelete = currentNode.next;

    beforeNodeToDelete.next = afterNodeToDelete;
    afterNodeToDelete.previous = beforeNodeToDelete;
    deletedNode = nodeToDelete;
    nodeToDelete = null;
  }
  this.listLength--;
  return message.success;
};
