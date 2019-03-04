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

class setOfStacks {
  constructor(n) {
    this.storage = [];
    this.max = n;
    this.current = 0;
  }

  push(v) {
    if (!this.storage.length) {
      this.storage.push(new Stack());
    }

    if (this.storage[this.current].size() === this.max) {
      this.current++;
      this.storage[this.current] = new Stack();
    }

    this.storage[this.current].push(v);
  }

  pop() {
    const result = this.storage[this.current].pop();

    if (this.storage[this.current].size() === 0) {
      this.storage[this.current] = null;
      this.current--;
    }

    return result;
  }

  size() {
    let count = 0;
    for (let i = 0; i < this.storage.length; i++) {
      count += storage[i].size();
    }
    return count;
  }
}

let s = new setOfStacks(3);
s.push(1);
s.push(2);
s.push(3);
s.push(4);
s.push(5);
s.push(6);

console.log(s.storage);

s.pop();
s.pop();
s.pop();
s.pop();

console.log(s.storage);

// algo sol

function Stack1() {
  let capacity;
  let size;
  let Node;

  this.setCapacity = function(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.Node = [];
  };

  this.isEmpty = function() {
    return this.size === 0;
  };

  this.isFull = function() {
    return this.capacity === this.size;
  };

  this.pop = function() {
    if (this.size === 0) return null;
    else {
      size--;
      return Node.pop();
    }
  };

  this.push = function(elem) {
    if (this.isFull()) {
      return console.log('it is already full');
    } else {
      this.size++;
      this.Node.push(elem);
      return this.Node;
    }
  };
}

function SetOfStacks() {
  let stacks = [];
  let capacity;
  this.setOfStacks = function(capacity) {
    this.capacity = capacity;
  };

  this.getLastStack = function() {
    if (stacks.length === 0) return null;
    return stacks[stacks.length - 1];
  };

  this.push = function(value) {
    let last = this.getLastStack();
    if (last !== null && !last.isFull()) {
      last.push(value);
    } else {
      let stack = new Stack1();
      stack.setCapacity(5);
      stack.push(value);
      stacks.push(stack);
      return console.log('stacks', stacks);
    }
  };

  this.pop = function() {
    let last = this.getLastStack();
    if (last === null) return console.log('empty');
    last.Node.pop();
    last.size--;
    if (last.size === 0) {
      stacks.pop();
    }
    return console.log(
      stacks[0] ? stacks[0].Node : '',
      stacks[1] ? stacks[1].Node : null
    );
  };
  this.isEmpty = function() {
    let last = this.getLastStack();
    return last.length === 0 || last.isEmpty();
  };

  this.popAt = function(index) {
    return console.log('popAt', stacks[index] ? stacks[index].Node : 'empty');
  };
}

let s1 = new SetOfStacks();
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
s1.pop();
s1.pop();
s1.pop();
s1.pop();
s1.pop();
s1.pop();

// // CTCI JS

// function Stack () {
//   let capacity;
//   let size;
//   let Node;

//   this.setCapacity = function(capacity) {
//       this.capacity = capacity
//       this.size = 0
//       this.Node = []
//   }

//   this.isEmpty = function() {
//       return this.size === 0
//   }

//   this.isFull = function() {
//       return this.capacity === this.size
//   }

//   this.pop = function() {
//       if (this.size === 0) return null
//       else {
//           size--;
//           return Node.pop()
//       }
//   }

//   this.push = function(elem) {
//       if (this.isFull()) {
//           return console.log('it is already full')
//       } else {
//           this.size++;
//           this.Node.push(elem)
//           return this.Node
//       }
//   }
// }

// function SetOfStacks() {
//   let stacks = []
//   let capacity;
//   this.setOfStacks = function(capacity) {
//       this.capacity = capacity
//   }

//   this.getLastStack = function() {
//       if (stacks.length === 0) return null
//       return stacks[stacks.length - 1]
//   }

//   this.push = function(value) {
//       let last = this.getLastStack()
//       if(last !== null && !last.isFull()){
//           last.push(value)
//       } else {
//           let stack = new Stack()
//           stack.setCapacity(5)
//           stack.push(value)
//           stacks.push(stack)
//           return console.log('stacks', stacks)
//       }
//   }

//   this.pop = function() {
//       let last = this.getLastStack()
//       if (last === null) return console.log('empty')
//       last.Node.pop()
//       last.size--;
//       if (last.size === 0) {
//           stacks.pop()
//       }
//       return console.log(stacks[0] ? stacks[0].Node: '', stacks[1] ? stacks[1].Node: null)
//   }
//   this.isEmpty = function() {
//       let last = this.getLastStack()
//       return last.length === 0 || last.isEmpty()
//   }

