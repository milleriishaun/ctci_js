var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('sortedMerge1', function() {
    sortedMerge1([1, 2, 3, 3, 5], [6, 7, 7, 9, 10]);
  })
  .add('sortedMerge2', function() {
    sortedMerge2([1, 2, 3, 3, 5], [6, 7, 7, 9, 10]);
  })
  .add('sortedMerge3', function() {
    sortedMerge3([1, 2, 3, 3, 5], [6, 7, 7, 9, 10]);
  })
  // .add('sortedMerge3', function() {
  //   sortedMerge3([1, 2, 3, 3, 5], [6, 7, 7, 9, 10]);
  // })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });

// CTCI JS (good full c10, with time and space clearly shown)
// algo sol (ok for c10, missing q:4,6,7,9,10,11, clear format, <10 months old)
// stackhouse (only q:1,3)

// Just try to have CTCI JS...
// Just accommodate algo sol and stackhouse.
// (these are just for reference/roundedness)

// CTCI JS
// algo sol
// stackhouse

/** SORTED MERGE
 * I:
 * O:
 * C:
 * E:
 */

// Time Complexity: O(n)
// Time Complexity: O(n)
// Try 1 //

// results:
// repeat above for next 10 problems in Chap 10 of CtCI

/** SORTED MERGE
 * I: two sorted arrays(A, B)
 * O: merged B into A in sorted order
 * C: A has enough buffer to hold B
 * E: B is empty array
 */

// Time Complexity: O(n)
// Time Complexity: O(n)
// Try 2
function sortedMerge1(A, B) {
  let BA = [...A, ...B];
  if ((A.length === 0) | (B.length === 0)) {
    return A.length < B.length ? B : A;
  }
  return BA.sort((a, b) => {
    return a > b;
  });
}

// algo sol
function sortedMerge2(a, b) {
  if (b.length === 0) return a;
  let aIndex = 0;
  let bIndex = 0;
  let result = [];

  while (aIndex < a.length && bIndex < b.length) {
    if (a[aIndex] < b[bIndex]) {
      result.push(a[aIndex]);
      aIndex++;
    } else {
      result.push(b[bIndex]);
      bIndex++;
    }
  }
  return result.concat(a.slice(aIndex)).concat(b.slice(bIndex));
}

// CTCI JS
const sortedMerge3 = (a, b) => {
  if (a === undefined || b === undefined) {
    return 'where are your arrays?';
  } else {
    // naive solution: create new array and merge
    // create new array
    let answer = [];
    // declare pointers for A and B
    let pointerA = 0;
    let pointerB = 0;
    // use pointers to iterate through A and B and insert elements into new array
    /* 
    while (pointerA < a.length || pointerB < b.length) {
      if (pointerA === a.length) {
        answer.push(b[pointerB]);
        pointerB++;
      } else if (pointerB === b.length) {
        answer.push(a[pointerA]);
        pointerA++;
      } else if (a[pointerA] < b[pointerB]) {
        answer.push(a[pointerA]);
        pointerA++;
      } else {
        answer.push(b[pointerB]);
        pointerB++;
      }
    }
    return answer;
    */

    // in-place solution: merge into A in place
    // helper function: move back array one space, from pointer to end
    const moveBack = (arr, pt, end) => {
      let currPt = end;
      while (currPt > pt) {
        arr[currPt] = arr[currPt - 1];
        currPt--;
      }
    };

    let end = a.length;
    // while pointerB is still traversing through B
    while (pointerB < b.length) {
      // if pointerA is done traversing (should just append all of B to back of A)
      if (pointerA === end) {
        a[pointerA] = b[pointerB];
        pointerA++;
        pointerB++;
        end++;
        // else if value at pointerA is smaller that value at pointerB (should not insert, continue traversing A)
      } else if (a[pointerA] < b[pointerB]) {
        pointerA++;
      } else {
        // otherwise move all elements from pointerA back by one space, and insert value at pointerB into a
        moveBack(a, pointerA, end);
        a[pointerA] = b[pointerB];
        pointerA++;
        pointerB++;
        end++;
      }
    }
    return a;
  }
};

// TEST

// // sortedMerge is callable
// console.log(sortedMerge2() === 'where are your arrays?');

// // sortedMerge merges in order
// console.log(
//   JSON.stringify(sortedMerge2([0, 2, 4], [1, 3, 5])) ===
//     JSON.stringify([0, 1, 2, 3, 4, 5])
// );

