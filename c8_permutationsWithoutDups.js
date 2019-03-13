var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('permutationsWithoutDups1', function() {
    permutationsWithoutDups1('', 'abcd', result);
  })
  .add('permutationsWithoutDups2', function() {
    permutationsWithoutDups2('abcd');
  })
  .add('permutationsWithoutDups3', function() {
    permutationsWithoutDups3('abcd');
  })
  .add('permutationsWithoutDups4', function() {
    permutationsWithoutDups4('abcd');
  })
  .add('permutationsWithoutDups5', function() {
    permutationsWithoutDups5('abcd');
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

// algo sol2
// Author's answer:
// without duplicates
let before;
let after;
let words;
let result = [];
let c;
function permutationsWithoutDups1(prefix, remainder, result) {
  if (remainder === null) return null;
  if (remainder.length === 0) {
    result.push(prefix);
  }

  for (let i = 0; i < remainder.length; i++) {
    before = remainder.substring(0, i); // before,after,function
    after = remainder.substring(i + 1);
    c = remainder.charAt(i);
    permutationsWithoutDups1(prefix + c, before + after, result); // return
  }
  return result;
}

// CTCI JS Sol3
// Uses every letter of string as the first char and appends every permutation to it
// Passes permutations back up the stack
function permutationsWithoutDups2(str) {
  const result = [],
    { length } = str;

  if (!length) {
    result.push(str);
    return result;
  }

  for (let i = 0; i < length; i++) {
    // Remove char at i and find perms of remaining
    const remaining = str.slice(0, i) + str.slice(i + 1);
    const perms = permutationsWithoutDups2(remaining);

    for (const perm of perms) {
      result.push(str[i] + perm);
    }
  }

  return result;
}

// CTCI JS
var permutationsWithoutDups3 = function(string) {
  var answers = [];
  var recurse = function(currPerm, remainingChars) {
    if (remainingChars.length === 0) {
      answers.push(currPerm);
    } else {
      for (var i = 0; i < remainingChars.length; i++) {
        recurse(
          currPerm + remainingChars.charAt(i),
          remainingChars.slice(0, i) + remainingChars.slice(i + 1)
        );
      }
    }
  };
  recurse('', string);
  return answers;
};

// CTCI JS Sol1
// Solutions for permutations without duplicate characters in original string.
// UPPER BOUND OF FUNCTION CALLS: O(N * !N)
// RUNTIME WILL NOT EXCEED: O(Nˆ2 * !N)
// Pushes every prefix down the stack
function permutationsWithoutDups4(str, prefix = '', result = []) {
  const { length } = str;
  if (!length) return result.push(prefix);

  for (let i = 0; i < length; i++) {
    permutationsWithoutDups4(
      str.slice(0, i) + str.slice(i + 1),
      prefix + str[i],
      result
    );
  }

  return result;
}

// CTCI JS Sol2
// Inserts every letter of string into every position of all permutations
// Passes permutations back up the stack
function permutationsWithoutDups5(str, result = []) {
  if (!str) {
    result.push(str);
    return result;
  }

  const prefix = str[0],
    words = permutationsWithoutDups5(str.slice(1));

  for (const word of words) {
    const { length } = word;
    for (let i = 0; i <= length; i++) {
      // Insert prefix into every position
      const perm = word.slice(0, i) + prefix + word.slice(i);
      result.push(perm);
    }
  }

  return result;
}

// stackhouse ... no more solutions

// /** PERMUTATIONS WITHOUT DUPS
//  * I:
//  * O:
//  * C:
//  * E:
//  */
// // Time Complexity: O(n)
// // Space Complexity: O(n)
// // Try 1 // almost gave up, but tried anyway ...isn't really recursive
// // Missed the number of times that I would have to loop.
// // That means that I need to calculate the exponential(str.length!).
// // Even with the exponential known, my solution would be too bloated.
// // This is the kind of problem where it would really be good to record myself
// // solving it, since it is true that I need to mold my mind to solving in front
// // others in high pressure situations.
// function permutationsWithoutDupsX1(str) {
//   let arr = str.split('').slice();
//   let newArr = [];
//   let temp;
//   let listArr = [];
//   for (let i = 1; i <= str.length; i++) {
//     temp = arr[0];
//     if (i === str.length) {
//       newArr.push();
//     } else {
//       newArr.push[i - 1];
//     }
//     if (newArr.length === str.length) {
//       listArr.push(newArr.join(''));
//       newArr = [];
//     }
//   }
//   return listArr;
// }

// // algo sol1
// // My answer: O(n)
// // O(n) + extra space
// // https://www.geeksforgeeks.org/permutations-of-a-given-string-using-stl/

// function PermutationsWithoutDups(str) {
//   let result = [];
//   for (let i = 0; i < str.length; i++) {
//     if (result.length === 0 || result.indexOf(str.charAt(i)) === -1) {
//       result.push(str.charAt(i));
//     }
//   }
//   return result;
// }

console.log(permutationsWithoutDups1('', 'abcd', result));
console.log(permutationsWithoutDups2('abcd'));
console.log(permutationsWithoutDups3('abcd'));
console.log(permutationsWithoutDups4('abcd'));
console.log(permutationsWithoutDups5('abcd'));

// // results:
// // Note: sol1 uses different input parameters... (very by-the-book(btb))
// // Note: sol5 became fastest because it works better than the others when
// // there are more values in the string to account for.
// permutationsWithoutDups1 x 150,991 ops/sec ±19.33% (46 runs sampled)
// permutationsWithoutDups2 x 163,502 ops/sec ±1.62% (59 runs sampled)
// permutationsWithoutDups3 x 364,855 ops/sec ±3.11% (46 runs sampled)
// permutationsWithoutDups4 x 387,739 ops/sec ±1.37% (54 runs sampled)
// permutationsWithoutDups5 x 434,190 ops/sec ±1.27% (50 runs sampled)
// Fastest is permutationsWithoutDups5
