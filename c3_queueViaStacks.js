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

// ctci (modern w/ readability, missing 3inOne but organized, best for c3)
// algo sol (2nd Best for c3, clear formatting, only 10 months old)
// CTCI JS (good full c3, with DataStructures clearly shown)
// CTCI JS Sol (great for c3, uses 'this' so has multiple applications)
// CTCI ES5 (useful c3 even though 3 years old, very concise and well-described)

// Just try to have ctci and algo sol easily accessible and tested.

// ctci
const Stack = require('./c3_basic.js');

class queue {
  constructor() {
    this.inbox = new Stack();
    this.outbox = new Stack();
  }

  enqueue(v) {
    this.inbox.push(v);
  }

  dequeue() {
    if (!this.outbox.size()) {
      while (this.inbox.size()) {
        this.outbox.push(this.inbox.pop());
      }
    }

    return this.outbox.pop();
  }
}

let q = new queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.enqueue(4);
q.dequeue();
q.dequeue();
q.dequeue();
console.log(q);

// algo sol
function MyQueue() {
  let eq;
  let dq;
  let capacity;
  let size;

  this.setCapacity = function(capNum) {
    eq = [];
    dq = [];
    this.capacity = capNum;
    this.size = 0;
  };

  this.push = function(elem) {
    if (this.isFull()) {
      return console.log('is full');
    } else {
      eq.push(elem);
      this.size++;
    }
    return console.log('eq', eq, 'dq', dq);
  };

  this.pop = function() {
    if (this.size === 0) {
      return console.log('is empty');
    }
    if (dq.length === 0) {
      for (let i = 0; i < this.size; i++) {
        dq.push(eq.pop());
      }
    }
    this.size--;
    dq.pop();
    return console.log('dq', dq);
  };

  this.isFull = function() {
    return this.capacity === this.size;
  };
}

let s1 = new MyQueue();
s1.setCapacity(8);
s1.push(1);
s1.push(3);
s1.push(5);
s1.push(7);
s1.push(9);
s1.push(11);
s1.push(13);
s1.push(15);
s1.push(17);
s1.push(19);
s1.pop();
s1.pop();
s1.pop();
s1.pop();
s1.push(5);
s1.push(6);
s1.pop();
s1.pop();
s1.pop();
s1.pop();
// idk how this tests the actual myQueue.

// // CTCI JS
// var Stack = require('./../util/Stack');

// var myQueue = function() {
//   this.front = new Stack();
//   this.back = new Stack();
//   this.backUp = true;
// };

// myQueue.prototype.add = function(value) {
//   if (!this.backUp) {
//     while (!this.front.isEmpty()) {
//       this.back.push(this.front.pop());
//     }
//     this.backUp = true;
//   }
//   this.back.push(value);
// };

// myQueue.prototype.remove = function() {
//   if (this.backUp) {
//     while(!this.back.isEmpty()) {
//       this.front.push(this.back.pop());
//     }
//     this.backUp = false;
//   }
//   return this.front.pop();
// };

// myQueue.prototype.peek = function() {
//   if (this.backUp) {
//     while(!this.back.isEmpty()) {
//       this.front.push(this.back.pop());
//     }
//     this.backUp = false;
//   }
//   return this.front.peek();
// };

// myQueue.prototype.isEmpty = function() {
//   return this.front.isEmpty() && this.back.isEmpty();
// };

// /* TEST */
// var m = new myQueue();
// console.log(m.isEmpty(), true);

// m.add('a');
// m.add('b');
// m.add('c');
// m.add('d');
// m.add('e');
// m.remove();
// console.log(m.peek(), 'b');

/*
// CTCI JS Sol

class queueViaStacks {
  constructor() {
    this._newStack = [];
    this._oldStack = [];
  }

  enqueue(value) {
    this._newStack.push(value);
  }

  dequeue() {
    this._shiftStacks();
    return this._oldStack.pop();
  }

  peek() {
    this._shiftStacks();
    return this._oldStack[this._oldStack.length - 1];
  }

  _shiftStacks() {
    const newStackLength = this._newStack.length,
          oldStackLength = this._oldStack.length;

    if (!newStackLength && !oldStackLength) throw Error('Queue is empty');
    if (!oldStackLength) {
      while (this._newStack.length) {
        this._oldStack.push(this._newStack.pop());
      }

      // CONCAT CREATES A NEW ARRAY
      // this._oldStack = this._oldStack.concat(this._newStack.splice(0, this._newStack.length).reverse());

      // THIS IS BETTER AS IT DOES NOT CREATE A NEW ARRAY
      // this._oldStack.push.apply(this._oldStack, this._newStack.splice(0, this._newStack.length).reverse());
    }
  }

}
*/

// // CTCI ES5
// /**
//  * Queues and Stacks have different orders for extracting items. To create a
//  * queue with stacks we have two stacks, one for inserting items and one for
//  * extracting them. When dequeuing an item if the extract stack is empty we
//  * use queue operations to pop all the items off the insert stack onto the
//  * extract stack which will now be in the right order for a queue.
//  *
//  * N = |MyQueue|
//  * Time: enqueue O(1), dequeue O(N)
//  * Additional space: O(N) - to hold the input items
//  */
// class MyQueue {
//   constructor() {
//     this.eStack = [];
//     this.dStack = [];
//   }

//   enqueue(value) {
//     this.eStack.push(value);
//   }

//   dequeue() {
//     if (this.dStack.length === 0 && this.eStack.length === 0) {
//       throw new Error('queue is empty');
//     }
//     if (this.dStack.length === 0) {
//       while (this.eStack.length > 0) {
//         this.dStack.push(this.eStack.pop());
//       }
//     }
//     return this.dStack.pop();
//   }
// }
