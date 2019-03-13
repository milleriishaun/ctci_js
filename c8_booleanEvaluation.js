var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// // add tests
// suite
//   .add('booleanEvaluation1', function() {
//     booleanEvaluation1(10);
//   })
//   .add('booleanEvaluation2', function() {
//     booleanEvaluation2(10);
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

// CTCI JS
let dp = {};
const countEval = (booleans, result) => {
  if (booleans === undefined) {
    return "where's your boolean?";
  } else if (booleans.length % 2 === 0) {
    return "your expression is a little strange. you sure it's right?";
  } else if (booleans.length === 1) {
    if (eval(booleans) === result) {
      return 1;
    } else {
      return 0;
    }
  } else {
    const key = `${booleans}:${result}`;
    if (dp[key] === undefined) {
      let count = 0;
      let left;
      let right;
      for (let i = 1; i < booleans.length; i = i + 2) {
        left = booleans.slice(0, i);
        right = booleans.slice(i + 1);
        if (eval('0' + booleans[i] + '0') === result) {
          count += countEval(left, 0) * countEval(right, 0);
        }

        if (eval('0' + booleans[i] + '1') === result) {
          count += countEval(left, 0) * countEval(right, 1);
        }

        if (eval('1' + booleans[i] + '0') === result) {
          count += countEval(left, 1) * countEval(right, 0);
        }

        if (eval('1' + booleans[i] + '1') === result) {
          count += countEval(left, 1) * countEval(right, 1);
        }
      }
      dp[key] = count;
    }
    return dp[key];
  }
};

/* TEST */
// able to call booleanEval
console.log(countEval() === "where's your boolean?");

// 0| throws an error
console.log(
  countEval('0|') ===
    "your expression is a little strange. you sure it's right?"
);

// 0 evaluates to 1 false
console.log(countEval('0', 0) === 1);

// 0 evaluates to 0 true
console.log(countEval('0', 1) === 0);

// 1 evaluates to 1 true
console.log(countEval('1', 1) === 1);

// 1 evaluates to 0 false
console.log(countEval('1', 0) === 0);

// 1|1 evaluates to 1 true
console.log(countEval('1|1', 0) === 0);

// 1^0|0|1 evaluates to 2 false
console.log(countEval('1^0|0|1', 0) === 2);

// 0&0&0&1^1|0 evaluates to 10 true
console.log(countEval('0&0&0&1^1|0', 1) === 10);

// CTCI JS Sol ... no more solutions
// algo sol ... no more solutions
// stackhouse ... no more solutions

/** BOOLEAN EVALUATION
 * I: string, boolean
 * O: count of the number of ways of parenthesizing the expression
 * C: optimize, no extraneous parenthesis
 * E: empty string/expression
 */

// Time Complexity: O(n)
// Space Complexity: O(n)
// Try 1

// results:
// nothing to compare with, and the problem is pretty hard for an interview.
// The problem seems like an Amazon interview problem.
