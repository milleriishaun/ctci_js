var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('groupAnagrams1', function() {
    groupAnagrams1(anagrams);
  })
  .add('groupAnagrams2', function() {
    groupAnagrams2(anagrams);
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

// algo sol
// O(n)
function groupAnagrams1(list) {
  let anagrams = {};
  let sortedString;

  list.map(str => {
    sortedString = sortString(str);
    if (anagrams.hasOwnProperty(sortedString)) {
      anagrams[sortedString].unshift(str);
    } else {
      anagrams[sortedString] = [str];
    }
  });
  return anagrams;
}

function sortString(str) {
  return str
    .split('')
    .sort()
    .join('');
}

// CTCI JS
const groupAnagrams2 = strArr => {
  if (strArr === undefined) {
    return 'where is your anagram?';
  } else {
    let mapStrArr = strArr.map(string => {
      return {
        original: string,
        sorted: string
          .split('')
          .sort()
          .join('')
      };
    });

    mapStrArr.sort((a, b) => {
      return a.sorted < b.sorted ? 1 : -1;
    });

    const answer = mapStrArr.map(mapStr => {
      return mapStr.original;
    });

    return answer;
  }
};

// TEST

const anagrams = [
  'motherinlaw',
  'debit card',
  'dormitory',
  'theearthquakes',
  'astronomer',
  'punishments',
  'schoolmaster',
  'hitlerwoman',
  'badcredit',
  'dirtyroom',
  'thequeershakes',
  'moonstarrer',
  'ninethumps',
  'theclassroom'
];

const anagramsSorted = [
  'ninethumps',
  'punishments',
  'dormitory',
  'dirtyroom',
  'astronomer',
  'moonstarrer',
  'motherinlaw',
  'hitlerwoman',
  'thequeershakes',
  'schoolmaster',
  'theclassroom',
  'badcredit',
  'theearthquakes',
  'debit card'
];

// stackhouse ... none for this problem

// /** GROUP ANAGRAMS
//  * I: array of strings
//  * O: array of strings where all anagrams are adjacent to each other
//  * C: optimize
//  * E: empty array
//  */

// // Time Complexity: O(n)
// // Time Complexity: O(n)
// // Try 1 // fail because misses goal

// function groupAnagrams(A) {
//   return A.sort((a, b) => {
//     return a > b;
//   });
// }

// console.log(
//   groupAnagrams([
//     'nonnonsignificant',
//     'nondestructive',
//     'noncooperation',
//     'nonrestrictive',
//     'noninvolvement',
//     'nondisjunction'
//   ])
// ); // yeah, it actually worked in organizing, but I don't think this is an anagram
console.log(groupAnagrams1(anagrams));
console.log(groupAnagrams2(anagrams));

// // results:
// groupAnagrams1 x 29,436 ops/sec ±4.12% (48 runs sampled)
// groupAnagrams2 x 32,802 ops/sec ±2.69% (47 runs sampled)
// Fastest is groupAnagrams2
