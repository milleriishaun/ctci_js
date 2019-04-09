// var Benchmark = require('benchmark');
// var suite = new Benchmark.Suite();

// suite
//   .add('URLify1', function() {
//     URLify1('Mr John Smith ', 13);
//   })
//   .add('URLify2', function() {
//     URLify2('Mr John Smith ', 13);
//   })
//   .add('URLify3', function() {
//     URLify3('Mr John Smith ', 13);
//   })
//   .add('URLify4', function() {
//     URLify4('Mr John Smith ', 13);
//   })
//   .add('URLify5', function() {
//     URLify5('Mr John Smith ', 13);
//   })
//   .add('URLify6', function() {
//     URLify6('Mr John Smith ', 13);
//   })
//   .add('URLify7', function() {
//     URLify7('Mr John Smith ', 13);
//   })
//   .add('URLify8', function() {
//     URLify8('Mr John Smith ', 13);
//   })
//   .add('URLify9', function() {
//     URLify9('Mr John Smith ', 13);
//   })
//   .add('URLify10', function() {
//     URLify10('Mr John Smith ', 13);
//   })
//   .on('cycle', function(event) {
//     console.log(String(event.target));
//   })
//   .on('complete', function() {
//     console.log('Fastest is ' + this.filter('fastest').map('name'));
//   })
//   .run({ async: true });

// CTCI ES5
/**
 * Count the number of spaces in the string to calculate the new length of the
 * string and move characters back where required replacing spaces with %20.
 *
 * N = |url|
 * Time: O(N)
 * Additional space: O(1)
 */
function URLify1(url) {
  if (!url || url.length === 0) {
    return url;
  }
  let url2 = url.trim().split('');
  let spaceCount = 0;
  for (let i = 0; i < url2.length; ++i) {
    if (url2[i] === ' ') {
      ++spaceCount;
    }
  }

  // add an extra 2 characters for each space
  let newLength = url2.length - 1 + 2 * spaceCount;
  for (let i = url2.length - 1, j = newLength; i >= 0 && j > i; --i, --j) {
    if (url2[i] === ' ') {
      url2[j] = '0';
      url2[--j] = '2';
      url2[--j] = '%';
    } else {
      url2[j] = url2[i];
    }
  }
  return url2.join('');
}

// CTCI JS Sol1
const URLify2 = str =>
  str
    ? str
        .trim()
        .split(' ')
        .join('%20')
    : str;

// try 1
// time: O(n) ... Functional Programming slows, b/c
// of the issue of method call overhead
// space: O(1)
function URLify3(str, length) {
  return str
    .trim()
    .split(' ')
    .join('%20');
}

// ctci javascript1
/**
 * Replace all spaces in a string with '%20'.
 */
function URLify4(str) {
  str = str.trim();
  const array = [];
  for (let ch of str) {
    array.push(ch === ' ' ? '%20' : ch);
  }
  return array.join('');
}

// ctci
function URLify5(str) {
  return str
    .trim()
    .split(' ')
    .join('%20');
}

// algos sol
// author's answer O(2n)
function URLify6(str) {
  let removed = remove_space_at_end(str);
  for (let i = 0; i <= removed.length - 1; i++) {
    if (removed.charAt(i) === ' ') {
      removed = removed.replace(removed.charAt(i), '%20');
    }
  }
  return removed;
}

function remove_space_at_end(str) {
  if (str === null) return str;
  return str.replace(/\s+$/g, '');
}

// ctci javascript2
// regex version
function URLify7(string) {
  return string.trim().replace(/\s/g, '%20');
}

/**
 * CHECK PERMUTATION
 * Given two strings, write a method to decide if one is a
 * permutation of the other.
 * I: string, number
 * O: string
 * C: optimize
 * E: empty string, spaces in the front middle and end
 */

// time complexity: O(2n)
// space complexity: O(1)

// from ChirpinmermaidCodes
let URLify8 = (s, n = s.length) => {
  //first pass: count the number of nonspace characters in the string
  //subtract chars from true length n to see how many spaces we are allowed
  // to replace with %20

  //second pass:
  //if we see a space and there are still spaces left, append %20 to
  // to the output string
  //otherwise we copy current character
  // when we run out of spaces, append the empty string instead
  let out = '';
  let chars = 0;

  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (c !== ' ') {
      chars++;
    }
  }

  let spaces = n - chars;

  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (c === ' ' && spaces > 0) {
      out += '%20';
      spaces--;
    } else if (c !== ' ') {
      out += c;
    }
  }
  // if n is not yet reached and there are still spaces left
  while (spaces > 0) {
    out += '%20';
    spaces--;
  }

  return out;
};

// CTCI JS Sol2
const URLify9 = str => (str ? str.trim().replace(/\s/g, '%20') : str);

