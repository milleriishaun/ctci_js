var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

suite
  .add('palindromePermutation1', function() {
    palindromePermutation1('TaTac');
  })
  .add('palindromePermutation2', function() {
    palindromePermutation2('TaTac');
  })
  .add('palindromePermutation4', function() {
    palindromePermutation4('TaTac');
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });

// try 1 (needed help w/finding permutations b/c forgot recursion gets n!)
// time: O(xn!)
// space: O(n) b/c of call stack

// Pseudocode
// function getAllPermutations (string)
// define results
// if string is a single character
//   add the character to results
//   return results
// for each char in string
//   define innerPermutations as a char of string
//   set innerPermutations to getAllPermutations (without next char)
//   foreach string in innerPermutations
//     add defined char and innerPermutations char
// return results

function getAllPermutations1(str) {
  let results = [];

  if (str.length === 1) {
    results.push(str);
    return results;
  }

  for (let i = 0; i < str.length; i++) {
    let firstChar = str[i];
    var charsLeft = str.substring(0, i) + str.substring(i + 1);
    let innerPermutations = getAllPermutations1(charsLeft);
    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

function palindromePermutation1(str) {
  let strArr = str
    .toLowerCase()
    .split('')
    .filter(function(el) {
      return el !== ' ';
    })
    .join('');
  let perms = getAllPermutations1(strArr);
  if (perms.length > 0) {
    return true;
  } else {
    return false;
  }
}

// I got owned by the solutions in ctci, since they all avoided
// the task of finding all the permutations through O(n!)(b/c infeasible)
// Now to check how the person actually solved it JS.

function palindromePermutation2(str) {
  let chars = {};
  let currChar = 0;
  let isPerm = true;
  let mulligan = false;
  // pump in the characters
  str.split('').forEach(function(char) {
    if (char !== ' ') {
      currChar = char.toLowerCase();
      if (chars[currChar] === undefined) {
        chars[currChar] = 0;
      }
      chars[char]++;
    }
  });
  // check if remainder for each letter, first remainder = mulligan = true,
  // then, second remainder = milligan true... making isPerm false.
  Object.keys(chars).forEach(function(char) {
    if (chars[char] % 2 > 0) {
      if (mulligan) {
        isPerm = false;
      } else {
        mulligan = true;
      }
    }
  });
  return isPerm;
}

/*
function palindromePermutation3(str) {
  let bitVector = createBitVector(str);
  return bitVector == 0 || checkExactlyOneBitSet(bitVector);
}

function createBitVector(str) {
  let bitVector = 0;
  for (char)
}
  let chars = {};
  let currChar = 0;
  let checker = 0;
  // pump in the characters
  str.split('').forEach(function(char) {
    if (char !== ' ') {
      currChar = char.toLowerCase();
      if (chars[currChar] === undefined) {
        chars[currChar] = 0;
      }
      chars[char]++;
    }
  });
  // check if remainder for each letter, first remainder = mulligan = true,
  // then, second remainder = milligan true... making isPerm false.
  Object.keys(chars).forEach(function(char) {
    let val = char.charCodeAt(0) - 'a'.charCodeAt(0);
    let mask = 1 << val;
    if (checker & (mask == 0)) {
    }
  });
  return isPerm;
}
*/

/**
 * CHECK PERMUTATION
 *
 *
 * I: string
 * O: boolean
 * C: optimize
 * E: empty string, spaces between and in front and at end, >2 of the same
 * characters, even and odd chars
 */

// time complexity: O(n)
// space complexity: O(n) ..likely

// from ChirpinmermaidCodes
let palindromePermutation4 = s => {
  //if even: then there must be 2 of every character
  //if odd: there must be only one unique char
  //use hash table to store letters
  //if we see the same letter again, delete from hash
  //check hash table at the end: odd, then we should have 1 key left, and
  // if even, then we should  have 0 keys left
  let hash = {};
  let charCount = 0;

  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (c === ' ') {
      continue;
    }
    if (hash[c]) {
      delete hash[c];
    } else {
      hash[c] = true;
    }
    charCount++;
  }
  if (charCount % 2 === 0) {
    return Object.keys(hash).length === 0;
  } else {
    return Object.keys(hash).length === 1;
  }
};

console.log(
  palindromePermutation4('taco cat') === true,
  palindromePermutation4('atco cat') === true,
  palindromePermutation4(' rac ecar rara ') === true,
  palindromePermutation4('aabbc') === true,
  palindromePermutation4('aaaabbbbcc') === true,
  palindromePermutation4('') === true,
  palindromePermutation4('chirpingmermaid') === false,
  palindromePermutation4('aabc') === false
);

// results:
// palindromePermutation1 x 33,795 ops/sec ±3.76% (48 runs sampled)
// palindromePermutation2 x 664,872 ops/sec ±1.39% (50 runs sampled)
// palindromePermutation4 x 862,641 ops/sec ±3.78% (48 runs sampled)
// Fastest is palindromePermutation4