// // sortedMerges sorted arrays
// console.log(
//   JSON.stringify(sortedMerge2([0, 1, 2], [3, 4, 5])) ===
//     JSON.stringify([0, 1, 2, 3, 4, 5])
// );

// // sortedMerge merges empty arrays
// console.log(
//   JSON.stringify(sortedMerge2([0, 1, 2], [])) === JSON.stringify([0, 1, 2])
// );

// // Time Complexity: O(n)
// // Time Complexity: O(n)
// // Try 1 ... fails
// function sortedMergeX1(A, B) {
//   let BA = A.length <= B.length ? B : A;
//   if ((A.length === 0) | (B.length === 0)) {
//     return A.length < B.length ? B : A;
//   }
//   for (let i = 0; i < (A.length <= B.length ? A.length : B.length); i++) {
//     if (A[i] < B[i]) {
//       BA.splice(i, 0, A[i]);
//       i--;
//     }
//   }
//   return BA;
// }

// // stackhouse ... fail
// function sortedMergeX2(A, B) {
//   let swap_index = A.length - 1;
//   let B_index = B.length - 1;
//   let A_index = 0;
//   for (let [index, value] of A.entries()) {
//     if (!value) {
//       A_index = index - 1;
//       break;
//     }
//   }

//   while (B_index >= 0) {
//     if (B[B_index] >= A[A_index] || !A[A_index]) {
//       A[swap_index] = B[B_index];
//       B_index--;
//       swap_index--;
//     } else {
//       A[swap_index] = A[A_index];
//       A[A_index] = null;
//       A_index--;
//       swap_index--;
//     }
//   }
//   console.log(A);
//   return A;
// }

console.log(
  JSON.stringify(sortedMerge1([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])) ===
    JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
);
console.log(
  JSON.stringify(sortedMerge1([1, 2, 3, 3, 5], [6, 7, 7, 9, 10])) ===
    JSON.stringify([1, 2, 3, 3, 5, 6, 7, 7, 9, 10])
);
console.log(
  JSON.stringify(sortedMerge1([1, 2, 3, 3, 5], [3, 5, 7, 9, 10])) ===
    JSON.stringify([1, 2, 3, 3, 3, 5, 5, 7, 9, 10])
);
console.log('---------------------------------------------');
console.log(
  JSON.stringify(sortedMerge2([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])) ===
    JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
);
console.log(
  JSON.stringify(sortedMerge2([1, 2, 3, 3, 5], [6, 7, 7, 9, 10])) ===
    JSON.stringify([1, 2, 3, 3, 5, 6, 7, 7, 9, 10])
);
console.log(
  JSON.stringify(sortedMerge2([1, 2, 3, 3, 5], [3, 5, 7, 9, 10])) ===
    JSON.stringify([1, 2, 3, 3, 3, 5, 5, 7, 9, 10])
);

console.log('---------------------------------------------');
console.log(
  JSON.stringify(sortedMerge3([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])) ===
    JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
);
console.log(
  JSON.stringify(sortedMerge3([1, 2, 3, 3, 5], [6, 7, 7, 9, 10])) ===
    JSON.stringify([1, 2, 3, 3, 5, 6, 7, 7, 9, 10])
);
console.log(
  JSON.stringify(sortedMerge3([1, 2, 3, 3, 5], [3, 5, 7, 9, 10])) ===
    JSON.stringify([1, 2, 3, 3, 3, 5, 5, 7, 9, 10])
);

// console.log(
//   JSON.stringify(sortedMerge4([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])) ===
//     JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// );
// console.log(
//   JSON.stringify(sortedMerge4([1, 2, 3, 3, 5], [6, 7, 7, 9, 10])) ===
//     JSON.stringify([1, 2, 3, 3, 5, 6, 7, 7, 9, 10])
// );
// console.log(
//   JSON.stringify(sortedMerge4([1, 2, 3, 3, 5], [3, 5, 7, 9, 10])) ===
//     JSON.stringify([1, 2, 3, 3, 3, 5, 5, 7, 9, 10])
// );

// // results:
// sortedMerge1 x 731,128 ops/sec ±2.37% (47 runs sampled)
// sortedMerge2 x 1,344,047 ops/sec ±1.75% (49 runs sampled)
// sortedMerge3 x 11,303,217 ops/sec ±2.58% (48 runs sampled)
// Fastest is sortedMerge3
