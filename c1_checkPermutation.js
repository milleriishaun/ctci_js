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
  .add('checkPermutation4', function() {
    checkPermutation4('string', 'flings');
  })
  .add('checkPermutation5', function() {
    checkPermutation5('string', 'flings');
  })
  .add('checkPermutation6', function() {
    checkPermutation6('string', 'flings');
  })
  .add('checkPermutation7', function() {
    checkPermutation7('string', 'flings');
  })
  .add('checkPermutation8', function() {
    checkPermutation8('string', 'flings');
  })
  .add('checkPermutation9', function() {
    checkPermutation9('string', 'flings');
  })
  .add('checkPermutation10', function() {
    checkPermutation10('string', 'flings');
  })
  .add('checkPermutation11', function() {
    checkPermutation11('string', 'flings');
  })
  .add('checkPermutation12', function() {
    checkPermutation12('string', 'flings');
  })
  .add('checkPermutation13', function() {
    checkPermutation13('string', 'flings');
  })
  .add('checkPermutation14', function() {
    checkPermutation14('string', 'flings');
  })
  .add('checkPermutation15', function() {
    checkPermutation15('string', 'flings');
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });

// CTCI JS Sol2
// O(N log N) TIME -- O(1) SPACE
const sort = str => [...str].sort().join``;

function checkPermutation1(str1, str2) {
  // old code: if (!str1 || !str2 || str1.length !== str2.length) {
  if (str1.length !== str2.length) {
    return false;
  }

  return sort(str1) === sort(str2);
}

// ctci javascript
function checkPermutation2(s1, s2) {
  // if string lengths differ, then not a permutation; otherwise,
  // compare a map of both strings
  return s1.length === s2.length ? isEqual(toMap(s1), toMap(s2)) : false;
}

// transform string to a map
function toMap(s) {
  const map = {};
  for (let ch of s) {
    map[ch] = ++map[ch] || 1;
  }
  return map;
}

// are two objects equal
function isEqual(o1, o2) {
  // arrays for property names
  const keys1 = Object.getOwnPropertyNames(o1);
  const keys2 = Object.getOwnPropertyNames(o2);

  // if number of props differ objects are not equal
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys2) {
    // if values for a key differ objects are not equal
    if (o1[key] !== o2[key]) {
      return false;
    }
  }

  return true;
}

// JS Algos
function checkPermutation3(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  return (
    a
      .split('')
      .sort()
      .join() ===
    b
      .split('')
      .sort()
      .join()
  );
}

// CTCI JS
var checkPermutation4 = function(stringOne, stringTwo) {
  // if different lengths, return false
  if (stringOne.length !== stringTwo.length) {
    return false;
    // else sort and compare
    // (doesnt matter how it's sorted, as long as it's sorted the same way)
  } else {
    var sortedStringOne = stringOne
      .split('')
      .sort()
      .join('');
    var sortedStringTwo = stringTwo
      .split('')
      .sort()
      .join('');
    return sortedStringOne === sortedStringTwo;
  }
};

// try 3(after seeing ctci JS code, basically same as mine but optimized)
// time: O(n log n)
// space: O(1)
function checkPermutation5(str1, str2) {
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

// try 2
// time: O(n log n)
// space: O(1)
function checkPermutation6(str1, str2) {
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

/**
 * Sort both strings and check if they are equal afterwards. Permutations will
 * be identical sorted strings.
 *
 * N = |str1| && M = |str2|
 * Time: O(N lg N + M lg M)
 * Additional space: O(1) if able to modify original strings, O(N + M) otherwise
 */
function checkPermutation7(str1, str2) {
  // old code: if (str1.length === 0 || str1.length !== str2.length) {
  if (str1.length !== str2.length) {
    return false;
  }

  // sort string using quicksort
  let arr1 = str1.split('').sort();
  let arr2 = str2.split('').sort();

  return arr1.every((v, i) => v === arr2[i]);
}

// algos sol1
// author's answer O(3n)
function checkPermutation8(first, second) {
  let sorted1 = sort_str(first);
  let sorted2 = sort_str(second);
  return compare_two_string(sorted1, sorted2);
}

function sort_str(str) {
  //if it's not case sensitive
  return str
    .toLowerCase()
    .split('')
    .sort();
}

function compare_two_string(w1, w2) {
  if (w1.length !== w2.length) {
    return false;
  }
  for (let i = 0; i < w1.length; i++) {
    if (w1[i] !== w2[i]) {
      return false;
    }
  }
  return true;
}

// try 4(after seeing ctci JS code, basically same as mine but optimized)
// time: attempted to get to O(n)
// space: O(1)
function checkPermutation9(str1, str2) {
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
    if (!letters[str1[i]]) {
      letters[str1[i]] = 1;
    } else {
      letters[str1[i]] += 1;
    }
  }
  // Subtract by charCode each letter in str2 from certain position in letters.
  for (let j = 0; j < str2.length; j++) {
    letters[str2[j]] -= 1;
  }
  // If the total is not 0 for each position in letters, return false.
  for (k in letters) {
    if (letters[k] !== 0) {
      return false;
    }
  }
  return true;
}

// CTCI ES5
/**
 * Keep track of characters counts with a Map data structure, fail when
 * str2 has a character different to str2 or if any characters are left over
 * at the end.
 *
 * N = |str1| && M = |str2|
 * Time: O(N + M)
 * Additional space: O(N)
 */
function checkPermutation10(str1, str2) {
  // old code: if (str1.length === 0 || str1.length !== str2.length) {

  if (str1.length !== str2.length) {
    return false;
  }

  let chars = new Map();

  for (let i = 0; i < str1.length; ++i) {
    chars.set(str1[i], chars.get(str1[i]) + 1 || 1); // increment or set to 1
  }

  for (let i = 0; i < str2.length; ++i) {
    let count = chars.get(str2[i]);
    if (!count) {
      return false;
    }
    if (count === 1) {
      chars.delete(str2[i]);
    } else {
      chars.set(str2[i], count - 1);
    }
  }

  return chars.size === 0;
}

// stackhouse
function checkPermutation11(word1, word2) {
  let character_map = new Map();
  for (character of word1) {
    let quantity = character_map.get(character);
    character_map.set(character, quantity + 1 || 1);
  }
  for (character of word2) {
    let quantity = character_map.get(character);
    if (!quantity || quantity < 1) {
      return false;
    } else {
      character_map.set(character, quantity - 1);
    }
  }
  for (value of character_map.values()) {
    if (value > 0) {
      return false;
    }
  }
  return true;
}

// CTCI JS Sol1
// 0(N) TIME -- O(N) SPACE
function checkPermutation12(str1, str2) {
  // old code:   if (!str1 || !str2 || str1.length !== str2.length) return false;
  if (str1.length !== str2.length) return false;

  const letterMap = new Map();

  for (const letter of str1) {
    letterMap.set(letter, letterMap.get(letter) + 1 || 1);
  }

  for (const letter of str2) {
    if (!letterMap.has(letter)) return false;
    if (letterMap.get(letter) === 1) letterMap.delete(letter);
    else letterMap.set(letter, letterMap.get(letter) - 1);
  }

  return !letterMap.size;
}

// algos sol2
// my answer O(2n)
function checkPermutation13(first, second) {
  // milleriishaun debugged+added early stop condition
  if (first.length !== second.length) {
    return false;
  }
  let object = count_str(first);
  return withdraw_str(second, object);
}
// original name is check_two vs checkPermutation6

function count_str(str) {
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    if (!obj[str[i]]) {
      obj[str[i]] = 1;
    } else {
      obj[str[i]] += 1;
    }
  }
  return obj;
}

function withdraw_str(str, obj) {
  for (let i = 0; i < str.length; i++) {
    if (!obj[str[i]] || obj[str[i]] === 0) {
      return false;
    } else {
      obj[str[i]] -= 1;
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
let checkPermutation14 = (s1, s2) => {
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

// ctci
function checkPermutation15(a, b) {
  // old code: if (!a.length || !b.length) return false;
  if (a.length !== b.length) return false;

  const memo = {};
  for (let i = 0; i < a.length; i++) {
    const char = a[i];

    if (memo[char]) {
      memo[char]++;
    } else {
      memo[char] = 1;
    }
  }

  for (let i = 0; i < b.length; i++) {
    const char = b[i];

    if (memo[char] === undefined) return false;
    memo[char]--;

    if (memo[char] < 0) return false;
  }

  return true;
}

/*
// try 1, fail to reach goal, no checking for duplicates
// time: O(n^2) ... Functional Programming slows, b/c
// of the issue of method call overhead
// space: O(1)
function checkPermutationX1(str1, str2) {
  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      if (str1.indexOf(str2[j]) == -1) {
        return false;
      }
    }
  }
  return true;
}
*/

/*
// try 5(after seeing failure of #4)
// time: fail, because does not check duplicate letters
// space: fail
function checkPermutationX2(str1, str2) {
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
*/

// console.log(
//   checkPermutation1('seven', 'nesve') === true,
//   checkPermutation1('string', 'gnirts') === true,
//   checkPermutation1('', '') === true,
//   checkPermutation1('so', 'os') === true,
//   checkPermutation1('restful', 'fluster') === true,
//   checkPermutation1('sos', 'os') === false,
//   checkPermutation1('abc', 'abz') === false,
//   checkPermutation1('baab', 'bbba') === false,
//   checkPermutation1('string', 'flings') === false,
//   checkPermutation1('eleven', 'elevvn') === false
// );

// console.log(
//   checkPermutation2('seven', 'nesve') === true,
//   checkPermutation2('string', 'gnirts') === true,
//   checkPermutation2('', '') === true,
//   checkPermutation2('so', 'os') === true,
//   checkPermutation2('restful', 'fluster') === true,
//   checkPermutation2('sos', 'os') === false,
//   checkPermutation2('abc', 'abz') === false,
//   checkPermutation2('baab', 'bbba') === false,
//   checkPermutation2('string', 'flings') === false,
//   checkPermutation2('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation3('seven', 'nesve') === true,
//   checkPermutation3('string', 'gnirts') === true,
//   checkPermutation3('', '') === true,
//   checkPermutation3('so', 'os') === true,
//   checkPermutation3('restful', 'fluster') === true,
//   checkPermutation3('sos', 'os') === false,
//   checkPermutation3('abc', 'abz') === false,
//   checkPermutation3('baab', 'bbba') === false,
//   checkPermutation3('string', 'flings') === false,
//   checkPermutation3('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation4('seven', 'nesve') === true,
//   checkPermutation4('string', 'gnirts') === true,
//   checkPermutation4('', '') === true,
//   checkPermutation4('so', 'os') === true,
//   checkPermutation4('restful', 'fluster') === true,
//   checkPermutation4('sos', 'os') === false,
//   checkPermutation4('abc', 'abz') === false,
//   checkPermutation4('baab', 'bbba') === false,
//   checkPermutation4('string', 'flings') === false,
//   checkPermutation4('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation5('seven', 'nesve') === true,
//   checkPermutation5('string', 'gnirts') === true,
//   checkPermutation5('', '') === true,
//   checkPermutation5('so', 'os') === true,
//   checkPermutation5('restful', 'fluster') === true,
//   checkPermutation5('sos', 'os') === false,
//   checkPermutation5('abc', 'abz') === false,
//   checkPermutation5('baab', 'bbba') === false,
//   checkPermutation5('string', 'flings') === false,
//   checkPermutation5('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation6('seven', 'nesve') === true,
//   checkPermutation6('string', 'gnirts') === true,
//   checkPermutation6('', '') === true,
//   checkPermutation6('so', 'os') === true,
//   checkPermutation6('restful', 'fluster') === true,
//   checkPermutation6('sos', 'os') === false,
//   checkPermutation6('abc', 'abz') === false,
//   checkPermutation6('baab', 'bbba') === false,
//   checkPermutation6('string', 'flings') === false,
//   checkPermutation6('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation7('seven', 'nesve') === true,
//   checkPermutation7('string', 'gnirts') === true,
//   checkPermutation7('', '') === true,
//   checkPermutation7('so', 'os') === true,
//   checkPermutation7('restful', 'fluster') === true,
//   checkPermutation7('sos', 'os') === false,
//   checkPermutation7('abc', 'abz') === false,
//   checkPermutation7('baab', 'bbba') === false,
//   checkPermutation7('string', 'flings') === false,
//   checkPermutation7('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation8('seven', 'nesve') === true,
//   checkPermutation8('string', 'gnirts') === true,
//   checkPermutation8('', '') === true,
//   checkPermutation8('so', 'os') === true,
//   checkPermutation8('restful', 'fluster') === true,
//   checkPermutation8('sos', 'os') === false,
//   checkPermutation8('abc', 'abz') === false,
//   checkPermutation8('baab', 'bbba') === false,
//   checkPermutation8('string', 'flings') === false,
//   checkPermutation8('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation9('seven', 'nesve') === true,
//   checkPermutation9('string', 'gnirts') === true,
//   checkPermutation9('', '') === true,
//   checkPermutation9('so', 'os') === true,
//   checkPermutation9('restful', 'fluster') === true,
//   checkPermutation9('sos', 'os') === false,
//   checkPermutation9('abc', 'abz') === false,
//   checkPermutation9('baab', 'bbba') === false,
//   checkPermutation9('string', 'flings') === false,
//   checkPermutation9('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation10('seven', 'nesve') === true,
//   checkPermutation10('string', 'gnirts') === true,
//   checkPermutation10('', '') === true,
//   checkPermutation10('so', 'os') === true,
//   checkPermutation10('restful', 'fluster') === true,
//   checkPermutation10('sos', 'os') === false,
//   checkPermutation10('abc', 'abz') === false,
//   checkPermutation10('baab', 'bbba') === false,
//   checkPermutation10('string', 'flings') === false,
//   checkPermutation10('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation11('seven', 'nesve') === true,
//   checkPermutation11('string', 'gnirts') === true,
//   checkPermutation11('', '') === true,
//   checkPermutation11('so', 'os') === true,
//   checkPermutation11('restful', 'fluster') === true,
//   checkPermutation11('sos', 'os') === false,
//   checkPermutation11('abc', 'abz') === false,
//   checkPermutation11('baab', 'bbba') === false,
//   checkPermutation11('string', 'flings') === false,
//   checkPermutation11('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation12('seven', 'nesve') === true,
//   checkPermutation12('string', 'gnirts') === true,
//   checkPermutation12('', '') === true,
//   checkPermutation12('so', 'os') === true,
//   checkPermutation12('restful', 'fluster') === true,
//   checkPermutation12('sos', 'os') === false,
//   checkPermutation12('abc', 'abz') === false,
//   checkPermutation12('baab', 'bbba') === false,
//   checkPermutation12('string', 'flings') === false,
//   checkPermutation12('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation13('seven', 'nesve') === true,
//   checkPermutation13('string', 'gnirts') === true,
//   checkPermutation13('', '') === true,
//   checkPermutation13('so', 'os') === true,
//   checkPermutation13('restful', 'fluster') === true,
//   checkPermutation13('sos', 'os') === false,
//   checkPermutation13('abc', 'abz') === false,
//   checkPermutation13('baab', 'bbba') === false,
//   checkPermutation13('string', 'flings') === false,
//   checkPermutation13('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation14('seven', 'nesve') === true,
//   checkPermutation14('string', 'gnirts') === true,
//   checkPermutation14('', '') === true,
//   checkPermutation14('so', 'os') === true,
//   checkPermutation14('restful', 'fluster') === true,
//   checkPermutation14('sos', 'os') === false,
//   checkPermutation14('abc', 'abz') === false,
//   checkPermutation14('baab', 'bbba') === false,
//   checkPermutation14('string', 'flings') === false,
//   checkPermutation14('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation15('seven', 'nesve') === true,
//   checkPermutation15('string', 'gnirts') === true,
//   checkPermutation15('', '') === true,
//   checkPermutation15('so', 'os') === true,
//   checkPermutation15('restful', 'fluster') === true,
//   checkPermutation15('sos', 'os') === false,
//   checkPermutation15('abc', 'abz') === false,
//   checkPermutation15('baab', 'bbba') === false,
//   checkPermutation15('string', 'flings') === false,
//   checkPermutation15('eleven', 'elevvn') === false
// );
// console.log(
//   checkPermutation16('seven', 'nesve') === true,
//   checkPermutation16('string', 'gnirts') === true,
//   checkPermutation16('', '') === true,
//   checkPermutation16('so', 'os') === true,
//   checkPermutation16('restful', 'fluster') === true,
//   checkPermutation16('sos', 'os') === false,
//   checkPermutation16('abc', 'abz') === false,
//   checkPermutation16('baab', 'bbba') === false,
//   checkPermutation16('string', 'flings') === false,
//   checkPermutation16('eleven', 'elevvn') === false
// );

//results:
// checkPermutation1 x 362,757 ops/sec ±1.01% (57 runs sampled)
// checkPermutation2 x 499,630 ops/sec ±1.30% (61 runs sampled)
// checkPermutation3 x 534,163 ops/sec ±1.47% (60 runs sampled)
// checkPermutation4 x 552,475 ops/sec ±2.31% (62 runs sampled)
// checkPermutation5 x 537,135 ops/sec ±2.74% (61 runs sampled)
// checkPermutation6 x 435,361 ops/sec ±1.66% (56 runs sampled)
// checkPermutation7 x 558,742 ops/sec ±2.58% (50 runs sampled)
// checkPermutation8 x 559,946 ops/sec ±1.28% (54 runs sampled)
// checkPermutation9 x 1,118,178 ops/sec ±3.08% (53 runs sampled)
// checkPermutation10 x 1,641,670 ops/sec ±1.40% (52 runs sampled)
// checkPermutation11 x 1,701,816 ops/sec ±1.30% (55 runs sampled)
// checkPermutation12 x 1,726,583 ops/sec ±3.28% (53 runs sampled)
// checkPermutation13 x 2,387,731 ops/sec ±1.84% (53 runs sampled)
// checkPermutation14 x 2,434,787 ops/sec ±3.04% (52 runs sampled)
// checkPermutation15 x 2,483,513 ops/sec ±2.35% (51 runs sampled)
// Fastest is checkPermutation15,checkPermutation14

// Practice list:
// 1. 14 memo/hash chirpingmermaids, O(2n), O(n) ... quick clean code
// 2. 15 memo ...quick clean code
// 3. 13 memo/separate functions, O(2n), O(n) ... slightly advanced
// 4. 12 memo O(n), O(n), new Map, get set delete ... more scalable clean code
// 5. 11 memo new Map, get set value() ... clean code
// 6. 10 memo new Map, get set delete
