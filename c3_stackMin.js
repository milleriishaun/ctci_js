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

Stack.prototype.push = function(v) {
  if (!this.size()) {
    this.storage.push({ value: v, min: v });
  } else {
    const min = this.storage[this.size() - 1].min;
    if (v < min) {
      this.storage.push({ value: v, min: v });
    } else {
      this.storage.push({ value: v, min: min });
    }
  }
};

Stack.prototype.min = function() {
  if (!this.size()) return null;

  return this.storage[this.size() - 1].min;
};

let s = new Stack();

s.push(5);
s.push(4);
s.push(3);
s.push(6);
s.push(7);

console.log(s.min());

// algo sol
function Min_Stack() {
  let stack = [];
  let minStack = [];

  this.isEmpty = function() {
    return stack.length === 0;
  };

  this.push = function(elem) {
    if (this.isEmpty()) {
      stack.push(elem);
      minStack.push(elem);
    } else {
      if (minStack[minStack.length - 1] > elem) {
        minStack.push(elem);
      }
      stack.push(elem);
    }
    return console.log(stack);
  };

  this.pop = function() {
    if (this.isEmpty()) {
      return null;
    } else {
      if (minStack[minStack.length - 1] === stack[stack.length - 1]) {
        stack.pop();
        minStack.pop();
      } else {
        stack.pop();
      }
      return console.log('min', minStack, 'stack', stack);
    }
  };
}

let s1 = new Min_Stack();
s1.push(5);
s1.push(3);
s1.push(8);
s1.push(2);
s1.push(5);
s1.pop();
s1.pop();
s1.pop();
s1.pop();

// // CTCI JS
// var Stack = require('./../util/Stack');

// // Approach, keep an additional stack that keeps the mins
// var stackMin = function() {
//   this.stack = new Stack();
//   this.minStack = new Stack();
//   this.currMin = undefined;
// };

// stackMin.prototype.push = function(value) {
//   if (this.currMin === undefined || value <= this.currMin) {
//     this.minStack.push(this.currMin);
//     this.currMin = value;
//   }
//   this.stack.push(value);
// };

// stackMin.prototype.pop = function() {
//   var answer = this.stack.pop();
//   if (answer === this.currMin) {
//     this.currMin = this.minStack.pop();
//   }
//   return answer;
// };

// stackMin.prototype.peek = function() {
//   return this.stack.peek();
// };

// stackMin.prototype.isEmpty = function() {
//   return this.stack.isEmpty();
// };

// stackMin.prototype.min = function() {
//   return this.currMin;
// };

// /* TEST */

// var s = new stackMin();
// s.push(9);
// s.push(8);
// s.push(1);
// s.push(2);
// s.push(1);
// s.push(9);

// console.log(s.min(), 1);
// s.pop();
// s.pop();
// console.log(s.peek(), 2);
// console.log(s.min(), 1);
// s.pop();
// s.pop();
// console.log(s.peek(), 8);
// console.log(s.min(), 8);
// s.pop();
// s.pop();
// console.log(s.isEmpty(), true);
// console.log(s.min(), undefined);

/*
// CTCI JS Sol1
// USES ADDITIONAL ARRAY TO KEEP TRACK OF MIN'S AND COUNTERS TO KEEP
// TRACK OF ARRAY LENGTHS
export class MinStack1 {
  constructor() {
    this._stack = [];
    this._minStack = [];
    this._stackLength = this._minStackLength = 0;
  }

  push(value) {
    this._stack[this._stackLength] = value;
    this._stackLength++;

    const min = this._minStack[this._minStackLength - 1];
    if (min === undefined || value <= min) {
      this._minStack[this._minStackLength] = value;
      this._minStackLength++;
    }
  }

  pop() {
    if (!this.isEmpty()) {
      const stackTop = this._stack[this._stackLength - 1];
      this._stack[this._stackLength - 1] = null;
      this._stackLength--;

      if (stackTop === this._minStack[this._minStackLength - 1]) {
        this._minStack[this._minStackLength - 1] = null;
        this._minStackLength--;
      }

      return stackTop;
    }
  }

  min() {
    return this._minStack[this._minStackLength - 1];
  }

  peek() {
    return this._stack[this._stackLength - 1];
  }

  isEmpty() {
    return this._stackLength === 0;
  }
}

// CTCI JS Sol2
// USES AN OBJECT FOR EVERY PUSHED NUMBER TO KEEP TRACK OF THE MIN AT
// THAT POINT IN THE STACK
export class MinStack2 {
  constructor() {
    this._stack = [];
  }

  push(value) {
    const min = this.min();
    this._stack.push({
      value,
      min: Math.min(min !== undefined ? min : Number.POSITIVE_INFINITY, value)
    });
  }

  pop() {
    if (!this.isEmpty()) {
      const item = this._stack.pop();
      return item.value;
    }
  }

  peek() {
    if (!this.isEmpty()) {
      const item = this._stack[this._stack.length - 1];
      return item.value;
    }
  }

  min() {
    if (!this.isEmpty()) {
      const item = this._stack[this._stack.length - 1];
      return item.min;
    }
  }

  isEmpty() {
    return this._stack.length === 0;
  }
}

// CTCI JS Sol3
// USING PUSH AND POP METHODS AND NOT MANUALLY KEEPING TRACK OF
// STACK LENGTHS
export class MinStack3 {
  constructor() {
    this._stack = [];
    this._minStack = [];
  }

  push(value) {
    this._stack.push(value);

    const min = this._minStack[this._minStack.length - 1];
    if (min === undefined || value <= min) {
      this._minStack.push(value);
    }
  }

  pop() {
    if (!this.isEmpty()) {
      const poppedValue = this._stack.pop();

      if (poppedValue === this._minStack[this._minStack.length - 1]) {
        this._minStack.pop();
      }

      return poppedValue;
    }
  }

  min() {
    return this._minStack[this._minStack.length - 1];
  }

  peek() {
    return this._stack[this._stack.length - 1];
  }

  isEmpty() {
    return this._stack.length === 0;
  }
}
*/

// // CTCI ES5
// /**
//  * MinStack maintains a current stack minimum by putting an object on the stack
//  * that holds the value and the minimum at that time rather than just the value.
//  * When items are popped the value is returned without the wrapping object. When
//  * minimum is called we return the min property of the wrapping object.
//  *
//  * Time: push O(1), pop O(1), peek O(1), min O(1)
//  * Additional space: push O(N), pop O(1), peek O(1), min O(1)
//  * Additional space required in push to create wrapping object to hold min at
//  * that point.
//  */
// export class MinStack {
//   constructor() {
//     this._stack = [];
//   }

//   push(value) {
//     let min = this.min();
//     this._stack.push({
//       value: value,
//       min: Math.min(min !== undefined ? min : Number.POSITIVE_INFINITY, value)
//     });
//   }

//   pop() {
//     if (!this.isEmpty()) {
//       let item = this._stack.pop();
//       return item.value;
//     }
//   }

//   peek() {
//     if (!this.isEmpty()) {
//       let item = this._stack[this._stack.length - 1];
//       return item.value;
//     }
//   }

//   min() {
//     if (!this.isEmpty()) {
//       let item = this._stack[this._stack.length - 1];
//       return item.min;
//     }
//   }

//   isEmpty() {
//     return this._stack.length === 0;
//   }
// }
