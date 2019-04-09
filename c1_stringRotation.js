// var Benchmark = require('benchmark');
// var suite = new Benchmark.Suite();

// // add tests
// suite
//   .add('isRotation1', function() {
//     isRotation1('waterbottle', 'erbottlewat');
//   })
//   .add('isRotation2', function() {
//     isRotation2('waterbottle', 'erbottlewat');
//   })
//   .add('isRotation3', function() {
//     isRotation3('waterbottle', 'erbottlewat');
//   })
//   .add('isRotation4', function() {
//     isRotation4('waterbottle', 'erbottlewat');
//   })
//   .add('isRotation5', function() {
//     isRotation5('waterbottle', 'erbottlewat');
//   })
//   .add('isRotation6', function() {
//     isRotation6('waterbottle', 'erbottlewat');
//   })
//   .add('isRotation7', function() {
//     isRotation7('waterbottle', 'erbottlewat');
//   })
//   .add('isRotation8', function() {
//     isRotation8('waterbottle', 'erbottlewat');
//   })
//   // .add('isRotation9', function() {
//   //   isRotation9('waterbottle', 'erbottlewat');
//   // })
//   // add listeners
//   .on('cycle', function(event) {
//     console.log(String(event.target));
//   })
//   .on('complete', function() {
//     console.log('Fastest is ' + this.filter('fastest').map('name'));
//   })
//   // run async
//   .run({ async: true });

/** STRING ROTATION
 *
 * I: 2 strings. One call to isSubstring(checks if one word is a substring of another)
 * O: boolean
 * C: optimize
 * E: empty string
 *
 * note: This is basically an anagram with simple rotation/scrolling, rather than rand.
 */

// Time complexity: O(n)
// Space complexity: O(n)

// Try 1

let isRotation1 = (s1, s2) => {
  if (s1 === s2) return true;
  if (s1.length !== s2.length) return false;
  let count = 0;
  let newS2 = s2 + s2;
  // 'includes' is the same as what '.isSubstring' would be.
  if (newS2.includes(s1)) {
    for (let i = 0; i < newS2.length; i++) {
      for (let j = 0; j < newS2.length; j++) {
        if (s1[j] === newS2[i]) {
          // console.log('i:', i, ' j:', j);
          // console.log(s1[j], ' ', newS2[i], 'hit... count:', count, ' i:', i);
          i++;
          count++;
        } else {
          // console.log('i:', i, ' j:', j);
          // console.log(s1[j], ' ', newS2[i], 'mis... count:', count, ' i:', i);
          i -= count;
          count = 0;
        }
        if (count === s1.length) {
          // console.log('HOMERUN!');
          return true;
        }
      }
    }
  }
  // console.log('STRIKEOUT!');
  return false;
};

// stackhouse
// FAILS important test(should be false if letters cannot scroll... this is not anagraming)
// ... let's ssee how fast it is though ... it is incredably slow!
function isRotation2(s1, s2) {
  // Assume you have a method isSubstring which checks if one word is a substring of another. Given two
  // strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to isSubstring
  // (e.g., "waterbottle" is a rotation of "erbottlewat").
  if (s1 === s2) return true;
  let s2_sub = s2;
  let pivot_index = 0;
  while (s1.indexOf(s2_sub) === -1 && s2_sub.length > 0) {
    s2_sub = s2_sub.slice(1);
    pivot_index++;
  }
  return s1.replace(s2_sub, '') === s2.slice(0, pivot_index);
}

// ctci ... short code
function isRotation3(a, b) {
  const concatted = b + b;
  return !!concatted.includes(a);
}

// CTCI JS
var isRotation4 = function(string1, string2) {
  if (string1.length !== string2.length) {
    return false;
  }
  return (string2 + string2).includes(string1); // one call of isSubString
};

// ctci javascript
function isRotation5(str1, str2) {
  // lengths match for a rotation of one another
  if (str1.length !== str2.length) {
    return false;
  }
  // detect by doubling the first and looking for second string
  return isSubstring2(str1 + str1, str2);
}

// isSubstring method defined by question
function isSubstring2(str, substr) {
  return str.includes(substr);
}

// JS Algos
function isRotation6(str1, str2) {
  var newStr = str1 + str1;
  if (str1 === str2) return true;
  if (str1.length != str2.length || str1.length <= 1) return false;
  else return newStr.includes(str2);
}

// CTCI ES5
/**
 * Duplicate the rotated string, if the substring being searched is a different
 * rotation of the string then it will be a substring of the new string. Both
 * strings must be the same length.
 *
 * N = |str1|
 * Time: O(N)
 * Additional space: O(N)
 */
function isRotation7(str1, str2) {
  if (str1 === str2) return true;
  if (!str1 || !str2) {
    return false;
  }
  if (str1.length !== str2.length) {
    return false;
  }
  return isSubstring(str1 + str1, str2);
}

