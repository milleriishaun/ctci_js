var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('coins1', function() {
    coins1(50);
  })
  .add('coins2', function() {
    coins2(50);
  })
  .add('coins3', function() {
    coins3(50);
  })
  .add('coins4', function() {
    coins4(50);
  })
  .add('coins5', function() {
    coins5(50);
  })
  .add('coins6', function() {
    coins6(50);
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

// CTCI JS Sol4
// O(2ˆn) TIME
function coins1(cents, coins = [25, 10, 5, 1], index = 0) {
  if (cents < 0) return 0;
  if (cents === 0) return 1;

  // means index passed last coin and cents > 0 so no solution
  if (index === coins.length && cents > 0) return 0;

  return (
    coins1(cents - coins[index], coins, index) + coins1(cents, coins, index + 1)
  );
}

// CTCI JS Sol2
// Memoized
function coins2(cents, coins = [25, 10, 5, 1], index = 0, map = {}) {
  const mapKey = `${cents}, ${index}`;
  if (map[mapKey] > 0) return map[mapKey];
  if (index >= coins.length - 1) return 1;

  const coin = coins[index];
  let ways = 0;

  for (let i = 0; i * coin <= cents; i++) {
    const remainingCents = cents - i * coin;
    ways += coins2(remainingCents, coins, index + 1, map);
  }

  map[mapKey] = ways;
  return ways;
}

// algo sol3
// Boaz's answer
function coins3(amount, denoms = [25, 10, 5, 1]) {
  if (denoms.length <= 1) return 1;
  const denomAmount = denoms[0];
  const nextDenoms = denoms.slice(1);
  let ways = 0;
  for (let i = 0; i * denomAmount <= amount; i++) {
    const remaining = amount - i * denomAmount;
    ways += coins3(remaining, nextDenoms);
  }
  return ways;
}

// CTCI JS Sol3
function coins4(cents, coins = [1, 10, 5, 25]) {
  const cache = new Array(cents + 1).fill(0);
  const { length } = coins;

  cache[0] = 1;

  for (let i = 0; i < length; i++) {
    for (let x = coins[i]; x <= cents; x++) {
      cache[x] += cache[x - coins[i]];
    }
  }

  return cache[cents];
}

// CTCI JS Sol1
function coins5(cents, coins = [25, 10, 5, 1], index = 0) {
  if (index >= coins.length - 1) return 1;

  const coin = coins[index];
  let ways = 0;

  for (let i = 0; i * coin <= cents; i++) {
    const remainingCents = cents - i * coin;
    ways += coins5(remainingCents, coins, index + 1);
  }

  return ways;
}

// CTCI JS
var dp = {};
var coins6 = function(value, currCoin) {
  if (currCoin === undefined) {
    currCoin = 1;
  }
  if (value < 0) {
    return 0;
  } else {
    var key = `${value}:${currCoin}`;
    if (dp[key] === undefined) {
      if (value === 0) {
        dp[key] = 1;
      } else {
        var ways = 0;
        if (currCoin <= 1) {
          ways += coins6(value - 1, 1);
        }
        if (currCoin <= 5) {
          ways += coins6(value - 5, 5);
        }
        if (currCoin <= 10) {
          ways += coins6(value - 10, 10);
        }
        if (currCoin <= 25) {
          ways += coins6(value - 25, 25);
        }
        /*

          added provision if half dollars and dollar coins are added,
          but that would be unamerican.

          if (currCoin <= 50) {
            ways += coins(value - 50, 50);
          }
          if (currCoin <= 100) {
            ways += coins(value - 100, 100);
          }

        */
        dp[key] = ways;
      }
    }
    return dp[key];
  }
};

// stackhouse ... no more solutions

/** Coins
 * I:
 * O:
 * C:
 * E:
 */

// Time Complexity: O(n)
// Time Complexity: O(n)
// Try 1 ... actually, this is the kind of problem I could expect to see on an
// interview. I should make sure to understand this stuff.

// // algo sol2 ... this one fails because it exceeds the call stack.
// // my answer
// function coinsX1(total) {
//   let list = [];
//   helper(total, 0, 0, 0, 0, list);
//   return list;
// }

// function helper(remains, twentyFive, ten, five, one, list) {
//   if (remains <= 0) {
//     list.push([twentyFive, ten, five, one]);
//   }
//   if (twentyFive < ten || ten < five || five < one) {
//     return;
//   }

//   helper(remains - 25, twentyFive + 1, ten, five, one, list);
//   helper(remains - 10, twentyFive, ten + 1, five, one, list);
//   helper(remains - 5, twentyFive, ten, five + 1, one, list);
//   helper(remains - 1, twentyFive, ten, five, one + 1, list);
// }

// // algo sol1 ... this one fails because it get s the wrong solution
// // https://www.youtube.com/watch?v=sn0DWI-JdNA
// // http://www.yujinc.com/8-11-coins-cci/

// function coinsX2(total, coins) {
//   let tail = coins.slice(0); // clone coins, because we're about to modify it
//   let head = tail.shift(); // grab the first coin out of the purse

//   // If total is less than zero, or there are no coins left, this isn't a match
//   if (total < 0 || !head) {
//     return 0;
//   }
//   // If the total reached 0, this is a match
//   else if (total === 0) {
//     return 1;
//   }
//   // Otherwise, branch
//   else {
//     // The first branch sends the total and a subset of `coins`
//     // The second branch send a reduced total, and all the `coins`
//     return coinsX2(total, tail) + coinsX2(total - head, coins);
//   }
// }

// Tests
console.log(
  coins1(0) === 1,
  coins1(1) === 1,
  coins1(2) === 1,
  coins1(3) === 1,
  coins1(4) === 1,
  coins1(5) === 2,
  coins1(17) === 6,
  coins1(100) === 242
);

console.log(
  coins2(0) === 1,
  coins2(1) === 1,
  coins2(2) === 1,
  coins2(3) === 1,
  coins2(4) === 1,
  coins2(5) === 2,
  coins2(17) === 6,
  coins2(100) === 242
);

console.log(
  coins3(0) === 1,
  coins3(1) === 1,
  coins3(2) === 1,
  coins3(3) === 1,
  coins3(4) === 1,
  coins3(5) === 2,
  coins3(17) === 6,
  coins3(100) === 242
);

console.log(
  coins4(0) === 1,
  coins4(1) === 1,
  coins4(2) === 1,
  coins4(3) === 1,
  coins4(4) === 1,
  coins4(5) === 2,
  coins4(17) === 6,
  coins4(100) === 242
);

console.log(
  coins5(0) === 1,
  coins5(1) === 1,
  coins5(2) === 1,
  coins5(3) === 1,
  coins5(4) === 1,
  coins5(5) === 2,
  coins5(17) === 6,
  coins5(100) === 242
);

console.log(
  coins6(0) === 1,
  coins6(1) === 1,
  coins6(2) === 1,
  coins6(3) === 1,
  coins6(4) === 1,
  coins6(5) === 2,
  coins6(17) === 6,
  coins6(100) === 242
);

// console.log(
//   coins7(0) === 1,
//   coins7(1) === 1,
//   coins7(2) === 1,
//   coins7(3) === 1,
//   coins7(4) === 1,
//   coins7(5) === 2,
//   coins7(17) === 6,
//   coins7(100) === 242
// );

// // results:
// coins1 x 57,433 ops/sec ±1.75% (50 runs sampled)
// coins2 x 72,916 ops/sec ±1.99% (49 runs sampled)
// coins3 x 739,330 ops/sec ±2.49% (51 runs sampled)
// coins4 x 1,314,001 ops/sec ±1.64% (50 runs sampled)
// coins5 x 1,427,961 ops/sec ±2.12% (51 runs sampled)
// coins6 x 27,890,144 ops/sec ±2.20% (52 runs sampled)
// Fastest is coins6
