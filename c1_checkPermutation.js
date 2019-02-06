var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

suite
  .add('checkPermutation1', function() {
    checkPermutation1('string', 'flings');
  })
  .add('checkPermutation2', function() {
    checkPermutation2('string', 'flings');
  })
  .add('checkPermutation3', function() {
    checkPermutation3('string', 'flings');
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });

// try 1
// time: O(n^2) ... maybe fastest solution b/c no Functional Programming, b/c
// of the issue of method call overhead
// space: O(1)
function checkPermutation1(str1, str2) {
  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      if (str1.indexOf(str2[j]) == -1) {
        return false;
      }
    }
  }
  return true;
}

// try 2
// time: O(n log n)
// space: O(1)
function checkPermutation2(str1, str2) {
  let arr1 = str1.split('');
  let arr2 = str2.split('');
  arr1 = arr1.sort(function(a, b) {
    return a > b;
  });
  arr2 = arr2.sort(function(a, b) {
    return a > b;
  });
  if (arr1.join('') == arr2.join('')) {
    return true;
  }
  return false;
}

// try 3(after seeing ctci JS code, basically same as mine but optimized)
// time: O(n log n)
// space: O(1)
function checkPermutation3(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }
  let arr1 = str1
    .split('')
    .sort()
    .join('');
  let arr2 = str2
    .split('')
    .sort()
    .join('');
  return arr1 === arr2;
}

console.log(checkPermutation3('string', 'gnirts')); // true
console.log(checkPermutation3('string', 'flings')); // false
console.log(checkPermutation3('eleven', 'eleven')); // true
console.log(checkPermutation3('seven', 'nesve')); // true

//results:
// checkPermutation1 x 66,430,564 ops/sec ±1.61% (59 runs sampled)
// checkPermutation2 x 595,580 ops/sec ±1.58% (58 runs sampled)
// checkPermutation3 x 551,374 ops/sec ±2.02% (59 runs sampled)
// Fastest is checkPermutation1