//   this.popAt= function(index) {
//       return console.log('popAt', stacks[index] ? stacks[index].Node : 'empty')
//   }
// }

// let s1 = new SetOfStacks()
// s1.push(1)
// s1.push(3)
// s1.push(5)
// s1.push(7)
// s1.push(9)
// s1.push(11)
// s1.push(13)
// s1.push(15)
// s1.push(17)
// s1.push(19)
// s1.pop()
// s1.pop()
// s1.pop()
// s1.pop()
// s1.pop()
// s1.pop()
// s1.pop()
// s1.pop()
// s1.pop()
// s1.pop()

/*
// CTCI JS Sol
class SetOfStacks {
  constructor(maxSize) {
    if (!maxSize) throw Error('maxSize argument is required');
    this._stacks = [[]];
    this._maxSize = maxSize;
  }

  push(value) {
    const stacksLength = this._stacks.length;
    if (this._stacks[stacksLength - 1].length === this._maxSize) {
      this._stacks[stacksLength] = [];
    }
    this._stacks[this._stacks.length - 1].push(value);
  }

  pop() {
    const stacksLength = this._stacks.length,
          poppedValue = this._stacks[stacksLength - 1].pop();

    if (stacksLength > 1 && !this._stacks[stacksLength - 1].length) {
      this._stacks.pop();
    }
    return poppedValue;
  }

  // MOVES LATER STACKS ELEMENT'S INTO PREVIOUS STACKS
  popAt(stackNumber) {
    const stackToPopFrom = this._stacks[stackNumber - 1];
    if (!stackToPopFrom) throw Error('Invalid stack number');
    if (stackNumber === this._stacks.length) return this.pop();

    const poppedValue = stackToPopFrom.pop(),
          stacksLength = this._stacks.length;

    if (stackNumber < stacksLength) {
      for (let i = stackNumber - 1; i < stacksLength - 1; i++) {
        this._stacks[i].push(this._stacks[i + 1].shift());
      }
    }

    if (this._stacks.length > 1 && !this._stacks[this._stacks.length - 1].length) {
      this._stacks.pop();
    }

    return poppedValue;
  }

  peek(stackNum) {
    const stack = this._stacks[stackNum - 1];
    return stack ? stack[stack.length - 1] : Error('Invalid stack number');
  }

}
*/

// CTCI ES5
/**
 * StackOfStacks uses multiple smaller stacks to hold values. New stacks are
 * created or dropped as required. popAt allows for an item to be popped from
 * any stack, when that occurs items from subsequent stacks are taken and moved
 * forward in the list of stacks so that there are no gaps.
 *
 * N = total number of items
 * M = size of smaller stack
 * Time: push O(1), pop O(1), popAt O(N)
 * Additional space: push O(1), pop O(1), popAt O(M)
 */

/*
class StackOfStacks {
  constructor(maxSize) {
    if (arguments.length < 1) {
      throw new Error('maxSize argument is required');
    }
    this.stacks = [[]];
    this.max = maxSize;
  }

  push(value) {
    if (this.stacks[this.stacks.length - 1].length >= this.max) {
      this.stacks.push([]);
    }
    this.stacks[this.stacks.length - 1].push(value);
  }

  pop() {
    let value = this.stacks[this.stacks.length - 1].pop();
    if (this.stacks.length > 1 && this.stacks[this.stacks.length - 1].length === 0) {
      this.stacks.pop();
    }
    return value;
  }

  popAt(number) {
    if (number < 1 || number > this.stacks.length) {
      throw new Error('stack number is invalid');
    }
    if (number === this.stacks.length) {
      return this.pop();
    }

    let stack = this.stacks[number - 1],
      value = stack.pop(),
      tempStack = [],
      nextStack;
    // move items from subsequent stacks forward to fill the gap
    if (number < this.stacks.length) {
      for (let i = number; i < this.stacks.length; ++i) {
        nextStack = this.stacks[i];
        // reverse next stack - we could actually use other operators in
        // JavaScript like shift or reverse to do this simpler but that would
        // be cheating
        while (nextStack.length > 0) {
          tempStack.push(nextStack.pop());
        }
        stack.push(tempStack.pop());
        while (tempStack.length > 0) {
          nextStack.push(tempStack.pop());
        }
        stack = nextStack;
      }
    }
    // drop any empty stacks at the end beyond the first one
    if (this.stacks.length > 1 && this.stacks[this.stacks.length - 1].length === 0) {
      this.stacks.pop();
    }

    return value;
  }
}
*/
