var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('permutationsWithDups1', function() {
    permutationsWithDups1('abbccc');
  })
  .add('permutationsWithDups2', function() {
    permutationsWithDups2('abbccc');
  })
  .add('permutationsWithDups3', function() {
    permutationsWithDups3('abbccc');
  })
  .add('permutationsWithDups4', function() {
    permutationsWithDups4('abbccc');
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

// CTCI JS (good full c8, with time and space clearly shown)
// CTCI JS Sol (great full c8, has multiple applications, time and space)
// algo sol (2nd Best for c3, missing q:6,13,14, clear format, <10 months old)
// stackhouse (only q:1345)

// Just try to have CTCI JS and CTCI JS Sol...
// Just accommodate algo sol and stackhouse. They are too formal.

// algo sol
// "length is not defined"はhelper functionを使うと解決できた。
// almost but can't finish yet
let after;
let before;
let words;
let result = [];
let c;
let temp;
let checked = [];
let curr;

function permutationsWithDups1(s) {
  let result = [];
  let map = buildFreqTable(s);
  printPerms(map, '', s.length, result);
  return result;
}

function buildFreqTable(s) {
  let map = {};
  let curr;
  for (let i = 0; i < s.length; i++) {
    curr = s.charAt(i);
    if (!map.hasOwnProperty(curr)) {
      map[curr] = 1;
    } else {
      map[curr]++;
    }
  }
  return map;
}

function printPerms(map, prefix, remaining, result) {
  if (remaining === 0) {
    result.push(prefix);
    return;
  }

  Object.entries(map).forEach(([ch, count]) => {
    if (count !== 0) {
      const newMap = {
        ...map,
        [ch]: count - 1
      };
      printPerms(newMap, prefix + ch, remaining - 1, result);
    }
  });
}

// CTCI JS Sol1
// Solutions for permutations with duplicate characters in original string.
// WORST CASE RUNTIME: O(!N)
function permutationsWithDups2(
  str,
  prefix = '',
  result = [],
  perms = new Set()
) {
  perms.add(prefix);

  const { length } = str;
  if (!length) return result.push(prefix);

  for (let i = 0; i < length; i++) {
    const perm = prefix + str[i];
    if (!perms.has(perm)) {
      permutationsWithDups2(
        str.slice(0, i) + str.slice(i + 1),
        perm,
        result,
        perms
      );
    }
  }

  return result;
}

// CTCI JS
var permutationsWithDups3 = function(string) {
  var answers = [];
  var recurse = function(currPerm, remainingChars) {
    if (remainingChars.length === 0) {
      answers.push(currPerm);
    } else {
      var usedChars = {};
      for (var i = 0; i < remainingChars.length; i++) {
        if (!usedChars[remainingChars.charAt(i)]) {
          usedChars[remainingChars.charAt(i)] = true;
          recurse(
            currPerm + remainingChars.charAt(i),
            remainingChars.slice(0, i) + remainingChars.slice(i + 1)
          );
        }
      }
    }
  };
  recurse('', string);
  return answers;
};

// CTCI JS Sol2
// Very optimized runtime for duplicate strings.
function permutationsWithDups4(str) {
  return createPerms('', str.length, buildLetterMap(str));
}

function buildLetterMap(str) {
  const map = new Map();
  for (const letter of str) {
    map.set(letter, map.get(letter) + 1 || 1);
  }
  return map;
}

function createPerms(prefix, length, map, result = []) {
  if (!length) return result.push(prefix);

  for (const letter of map.keys()) {
    const count = map.get(letter);
    if (count) {
      map.set(letter, count - 1);
      createPerms(prefix + letter, length - 1, map, result);
      map.set(letter, count);
    }
  }

  return result;
}

// stackhouse ... no more solutions

console.log(permutationsWithDups1('aaa'));
console.log(permutationsWithDups1('abc'));
console.log(permutationsWithDups1('aba'));
// console.log(permutationsWithDups1('abbccc'));

console.log(permutationsWithDups2('aaa'));
console.log(permutationsWithDups2('abc'));
console.log(permutationsWithDups2('aba'));
// console.log(permutationsWithDups2('abbccc'));

console.log(permutationsWithDups3('aaa'));
console.log(permutationsWithDups3('abc'));
console.log(permutationsWithDups3('aba'));
// console.log(permutationsWithDups3('abbccc'));

console.log(permutationsWithDups4('aaa'));
console.log(permutationsWithDups4('abc'));
console.log(permutationsWithDups4('aba'));
// console.log(permutationsWithDups4('abbccc'));

// console.log(permutationsWithDups5('aaa'));
// console.log(permutationsWithDups5('abc'));
// console.log(permutationsWithDups5('aba'));
// console.log(permutationsWithDups5('abbccc'));

// results:
// Results are as expected
// // Note: Used the input 'abbccc'
// permutationsWithDups1 x 3,457 ops/sec ±1.82% (49 runs sampled)
// permutationsWithDups2 x 26,293 ops/sec ±2.13% (50 runs sampled)
// permutationsWithDups3 x 42,164 ops/sec ±3.51% (50 runs sampled)
// permutationsWithDups4 x 48,803 ops/sec ±1.47% (51 runs sampled)
// Fastest is permutationsWithDups4

// // Note: Used the input 'aba'
// permutationsWithDups1 x 102,066 ops/sec ±2.19% (50 runs sampled)
// permutationsWithDups2 x 591,170 ops/sec ±2.01% (50 runs sampled)
// permutationsWithDups3 x 972,863 ops/sec ±2.66% (52 runs sampled)
// permutationsWithDups4 x 844,012 ops/sec ±2.25% (51 runs sampled)
// Fastest is permutationsWithDups3
