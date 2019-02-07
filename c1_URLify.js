var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

suite
  .add('URLify', function() {
    URLify('Mr John Smith     ', 13);
  })
  .add('urlify', function() {
    urlify('Mr John Smith     ', 13);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });

// try 1
// time: O(n) ... Functional Programming slows, b/c
// of the issue of method call overhead
// space: O(1)
function URLify(str, length) {
  return str
    .trim()
    .split(' ')
    .join('%20');
}

// confusing pointer example even though not really a pointer b/c can't in JS
// Fails
var urlify = function(str, length) {
  // have a pointer to check from start to end
  var strArr = str.split('');
  var pointer = 0;
  while (pointer < str.length) {
    if (strArr[pointer] === ' ') {
      // *** needs more work here, a little wierd
      // not handling trailing spaces properly
      for (var i = str.length - 1; pointer < i; i--) {
        strArr[i] = str[i - 2];
      }
      strArr[pointer] = '%';
      strArr[pointer + 1] = '2';
      strArr[pointer + 2] = '0';
    }
    pointer++;
  }
  // if character is a space, move remainder chars by two
  // replace following three chars with '%20'
  return strArr.join('');
};

//results:
// URLify x 1,677,857 ops/sec ±2.23% (56 runs sampled)
// urlify x 1,039,046 ops/sec ±2.65% (60 runs sampled)
// Fastest is URLify
