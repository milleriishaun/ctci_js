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

Stack.prototype.peek = function() {
  return this.storage[this.storage.length - 1];
};

Stack.prototype.sort = function() {
  let temp = new Stack();
  while (this.size()) {
    let t = this.pop();
    while (temp.size() && temp.peek() < t) {
      this.push(temp.pop());
    }
    temp.push(t);
  }

  this.storage = temp.storage;
};

let s = new Stack();
s.push(4);
s.push(1);
s.push(3);
s.push(6);
s.push(5);

s.sort();
console.log(s);
console.log(s.peek());

// algo sol
function sort(array) {
  let stack = array;
  let curr = array[array.length - 1];
  let temp = [];
  while (stack.length > 0) {
    if (curr >= temp[temp.length - 1] || temp.length === 0) {
      temp.push(curr);
      curr = stack.pop();
    } else {
      stack.push(temp.pop());
    }
  }
  while (temp.length > 0) {
    stack.push(temp.pop());
  }
  return stack;
}

let ans = sort([5, 8, 2, 6, 4, 1, 7, 3]);
console.log(ans);

// // CTCI JS
// // Notes:
// // hold the smallest item as a variable, put the rest into the other stack.
// // pop back the stack, place the smallest item into the bottom, and repeat.
// // when completed, pop back into original stack.

// var Stack = require('./../util/Stack');

// var sortStack = function(stack) {
//   var tempStack = new Stack();
//   var currMin = Infinity;
//   var stackDepth = 0;

//   while (!stack.isEmpty()) {
//     if (stack.peek() <= currMin) {
//       if (currMin !== Infinity) {
//         tempStack.push(currMin);
//       }
//       currMin = stack.pop();
//     } else {
//       tempStack.push(stack.pop());
//     }
//     stackDepth++;
//   }

//   while (!tempStack.isEmpty()) {
//     stack.push(tempStack.pop());
//   }

//   tempStack.push(currMin);
//   currMin = Infinity;
//   stackDepth--;

//   while (stackDepth > 0) {

//     while (!stack.isEmpty()) {
//       if (stack.peek() <= currMin) {
//         if (currMin !== Infinity) {
//           tempStack.push(currMin);
//         }
//         currMin = stack.pop();
//       } else {
//         tempStack.push(stack.pop());
//       }
//     }

//     for (var i = 0; i < stackDepth - 1; i++) {
//       stack.push(tempStack.pop());
//     }

//     tempStack.push(currMin);
//     currMin = Infinity;
//     stackDepth--;
//   }

//   while (!tempStack.isEmpty()) {
//     stack.push(tempStack.pop());
//   }

//   return stack;
// };

// /* TEST */
// var s = new Stack();
// s.push(99);
// s.push(4);
// s.push(1);
// s.push(6);
// s.push(8);
// s.push(10);
// s.push(22);
// s.push(3);
// s.push(72);

// var sortS = sortStack(s);

// while (!sortS.isEmpty()) {
//   console.log(sortS.pop());
// }

/*
// CTCI JS Sol1
const isEmpty = (stack) => !stack.length;
const peek = (stack) => stack[stack.length - 1];

// MY SOLUTION

const sort = (stack, value) => {
  let index = 0;
  while (value < stack[index]) index++;
  stack.splice(index, 0, value);
};

export const sortStack1 = (stack) => {
  if (!Array.isArray(stack)) throw Error('Invalid input');

  const newStack = [stack.pop()];
  while (!isEmpty(stack)) sort(newStack, stack.pop());
  return newStack;
};

// CTCI JS Sol2
// BOOK SOLUTION
// MOVES NUMBERS BACK AND FORTH BETWEEN STACK AND TEMP TO SORT

export const sortStack2 = (stack) => {
  if (!Array.isArray(stack)) throw Error('Invalid input');

  const temp = [];
  while (!isEmpty(stack)) {
    const popped = stack.pop();
    while (!isEmpty(temp) && peek(temp) > popped) {
      stack.push(temp.pop());
    }
    temp.push(popped);
  }

  while (!isEmpty(temp)) stack.push(temp.pop());

  return stack;
};
*/

// // CTCI ES5
// /**
//  * Sort the stack by taking one item off the input stack at a time, find the
//  * right place within the processed items in the temp stack to insert it into.
//  * Insertion is done by holding the next value aside and moving the temp stack
//  * values into the input stack until the right spot is found.
//  *
//  * N = |stack|
//  * Time: O(N^2)
//  * Additional space: O(1) - while there are 2 stacks there are only a fixed
//  * number of items.
//  */
// export function sortStack(stack) {
//   let temp = [];
//   temp.push(stack.pop());
//   while (!isEmpty(stack)) {
//     let curr = stack.pop(),
//       count = 0;

//     while (!isEmpty(temp) && curr < peek(temp)) {
//       stack.push(temp.pop());
//       ++count;
//     }
//     temp.push(curr);
//     for (let i = 0; i < count; ++i) {
//       temp.push(stack.pop());
//     }
//   }

//   while (!isEmpty(temp)) {
//     stack.push(temp.pop());
//   }

//   return stack;
// }

// function peek(stack) {
//   return stack[stack.length - 1];
// }

// function isEmpty(stack) {
//   return stack.length === 0;
// }
