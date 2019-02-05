// Note that benchmarking using console.time('str');
// then console.timeEnd('str'); does not give accurate results.
// So it is best not to use it to benchmark. Best is benchmark.js currently,
// or in Chrome browser.

// Benchmarking asychronous code and nonasync code
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();
/*
// the following compares finding o with regex versus using indexOf
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
*/

// the cycle information really helps get more information about the
// way to solve for what is faster... and it is nice to see results chosen.

// Benchmarking in different browsers(use JSperf website)
//example:
const mySolution = n => {
  let sum = 0;

  for (let i = 0; i < n; i++) if (i % 3 === 0 || i % 5 === 0) sum += i;
  return sum;
};

//vs
const otherSolution = n => {
  let number = n - 1;
  const fives = Math.floor(number / 5), // # of multiples of 5 below n
    threes = Math.floor(number / 3),
    fifteens = Math.floor(number / 15),
    sum = (base, num) => (base * (num ** 2 + num)) / 2;
  return sum(5, fives) + sum(3, threes) - sum(15, fifteens);
};

// Using benchmark.js
suite
  .add('t1', function() {
    mySolution(100000);
  })
  .add('t2', function() {
    otherSolution(100000);
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

// Benchmarking in Chrome Browser(improvised method)
// comparing mySolution to otherSolution(answer in milliseconds)
let then = new Date();
for (let i = 0; i < 1000; i++) {
  mySolution(100000);
}
let now = new Date();
now - then;

then = new Date(); //then and now were already declared
for (let i = 0; i < 1000; i++) {
  otherSolution(100000);
}
now = new Date();
now - then;

// Benchmark in Chrome Browser.(easy method)
const bench = (func, input, iterations) => {
  /* any boilerplate code you want to have happen before the timer starts, perhaps copying a variable so it isn't mutated */
  const start = new Date();
  for (let i = 0; i < iterations; i++) {
    func(input);
  }
  const finish = new Date();
  return finish - start;
};
//bench(functionName, input, numIters) in chrome console.log(ctrl+shft+J)
//bench(mySolution, 100000, 1000);
//bench(otherSolution, 100000, 1000);
