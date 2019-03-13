var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// // add tests
// suite
//   .add('stackOfBoxes1', function() {
//     stackOfBoxes1(10);
//   })
//   .add('stackOfBoxes1', function() {
//     stackOfBoxes1(10);
//   })
//   .add('stackOfBoxes1', function() {
//     stackOfBoxes1(10);
//   })
//   .add('stackOfBoxes1', function() {
//     stackOfBoxes1(10);
//   })
//   .add('stackOfBoxes1', function() {
//     stackOfBoxes1(10);
//   })
//   // add listeners
//   .on('cycle', function(event) {
//     console.log(String(event.target));
//   })
//   .on('complete', function() {
//     console.log('Fastest is ' + this.filter('fastest').map('name'));
//   })
//   // run async
//   .run({ async: true });

// CTCI JS (good full c8, with time and space clearly shown)
// CTCI JS Sol (great full c8, has multiple applications, time and space)
// algo sol (2nd Best for c3, missing q:6,13,14, clear format, <10 months old)
// stackhouse (only q:1345)

// Just try to have CTCI JS and CTCI JS Sol...
// Just accommodate algo sol and stackhouse. They are too formal.

// CTCI JS
var dp = {};

var findStackables = (boxes, basebox) => {
  var stackables = [];
  // for each box, check all other boxes for which it is dominant
  boxes.forEach(box => {
    if (
      box.height < basebox.height &&
      box.width < basebox.width &&
      box.depth < basebox.depth
    ) {
      stackables.push(box);
    }
  });
  return stackables;
};

var stackBoxes = function(boxes) {
  if (boxes === undefined) {
    return 'where are your boxes?';
  }

  if (boxes.length === 0) {
    return 0;
  }
  boxes.sort();
  var key = JSON.stringify(boxes);
  if (dp[key] === undefined) {
    var height = 0;
    /* find max height of stack by doing the following:
        -for each box
        -find stackables from the remaining box stack
        -add height of box plus a recursive call to stackables
        -if height is larger than the max height so far, set it as max height
    */
    boxes.forEach(box => {
      var stackables = findStackables(boxes, box);
      var currHeight = box.height + stackBoxes(stackables);
      height = Math.max(currHeight, height);
    });
    dp[key] = height;
  }
  return dp[key];
};

// Test

// 'able to call stackBoxes
console.log(stackBoxes() === 'where are your boxes?');

// 'able to stack one box
const box1a = {
  width: 1,
  height: 1,
  depth: 1
};
console.log(stackBoxes([box1a]) === 1);

// 'able to stack one box and return height
const box1b = {
  width: 1,
  height: 100,
  depth: 1
};
console.log(stackBoxes([box1b]) === 100);

// 'able to stack two increasingly large boxes
const box1c = {
  width: 1,
  height: 1,
  depth: 1
};
const box2c = {
  width: 2,
  height: 2,
  depth: 2
};
console.log(stackBoxes([box1c, box2c]) === 3);

// 'able to stack three increasingly large boxes
const box1d = {
  width: 1,
  height: 1,
  depth: 1
};
const box2d = {
  width: 2,
  height: 2,
  depth: 2
};
const box3d = {
  width: 3,
  height: 3,
  depth: 3
};
console.log(stackBoxes([box1d, box2d, box3d]) === 6);

// 'able to stack three increasingly large boxes out of order
const box1e = {
  width: 1,
  height: 1,
  depth: 1
};
const box2e = {
  width: 2,
  height: 2,
  depth: 2
};
const box3e = {
  width: 3,
  height: 3,
  depth: 3
};
console.log(stackBoxes([box2e, box3e, box1e]) === 6);

// 'unable to stack three boxes, one tall, one wide, one deep
const box1f = {
  width: 3,
  height: 1,
  depth: 1
};
const box2f = {
  width: 1,
  height: 3,
  depth: 1
};
const box3f = {
  width: 1,
  height: 1,
  depth: 3
};
console.log(stackBoxes([box1f, box2f, box3f]) === 3);

// CTCI JS Sol ... no more solutions
// algo sol ... no more solutions
// stackhouse ... no more solutions

/** STACK OF BOXES
 * I: n boxes, different l,w,h for each box
 * O: height of the highest possible stack
 * C: each box is larger than the one above it
 * E: no boxes, n = 0
 */

// Time Complexity: O(n)
// Space Complexity: O(n)
// Try 1

// results:
// nothing to compare with, and the problem is pretty hard for an interview.
// The problem seems like an Amazon interview problem.
