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
// sorting algorithm
// one pass
// for each member, do a comparison with left and right
// alternately check if it is a peak or a valley
// time complexity: O(N)
// space complexity: O(1)

function swap(array, i, j) {
  const valueI = array[i];
  const valueJ = array[j];
  array[i] = valueJ;
  array[j] = valueI;
}

function peaksAndValleys(array) {
  if (!Array.isArray(array)) {
    return 'where is your array?';
  }
  let isPeak = true;
  let curr;
  let right;
  for (let i = 0; i < array.length - 1; i++) {
    curr = array[i];
    right = array[i + 1];
    if (isPeak) {
      if (curr < right) {
        swap(array, i, i + 1);
      }
    } else {
      if (curr > right) {
        swap(array, i, i + 1);
      }
    }
    isPeak = !isPeak;
  }
  return array;
}

/* TEST */
// function can be called
console.log(peaksAndValleys() === 'where is your array?');

// more tests needed

console.log(peaksAndValleys([5, 3, 1, 2, 3]));
console.log(peaksAndValleys([20, 3, 1, 2, 4]));
console.log(peaksAndValleys([4, 3, 20, 2, 5]));
console.log(peaksAndValleys([11, 13, 14, 15, 14])); // the equal sign messes it

// algo sol ... none
// stackhouse ... none

/** PEAKS AND VALLEYS
 * I: arrays of integers
 * O: sorted array with consecutive peaks and valleys
 * C: every undefined position is a valid value of the two to define if peak or valley
 * E: 1. all numbers are the same
 *    2. there are some duplicates
 *    3. out of bounds = adjacent only to min and max indices of the array
 */

// Time Complexity: O(n)
// Time Complexity: O(n)
// Try 1 //this one doesn't pass the duplicates tests,b ut passes the others
function peaksAndValleys2(arr) {
  let newArr = [];
  let newArr2 = [];
  for (let i = 1; i <= arr.length; i++) {
    if (arr[i] + 1 === undefined) {
      return 'DNE';
    } else if (arr[i] >= arr[i] + 1 && arr[i] >= arr[i] - 1) {
      newArr.push(arr[i]);
    } else {
      newArr2.push(arr[i]);
    }
  }
  for (let j = 1; j <= newArr.length; j++) {
    if (newArr[j] < newArr[i] + 1 && newArr[i] < newArr[i] - 1) {
      newArr2.push(newArr[i]);
    }
    j--;
  }

  // this discrepancy b/c of looping with before+after
  newArr2.unshift(arr[0]);
  newArr2.pop();
  return newArr2;
}
console.log('-----------------------------------------');
console.log(peaksAndValleys2([5, 3, 1, 2, 3]));
console.log(peaksAndValleys2([20, 3, 1, 2, 4]));
console.log(peaksAndValleys2([4, 3, 20, 2, 5]));
console.log(peaksAndValleys2([11, 13, 14, 15, 14])); // the equal sign messes it

// results:
