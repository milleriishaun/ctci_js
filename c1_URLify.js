var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

suite
  .add('URLify1', function() {
    URLify1('Mr John Smith     ', 13);
  })
  .add('URLify2', function() {
    URLify2('Mr John Smith     ', 13);
  })
  .add('URLify3', function() {
    URLify3('Mr John Smith     ', 13);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });

// try 1
// time: O(n) ... Functional Programming slows, b/c
// of the issue of method call overhead
// space: O(1)
function URLify1(str, length) {
  return str
    .trim()
    .split(' ')
    .join('%20');
}

// confusing pointer example even though not really a pointer b/c can't in JS
// Fails
var URLify2 = function(str, length) {
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

let URLify3 = (s, n = s.length) => {
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
  // if n is not yet reached nad there are still spaces left
  while (spaces > 0) {
    out += '%20';
    spaces--;
  }

  return out;
};

console.log(
  URLify3('Mr John Smith ', 13) === 'Mr%20John%20Smith',
  URLify3('Mr John Smith ', 14) === 'Mr%20John%20Smith%20',
  URLify3('   hi', 7) === '%20%20%20hi%20%20',
  URLify3('   hi ', 3) === '%20hi',
  URLify3('', 0) === '',
  URLify3('', 2) === '%20%20',
  URLify3('hel lo', 5) === 'hello'
);

//results:
// URLify1 x 1,168,353 ops/sec ±3.78% (49 runs sampled)
// URLify2 x 728,168 ops/sec ±1.84% (47 runs sampled)
// URLify3 x 1,586,143 ops/sec ±2.39% (49 runs sampled)
// Fastest is URLify3
