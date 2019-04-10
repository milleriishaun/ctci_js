// var Benchmark = require('benchmark');
// var suite = new Benchmark.Suite();

// // add tests
// suite
//   .add('isUnique1', function() {
//     isUnique1('striggnp');
//   })
//   .add('isUnique2', function() {
//     isUnique2('striggnp');
//   })
//   .add('isUnique3', function() {
//     isUnique3('striggnp');
//   })
//   .add('isUnique4', function() {
//     isUnique4('striggnp');
//   })
//   .add('isUnique5', function() {
//     isUnique5('striggnp');
//   })
//   .add('isUnique6', function() {
//     isUnique6('striggnp');
//   })
//   .add('isUnique7', function() {
//     isUnique7('striggnp');
//   })
//   .add('isUnique8', function() {
//     isUnique8('striggnp');
//   })
//   .add('isUnique9', function() {
//     isUnique9('striggnp');
//   })
//   .add('isUnique10', function() {
//     isUnique10('striggnp');
//   })
//   .add('isUnique11', function() {
//     isUnique11('striggnp');
//   })
//   .add('isUnique12', function() {
//     isUnique12('striggnp');
//   })
//   .add('isUnique13', function() {
//     isUnique13('striggnp');
//   })
//   .add('isUnique14', function() {
//     isUnique14('striggnp');
//   })
//   .add('isUnique15', function() {
//     isUnique15('striggnp');
//   })
//   .add('isUnique16', function() {
//     isUnique16('striggnp');
//   })
//   .add('isUnique17', function() {
//     isUnique17('striggnp');
//   })
//   .add('isUnique18', function() {
//     isUnique18('striggnp');
//   })
//   // add listeners
//   .on('cycle', function(event) {
//     console.log(String(event.target));
//   })
//   .on('complete', function() {
//     console.log('Fastest is ' + this.filter('fastest').map('name'));
//   })
//   // run async
//   .run({ async: true });

// algos sol
// CTCI JS Sol
// ctci
// CTCI JS
// CTCI ES5
// ctci javascript
// JS Algos
// stackhouse

// O(N log N) TIME --- O(1) SPACE
function isUnique1(str) {
  str = str.split``.sort();
  const length = str.length;

  for (let i = 0; i < length; i++) {
    if (str[i] === str[i + 1]) return false;
  }

  return true;
}

// Time: O(N lg N)
// Additional space: O(1)
// Sort the original string first then iterate through it. Repeat characters
// will show up next to eachother so fail if any two characters in a row
// are the same.
function isUnique2(str) {
  // sort string using quicksort
  arr = str.split('').sort();
  for (var i = 1; i < arr.length; ++i) {
    if (arr[i] === arr[i - 1]) {
      return false;
    }
  }
  return true;
}

// Using a Set
const isUnique3 = str => new Set(str).size === str.length;

// ctci js
function isUnique4(str) {
  // ASCII string longer than 128 has dups
  if (str.length > 128) {
    return false;
  }
  // Set makes this easy 😀
  return new Set(str).size == str.length;
}

// JS Algos2
function isUnique5(str) {
  var hash = {};
  for (var i = 0; i < str.length; i++) {
    var ele = str[i];
    if (!hash[ele]) {
      hash[ele] = 1;
    } else {
      hash[ele]++;
    }
  }
  for (var key in hash) {
    if (hash[key] > 1) {
      return false;
    }
  }
  return true;
}

// CTCI ES5
// Time: O(N)
// Additional space: O(N)
// Keep track of seen characters with a Set data structure, fail when
// a repeated character is found.
function isUnique6(str) {
  let chars = new Set();

  for (let i = 0; i < str.length; ++i) {
    if (chars.has(str[i])) {
      return false;
    }
    chars.add(str[i]);
  }
  return true;
}

// CTCI JS Sols3
// O(N) TIME --- O(N) SPACE
function isUnique7(str) {
  const letterSet = new Set();

  for (const letter of str) {
    if (letterSet.has(letter)) return false;
    letterSet.add(letter);
  }

  return true;
}

// try 2
// time: O(n)
// space: O(n) // since storing
function isUnique8(str) {
  let arr = []; //I don't need to identify 128 in the []
  // because JS arrays expand to fit, making any # of possible chars handled.
  for (let j = 0; j < str.length; j++) {
    let val = str.charAt(j);
    if (arr[val]) {
      // second pass confirmed here
      return false;
    }
    arr[val] = true;
  }
  return true;
}

// JS Algos1
function isUnique9(str) {
  var element = {};
  for (var i = 0; i < str.length; i++) {
    if (element[str[i]]) {
      return false;
    }
    element[str[i]] = true;
  }
  return true;
}

// algo sols
function isUnique10(str) {
  if (str.length > 128) {
    return false;
  }
  let checked = {};
  for (let i = 0; i < str.length; i++) {
    let elm = str.charAt(i);
    if (checked[elm]) return false;
    checked[elm] = true;
  }
  return true;
}

// ChirpingmermaidCodes... ES6
// time: O(n)
// space: O(n)
let isUnique11 = s => {
  // check each character and store in a hash table
  // if we find that the character is already there, return false
  // when done checking, return true
  let hash = {};

  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (hash[c]) {
      return false;
    } else {
      hash[c] = true;
    }
  }
  return true;
};

// CTCI JS Sols2
// O(Nˆ2) TIME --- O(1) SPACE
function isUnique12(str) {
  const strLength = str.length;

  for (let i = 0; i < strLength; i++) {
    for (let x = i + 1; x < strLength; x++) {
      if (str[i] === str[x]) return false;
    }
  }

  return true;
}

// ctci
function isUnique13(str) {
  if (!str.length) return true; // fail early if empty string

  const memo = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (memo[char]) return false;
    memo[char] = 1;
  }

  return true;
}

// try 1
// time: O(n^2)
// space: O(1)
function isUnique14(str) {
  let arr = str.split('');
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        return false;
      }
    }
  }
  return true;
}

// same as above but without data-structures
function isUnique15(str) {
  // ASCII string longer than 128 has dups
  if (str.length > 128) {
    return false;
  }

  // O(n2) when banning use of hash or array etc
  for (let i = 0; i < str.length; i += 1) {
    for (let j = i + 1; j < str.length; j += 1) {
      if (str[i] === str[j]) {
        return false;
      }
    }
  }

  return true;
}

// CTCI JS
var isUnique16 = function(string) {
  // O(n^2) approach, no additional data structures used
  // for each character, check remaining characters for duplicates
  for (var i = 0; i < string.length; i++) {
    for (var j = i + 1; j < string.length; j++) {
      if (string[i] === string[j]) {
        return false; // if match, return false
      }
    }
  }
  return true; // if no match, return true
};

// CTCI JS Sols1
// Regex
const isUnique17 = str => !/(.).*\1/.test(str);

// try 3, with bitwise operators
//note: idk how to use bitwise well, so mostly copying
// time: O(n)
// space: O(1) // since not storing
function isUnique18(str) {
  let checker = 0;
  for (let i = 0; i < str.length; i++) {
    let val = str.charCodeAt(i) - 'a'.charCodeAt(0);
    if ((checker & (1 << val)) > 0) {
      return false;
    }
    checker |= 1 << val;
  }
  return true;
}

// console.log(
//   isUnique1('s') === true,
//   isUnique1('') === true,
//   isUnique1('rainbow') === true,
//   isUnique1('ss') === false,
//   isUnique1('stories') === false,
//   isUnique1('chirpingmermaid') === false
// );

// console.log(
//   isUnique2('s') === true,
//   isUnique2('') === true,
//   isUnique2('rainbow') === true,
//   isUnique2('ss') === false,
//   isUnique2('stories') === false,
//   isUnique2('chirpingmermaid') === false
// );

// console.log(
//   isUnique3('s') === true,
//   isUnique3('') === true,
//   isUnique3('rainbow') === true,
//   isUnique3('ss') === false,
//   isUnique3('stories') === false,
//   isUnique3('chirpingmermaid') === false
// );

// console.log(
//   isUnique4('s') === true,
//   isUnique4('') === true,
//   isUnique4('rainbow') === true,
//   isUnique4('ss') === false,
//   isUnique4('stories') === false,
//   isUnique4('chirpingmermaid') === false
// );

// console.log(
//   isUnique5('s') === true,
//   isUnique5('') === true,
//   isUnique5('rainbow') === true,
//   isUnique5('ss') === false,
//   isUnique5('stories') === false,
//   isUnique5('chirpingmermaid') === false
// );

// console.log(
//   isUnique6('s') === true,
//   isUnique6('') === true,
//   isUnique6('rainbow') === true,
//   isUnique6('ss') === false,
//   isUnique6('stories') === false,
//   isUnique6('chirpingmermaid') === false
// );

// console.log(
//   isUnique7('s') === true,
//   isUnique7('') === true,
//   isUnique7('rainbow') === true,
//   isUnique7('ss') === false,
//   isUnique7('stories') === false,
//   isUnique7('chirpingmermaid') === false
// );

// console.log(
//   isUnique8('s') === true,
//   isUnique8('') === true,
//   isUnique8('rainbow') === true,
//   isUnique8('ss') === false,
//   isUnique8('stories') === false,
//   isUnique8('chirpingmermaid') === false
// );

