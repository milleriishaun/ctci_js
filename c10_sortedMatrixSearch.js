// var Benchmark = require('benchmark');
// var suite = new Benchmark.Suite();

// // add tests
// suite
//   .add('sortedMerge1', function() {
//     sortedMerge1([1, 2, 3, 3, 5], [6, 7, 7, 9, 10]);
//   })
//   .add('sortedMerge2', function() {
//     sortedMerge2([1, 2, 3, 3, 5], [6, 7, 7, 9, 10]);
//   })
//   .add('sortedMerge3', function() {
//     sortedMerge3([1, 2, 3, 3, 5], [6, 7, 7, 9, 10]);
//   })
//   // .add('sortedMerge3', function() {
//   //   sortedMerge3([1, 2, 3, 3, 5], [6, 7, 7, 9, 10]);
//   // })
//   // add listeners
//   .on('cycle', function(event) {
//     console.log(String(event.target));
//   })
//   .on('complete', function() {
//     console.log('Fastest is ' + this.filter('fastest').map('name'));
//   })
//   // run async
//   .run({ async: true });

// CTCI JS (good full c10, with time and space clearly shown)
// algo sol (ok for c10, missing q:4,6,7,9,10,11, clear format, <10 months old)
// stackhouse (only q:1,3)

// Just try to have CTCI JS...
// Just accommodate algo sol and stackhouse.
// (these are just for reference/roundedness)

// CTCI JS
const sortedMatrixSearch = (matrix, value, front, back) => {
  if (matrix === undefined) {
    return 'where is your matrix?';
  }
  const m = matrix.length;
  const n = matrix[0].length;

  if (front === undefined && back === undefined) {
    front = 0;
    back = m * n;
  }
  // console.log(front, back);

  if (front >= back) {
    // I changed this from > to >=
    return -1;
  }

  let mid = Math.floor((front + back) / 2);
  const row = Math.floor(mid / n);
  const col = mid % n;

  // this is clear bisection, just as described in my pseudocode
  if (matrix[row][col] === value) {
    return [row, col];
  } else if (value < matrix[row][col]) {
    return sortedMatrixSearch(matrix, value, front, mid);
  } else {
    return sortedMatrixSearch(matrix, value, mid + 1, back);
  }
};

// sortedMatrixSearch can be called
console.log(sortedMatrixSearch() === 'where is your matrix?');

// sortedMatrixSearch finds existing values
console.log(
  JSON.stringify(sortedMatrixSearch([[1, 2], [3, 4]], 3)) ===
    JSON.stringify([1, 0])
);
console.log(
  JSON.stringify(sortedMatrixSearch([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 9)) ===
    JSON.stringify([2, 2])
);
console.log(
  JSON.stringify(sortedMatrixSearch([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1)) ===
    JSON.stringify([0, 0])
);
console.log(
  JSON.stringify(sortedMatrixSearch([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 5)) ===
    JSON.stringify([1, 1])
);

// sortedMatrixSearch returns -1 for value greater than range
console.log(sortedMatrixSearch([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 100) === -1);

// // sortedMatrixSearch returns -1 for value absent from range
console.log(sortedMatrixSearch([[1, 2, 3], [5, 6, 7], [8, 9, 10]], 4) === -1);

// // sortedMatrixSearch returns -1 for value lower than range
console.log(sortedMatrixSearch([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 0) === -1);

// algo sol ... none

// stackhouse ... none

/** SORTED MATRIX SEARCH
 * I: MxN matrix where each row and column is sorted in ascending order
 * O: find element
 * C: optimize
 * E: element outside of MxN range
 */

// Time Complexity: O(n)
// Time Complexity: O(n)
// Try 1 //
function sortedMatrixSearch6(arr, element) {
  // bisection all rows
  // bisection all columns
  // final position available, so check if it matches the element to find.
}

// results:
