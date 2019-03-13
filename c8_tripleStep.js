var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('tripleStep1', function() {
    tripleStep1(10);
  })
  .add('tripleStep2', function() {
    tripleStep2(10);
  })
  .add('tripleStep3', function() {
    tripleStep3(10);
  })
  .add('tripleStep4', function() {
    tripleStep4(10);
  })
  .add('tripleStep5', function() {
    tripleStep5(10);
  })
  .add('tripleStep6', function() {
    tripleStep6(10);
  })
  .add('tripleStep7', function() {
    tripleStep7(10);
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
// CTCI JS Sol (almost full c8, q:13,14 missing, has multiple applications, time and space)
// algo sol (2nd Best for c3, missing q:6,13,14, clear format, <10 months old)
// stackhouse (only q:1345)

// Just try to have CTCI JS and CTCI JS Sol...
// Just accommodate algo sol and stackhouse. They are too formal.

// CTCI JS
// CTCI JS Sol
// algo sol
// stackhouse

// this recursion is failing me.

// CTCI JS
var tripleStep1 = function(N) {
  var answer = 0;
  var recurse = function(number) {
    if (number === 0) {
      answer++;
    } else if (number > 0) {
      recurse(number - 1);
      recurse(number - 2);
      recurse(number - 3);
    }
  };
  recurse(N);
  return answer;
};

// algo sol2
// O(n)
// with memory
function tripleStep2(n) {
  if (n < 0) return 0;
  // n = 1 , n = 2, n<0
  else if (n === 0) return 1;
  else {
    return tripleStep2(n - 1) + tripleStep2(n - 2) + tripleStep2(n - 3);
  }
}

// algo sol1
// O(3^n)
// without memory
function tripleStep3(n) {
  if (n < 0) return 0;
  else if (n === 0) return 1;
  else {
    return tripleStep3(n - 1) + tripleStep3(n - 2) + tripleStep3(n - 3);
  }
}
// tripleStep5(10)

// CTCI JS Sol1
// Approx. O(3ˆn) TIME --- Closer to O(1.84ˆn)
// O(N) SPACE
// Not Optimized
function tripleStep4(steps) {
  if (steps < 0) return 0;
  else if (steps === 0) return 1;

  return (
    tripleStep4(steps - 1) + tripleStep4(steps - 2) + tripleStep4(steps - 3)
  );
}

// console.log("NOT OPTIMIZED:", tripleStep(10));

// stackhouse
function tripleStep5(n) {
  // Cracking the Coding Interview problem 8.1
  // A child is running up a staircase with n steps and can hop either 1 step, 2 steps, or 3 steps at a
  // time. Implement a method to count how many possible ways the child can run up the stairs.

  let cache_table = [];
  let helper = (current_step, total_steps) => {
    if (current_step === total_steps) {
      return 1;
    } else if (current_step > total_steps) {
      return 0;
    } else {
      if (!cache_table[current_step]) {
        cache_table[current_step] =
          helper(current_step + 1, total_steps) +
          helper(current_step + 2, total_steps) +
          helper(current_step + 3, total_steps);
        return cache_table[current_step];
      } else {
        return cache_table[current_step];
      }
    }
  };
  return helper(0, n);
}

// CTCI JS Sol3
// O(N) TIME --- O(N) SPACE
// Top Down
function tripleStep6(steps, memo = []) {
  if (steps < 0) return 0;
  else if (steps === 0) return 1;

  if (!memo[steps]) {
    memo[steps] =
      tripleStep6(steps - 1, memo) +
      tripleStep6(steps - 2, memo) +
      tripleStep6(steps - 3, memo);
  }

  return memo[steps];
}
// console.log("TOP DOWN:", tripleStepTD(50));

// CTCI JS Sol2
// O(N) TIME --- O(1) SPACE
// Bottom Up
function tripleStep7(steps) {
  if (steps <= 2) {
    if (steps < 0) return 0;
    else if (steps === 0) return 1;
    else return steps;
  }

  let a = 1, // One step
    b = 2, // Two steps
    c = 4; // Three steps

  for (let i = 4; i <= steps; i++) {
    const d = a + b + c;
    a = b;
    b = c;
    c = d;
  }

  return c;
}
// console.log("BOTTOM UP:", tripleStepBU(50));

// /** TRIPLE STEP
//  * I: n steps
//  * O: numOfWays
//  * C: none
//  * E: none
//  */

// // Try 1
// // Time Complexity: O(n)
// // Space Complexity: O(n)
// function tripleStepX1(n) {
//   if (n <= 3) {
//     console.log(n + 1);
//     return result1 + 1;
//   }
//   // recurse for n - 1
//   return tripleStepX1(n - 1);
// }

console.log(tripleStep1(5), 13);
console.log(tripleStep2(5), 13);
console.log(tripleStep3(5), 13);
console.log(tripleStep4(5), 13);
console.log(tripleStep5(5), 13);
console.log(tripleStep6(5), 13);
console.log(tripleStep7(5), 13);

// results:
// tripleStep1 x 99,595 ops/sec ±1.30% (50 runs sampled)
// tripleStep2 x 169,591 ops/sec ±1.43% (54 runs sampled)
// tripleStep3 x 166,942 ops/sec ±2.54% (49 runs sampled)
// tripleStep4 x 169,608 ops/sec ±1.17% (54 runs sampled)
// tripleStep5 x 1,746,599 ops/sec ±2.08% (50 runs sampled)
// tripleStep6 x 2,668,341 ops/sec ±2.53% (51 runs sampled)
// tripleStep7 x 71,305,414 ops/sec ±2.56% (52 runs sampled)
// Fastest is tripleStep7
