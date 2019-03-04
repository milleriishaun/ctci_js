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
// algo sol
// CTCI JS
// CTCI JS Sol
// CTCI ES5

// ctci ... none this time

// algo sol ... likely untested ... but does work
function Queue() {
  let numberOfStacks = 3;
  let stackCapacity;
  let values;
  let sizes;

  // make multiple stacks with specific size
  this.fixedMultiStack = function(stackSize) {
    stackCapacity = stackSize;
    values = new Array(numberOfStacks * stackCapacity);
    sizes = new Array(numberOfStacks).fill(0); // to initialize array with 0
    return values;
  };

  this.push = function(stackNum, value) {
    if (this.isFull(stackNum)) {
      console.log('Stack is already full');
    } else {
      sizes[stackNum]++;
      values[this.indexOfTop(stackNum)] = value;
    }
  };

  this.pop = function(stackNum) {
    if (this.isEmpty(stackNum)) {
      console.log('it is empty');
    } else {
      let topIndex = this.indexOfTop(stackNum);
      values[topIndex] = 0;
      sizes[stackNum]--;
      return value;
    }
  };

  // return top element
  this.peek = function(stackNum) {
    let indexOfTop = indexOfTop(stackNum);
    return values[indexOfTop(stackNum)];
  };

  // to check the stack is empty or not
  this.isEmpty = function(stackNum) {
    return sizes[stackNum] === 0;
  };

  // to check the stack is full or not
  this.isFull = function(stackNum) {
    return sizes[stackNum] === stackCapacity;
  };

  // to return index of the top of the stack
  // if there is 13 items in total, it returns 2 (stackSize = 5)
  this.indexOfTop = function(stackNum) {
    let offset = stackNum * stackCapacity; // 2 * 5 = 10
    let size = sizes[stackNum]; // 3
    return offset + size - 1;
  };

  this.print = function() {
    return console.log('sizes', sizes, 'values', values);
  };
}

let q1 = new Queue();
q1.fixedMultiStack(5);
q1.push(0, 1);
q1.push(0, 2);
q1.push(0, 3);
q1.print();
q1.push(1, 1);
q1.push(1, 2);
q1.push(1, 3);
q1.print();

// // CTCI JS
// var ThreeInOne = function() {
//   this.container = [];
//   this.middleBottom = 0;
//   this.middleTop = 0;
// };

// ThreeInOne.prototype.push1 = function(value) {
//   this.container.unshift(value);
//   this.middleBottom++;
//   this.middleTop++;
// };

// ThreeInOne.prototype.push2 = function(value) {
//   this.container.splice(this.middleTop, 0, value);
//   this.middleTop++;
// };

// ThreeInOne.prototype.push3 = function(value) {
//   this.container.push(value);
// };

// ThreeInOne.prototype.pop1 = function() {
//   if (this.isEmpty1()) {
//     return undefined;
//   }
//   var answer = this.container.shift();
//   if (this.middleBottom > 0) {
//     this.middleBottom--;
//     this.middleTop--;
//   }
//   return answer;
// };

// ThreeInOne.prototype.pop2 = function() {
//   if (this.isEmpty2()) {
//     return undefined;
//   }

//   var answer = this.container[this.middleTop - 1];
//   this.container.splice(this.middleTop - 1, 1);
//   if (this.middleBottom < this.middleTop) {
//     this.middleTop--;
//   }
//   return answer;
// };

// ThreeInOne.prototype.pop3 = function(value) {
//   if (this.isEmpty3()) {
//     return undefined;
//   }

//   return this.container.pop(value);
// };

// ThreeInOne.prototype.peek1 = function() {
//   return this.isEmpty1() ? undefined : this.container[0];
// };

// ThreeInOne.prototype.peek2 = function() {
//   return this.isEmpty2() ? undefined : this.container[this.middleTop - 1];
// };

// ThreeInOne.prototype.peek3 = function() {
//   return this.isEmpty3()
//     ? undefined
//     : this.container[this.container.length - 1];
// };

// ThreeInOne.prototype.isEmpty1 = function() {
//   return this.middleBottom === 0;
// };

// ThreeInOne.prototype.isEmpty2 = function() {
//   return this.middleBottom === this.middleTop;
// };

// ThreeInOne.prototype.isEmpty3 = function() {
//   return this.middleTop === this.container.length;
// };

// /* TESTS */

// var t = new ThreeInOne();
// t.push1('1a');
// t.push1('1b');
// t.push1('1c');
// t.push2('2a');
// t.push2('2b');
// t.push2('2c');
// t.push3('3a');
// t.push3('3b');
// t.push3('3c');

// var a1 = t.pop1();
// var a2 = t.pop2();
// var a3 = t.pop3();

// var peek1 = t.peek1();
// var peek2 = t.peek2();
// var peek3 = t.peek3();

// var b1 = t.pop1();
// var b2 = t.pop2();
// var b3 = t.pop3();

// var isEmptya1 = t.isEmpty1();
// var isEmptya2 = t.isEmpty2();
// var isEmptya3 = t.isEmpty3();

