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
// 1. Break up files into files containing one line each
// 2. Iterate through files two by two and merge them
// 3. Keep merging until there is one file
// 4. If there are multiple threads, can dispatch them as multiple jobs to merge files together

// algo sol
// stackhouse

/** SORT BIG FILE
 * I: 20GB file, 1 string per line
 * O: explanation of how to sort the file
 * C: optimize
 * E: handle duplicate strings
 */

// Time Complexity: O(n)
// Time Complexity: O(n)
// Try 1 //idk

// results:
