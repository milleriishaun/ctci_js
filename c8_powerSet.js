var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('tripleStep1', function() {
    tripleStep1(10);
  })
  .add('tripleStep2', function() {
    tripleStep2(10);
  })
  .add('tripleStep3', function() {
    tripleStep3(10);
  })
  .add('tripleStep4', function() {
    tripleStep4(10);
  })
  .add('tripleStep5', function() {
    tripleStep5(10);
  })
  .add('tripleStep6', function() {
    tripleStep6(10);
  })
  .add('tripleStep7', function() {
    tripleStep7(10);
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

/** POWER SET
 * I: a Set
 * O: all subsets of a Set
 * C: none
 * E: none
 */

// Time Complexity: O(n)
// Space Complexity: O(n)
// Try 1

// CTCI JS
// CTCI JS Sol
// algo sol
// stackhouse
