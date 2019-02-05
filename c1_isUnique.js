var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

// add tests
suite
  .add('RegExp#test', function() {
    /o/.test('Hello World!');
  })
  .add('String#indexOf', function() {
    'Hello World!'.indexOf('o') > -1;
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

// try 1
// time: O(n^2)
// space: O(1)
function issUnique(str) {
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

//benchmark: 3.144ms(too slow)
console.time('t1');
for (let i = 0; i < 10000; i++) {
  isUnique('striggnp');
}
console.timeEnd('t1');
console.time('t2');
for (let i = 0; i < 10000; i++) {
  isUnique('striggnp');
}
console.timeEnd('t2');
console.time('t2.1');
for (let i = 0; i < 10000; i++) {
  isUnique('striggnp');
}
console.timeEnd('t2.1');
// try 2
// time: O(n)
// space: O(1)
function isUnique(str) {
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

//tests
//benchmark 0.574ms(much faster)(w/o console.log)
//note: w/o console.log, the difference in speed is harder to
//see, and can often be too close to tell.
//benchmark 1.155ms(much faster)(w/ console.log)
//note: now was see the difference between O(n^2) and O(n)
console.time('t3');
for (let i = 0; i < 10000; i++) {
  isUnique('striggnp'); //your code here
}
console.timeEnd('t3');
console.time('t4');
for (let i = 0; i < 10000; i++) {
  isUnique('striggnp');
}
console.timeEnd('t4');

// try 3, with bitwise operators
//note: idk how to use bitwise well, so mostly copying
function isUnique(str) {
  let checker = 0;
  for (let i = 0; i < str.length; i++) {
    let val = str.charAt(i) - 'a';
    if ((checker & (1 << val)) > 0) {
      return false;
    }
    checker |= 1 << val;
  }
  return true;
}

//benchmark: 0.157ms(fastest)(w/o console.log)
//benchmark: 0.426ms(fastest)(w/ console.log)
console.time('t5');
for (let i = 0; i < 10000; i++) {
  isUnique('striggnp');
}
console.timeEnd('t5');
console.time('t6');
for (let i = 0; i < 10000; i++) {
  isUnique('striggnp');
}
console.timeEnd('t6');
