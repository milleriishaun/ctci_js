var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

suite
  .add('checkPermutation2', function() {
    checkPermutation2('string', 'flings');
  })
  .add('checkPermutation3', function() {
    checkPermutation3('string', 'flings');
  })
  .add('checkPermutation4', function() {
    checkPermutation4('string', 'flings');
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });

// try 1
// time: fail to reach goal, O(n^2) ... Functional Programming slows, b/c
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

// try 4(after seeing ctci JS code, basically same as mine but optimized)
// time: attempted to get to O(n)
// space: O(1)
function checkPermutation4(str1, str2) {
  // If different string lengths, then immediately return false
  if (str1.length !== str2.length) {
    return false;
  }
  // Use array which is flexible in size
  // let letters = Array.from(new Array(128), (val, index) => index + 1);
  // console.log(letters);
  let letters = [];
  // Assign each letter in str1 to position in letters array
  for (let i = 0; i < str1.length; i++) {
    if (letters[str1.charCodeAt(i)] === str1.charCodeAt(i)) {
      letters[str1.charCodeAt(i)] += str1.charCodeAt(i);
    } else {
      letters[str1.charCodeAt(i)] = str1.charCodeAt(i);
    }
  }
  // Subtract by charCode each letter in str2 from certain position in letters.
  for (let j = 0; j < str2.length; j++) {
    letters[str2.charCodeAt(j)] -= str2.charCodeAt(j);
  }
  // Take out all of the null values from the letters array
  cleanLetters = letters.filter(function(el) {
    return el != null;
  });
  // If the total is not 0 for each position in cleanLetters, return false.
  for (let k = 0; k < cleanLetters.length; k++) {
    if (cleanLetters[k] !== 0) {
      return false;
    }
  }
  return true;
}

// try 5(after seeing failure of #4)
// time: fail, because does not check duplicate letters
// space: fail
function checkPermutation5(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }
  for (let i = 0; i < str1.length; i++) {
    if (str1.indexOf(str2[i]) === -1) {
      return false;
    }
  }
  return true;
}

console.log(checkPermutation4('string', 'gnirts')); // true
console.log(checkPermutation4('string', 'flings')); // false
console.log(checkPermutation4('eleven', 'elevvn')); // false
console.log(checkPermutation4('seven', 'nesve')); // true

//results:
// checkPermutation2 x 593,982 ops/sec ±1.26% (58 runs sampled)
// checkPermutation3 x 558,850 ops/sec ±1.40% (61 runs sampled)
// checkPermutation4 x 1,438,668 ops/sec ±2.43% (59 runs sampled)
// Fastest is checkPermutation4