// CTCI JS Sol3
// SOLUTION FROM BOOK
// turns out, stealing length and using concatenation is fastest.
function URLify10(str, trueLength) {
  let newString = '';
  for (let i = 0; i < trueLength; i++) {
    if (str[i] === ' ') newString += '%20';
    else newString += str[i];
  }
  return newString;
}

/*
// confusing pointer example even though not really a pointer b/c can't in JS
// Fails
var URLifyX1 = function(str, length) {
  // have a pointer to check from start to end
  var strArr = str.split('');
  var pointer = 0;
  while (pointer < str.length) {
    if (strArr[pointer] === ' ') {
      // *** needs more work here, a little wierd
      // not handling trailing spaces properly
      for (var i = str.length - 1; pointer < i; i--) {
        strArr[i] = str[i - 2];
      }
      strArr[pointer] = '%';
      strArr[pointer + 1] = '2';
      strArr[pointer + 2] = '0';
    }
    pointer++;
  }
  // if character is a space, move remainder chars by two
  // replace following three chars with '%20'
  return strArr.join('');
};
*/

/*
// It just doesn't work with only 1 JS test, so can't use. If Java, yea.
// But the problem is not specific enough to learn anything clear.
// stackhouse
function URLifyX2(character_array, actual_length) {
  // Write a method to replace all spaces in a string with '%20'. You
  // may assume that the string has
  // sufficient space at the end to hold the additional characters, and
  // that you are given the "true"
  // length of the string. Use a character array so that you can perform
  // this operation in place.
  // EXAMPLE: (input: "Mr John Smith    ", 13) (output: "Mr%20John%20Smith")

  let current_string_index = actual_length - 1;
  let swap_index = character_array.length - 1;

  while (current_string_index >= 0) {
    if (character_array[current_string_index] !== ' ') {
      [character_array[current_string_index], character_array[swap_index]] = [
        character_array[swap_index],
        character_array[current_string_index]
      ];
      current_string_index--;
      swap_index--;
    } else {
      character_array[swap_index] = '0';
      character_array[swap_index - 1] = '2';
      character_array[swap_index - 2] = '%';
      current_string_index--;
      swap_index -= 3;
    }
  }
  console.log(character_array);
  return character_array;
}
*/

// console.log(URLify1('Mr John Smith ', 13) === 'Mr%20John%20Smith');

// console.log(URLify2('Mr John Smith ', 13) === 'Mr%20John%20Smith');

// console.log(URLify3('Mr John Smith ', 13) === 'Mr%20John%20Smith');

// console.log(URLify4('Mr John Smith ', 13) === 'Mr%20John%20Smith');

// console.log(URLify5('Mr John Smith ', 13) === 'Mr%20John%20Smith');

// console.log(URLify6('Mr John Smith ', 13) === 'Mr%20John%20Smith');

// console.log(URLify7('Mr John Smith ', 13) === 'Mr%20John%20Smith');

// console.log(URLify8('Mr John Smith ', 13) === 'Mr%20John%20Smith');

// console.log(URLify9('Mr John Smith ', 13) === 'Mr%20John%20Smith');

// console.log(URLify10('Mr John Smith ', 13) === 'Mr%20John%20Smith');

// console.log(
//   URLify15('Mr John Smith ', 13) === 'Mr%20John%20Smith',
//   URLify15('Mr John Smith ', 14) === 'Mr%20John%20Smith%20',
//   URLify15('   hi', 7) === '%20%20%20hi%20%20',
//   URLify15('   hi ', 3) === '%20hi',
//   URLify15('', 0) === '',
//   URLify15('', 2) === '%20%20',
//   URLify15('hel lo', 5) === 'hello'
// );

//results:
// URLify1 x 1,171,045 ops/sec ±2.26% (60 runs sampled)
// URLify2 x 1,825,404 ops/sec ±0.68% (58 runs sampled)
// URLify3 x 1,755,325 ops/sec ±1.21% (55 runs sampled)
// URLify4 x 1,739,194 ops/sec ±1.69% (61 runs sampled)
// URLify5 x 1,729,679 ops/sec ±3.63% (59 runs sampled)
// URLify6 x 1,694,589 ops/sec ±1.15% (62 runs sampled)
// URLify7 x 3,290,571 ops/sec ±3.49% (55 runs sampled)
// URLify8 x 2,940,520 ops/sec ±1.72% (55 runs sampled)
// URLify9 x 2,715,016 ops/sec ±3.04% (51 runs sampled)
// URLify10 x 3,848,792 ops/sec ±0.95% (54 runs sampled)
// Fastest is URLify10

// Practice list:
// 1. 10 ...clean code
// 2. 7 ... ES5 regex(2 FP calls)
// 3. 8 chirpingmermaids, O(2n), O(1)... messy error-prone code
// 4. 9 ... ES6 regex(2 FP calls) and 1 conditional
