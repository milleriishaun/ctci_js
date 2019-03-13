var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('powerSet1', function() {
    powerSet1([5, 6, 7, 8]);
  })
  .add('powerSet2', function() {
    powerSet2([5, 6, 7, 8]);
  })
  .add('powerSet3', function() {
    powerSet3([5, 6, 7, 8]);
  })
  .add('powerSet4', function() {
    powerSet4([5, 6, 7, 8]);
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

// CTCI JS
var powerSet1 = function(set) {
  var subsets = [];
  var recurse = function(currSet, remainingSet) {
    subsets.push(currSet);
    for (var i = 0; i < remainingSet.length; i++) {
      recurse(currSet.concat([remainingSet[i]]), remainingSet.slice(i + 1));
    }
  };
  recurse([], set);
  return subsets;
};

// CTCI JS Sol1
// O(N2ˆn) TIME AND SPACE
// 2ˆn SUBSETS --- EACH ELEMENT WILL BE IN 2ˆn-1 (half) SUBSETS
// TOTAL NUMBER OF ELEMENTS IN SUBSETS IS N*2ˆn-1

function powerSet2(set, index = set.length - 1) {
  let allSubsets;

  if (!!~index) {
    allSubsets = powerSet2(set, index - 1);

    const item = set[index],
      { length } = allSubsets;
    for (let i = 0; i < length; i++) {
      allSubsets.push([...allSubsets[i], item]);
    }
  } else {
    allSubsets = [[]];
  }

  return allSubsets;
}

// CTCI JS Sol2
// originally named: powerSetIterative
function powerSet3(set) {
  let allSubsets = [];
  const max = 1 << set.length;

  for (let k = 0; k < max; k++) {
    const subset = convertNumToSet(k, set);
    allSubsets.push(subset);
  }
  return allSubsets;
}

function convertNumToSet(x, set) {
  const subset = [];
  let index = 0;

  for (let k = x; k > 0; k >>= 1) {
    if ((k & 1) === 1) subset.push(set[index]);
    index++;
  }
  return subset;
}

// algo sol // this one is broken with all the null values in the arr
// https://www.geeksforgeeks.org/finding-all-subsets-of-a-given-set-in-java/
// This is more direct
// https://www.youtube.com/watch?v=bGC2fNALbNU
function powerSet4(arr) {
  let subset = new Array(arr.length);
  helper(arr, subset, 0);
}

function helper(arr, subset, i) {
  // base case
  if (i === arr.length) {
    // console.log(
    //   subset.filter(el => {
    //     return el !== null;
    //   })
    // );
  }
  //
  else {
    subset[i] = null;
    helper(arr, subset, i + 1);
    subset[i] = arr[i];
    helper(arr, subset, i + 1);
  }
}

// stackhouse ... this one is wrong... so it is left out

// /** POWER SET
//  * I: a Set
//  * O: all subsets of a Set
//  * C: none
//  * E: none
//  */

// // Time Complexity: O(n)
// // Space Complexity: O(n)
// // Try 1
// // well to get every permutation, we would just print out all permutations.
// // This makes sense if there was some kind of permutation printer.
// // The last time I worked on this, the set was a string, 'abcd'.
// // this failed.
// Fail, I had the goal wrong. This was supposed to be about the boundary changing.
// function powerSetX1(set) {
//   let start = 0;
//   let end = set.length - 1;
//   newArr = [];
//   listedArr = [];
//   for (let i = 0; i < set.length; i++) {
//     for (let j = 0; j < set.length; j++) {
//       if (newArr.length !== set.length) {
//         newArr.push(set[j]);
//       } else {
//         console.log(newArr);
//         listedArr.push(newArr);
//         newArr = [];
//       }
//     }
//   }
// }

// Test
// Note: That the results in these tests show that it is not just the intervals,
// it can also mean that numbers in between are taken out. I would not know this
// from my own solution. Still I can find which is faster.
console.log(powerSet1([1, 2, 3, 4]));
console.log('------------------------1------------------------');
console.log(powerSet2(['a', 'b', 'c']));
console.log(powerSet2([1, 2, 3, 4]));
console.log('------------------------2------------------------');
console.log(powerSet3(['x', 'y', 'z']));
console.log(powerSet3([5, 6, 7, 8]));
console.log('------------------------3------------------------');
console.log(powerSet4([1, 2, 3, 4]));
console.log('------------------------4------------------------');

// results:
console.log(powerSet1([5, 6, 7, 8]));
console.log(powerSet2([5, 6, 7, 8]));
console.log(powerSet3([5, 6, 7, 8]));
console.log(powerSet4([5, 6, 7, 8]));

// powerSet1 x 273,397 ops/sec ±1.60% (59 runs sampled)
// powerSet2 x 274,523 ops/sec ±1.71% (59 runs sampled)
// powerSet3 x 1,777,624 ops/sec ±1.91% (60 runs sampled)
// powerSet4 x 4,776,736 ops/sec ±3.30% (55 runs sampled)
// Fastest is powerSet4