// var c1 = t.pop1();
// var c2 = t.pop2();
// var c3 = t.pop3();

// var d1 = t.pop1();
// var d2 = t.pop2();
// var d3 = t.pop3();

// var isEmptyb1 = t.isEmpty1();
// var isEmptyb2 = t.isEmpty2();
// var isEmptyb3 = t.isEmpty3();

// console.log(t.container, t.middleBottom, t.middleTop);
// console.log(a1, a2, a3);
// console.log(peek1, peek2, peek3);
// console.log(b1, b2, b3);
// console.log(isEmptya1, isEmptya2, isEmptya3);
// console.log(c1, c2, c3);
// console.log(d1, d2, d3);
// console.log(isEmptyb1, isEmptyb2, isEmptyb3);

/*
// CTCI JS Sol1
// STACK SIZE IS DYNAMIC
export class TripleStack {
  constructor() {
    this._stack = [];
    this._stackLengths = [0, 0, 0];
  }

  _getLength(stackNum) {
    return this._stackLengths[stackNum - 1];
  }

  push(stackNum, value) {
    const stackIndex = this._getLength(stackNum) * 3 + stackNum - 1;
    this._stack[stackIndex] = value;
    this._stackLengths[stackNum - 1]++;
  }

  pop(stackNum) {
    const stackLength = this._getLength(stackNum);
    let value;

    if (stackLength > 0) {
      const stackIndex = (stackLength - 1) * 3 + stackNum - 1;
      value = this._stack[stackIndex];
      this._stack[stackIndex] = undefined;
      this._stackLengths[stackNum - 1]--;
    }
    return value;
  }

  peek(stackNum) {
    const stackLength = this._getLength(stackNum);
    let value;

    if (stackLength > 0) {
      const stackIndex = (stackLength - 1) * 3 + stackNum - 1;
      value = this._stack[stackIndex];
    }
    return value;
  }

  isEmpty(stackNum) {
    return this._getLength(stackNum) === 0;
  }

}

// CTCI JS Sol2
// BASED OFF FIRST SOLUTION IN BOOK
// STACKS HAVE A FIXED SIZE
class FixedMultiStack {
  constructor(numOfStacks = 3, stackSize = 1) {
    this._numOfStacks = numOfStacks;
    this._stackCapacity = stackSize;
    this._values = new Array(stackSize * this._numOfStacks || 0);
    this._sizes = new Array(this._numOfStacks).fill(0);
  }

  _indexOfTop(stackNum) {
    const offset = (stackNum - 1) * this._stackCapacity,
          size = this._sizes[stackNum - 1];
    return offset + size - 1;
  }

  push(stackNum, value) {
    if (this.isFull(stackNum)) throw Error(`Stack number ${stackNum} is full`);
    this._sizes[stackNum - 1]++;
    this._values[this._indexOfTop(stackNum)] = value;
  }

  pop(stackNum) {
    if (this.isEmpty(stackNum)) throw Error(`Stack number ${stackNum} is empty`);

    const topIndex = this._indexOfTop(stackNum),
          value = this._values[topIndex];

    this._values[topIndex] = undefined;
    this._sizes[stackNum - 1]--;
    return value;
  }

  peek(stackNum) {
    return this._values[this._indexOfTop(stackNum)];
  }

  isEmpty(stackNum) {
    return this._sizes[stackNum - 1] === 0;
  }

  isFull(stackNum) {
    return this._sizes[stackNum - 1] === this._stackCapacity;
  }

}
*/

// CTCI ES5
/**
 * TripleStack class holds 3 stacks in one array. This is done by interleaving
 * the values from the 3 indexes, so the first items are at 0, 1 and 2 and
 * subsequent items are every 3 places from those. This class takes advantage
 * of the fact that JavaScript arrays are dynamic and doesn't hold the stacks
 * to any size. It doesn't reduce the size of the underlying array when items
 * are popped but that could easily be added.
 *
 * Time: push O(1), pop O(1), peek O(1)
 * Additional space: push O(1), pop O(1), peek O(1)
 */
// class TripleStack {
//   constructor() {
//     this._array = [];
//     this._lengths = [0, 0, 0];
//   }

//   _getLength(stack) {
//     return this._lengths[stack - 1];
//   }

//   push(stack, value) {
//     let idx = this._getLength(stack) * 3 + stack - 1;
//     this._array[idx] = value;
//     ++this._lengths[stack - 1];
//   }

//   pop(stack) {
//     let length = this._getLength(stack),
//       value;
//     if (length > 0) {
//       let idx = (length - 1) * 3 + stack - 1;
//       value = this._array[idx];
//       this._array[idx] = undefined;
//       --this._lengths[stack - 1];
//     }
//     return value;
//   }

//   peek(stack) {
//     let length = this._getLength(stack),
//       value;
//     if (length > 0) {
//       let idx = (length - 1) * 3 + stack - 1;
//       value = this._array[idx];
//     }
//     return value;
//   }

//   isEmpty(stack) {
//     return this._getLength(stack) === 0;
//   }
// }
