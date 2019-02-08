var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// try 1
// time: O(n^2)
// space: O(1)
function isUnique1(str) {
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

// try 2
// time: O(n)
// space: O(1)
function isUnique2(str) {
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

// try 3, with bitwise operators
//note: idk how to use bitwise well, so mostly copying
function isUnique3(str) {
  let checker = 0;
  for (let i = 0; i < str.length; i++) {
    let val = str.charCodeAt(i) - 'a'.charCodeAt(0);
    console.log('val', val);
    console.log('1 << val', 1 << val);
    if ((checker & (1 << val)) > 0) {
      return false;
    }
    console.log(checker);
    checker |= 1 << val;
    console.log(checker);
  }
  return true;
}
console.log(isUnique3('striggnp'));

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
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });

//results:
// isUnique1 x 3,689,300 ops/sec ±1.30% (60 runs sampled)
// isUnique2 x 3,995,171 ops/sec ±1.49% (62 runs sampled)
// isUnique3 x 57,454,366 ops/sec ±3.04% (58 runs sampled)
// Fastest is isUnique3
*/
