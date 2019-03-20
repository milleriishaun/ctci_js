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
// helper function
const findEnd = (listy, last, term) => {
  if (last === undefined && term === undefined) {
    last = 0;
    term = 1;
    // edge case where listy is empty
    if (listy.elementAt(last) === -1) {
      return 0;
    }
  }
  if (listy.elementAt(last) !== -1 && listy.elementAt(term) !== -1) {
    return findEnd(listy, last, term * 2);
  } else if (listy.elementAt(last) !== -1 && listy.elementAt(term) === -1) {
    if (last === term - 1) {
      return term;
    }
    const half = Math.floor((term - last) / 2);
    const mid = last + half;
    if (listy.elementAt(mid) === -1) {
      return findEnd(listy, last, mid);
    } else {
      return findEnd(listy, mid, term);
    }
  } else {
    throw `error: index ${last} is ${listy.elementAt(
      last
    )} and ${term} is ${listy.elementAt(term)}`;
  }
};

const sortedSearchNoSize = (listy, value, front, back) => {
  if (listy === undefined) {
    return 'what are we searching?';
  }
  if (front === undefined && back === undefined) {
    front = 0;
    const end = findEnd(listy);
    back = end;
  }
  if (front === back) {
    return -1;
  }
  const half = Math.floor((back - front) / 2);
  const mid = front + half;
  if (listy.elementAt(mid) === value) {
    return mid;
  } else if (value < listy.elementAt(mid)) {
    return sortedSearchNoSize(listy, value, front, mid);
  } else {
    if (mid === back - 1) {
      return -1;
    } else {
      return sortedSearchNoSize(listy, value, mid, back);
    }
  }
};

// TEST

const Listy = require('./c10_listy.js');

// sortedSearchNoSize is available as a function
console.log(sortedSearchNoSize() === 'what are we searching?');

// Listy is working
let listy = new Listy([1, 2, 3, 4]);
console.log(listy.length === undefined);
console.log(listy[1] === undefined);
console.log(listy.length === undefined);
console.log(listy.elementAt(10) === -1);
console.log(listy.elementAt(2) === 3);

// sortedSearchNoSize works as expected
listy = new Listy([2, 3, 4, 6]);
console.log(sortedSearchNoSize(listy, 3) === 1);
console.log(sortedSearchNoSize(listy, 2) === 0);
console.log(sortedSearchNoSize(listy, 6) === 3);
console.log(sortedSearchNoSize(listy, 1) === -1);
console.log(sortedSearchNoSize(listy, 10) === -1);
console.log(sortedSearchNoSize(listy, 5) === -1);

// algo sol ... none
// stackhouse ... none

/** SORTED SEARCH, NO SIZE
 * I: array-like data structure Listy, containing sorted positive integers
 * O: index at which an element x occurs
 * C: optimize
 * E: 1. if x occurs multiple times, any valid index is accepted.
 *    2. if x is not in Listy.
 */

// Time Complexity: O(n)
// Time Complexity: O(n)
// Try 1 // no easy way to simulate this

// results:
