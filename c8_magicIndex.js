var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('magicIndex1', function() {
    magicIndex1([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]);
  })
  .add('magicIndex2', function() {
    magicIndex2([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]);
  })
  .add('magicIndex3', function() {
    magicIndex3([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]);
  })
  .add('magicIndex4', function() {
    magicIndex4([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]);
  })
  .add('magicIndex5', function() {
    magicIndex5([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]);
  })
  .add('magicIndex6', function() {
    magicIndex6([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]);
  })
  .add('magicIndex7', function() {
    magicIndex7([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]);
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

// stackhouse
function magicIndex1(array) {
  let helper = (array, index) => {
    let value_at_index = array[0];
    if (value_at_index === index) {
      return index;
    } else if (array.length === 0) {
      return -1;
    } else {
      if (value_at_index > index) {
        return helper(array.slice(value_at_index - index), value_at_index);
      } else {
        return helper(array.slice(1), index + 1);
      }
    }
  };
  return helper(array, 0);
}

// CTCI JS Sol1
// O(N) TIME
function magicIndex2(arr) {
  for (const [index, num] of arr.entries()) {
    if (index === num) return index;
  }
  return -1;
}

// CTCI JS Sol4
// Works with non-distinct values
// originally called : magicIndex_NonDistinct
function magicIndex3(arr, start = 0, end = arr.length - 1) {
  if (end < start) return -1;

  const midIndex = Math.floor((start + end) / 2),
    valueAtHalf = arr[midIndex];

  if (midIndex === valueAtHalf) return midIndex;

  const leftIndex = Math.min(midIndex - 1, valueAtHalf),
    left = magicIndex3(arr, start, leftIndex);
  if (left >= 0) return left;

  const rightIndex = Math.max(midIndex + 1, valueAtHalf);
  return magicIndex3(arr, rightIndex, end);
}

// algo sol2
// Author's answer O(logN) <- Binary Search
function magicIndex4(arr, start = 0, end = arr.length - 1) {
  if (end < start) {
    return -1;
  }
  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === mid) {
    return mid;
  } else if (arr[mid] > mid) {
    return magicIndex4(arr, start, mid - 1);
  } else if (arr[mid] < mid) {
    return magicIndex4(arr, mid + 1, end);
  }
}

// CTCI JS Sol3
// O(log N) TIME --- O(log N) SPACE (UNLESS THERE IS TAIL RECURSION)
// Only works with distinct values
// originally named: magicIndex_BSrecursive
function magicIndex5(arr, start = 0, end = arr.length - 1) {
  if (end < start) return -1;
  const midIndex = Math.floor((start + end) / 2);

  if (midIndex === arr[midIndex]) return midIndex;
  else if (midIndex < arr[midIndex])
    return magicIndex5(arr, start, midIndex - 1);
  else return magicIndex5(arr, midIndex + 1, end);
}

// CTCI JS Sol2
// O(log N) TIME --- O(1) SPACE
// Only works with distinct values
function magicIndex6(arr) {
  let head = 0,
    tail = arr.length - 1;

  while (head <= tail) {
    const midIndex = Math.floor((head + tail) / 2);
    if (midIndex === arr[midIndex]) return midIndex;
    else if (midIndex < arr[midIndex]) tail = midIndex - 1;
    else head = midIndex + 1;
  }

  return -1;
}

// CTCI JS
var magicIndex7 = function(array, start, end) {
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = array.length - 1;
  }

  var mid = Math.floor(start + (end - start) / 2);

  if (mid === start && array[mid] !== mid) {
    return -1;
  } else if (array[mid] === mid) {
    return mid;
  } else if (mid < array[mid]) {
    return magicIndex7(array, start, mid);
  } else {
    return magicIndex7(array, mid, end);
  }
};

// /** MAGIC INDEX
//  * I: A[0... n -1] as a sorted array of integers
//  * O: magic index if one exists
//  * C: within array A
//  * E: there is no index where A[i] = i
//  */

// // Time Complexity: O(n)
// // Space Complexity: O(n)
// // Try 1
// function magicIndexX1(arr) {
//   if (arr.length === 1) {
//     return arr[0];
//   }
//   // the end goal is that if arr[i] = i
//   // the bisection will be the place of the i
//   let midPoint = arr[Math.floor(arr.length / 2)];
//   if (midPoint < arr[Math.floor((arr.length - 1) / 2)]) {
//     console.log('bisectLeft', arr);
//     return magicIndex(arr.slice(0, Math.floor(arr.length / 2)));
//   } else if (midPoint > arr[Math.floor((arr.length - 1) / 2)]) {
//     console.log('bisectRight', arr);
//     return magicIndex(arr.slice(Math.floor(arr.length / 2)));
//   } else {
//     return 'Magic Index DOES NOT EXIST';
//   }
//   // this failed because I don't know hwo to keep the index value i in the orig.
// }

// // algo sol1
// // My Answer O(n) ... fails
// function magicIndex6(arr) {
//   arr.map((item, index) => {
//     if (item === index) return true;
//   });
//   return false;
// }

// // algo sol3
// // Count occurrences of a number in a sorted array with duplicates using Binary Search
// // https://www.youtube.com/watch?v=pLT_9jwaPLs
// // NOT WORKING

// function magicFact(arr) {
//   return checkArr(arr, 0, arr.length - 1)
// }

// function checkArr(arr, start, end) {
//   if (start > end) {
//       return -1
//   }

//   let midIndex = Math.floor(start + end) / 2
//   let midValue = arr[midIndex]

//   if (midValue === midIndex){
//       return midIndex
//   }
//   let leftIndex = Math.min(midIndex - 1, midValue)
//   let left = checkArr(arr, start, leftIndex)
//   if (left >= 0) {
//       return left
//   }

//   let rightIndex = Math.min(midIndex + 1, midValue)
//   let right = checkArr(arr, rightIndex, end)
//   return right
// }

// let ans = magicFact([-10, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13])
// console.log(ans)

// Distinct (except the last 2 which are NonDistinct)
// (sol5 is the only one that needs to pass the NonDistinct Values tests)
// Note that sol8 also passes NonSDistinct Tests, but that could be coincidence.
console.log(magicIndex1([-20, -10, 0, 1, 2, 5, 7, 8]), 5); // 5
console.log(magicIndex1([-1, 0, 1, 3, 9, 100]), 3);
console.log(magicIndex1([-1, 0, 1, 2, 3, 5, 100, 200, 300, 400]), 5);
console.log(magicIndex1([-1, 0, 1, 3, 10, 15, 20, 22, 27, 30]), 3);
console.log(magicIndex1([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]), 7);
console.log(magicIndex1([5, 5, 5, 5, 5, 5]), 5); // would need to be in linear runtime if values are not distinct
console.log(magicIndex1([-10, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13]), 2);
console.log('----------------------1-----------------------------');

console.log(magicIndex2([-20, -10, 0, 1, 2, 5, 7, 8]), 5); // 5
console.log(magicIndex2([-1, 0, 1, 3, 9, 100]), 3);
console.log(magicIndex2([-1, 0, 1, 2, 3, 5, 100, 200, 300, 400]), 5);
console.log(magicIndex2([-1, 0, 1, 3, 10, 15, 20, 22, 27, 30]), 3);
console.log(magicIndex2([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]), 7);
console.log(magicIndex2([5, 5, 5, 5, 5, 5]), 5); // would need to be in linear runtime if values are not distinct
console.log(magicIndex2([-10, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13]), 2);
console.log('------------------------2---------------------------');

console.log(magicIndex3([-20, -10, 0, 1, 2, 5, 7, 8]), 5); // 5
console.log(magicIndex3([-1, 0, 1, 3, 9, 100]), 3);
console.log(magicIndex3([-1, 0, 1, 2, 3, 5, 100, 200, 300, 400]), 5);
console.log(magicIndex3([-1, 0, 1, 3, 10, 15, 20, 22, 27, 30]), 3);
console.log(magicIndex3([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]), 7);
console.log(magicIndex3([5, 5, 5, 5, 5, 5]), 5); // would need to be in linear runtime if values are not distinct
console.log(magicIndex3([-10, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13]), 2);
console.log('------------------------3---------------------------');

console.log(magicIndex4([-20, -10, 0, 1, 2, 5, 7, 8]), 5); // 5
console.log(magicIndex4([-1, 0, 1, 3, 9, 100]), 3);
console.log(magicIndex4([-1, 0, 1, 2, 3, 5, 100, 200, 300, 400]), 5);
console.log(magicIndex4([-1, 0, 1, 3, 10, 15, 20, 22, 27, 30]), 3);
console.log(magicIndex4([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]), 7);
console.log(magicIndex4([5, 5, 5, 5, 5, 5]), 5); // would need to be in linear runtime if values are not distinct
console.log(magicIndex4([-10, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13]), 2);
console.log('------------------------4---------------------------');

console.log(magicIndex5([-20, -10, 0, 1, 2, 5, 7, 8]), 5); // 5
console.log(magicIndex5([-1, 0, 1, 3, 9, 100]), 3);
console.log(magicIndex5([-1, 0, 1, 2, 3, 5, 100, 200, 300, 400]), 5);
console.log(magicIndex5([-1, 0, 1, 3, 10, 15, 20, 22, 27, 30]), 3);
console.log(magicIndex5([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]), 7);
console.log(magicIndex5([5, 5, 5, 5, 5, 5]), 5); // would need to be in linear runtime if values are not distinct
console.log(magicIndex5([-10, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13]), 2);
console.log('------------------------5---------------------------');

console.log(magicIndex6([-20, -10, 0, 1, 2, 5, 7, 8]), 5); // 5
console.log(magicIndex6([-1, 0, 1, 3, 9, 100]), 3);
console.log(magicIndex6([-1, 0, 1, 2, 3, 5, 100, 200, 300, 400]), 5);
console.log(magicIndex6([-1, 0, 1, 3, 10, 15, 20, 22, 27, 30]), 3);
console.log(magicIndex6([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]), 7);
console.log(magicIndex6([5, 5, 5, 5, 5, 5]), 5); // would need to be in linear runtime if values are not distinct
console.log(magicIndex6([-10, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13]), 2);
console.log('------------------------6---------------------------');

console.log(magicIndex7([-20, -10, 0, 1, 2, 5, 7, 8]), 5); // 5
console.log(magicIndex7([-1, 0, 1, 3, 9, 100]), 3);
console.log(magicIndex7([-1, 0, 1, 2, 3, 5, 100, 200, 300, 400]), 5);
console.log(magicIndex7([-1, 0, 1, 3, 10, 15, 20, 22, 27, 30]), 3);
console.log(magicIndex7([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]), 7);
console.log(magicIndex7([5, 5, 5, 5, 5, 5]), 5); // would need to be in linear runtime if values are not distinct
console.log(magicIndex7([-10, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13]), 2);
console.log('------------------------7---------------------------');

// console.log(magicIndex9([-20, -10, 0, 1, 2, 5, 7, 8]), 5); // 5
// console.log(magicIndex9([-1, 0, 1, 3, 9, 100]), 3);
// console.log(magicIndex9([-1, 0, 1, 2, 3, 5, 100, 200, 300, 400]), 5);
// console.log(magicIndex9([-1, 0, 1, 3, 10, 15, 20, 22, 27, 30]), 3);
// console.log(magicIndex9([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]), 7);
// console.log(magicIndex9([5, 5, 5, 5, 5, 5]), 5); // would need to be in linear runtime if values are not distinct
// console.log(magicIndex9([-10, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13]), 2);

// // results:
// magicIndex1 x 2,019,408 ops/sec ±7.38% (46 runs sampled)
// magicIndex2 x 3,264,336 ops/sec ±1.45% (50 runs sampled)
// magicIndex3 x 8,004,322 ops/sec ±1.37% (50 runs sampled)
// magicIndex4 x 20,716,077 ops/sec ±4.14% (46 runs sampled)
// magicIndex5 x 22,622,152 ops/sec ±1.85% (52 runs sampled)
// magicIndex6 x 46,508,992 ops/sec ±2.17% (52 runs sampled)
// magicIndex7 x 47,745,770 ops/sec ±1.58% (50 runs sampled)
// Fastest is magicIndex7
