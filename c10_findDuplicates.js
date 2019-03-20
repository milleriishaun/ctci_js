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
// 1. sort numbers
// 2. stream through numbers and print elements which is a duplicate of
// the immediate previous number

// algo sol
// GeeksForGeeks
// this one fails because the Q just asks for 'how would you print all dups'.
function dups(arr) {
  let obj = {};
  let ans = [];
  if (arr.length === 0) return null;
  else {
    arr.map(item => {
      if (obj.hasOwnProperty(item)) {
        if (obj[item] === 1) {
          ans.push(item);
        }
        obj[item]++;
      } else {
        obj[item] = 1;
      }
    });
    return ans;
  }
}
let ans1 = dups([1, 2, 3]);
let ans2 = dups([1, 2, 2]);
let ans3 = dups([3, 3, 3]);
let ans4 = dups([2, 1, 2, 1]);
console.log('ans:', ans1, 'ans:', ans2, 'ans:', ans3, 'ans:', ans4);

// stackhouse ... none

/** FIND DUPLICATES
 * I: array with numbers 1 to N
 * O: steps to print all duplicates
 * C: N unknown, N at most 32,000, 4 KB memory available
 * E: There are no duplicates.
 */

// Time Complexity: O(n)
// Time Complexity: O(n)
// Try 1 //this is not something I could come up with
// well, 4 KB = 4 000 bytes
// and 32 000 nonnegative integers means 32000 * 8 bytes = 256 000 bytes
// That means, it would take a minimum of 64 iterations to sort.
// Printing all duplicates means comparison must be done... at least with pointers.
// so the work can be done in constant time at least through pointer references.
// This is as much as I could muster up from the info so far.

// results:
