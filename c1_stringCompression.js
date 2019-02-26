var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('stringCompression1', function() {
    stringCompression1('aabcccccaaa');
  })
  .add('stringCompression2', function() {
    stringCompression2('aabcccccaaa');
  })
  .add('stringCompression3', function() {
    stringCompression3('aabcccccaaa');
  })
  .add('stringCompression4', function() {
    stringCompression4('aabcccccaaa');
  })
  .add('stringCompression5', function() {
    stringCompression5('aabcccccaaa');
  })
  .add('stringCompression6', function() {
    stringCompression6('aabcccccaaa');
  })
  .add('stringCompression7', function() {
    stringCompression7('aabcccccaaa');
  })
  .add('stringCompression8', function() {
    stringCompression8('aabcccccaaa');
  })
  .add('stringCompression9', function() {
    stringCompression9('aabcccccaaa');
  })
  .add('stringCompression10', function() {
    stringCompression10('aabcccccaaa');
  })
  .add('stringCompression11', function() {
    stringCompression11('aabcccccaaa');
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });

// CTCI JS Sol1
function stringCompression1(str) {
  if (!str || str.length <= 2) return str;

  const charMap = new Map();
  let compressedString = '',
    currentLetter = str[0];

  for (const letter of str) {
    if (letter === currentLetter) {
      charMap.set(letter, charMap.get(letter) + 1 || 1);
    } else {
      compressedString += currentLetter + charMap.get(currentLetter);
      charMap.clear();
      currentLetter = letter;
      charMap.set(letter, 1);
    }
  }

  compressedString += [...charMap][0].join``;
  return compressedString.length < str.length ? compressedString : str;
}

// CTCI JS Sol2, DOPE REGEX
function stringCompression2(str) {
  if (!str || str.length <= 2) return str;

  const compressed = str.match(/(.)\1*/g).map(group => group[0] + group.length)
    .join``;

  return compressed.length < str.length ? compressed : str;
}

/** STRING COMPRESSION
 * I: string
 * O: string
 * E: runtime
 * C: (a-z,A-Z)
 */

// Time complexity: O(n)
// Space complexity: O(n)

// Try 1
// time: O(n^2)
// space: O(n)
// debug time: 30 mins. Forgot when comparing array index to previous, need
// the <= and not just the < in the if...then statement.
function stringCompression3(str) {
  let newArr = [];
  let count = 1;
  for (let i = 0; i < str.length; i++) {
    for (let j = 1; j <= str.length; j++) {
      if (str[j] === str[j - 1]) {
        count++;
        i++;
      } else {
        i += count;
        newArr.push(str[j - 1]);
        newArr.push(count);
        count = 1;
      }
    }
  }
  return newArr.length < str.length ? newArr.join('') : str;
}

// ctci javascript
function stringCompression4(str) {
  const compressed = [];
  let currentCount = 0;
  for (let i = 0; i < str.length; ++i) {
    ++currentCount;
    let currentChar = str[i];
    const nextIndex = i + 1;
    // if we're at a new char or  end of string, write current char and its count
    if (nextIndex === str.length || currentChar !== str[nextIndex]) {
      compressed.push(currentChar);
      compressed.push(currentCount);
      currentCount = 0;
    }
  }
  // if the original string is shorter than the compressed return it
  return compressed.length < str.length ? compressed.join('') : str;
}

// CTCI JS
var stringCompression5 = function(string) {
  var compressed = '';
  var currChar = '';
  var currCount = '';
  var maxCount = 1;
  for (var i = 0; i < string.length; i++) {
    if (currChar !== string[i]) {
      compressed = compressed + currChar + currCount;
      maxCount = Math.max(maxCount, currCount);
      currChar = string[i];
      currCount = 1;
    } else {
      currCount++;
    }
  }
  compressed = compressed + currChar + currCount;
  maxCount = Math.max(maxCount, currCount);
  // console.log('max: ', maxCount);
  // console.log('cur: ', currCount);
  return maxCount === currCount ? string : compressed;
};

// ctci
function stringCompression6(str) {
  let output = '';

  let count = 0;
  for (let i = 0; i < str.length; i++) {
    count++;
    if (!str[i + 1] || str[i] !== str[i + 1]) {
      output += str[i] + count;
      count = 0;
    }
  }
  return output.length < str.length ? output : str;
}

// stackhouse
function stringCompression7(string) {
  let current_character = string.charAt(0);
  let character_count = 0;
  let original_length = string.length;
  let new_string = '';

  for (character of string) {
    if (new_string.length >= original_length) {
      return string;
    } else if (character !== current_character) {
      new_string += current_character + character_count;
      current_character = character;
      character_count = 1;
    } else {
      character_count += 1;
    }
  }
  new_string += current_character + character_count;
  return new_string.length < original_length ? new_string : string;
}

// algos sol
function stringCompression8(str) {
  let elm = str[0];
  let count = 1;
  let result = '';
  for (let i = 1; i <= str.length; i++) {
    if (i > 0) {
      if (str[i] !== str[i - 1]) {
        result += elm + count;
        elm = str[i];
        count = 1;
      } else {
        count++;
      }
    }
  }
  return result.length < str.length ? result : str;
}

/** STRING COMPRESSION
 * I: string
 * O: compressed string
 * C: optimize
 * E: empty string, compressed string that's same length as the
 * original string
 */

// Time complexity: O(n) .. concat is linear... but concat strings
// in a loop cause a lot of slowness. The += operator is fastest, but
// that's not always the case depending on browser. Instead, could
// just turn into array and join at the end. Concating is slow and
// linear, and putting it in a loop is even worse.
// Space complexity: O(n)
//
// ChirpingmermaidCodes

let stringCompression9 = s => {
  // traversestirng, keep count of repeated chars
  // if curr and next char is the same, inc count
  // otherwise, concat curr char and count to output string,
  // and remember to reset count to 1.
  // Once done with loop, return the compressed string, only if the
  // length is less tht the original string, otherwise, return
  // original string.
  let out = '';
  let count = 1;

  for (let i = 0; i < s.length; i++) {
    let cur = s[i];
    let next = s[i + 1];

    if (cur === next) {
      count++;
    } else {
      out += cur + String(count);
      count = 1;
    }
  }
  return out.length < s.length ? out : s;
};

// JS Algos1
function stringCompression10(str) {
  var newStr = '';
  var count = 1;
  var char = str[0];
  var i = 1;
  while (i < str.length) {
    if (str[i] == char) {
      count++;
      i++;
    } else {
      newStr += char + count;
      char = str[i];
      count = 0;
    }
  }
  newStr += char + count;
  return newStr.length < str.length ? newStr : str;
}

// CTCI ES5
/**
 * Takes an input string and counts contiguous sequences of the same character
 * and replaces them with XC (X = count, C = character). (should be CX)
 *
 * N = |str|
 * Time: O(N)
 * Space: O(N)
 */
// This solution is cool if I can solve it, so that the problems are correct.
function stringCompression11(str) {
  if (!str) {
    return str;
  }

  let cStr = '';
  for (let i = 0; i < str.length; ++i) {
    let char = str[i],
      start = i;
    while (i + 1 < str.length && char === str[i + 1]) {
      ++i;
    }
    // JS does not have a StringBuilder/StringBuffer style class for creating strings
    // string concatenation has been heavily optimised in JS implementations and
    // is faster than creating a string via an array then using a .join('') at the end
    cStr += char + String(i - start + 1);
  }

  return cStr.length < str.length ? cStr : str;
}

console.log(
  stringCompression1('aabcccccaaa') === 'a2b1c5a3',
  stringCompression1('aa') === 'aa',
  stringCompression1('aaAAaa') === 'aaAAaa',
  stringCompression1('aaaAAaa') === 'a3A2a2',
  stringCompression1('') === ''
);

console.log(
  stringCompression2('aabcccccaaa') === 'a2b1c5a3',
  stringCompression2('aa') === 'aa',
  stringCompression2('aaAAaa') === 'aaAAaa',
  stringCompression2('aaaAAaa') === 'a3A2a2',
  stringCompression2('') === ''
);

console.log(
  stringCompression3('aabcccccaaa') === 'a2b1c5a3',
  stringCompression3('aa') === 'aa',
  stringCompression3('aaAAaa') === 'aaAAaa',
  stringCompression3('aaaAAaa') === 'a3A2a2',
  stringCompression3('') === ''
);

