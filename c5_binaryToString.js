var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

/*
// add tests
suite
  .add('insertion1', function() {
    insertion1('striggnp');
  })
  .add('insertion2', function() {
    insertion2('striggnp');
  })
  .add('insertion3', function() {
    insertion3('striggnp');
  })
  .add('insertion4', function() {
    insertion4('striggnp');
  })
  .add('insertion5', function() {
    insertion5('striggnp');
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

// // Try 1
// /** BINARY TO STRING
//  * I: real number(double) between 0 and 1
//  * O: print binary representation
//  * C: if the number requires more than 32 bits to represent, print 'Error'
//  * E: none
//  */

// Web notes:
// Step 1: Begin with the decimal fraction and multiply by 2. The whole number
// part of the result is the first binary digit to the right of the point.

// Because .625 x 2 = 1.25, the first binary digit to the right of the point
// is a 1.
// So far, we have .625 = .1??? . . . (base 2) .

// Step 2: Next we disregard the whole number part of the previous
// result (the 1 in this case) and multiply by 2 once again. The whole
// number part of this new result is the second binary digit to the right
// of the point. We will continue this process until we get a zero as our
// decimal part or until we recognize an infinite repeating pattern.

// Because .25 x 2 = 0.50, the second binary digit to the right of the point
// is a 0.
// So far, we have .625 = .10?? . . . (base 2) .

// Step 3: Disregarding the whole number part of the previous result (this result was .50 so there actually is no whole number part to disregard in this case), we multiply by 2 once again. The whole number part of the result is now the next binary digit to the right of the point.

// Because .50 x 2 = 1.00, the third binary digit to the right of the point is a 1.
// So now we have .625 = .101?? . . . (base 2) .

// Step 4: In fact, we do not need a Step 4. We are finished in Step 3, because we had 0 as the fractional part of our result there.

// Hence the representation of .625 = .101 (base 2) .

// You should double-check our result by expanding the binary representation.

// Try 1
// Time complexity: O(n)
// Space complexity: O(n)
// debug time:  mins.
function binaryToString(dbl) {
  let twice = dbl * 2;
  let right = String(twice).split('.')[1];
  let left;
  let arr = [];
  if (Number(right) >= 2 ** 31 - 1) {
    return 'ERROR';
  }
  for (let i = 0; i <= 31; i++) {
    left = String(twice).split('.')[0];
    // console.log(left);
    if (left !== 'NaN') {
      arr.push(left);
    }
    twice = Number('0.' + right) * 2;
    if (twice !== '0.0') {
      // supposed to stop 0.72, but it continues...
      right = String(twice).split('.')[1];
    }
  }
  return '0.' + arr.join('');
}

console.log(binaryToString(0.625), 0.101);
console.log(binaryToString(0.72), 0.1011100001);

// CTCI JS
var binaryToString2 = function(number) {
  var n = 1;
  var str = '0.';
  while (n <= 32 && number > 0) {
    if (number >= Math.pow(2, -n)) {
      number -= Math.pow(2, -n);
      str += '1';
    } else {
      str += '0';
    }
    n++;
  }
  if (n === 33 && number > 0) {
    return 'ERROR';
  } else {
    return str;
  }
};

/* TEST */
console.log(binaryToString2(0.625), '0.101');
console.log(binaryToString2(0.6255342856783467856932), 'ERROR');
console.log(binaryToString(0.6255342856783467856932), 'ERROR'); // at least mine gets this
