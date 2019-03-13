var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('parens1', function() {
    parens1(3);
  })
  .add('parens2', function() {
    parens2(3);
  })
  .add('parens3', function() {
    parens3(3);
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

// CTCI JS (good full c8, with time and space clearly shown)
// CTCI JS Sol (great full c8, has multiple applications, time and space)
// algo sol (2nd Best for c3, missing q:6,13,14, clear format, <10 months old)
// stackhouse (only q:1345)

// Just try to have CTCI JS and CTCI JS Sol...
// Just accommodate algo sol and stackhouse. They are too formal.

// CTCI JS Sol
var parens1 = function(n) {
  var answers = [];
  var recurse = function(currParens, remainingPairs) {
    if (remainingPairs === 0) {
      answers.push(currParens);
    } else {
      var used = {};
      if (!used[`(${currParens})`]) {
        used[`(${currParens})`] = true;
        recurse(`(${currParens})`, remainingPairs - 1);
      }
      if (!used[`()${currParens}`]) {
        used[`()${currParens}`] = true;
        recurse(`()${currParens}`, remainingPairs - 1);
      }
      if (!used[`${currParens}()`]) {
        used[`${currParens}()`] = true;
        recurse(`${currParens}()`, remainingPairs - 1);
      }
    }
  };
  recurse('', n);
  return answers;
};

// CTCI JS
var parens2 = function(n) {
  var answers = [];
  var recurse = function(currParens, remainingPairs) {
    if (remainingPairs === 0) {
      answers.push(currParens);
    } else {
      var used = {};
      if (!used[`(${currParens})`]) {
        used[`(${currParens})`] = true;
        recurse(`(${currParens})`, remainingPairs - 1);
      }
      if (!used[`()${currParens}`]) {
        used[`()${currParens}`] = true;
        recurse(`()${currParens}`, remainingPairs - 1);
      }
      if (!used[`${currParens}()`]) {
        used[`${currParens}()`] = true;
        recurse(`${currParens}()`, remainingPairs - 1);
      }
    }
  };
  recurse('', n);
  return answers;
};

// algo sol
function addParens(list, leftRem, rightRem, str, index) {
  if (leftRem < 0 || rightRem < leftRem) {
    return;
  }
  if (leftRem === 0 && rightRem === 0) {
    list.push(str.join(''));
  } else {
    str[index] = '(';
    addParens(list, leftRem - 1, rightRem, str, index + 1);
    str[index] = ')';
    addParens(list, leftRem, rightRem - 1, str, index + 1);
  }
}

function parens3(count) {
  let str = new Array(count * 2);
  let list = [];
  addParens(list, count, count, str, 0);
  return list;
}

// stackhouse ... no more solutions

/** PARENS
 * I:
 * O:
 * C:
 * E:
 */

// Time Complexity: O(n)
// Time Complexity: O(n)
// Try 1 ... didn't attempt because have pseudocode and it is basically the previous
// problem with a left paren at the front and a right paren at the end.

console.log(parens1(3));
console.log(parens2(3));
console.log(parens3(3));

// // results:
// parens1 x 305,662 ops/sec ±2.64% (48 runs sampled)
// parens2 x 320,286 ops/sec ±1.79% (49 runs sampled)
// parens3 x 467,418 ops/sec ±3.20% (48 runs sampled)
// Fastest is parens3
