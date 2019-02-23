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
  .add('isUnique6', function() {
    isUnique6('striggnp');
  })
  .add('isUnique7', function() {
    isUnique7('striggnp');
  })
  .add('isUnique8', function() {
    isUnique8('striggnp');
  })
  .add('isUnique9', function() {
    isUnique9('striggnp');
  })
  .add('isUnique10', function() {
    isUnique10('striggnp');
  })
  .add('isUnique11', function() {
    isUnique11('striggnp');
  })
  .add('isUnique12', function() {
    isUnique12('striggnp');
  })
  .add('isUnique13', function() {
    isUnique13('striggnp');
  })
  .add('isUnique14', function() {
    isUnique14('striggnp');
  })
  .add('isUnique15', function() {
    isUnique15('striggnp');
  })
  .add('isUnique16', function() {
    isUnique16('striggnp');
  })
  .add('isUnique17', function() {
    isUnique17('striggnp');
  })
  .add('isUnique18', function() {
    isUnique18('striggnp');
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

/** STRING COMPRESSION
 * I:
 * O:
 * E:
 * C:
 */

// Time complexity: O(n)
// Space complexity: O(n)

// Try 1
// time: O()
// space: O()

// algos sol
// CTCI JS Sol
// ctci
// CTCI JS
// CTCI ES5
// ctci javascript
// JS Algos
// stackhouse

// console.log(
//   oneAway1('pale', 'ple') === true,
//   oneAway1('pales', 'pale') === true,
//   oneAway1('pale', 'bale') === true,
//   oneAway1('pale', 'bake') === false
// );

// results
// oneAway1 x 2,824,249 ops/sec ±1.63% (60 runs sampled)
// oneAway2 x 14,409,750 ops/sec ±1.24% (63 runs sampled)
// oneAway3 x 29,297,268 ops/sec ±0.77% (62 runs sampled)
// oneAway4 x 30,000,166 ops/sec ±0.92% (58 runs sampled)
// oneAway5 x 30,786,356 ops/sec ±1.64% (59 runs sampled)
// oneAway6 x 29,525,998 ops/sec ±1.41% (59 runs sampled)
// oneAway7 x 75,373,449 ops/sec ±1.30% (58 runs sampled)
// Fastest is oneAway7
