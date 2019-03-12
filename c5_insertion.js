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
// /** INSERTION
//  * I: 2 32-bit numbers, N and M. 2 bit positions, i and j.
//  * O: N (new)
//  * E: N.length >= M.length
//  * C: j-i interval must be big enough to fit M.length.
//  */

// // Try 1 ... failed b/c unclear about bit manipulation with string controls.
// // Should work as specified but cannot seem to get the right combo.
// // Time complexity: O(n)
// // Space complexity: O(n)
// // debug time:  mins. // fails b/c strings immutable

// function insertion(N, M, i, j) {
//   // make strings into array so that they are mutable
//   let NA = N.split('');
//   let MA = M.split('');

//   // handle exceptions
//   if (j - i + 1 < M.length || N.length < M.length) {
//     return false;
//   }

//   console.log('MA:', MA);
//   console.log('NA1:', NA);
//   // clear all the bits from N[i] to N[j]
//   for (let k = i; k <= j; k++) {
//     if (NA[k] === '1') {
//       NA = clearBit(NA.join(''), k)
//         .toString(2)
//         .split('');
//       console.log('NA-mid:', NA.join(''));
//       // ...why NA-mid goes from 100101001001 to 0 when returned.
//     }
//   }
//   console.log('NA2:', NA.join(''));

//   // // set all the bits that line up with M.
//   // for (let p = 0; p < M.length; p++) {
//   //   if (MA[p]) {
//   //     setBit(NA.join(''), p + i);
//   //   }
//   // }

//   return NA;
// }

// function clearBit(num, iBound) {
//   let mask = ~(1 << iBound);
//   console.log((num & mask).toString(2));
//   return num & mask;
// }

// function setBit(num, iVal) {
//   return num | (1 << iVal);
// }

// console.log(insertion('10011110000', '10011', 2, 6)); // 10001001100

// CTCI JS... this one works but slightly tricky
// notice that there is no real bit manipulation here, just counting correctly.
var insertion = function(N, M, i, j) {
  // make the two numbers into arrays to edit them
  var n = N.split('');
  var m = M.split('');

  // record the length of the arrays - 1 so that you can take out the 0 position
  // value, on 32 bits.
  var nlength = n.length - 1;
  var mlength = m.length - 1;

  // loop through an incremented array, which scrolls from 'end' position to
  // 'left' position. The j - i + 1 is the interval to account for changes in.
  for (var a = 0; a < j - i + 1; a++) {
    console.log(m[mlength - a]); // this was needed to increment backwards.
    n[nlength - (i + a)] = m[mlength - a]; // i+a means that it is i from
    // from right and a(incremented).(so scrolls backwards but starting at i)
    // Each position is changed starting from right to left.
  }
  return n.join('');
};

// TEST
console.log(insertion('10000000000', '10011', 2, 6), '10001001100');
