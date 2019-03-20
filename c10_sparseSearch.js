var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('sparseSearch1', function() {
    sparseSearch1('ball', list);
  })
  .add('sparseSearch2', function() {
    sparseSearch2('ball', list);
  })
  .add('sparseSearch3', function() {
    sparseSearch3('ball', list);
  })
  // .add('sortedMerge3', function() {
  //   sortedMerge3([1, 2, 3, 3, 5], [6, 7, 7, 9, 10]);
  // })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });

// CTCI JS (good full c10, with time and space clearly shown)
// algo sol (ok for c10, missing q:4,6,7,9,10,11, clear format, <10 months old)
// stackhouse (only q:1,3)

// Just try to have CTCI JS...
// Just accommodate algo sol and stackhouse.
// (these are just for reference/roundedness)

// CTCI JS
const findMid = (front, back) => {
  const half = Math.floor((back - front) / 2);
  const mid = front + half;
  return mid;
};

const nonBlankMid = (array, front, back) => {
  let mid = findMid(front, back);
  let startSearch = {
    front: front,
    back: back,
    mid: mid
  };
  let searchQueue = [startSearch];
  let currSearch;
  let currFront;
  let currMid;
  let currBack;
  while (searchQueue.length > 0) {
    currSearch = searchQueue.shift();
    currFront = currSearch.front;
    currMid = currSearch.mid;
    currBack = currSearch.back;
    if (array[currMid] !== '') {
      return currMid;
    } else {
      if (currFront < currMid) {
        searchQueue.push({
          front: currFront,
          back: currMid,
          mid: findMid(currFront, currMid)
        });
      }
      if (currMid < currBack) {
        if (currMid !== currBack - 1) {
          searchQueue.push({
            front: currMid,
            back: currBack,
            mid: findMid(currMid, currBack)
          });
        }
      }
    }
  }
  return -1;
};

const sparseSearch1 = (string, array, front, back) => {
  // check if there are inputs
  if (string === undefined || array === undefined) {
    return 'what are you searching?';
  }
  // set default front and back
  if (front === undefined && back === undefined) {
    front = 0;
    back = array.length;
    if (front === back) {
      // edge case of empty array
      return -1;
    }
  }
  // find non-blank by binary BFS
  const mid = nonBlankMid(array, front, back);
  if (mid === -1) {
    return -1;
  } else {
    if (string === array[mid]) {
      return mid;
    } else if (string < array[mid]) {
      return sparseSearch1(string, array, front, mid);
    } else {
      return sparseSearch1(string, array, mid, back);
    }
  }
};

// // TEST

// // sparseSearch can be called
// console.log(sparseSearch1() === 'what are you searching?');

// // nonBlankMid works
// console.log(
//   nonBlankMid(['', '', '', '', '', '', '', '', '', '', '', ''], 0, 12) === -1
// );
// console.log(
//   nonBlankMid(['', '', '', '', '', '', '', '', '', 'hello', '', ''], 0, 12) ===
//     9
// );
// console.log(
//   nonBlankMid(['', 'hello', '', '', '', '', '', '', '', '', '', ''], 0, 12) ===
//     1
// );
// console.log(
//   nonBlankMid(['hello', '', '', '', '', '', '', '', '', '', '', ''], 0, 12) ===
//     0
// );
// console.log(
//   nonBlankMid(['', '', '', '', '', '', '', '', '', '', '', 'hello'], 0, 12) ===
//     11
// );

// // sparseSearch works
// console.log(
//   sparseSearch1('ball', [
//     'at',
//     '',
//     '',
//     '',
//     'ball',
//     '',
//     '',
//     'car',
//     '',
//     '',
//     'dad',
//     '',
//     ''
//   ]) === 4
// );
// console.log(
//   sparseSearch1('ball', ['', '', '', '', '', '', '', '', '', '']) === -1
// );

// stackhouse ... none

/** SPARSE SEARCH
 * I: sorted array of strings(interposed with empty strings)
 * O: index of a given string
 * C: optimize
 * E: given string is not in array
 */

// Time Complexity: O(n)
// Time Complexity: O(n)
// Try 1 //
function sparseSearch2(str, arr) {
  return arr.indexOf(str) > 0 ? arr.indexOf(str) : 'DNE';
}
// console.log(
//   sparseSearch2('xactly', [
//     'am',
//     '',
//     'I',
//     '',
//     '',
//     'xactly',
//     'yesterdays',
//     'zebra'
//   ])
// );

// algo sol
// GeeksForGeeks
// https://www.geeksforgeeks.org/sparse-search/
// time complexity, O(n)
function sparseSearch3(item, arr) {
  let low = 0;
  let high = arr.length - 1;
  let mid;
  let guess;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (arr[mid] === '') {
      // NG: guess
      let ans = true;
      let left = mid - 1;
      let right = mid + 1;
      while (ans) {
        if (arr[right] !== '' && right < high) {
          mid = right;
          ans = false;
          break;
        } else if (arr[left] !== '' && left > low) {
          mid = left;
          ans = false;
          break;
        } else if (left < low && right > high) {
          return -1;
        }
        right++;
        left--;
      }
    }
    guess = arr[mid];
    if (arr[mid] === item) {
      return mid;
    } else if (item < guess) {
      high = mid - 1;
    } else if (item > guess) {
      low = mid + 1;
    }
  }
  return -1;
}

let list2 = ['at', 'ball', 'car', 'dad', 'eat'];
let list = ['at', '', '', '', 'ball', '', '', 'car', '', '', 'dad', '', ''];
// console.log(sparseSearch3('ball', list));

console.log(sparseSearch1('ball', list));
console.log(sparseSearch2('ball', list));
console.log(sparseSearch3('ball', list));

// // results:
// sparseSearch1 x 4,413,524 ops/sec ±14.71% (46 runs sampled)
// sparseSearch2 x 23,789,673 ops/sec ±4.24% (50 runs sampled)
// sparseSearch3 x 38,804,205 ops/sec ±2.47% (51 runs sampled)
// Fastest is sparseSearch3