console.log(
  stringCompression4('aabcccccaaa') === 'a2b1c5a3',
  stringCompression4('aa') === 'aa',
  stringCompression4('aaAAaa') === 'aaAAaa',
  stringCompression4('aaaAAaa') === 'a3A2a2',
  stringCompression4('') === ''
);

console.log(
  stringCompression5('aabcccccaaa') === 'a2b1c5a3',
  stringCompression5('aa') === 'aa',
  stringCompression5('aaAAaa') === 'aaAAaa',
  stringCompression5('aaaAAaa') === 'a3A2a2',
  stringCompression5('') === ''
);

console.log(
  stringCompression6('aabcccccaaa') === 'a2b1c5a3',
  stringCompression6('aa') === 'aa',
  stringCompression6('aaAAaa') === 'aaAAaa',
  stringCompression6('aaaAAaa') === 'a3A2a2',
  stringCompression6('') === ''
);

console.log(
  stringCompression7('aabcccccaaa') === 'a2b1c5a3',
  stringCompression7('aa') === 'aa',
  stringCompression7('aaAAaa') === 'aaAAaa',
  stringCompression7('aaaAAaa') === 'a3A2a2',
  stringCompression7('') === ''
);

console.log(
  stringCompression8('aabcccccaaa') === 'a2b1c5a3',
  stringCompression8('aa') === 'aa',
  stringCompression8('aaAAaa') === 'aaAAaa',
  stringCompression8('aaaAAaa') === 'a3A2a2',
  stringCompression8('') === ''
);

console.log(
  stringCompression9('aabcccccaaa') === 'a2b1c5a3',
  stringCompression9('aa') === 'aa',
  stringCompression9('aaAAaa') === 'aaAAaa',
  stringCompression9('aaaAAaa') === 'a3A2a2',
  stringCompression9('') === ''
);

console.log(
  stringCompression10('aabcccccaaa') === 'a2b1c5a3',
  stringCompression10('aa') === 'aa',
  stringCompression10('aaAAaa') === 'aaAAaa',
  stringCompression10('aaaAAaa') === 'a3A2a2',
  stringCompression10('') === ''
);

console.log(
  stringCompression11('aabcccccaaa') === 'a2b1c5a3',
  stringCompression11('aa') === 'aa',
  stringCompression11('aaAAaa') === 'aaAAaa',
  stringCompression11('aaaAAaa') === 'a3A2a2',
  stringCompression11('') === ''
);

// console.log(
//   stringCompression12('aabcccccaaa') === 'a2b1c5a3',
//   stringCompression12('aa') === 'aa',
//   stringCompression12('aaAAaa') === 'aaAAaa',
//   stringCompression12('aaaAAaa') === 'a3A2a2',
//   stringCompression12('') === ''
// );

// console.log(stringCompression11('aabcccccaaa')); // 'a2b1c5a3'
// console.log(stringCompression11('aa')); // 'aa'
// console.log(stringCompression11('aaAAaa')); // 'aaAAaa'
// console.log(stringCompression11('aaaAAaa')); // 'a3A2a2'
// console.log(stringCompression11('')); // ''

// results
// stringCompression1 x 516,608 ops/sec ±1.59% (50 runs sampled)
// stringCompression2 x 803,536 ops/sec ±2.88% (51 runs sampled)
// stringCompression3 x 1,498,848 ops/sec ±4.39% (47 runs sampled)
// stringCompression4 x 1,661,317 ops/sec ±2.43% (51 runs sampled)
// stringCompression5 x 2,975,261 ops/sec ±2.22% (51 runs sampled)
// stringCompression6 x 2,941,774 ops/sec ±2.96% (51 runs sampled)
// stringCompression7 x 3,187,702 ops/sec ±2.41% (49 runs sampled)
// stringCompression8 x 3,070,628 ops/sec ±2.97% (47 runs sampled)
// stringCompression9 x 3,274,782 ops/sec ±2.44% (49 runs sampled)
// stringCompression10 x 3,623,724 ops/sec ±2.38% (47 runs sampled)
// stringCompression11 x 3,873,867 ops/sec ±2.98% (48 runs sampled)
// Fastest is stringCompression11

// Note: String concatenation is O(xn^2), where x is length of string.