// Implementation of isSubstring function which is defined in question
// can only be called once
function isSubstring(str, substr) {
  return str.includes(substr);
}

// CTCI JS Sol
function isRotation8(str1, str2) {
  if (str1 === str2) return true;
  if (!str1 || !str1.length || !str2 || !str2.length) return false;
  if (str1.length !== str2.length) return false;

  return (str2 + str2).indexOf(str1) > -1;
}

// console.log(
//   isRotation1('waterbottle', 'erbottlewat'), // true
//   isRotation1('waterbottle', 'waterbottle'), // true
//   isRotation1('waterbottle', 'aterbottlew'), //true
//   isRotation1('wat', 'wa'), // false
//   isRotation1('water', 'watre') //false
// );

// console.log(
//   isRotation1('waterbottle', 'erbottlewat') === true,
//   isRotation1('waterbottle', 'waterbottle') === true,
//   isRotation1('waterbottle', 'aterbottlew') === true,
//   isRotation1('wat', 'wa') === false,
//   isRotation1('water', 'watre') === false,
//   isRotation1('', '') === true
// );

// console.log(
//   isRotation2('waterbottle', 'erbottlewat') === true,
//   isRotation2('waterbottle', 'waterbottle') === true,
//   isRotation2('waterbottle', 'aterbottlew') === true,
//   isRotation2('wat', 'wa') === false,
//   isRotation2('water', 'watre') === false,
//   isRotation2('', '') === true
// );

// console.log(
//   isRotation3('waterbottle', 'erbottlewat') === true,
//   isRotation3('waterbottle', 'waterbottle') === true,
//   isRotation3('waterbottle', 'aterbottlew') === true,
//   isRotation3('wat', 'wa') === false,
//   isRotation3('water', 'watre') === false,
//   isRotation3('', '') === true
// );

// console.log(
//   isRotation4('waterbottle', 'erbottlewat') === true,
//   isRotation4('waterbottle', 'waterbottle') === true,
//   isRotation4('waterbottle', 'aterbottlew') === true,
//   isRotation4('wat', 'wa') === false,
//   isRotation4('water', 'watre') === false,
//   isRotation4('', '') === true
// );

// console.log(
//   isRotation5('waterbottle', 'erbottlewat') === true,
//   isRotation5('waterbottle', 'waterbottle') === true,
//   isRotation5('waterbottle', 'aterbottlew') === true,
//   isRotation5('wat', 'wa') === false,
//   isRotation5('water', 'watre') === false,
//   isRotation5('', '') === true
// );

// console.log(
//   isRotation6('waterbottle', 'erbottlewat') === true,
//   isRotation6('waterbottle', 'waterbottle') === true,
//   isRotation6('waterbottle', 'aterbottlew') === true,
//   isRotation6('wat', 'wa') === false,
//   isRotation6('water', 'watre') === false,
//   isRotation6('', '') === true
// );

// console.log(
//   isRotation7('waterbottle', 'erbottlewat') === true,
//   isRotation7('waterbottle', 'waterbottle') === true,
//   isRotation7('waterbottle', 'aterbottlew') === true,
//   isRotation7('wat', 'wa') === false,
//   isRotation7('water', 'watre') === false,
//   isRotation7('', '') === true
// );

// console.log(
//   isRotation8('waterbottle', 'erbottlewat') === true,
//   isRotation8('waterbottle', 'waterbottle') === true,
//   isRotation8('waterbottle', 'aterbottlew') === true,
//   isRotation8('wat', 'wa') === false,
//   isRotation8('water', 'watre') === false,
//   isRotation8('', '') === true
// );

// console.log(
//   isRotation9('waterbottle', 'erbottlewat') === true,
//   isRotation9('waterbottle', 'waterbottle') === true,
//   isRotation9('waterbottle', 'aterbottlew') === true,
//   isRotation9('wat', 'wa') === false,
//   isRotation9('water', 'watre') === false
// );

// results:
// isRotation1 x 330,869 ops/sec ±3.11% (52 runs sampled)
// isRotation2 x 1,711,996 ops/sec ±2.06% (51 runs sampled)
// isRotation3 x 16,105,763 ops/sec ±1.53% (51 runs sampled)
// isRotation4 x 15,837,888 ops/sec ±1.87% (50 runs sampled)
// isRotation5 x 17,828,268 ops/sec ±1.65% (53 runs sampled)
// isRotation6 x 17,629,931 ops/sec ±1.90% (54 runs sampled)
// isRotation7 x 17,849,197 ops/sec ±1.06% (55 runs sampled)
// isRotation8 x 606,590,215 ops/sec ±2.83% (54 runs sampled)
// Fastest is isRotation8

// Practice list:
// 1. 8 clean code
// 2. 7 ES5, O(n), O(n), split function
// 3. 5 split function
// 4. 6 shortish clean code
// 5. 3 short code, but I would avoid because it ignores exceptions
// 6. 5 clean code, split functions