// console.log(
//   isUnique9('s') === true,
//   isUnique9('') === true,
//   isUnique9('rainbow') === true,
//   isUnique9('ss') === false,
//   isUnique9('stories') === false,
//   isUnique9('chirpingmermaid') === false
// );

// console.log(
//   isUnique10('s') === true,
//   isUnique10('') === true,
//   isUnique10('rainbow') === true,
//   isUnique10('ss') === false,
//   isUnique10('stories') === false,
//   isUnique10('chirpingmermaid') === false
// );

// console.log(
//   isUnique11('s') === true,
//   isUnique11('') === true,
//   isUnique11('rainbow') === true,
//   isUnique11('ss') === false,
//   isUnique11('stories') === false,
//   isUnique11('chirpingmermaid') === false
// );

// console.log(
//   isUnique12('s') === true,
//   isUnique12('') === true,
//   isUnique12('rainbow') === true,
//   isUnique12('ss') === false,
//   isUnique12('stories') === false,
//   isUnique12('chirpingmermaid') === false
// );

// console.log(
//   isUnique13('s') === true,
//   isUnique13('') === true,
//   isUnique13('rainbow') === true,
//   isUnique13('ss') === false,
//   isUnique13('stories') === false,
//   isUnique13('chirpingmermaid') === false
// );

// console.log(
//   isUnique14('s') === true,
//   isUnique14('') === true,
//   isUnique14('rainbow') === true,
//   isUnique14('ss') === false,
//   isUnique14('stories') === false,
//   isUnique14('chirpingmermaid') === false
// );

// console.log(
//   isUnique15('s') === true,
//   isUnique15('') === true,
//   isUnique15('rainbow') === true,
//   isUnique15('ss') === false,
//   isUnique15('stories') === false,
//   isUnique15('chirpingmermaid') === false
// );

// console.log(
//   isUnique16('s') === true,
//   isUnique16('') === true,
//   isUnique16('rainbow') === true,
//   isUnique16('ss') === false,
//   isUnique16('stories') === false,
//   isUnique16('chirpingmermaid') === false
// );

// console.log(
//   isUnique17('s') === true,
//   isUnique17('') === true,
//   isUnique17('rainbow') === true,
//   isUnique17('ss') === false,
//   isUnique17('stories') === false,
//   isUnique17('chirpingmermaid') === false
// );

// console.log(
//   isUnique18('s') === true,
//   isUnique18('') === true,
//   isUnique18('rainbow') === true,
//   isUnique18('ss') === false,
//   isUnique18('stories') === false,
//   isUnique18('chirpingmermaid') === false
// );

// console.log(
//   isUnique('s') === true,
//   isUnique('') === true,
//   isUnique('rainbow') === true,
//   isUnique('ss') === false,
//   isUnique('stories') === false,
//   isUnique('chirpingmermaid') === false
// );

//results:
// isUnique1 x 846,857 ops/sec ±2.14% (58 runs sampled)
// isUnique2 x 966,198 ops/sec ±3.56% (51 runs sampled)
// isUnique3 x 1,367,941 ops/sec ±2.43% (52 runs sampled)
// isUnique4 x 1,390,420 ops/sec ±1.77% (53 runs sampled)
// isUnique5 x 2,001,776 ops/sec ±1.83% (52 runs sampled)
// isUnique6 x 2,163,475 ops/sec ±1.35% (52 runs sampled)
// isUnique7 x 2,090,128 ops/sec ±2.45% (53 runs sampled)
// isUnique8 x 2,970,113 ops/sec ±2.27% (56 runs sampled)
// isUnique9 x 3,049,962 ops/sec ±1.81% (53 runs sampled)
// isUnique10 x 3,136,138 ops/sec ±2.28% (52 runs sampled)
// isUnique11 x 3,125,840 ops/sec ±3.04% (49 runs sampled)
// isUnique12 x 3,276,093 ops/sec ±1.57% (53 runs sampled)
// isUnique13 x 3,201,519 ops/sec ±2.06% (56 runs sampled)
// isUnique14 x 2,915,926 ops/sec ±1.92% (54 runs sampled)
// isUnique15 x 3,163,697 ops/sec ±4.34% (53 runs sampled)
// isUnique16 x 3,125,860 ops/sec ±3.75% (48 runs sampled)
// isUnique17 x 3,702,872 ops/sec ±2.37% (50 runs sampled)
// isUnique18 x 43,736,497 ops/sec ±2.00% (56 runs sampled)
// Fastest is isUnique18

// Practice list:
// 1. 14 try1
// 2. 12 memo
// 3. 13 memo
// 4. 11 memo/hash chirpingmermaids
// 5. 10 memo
// 6. 9 memo
// 7. 8 memo
// 8. 18 advanced bitwise

function isUnique14(str) {
  let arr = str.split('');
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        return false;
      }
    }
  }
  return true;
}
