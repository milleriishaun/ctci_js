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
  .add('checkPermutation6', function() {
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
    if (letters[str1.charCodeAt(i)] === null) {
      letters[str1.charCodeAt(i)] = str1.charCodeAt(i);
    } else {
      letters[str1.charCodeAt(i)] += str1.charCodeAt(i);
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

/**
 * CHECK PERMUTATION
 * Given two strings, write a method to decide if one is a
 * permutation of the other.
 * I: 2 strings
 * O: boolean
 * C: optimize
 * E: empty string, different lengths
 */

// time complexity: O(2n)
// space complexity: O(n)

// from ChirpinmermaidCodes
let checkPermutation6 = (s1, s2) => {
  // if two strings have diff lengths, automatically return false
  // one way: sort both strings and compare - O(n log n), not efficient
  // optimized way: make a map of one string, and check the second string
  let hash = {};
  if (s1.length !== s2.length) {
    return false;
  }

  for (let i = 0; i < s1.length; i++) {
    let c = s1[i];
    if (hash[c]) {
      hash[c]++; // increment the count of the char
    } else {
      hash[c] = 1; // otherwise, it's the 1st encounter, so store it
    }
  }

  for (let i = 0; i < s2.length; i++) {
    let c = s2[i];
    if (hash[c] && hash !== 0) {
      hash[c]--;
    } else {
      return false;
    }
  }
  return true;
};

console.log(
  checkPermutation6('seven', 'nesve') === true,
  checkPermutation6('string', 'gnirts') === true,
  checkPermutation6('', '') === true,
  checkPermutation6('so', 'os') === true,
  checkPermutation6('restful', 'fluster') === true,
  checkPermutation6('sos', 'os') === false,
  checkPermutation6('abc', 'abz') === false,
  checkPermutation6('baab', 'bbba') === false,
  checkPermutation6('string', 'flings') === false,
  checkPermutation6('eleven', 'elevvn') === false
);

//results:
// checkPermutation2 x 348,271 ops/sec ±4.64% (42 runs sampled)
// checkPermutation3 x 366,723 ops/sec ±4.00% (46 runs sampled)
// checkPermutation4 x 873,383 ops/sec ±4.52% (44 runs sampled)
// checkPermutation6 x 958,603 ops/sec ±6.08% (49 runs sampled)
// Fastest is checkPermutation6
