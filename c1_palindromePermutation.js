var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
/*
suite
  .add('palindromePermutation1', function() {
    palindromePermutation1('TaTac');
  })
  .add('palindromePermutation2, function() {
    palindromePermutation2('TaTac');
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
*/

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
    let innerPermutations = getAllPermutations(charsLeft);
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
  let perms = getAllPermutations(strArr);
  if (perms.length > 0) {
    console.log('True (permutations: ', ...perms, ')');
  } else {
    console.log('False (permutations: none)');
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

function palindromePermutation3(str) {
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

console.log(palindromePermutation3('racecarr'));
