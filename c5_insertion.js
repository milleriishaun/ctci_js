var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

/*
// add tests
suite
  .add('isUnique1', function() {
    isUnique1('striggnp');
  })
  .add('isUnique2', function() {
    isUnique2('striggnp');
  })
  .add('isUnique3', function() {
    isUnique3('striggnp');
  })
  .add('isUnique4', function() {
    isUnique4('striggnp');
  })
  .add('isUnique5', function() {
    isUnique5('striggnp');
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
  */

// CTCI JS (good full c5, great tests included)
// algo sol (missing q:2-8, <10 months old)

// Just try to have CTCI JS and CTCI JS Sol easily accessible and tested. Have
// ctci and algo sol as commented out for quick reference later, when I understand
// these trees/graphs better.

// Try 1
/** INSERTION
 * I: 2 32-bit numbers, N and M. 2 bit positions, i and j.
 * O: N (new)
 * E: N.length >= M.length
 * C: j-i interval must be big enough to fit M.length.
 */

// Try 1
// Time complexity: O(n)
// Space complexity: O(n)
// debug time:  mins. // fails b/c strings immutable

function insertion(N, M, i, j) {
  // exceptions
  if (j - i + 1 < M.length || N.length < M.length) {
    return false;
  }

  // clear all the bits from N[i] to N[j]
  for (let k = 0; k < N.length; k++) {
    if (N[i]) {
      clearBit(N, i);
    }
  }
  // set all the bits that line up with M.
  for (let p = 0; p < M.length; p++) {
    if (M[p]) {
      setBit(N, p);
    }
  }
  return N;
}

function clearBit(num, iBound) {
  let mask = ~(1 << iBound);
  return num & mask;
}

function setBit(num, iVal) {
  return num | (1 << iVal);
}

console.log(insertion('10000000000', '10011', 2, 6)); // 10001001100

// CTCI JS

// algo sol (missing q:2-8, <10 months old)
