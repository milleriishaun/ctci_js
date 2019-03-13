var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('recursiveMultiply1', function() {
    recursiveMultiply1(50, 25);
  })
  .add('recursiveMultiply2', function() {
    recursiveMultiply2(50, 25);
  })
  .add('recursiveMultiply3', function() {
    recursiveMultiply3(50, 25);
  })
  .add('recursiveMultiply4', function() {
    recursiveMultiply4(50, 25);
  })
  .add('recursiveMultiply5', function() {
    recursiveMultiply5(50, 25);
  })
  .add('recursiveMultiply6', function() {
    recursiveMultiply6(50, 25);
  })
  .add('recursiveMultiply7', function() {
    recursiveMultiply7(50, 25);
  })
  .add('recursiveMultiply8', function() {
    recursiveMultiply8(50, 25);
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

// CTCI JS Sol3
// MEMOIZED
function recursiveMultiply1(a, b) {
  const bigger = a < b ? b : a,
    smaller = a < b ? a : b;
  return smaller && bigger ? multiply2(smaller, bigger) : 0;
}

function multiply2(smaller, bigger, memo = []) {
  if (smaller === 1) return bigger;
  // 1 * bigger = bigger
  else if (memo[smaller]) return memo[smaller];

  /* Compute half. If uneven, compute other half. If even, double it. */
  const halfOfSmaller = smaller >> 1; // Divide by 2
  const half1 = multiply2(halfOfSmaller, bigger);
  let half2 = half1;

  if (smaller % 2 === 1) {
    half2 = multiply2(smaller - halfOfSmaller, bigger, memo);
  }

  memo[smaller] = half1 + half2;
  return memo[smaller];
}

/** RECURSIVE MULTIPLY
 * I: 2 integers
 * O: multiplied together result
 * C: can't use *, optimize(for number of operations)
 * E: none.
 */

// Time Complexity: O(n)
// Space Complexity: O(n)
// Try 1
function recursiveMultiply2(a, b) {
  if (a <= 1) {
    return b;
  }
  return b + recursiveMultiply2(a - 1, b); // what I was forgetting for the
  // longest time, was that the returned result should be the thing added to.
}

// CTCI JS Sol1
function recursiveMultiply3(
  a,
  b,
  max = Math.max(a, b),
  product = 0,
  times = Math.min(a, b)
) {
  return times
    ? recursiveMultiply3(a, b, max, product + max, times - 1)
    : product;
}

// algo sol
// Author's answer :Solution #3
// This answer is not optimized
// https://www.geeksforgeeks.org/multiply-two-numbers-without-using-multiply-division-bitwise-operators-and-no-loops/
// (1) Decide bigger/smaller - if smaller is 1, bigger is the return
function recursiveMultiply4(a, b) {
  let bigger = a < b ? b : a;
  let smaller = a < b ? a : b;
  let memo = new Array(smaller + 1);
  return minProduct(smaller, bigger, memo);
}

function minProduct(smaller, bigger, memo) {
  // (2) Base case
  if (smaller === 0) {
    return 0;
  } else if (smaller === 1) {
    return bigger;
  }

  // (3) Recursive Case
  let s = Math.floor(smaller / 2);
  let side1 = minProduct(s, bigger, memo); // for odd
  let side2 = side1;
  if (s % 2 === 1) {
    // for event
    side2 = minProduct(smaller - s, bigger, memo);
  }

  // (4) Return the answer
  memo[smaller] = side1 + side2;
  return memo[smaller];
}

// CTCI JS
var recursiveMultiply5 = function(a, b) {
  if (a < 0 || b < 0) {
    throw 'error: a and b should only be positive integers';
  }
  if (b === 0) {
    return 0;
  } else if (b === 1) {
    return a;
  } else {
    return a + recursiveMultiply5(a, b - 1);
  }
};

// CTCI JS Sol2
function recursiveMultiply6(a, b) {
  const bigger = a < b ? b : a,
    smaller = a < b ? a : b;
  return smaller && bigger ? multiply1(smaller, bigger) : 0;
}

function multiply1(smaller, bigger) {
  if (smaller === 1) return bigger; // 1 * bigger = bigger

  /* Compute half. If uneven, compute other half. If even, double it. */
  const halfOfSmaller = smaller >> 1; // Divide by 2
  const half1 = multiply1(halfOfSmaller, bigger);
  let half2 = half1;

  if (smaller % 2 === 1) {
    half2 = multiply1(smaller - halfOfSmaller, bigger);
  }
  return half1 + half2;
}

// stackhouse
function recursiveMultiply7(a, b) {
  // Using the larger number for the addition will mean fewer recursive calls.
  // E.g. (3 * 2) === (2 + 2 + 2) === (3 + 3) <-- Fewer operations
  let [factor_1, factor_2] = a > b ? [a, b] : [b, a];
  let helper = (factor_2, total) => {
    if (factor_2 === 0) {
      return total;
    } else if (factor_2 === 1) {
      return factor_1;
    } else if (factor_2 % 2 === 0) {
      // If factor_2 is even, calculate the product of half of factor_2 and factor_1 and double it.
      // E.g. 5 * 6 === 5(3 * 2)
      total += helper(factor_2 >> 1, total);
      return total + total;
    } else {
      // If factor_2 is odd, subtract 1 to make it even, do the same halving and doubling as above, and
      // add factor_1 at the end to calculate the final result.
      // E.g. 5 * 7 === 5(3 * 2) + 5
      total += helper((factor_2 - 1) >> 1, total);
      total += total;
      total += factor_1;
      return total;
    }
  };
  return helper(factor_2, 0);
}

// CTCI JS Sol4
// O(log smallerNum) TIME
function recursiveMultiply8(a, b) {
  const bigger = a < b ? b : a,
    smaller = a < b ? a : b;
  return smaller && bigger ? multiply3(smaller, bigger) : 0;
}

function multiply3(smaller, bigger) {
  if (smaller === 1) return bigger; // 1 * bigger = bigger

  const halfOfSmaller = smaller >> 1, // Divide by 2
    halfProduct = multiply3(halfOfSmaller, bigger),
    halfPlusHalf = halfProduct + halfProduct;

  return smaller % 2 === 0 ? halfPlusHalf : halfPlusHalf + bigger;
}

console.log(recursiveMultiply1(3, 4), 12);
console.log(recursiveMultiply2(3, 4), 12);
console.log(recursiveMultiply3(3, 4), 12);
console.log(recursiveMultiply4(3, 4), 12);
console.log(recursiveMultiply5(3, 4), 12);
console.log(recursiveMultiply6(3, 4), 12);
console.log(recursiveMultiply7(3, 4), 12);
console.log(recursiveMultiply8(3, 4), 12);

// // results:
// recursiveMultiply1 x 1,224,831 ops/sec ±3.10% (48 runs sampled)
// recursiveMultiply2 x 2,800,049 ops/sec ±1.30% (52 runs sampled)
// recursiveMultiply3 x 3,179,042 ops/sec ±1.53% (51 runs sampled)
// recursiveMultiply4 x 5,295,378 ops/sec ±1.95% (52 runs sampled)
// recursiveMultiply5 x 5,592,411 ops/sec ±2.07% (52 runs sampled)
// recursiveMultiply6 x 5,929,188 ops/sec ±1.95% (49 runs sampled)
// recursiveMultiply7 x 7,204,012 ops/sec ±4.14% (47 runs sampled)
// recursiveMultiply8 x 27,358,103 ops/sec ±3.32% (46 runs sampled)
// Fastest is recursiveMultiply8
