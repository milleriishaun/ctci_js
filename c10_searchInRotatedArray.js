var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('searchInRotatedArray1', function() {
    searchInRotatedArray1([25, 1, 3, 4, 5, 7], 5);
  })
  .add('searchInRotatedArray2', function() {
    searchInRotatedArray2([25, 1, 3, 4, 5, 7], 5);
  })
  .add('searchInRotatedArray3', function() {
    searchInRotatedArray3([25, 1, 3, 4, 5, 7], 5);
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

// CTCI JS (good full c10, with time and space clearly shown)
// algo sol (ok for c10, missing q:4,6,7,9,10,11, clear format, <10 months old)
// stackhouse (only q:1,3)

// Just try to have CTCI JS...
// Just accommodate algo sol and stackhouse.
// (these are just for reference/roundedness)

// CTCI JS
const findStartEnd = (array, front, back) => {
  front = front || 0;
  back = back || array.length;
  if (array[front] < array[back - 1]) {
    return {
      start: front,
      end: back - 1
    };
  } else {
    let mid = Math.floor((back - front) / 2);
    if (array[mid - 1] > array[mid]) {
      return {
        start: mid,
        end: mid - 1
      };
    } else {
      if (array[front] < array[mid]) {
        return findStartEnd(array, mid, back);
      } else {
        return findStartEnd(array, front, mid);
      }
    }
  }
};

const searchInRotatedArray1 = (array, value, start, end) => {
  if (array === undefined) {
    return 'where is the array?';
  }
  if (start === undefined && end === undefined) {
    const startEnd = findStartEnd(array);
    start = startEnd.start;
    end = startEnd.end;
  }
  let mid;
  if (start === end) {
    return array[start] === value ? start : -1;
  } else if (start > end) {
    const half = Math.floor((array.length - (start - end - 1)) / 2);
    mid = (start + half) % array.length;
  } else {
    mid = start + Math.floor((end - start) / 2);
  }
  if (array[mid] === value) {
    return mid;
  } else {
    if (value < array[mid]) {
      return searchInRotatedArray1(array, value, start, mid);
    } else {
      if (start === mid) {
        return searchInRotatedArray1(array, value, end, end); // does end check if start === mid
      } else {
        return searchInRotatedArray1(array, value, mid, end);
      }
    }
  }
};

// TEST

// findStartEnd works
console.log(
  JSON.stringify(findStartEnd([5, 6, 7, 8, 1, 2, 3, 4])) ===
    JSON.stringify({ start: 4, end: 3 })
);

// searchInRotatedArray can be called
console.log(searchInRotatedArray1() === 'where is the array?');

// find in unrotated array
console.log(searchInRotatedArray1([1, 2, 3, 4], 3) === 2);

// find in rotated array
console.log(searchInRotatedArray1([3, 4, 1, 2], 1) === 2);

// find last item in rotated array
console.log(searchInRotatedArray1([3, 4, 1, 2], 4) === 1);

// return -1 for values not in array
console.log(searchInRotatedArray1([3, 4, 1, 2], 10) === -1);

/*
// algo sol1 .. fail because maximum call stack reached quickly
// GeeksForGeeks:
// https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/

let mid;
let low;
let high;
let guess;
let target = 5;
function find_pivot1(arr, start, end) {
  mid = Math.floor(arr.length / 2);
  high = arr.length - 1;
  guess = arr[mid];

  if (arr[mid] === target) return mid;
  if (arr[mid] < arr[mid + 1]) {
    find_pivot1(arr, 0, mid);
  }
  if (arr[mid] > arr[mid + 1]) {
    find_pivot1(arr, mid + 1, end);
  }
}
let list = [3, 4, 5, 7];
let item = find_pivot1(list, 0, 10);
console.log('find_pivot1:', item);
*/

// // algo sol2 .. fail because maximum call stack reached .. even with small array
// // author's answer
// // not understand
// function find_pivot2(arr, left, right) {
//   mid = Math.floor((left + right) / 2);
//   if (arr[left] < arr[mid]) {
//     // left normally order
//     if (arr[left] < target < arr[mid]) {
//       return find_pivot2(arr, left, mid - 1);
//     } else {
//       return find_pivot2(arr, mid + 1, right);
//     }
//   } else if (arr[left] > arr[mid]) {
//     // right normally order
//     if (arr[mid] < target < arr[right]) {
//       return find_pivot2(arr, mid + 1, right);
//     } else {
//       return find_pivot2(arr, left, mid - 1);
//     }
//   } else if (arr[mid] === arr[left]) {
//     let result = find_pivot2(arr, right, mid - 1);
//     if (result === -1) {
//       return find_pivot2(arr, mid + 1, right);
//     }
//   }
//   return -1;
// }
// list = [5];
// item = find_pivot2(list, 0, list.length);
// console.log('find_pivot2:', item);

/** SEARCH IN ROTATED ARRAY
 * I:
 * O:
 * C:
 * E:
 */

// Time Complexity: O(n)
// Time Complexity: O(n)
// Try 1
function searchInRotatedArray2(A, value) {
  return A.indexOf(value) > 0 ? A.indexOf(value) : 'DNE';
}

// stackhouse
function searchInRotatedArray3(list, target) {
  // Cracking the Coding Interview 10.3
  // Given a sorted array of n integers that has been rotated an unknown number of times, write code to
  // find an element in the array. You may assume that the array was originally sorted in increasing order.
  // EXAMPLE: search_in_rotated_array([15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], 5) === 8

  let start = 0;
  let end = list.length - 1;
  let search_index = Math.floor((end - start) / 2);
  let search_element = list[search_index];

  while (search_element !== target && search_index !== -1) {
    if (start === end) {
      search_index = -1;
    } else if (target > list[end] || target < search_element) {
      end = search_index - 1;
      search_index = start + Math.floor((end - start) / 2);
      search_element = list[search_index];
    } else {
      start = search_index + 1;
      search_index = start + Math.floor((end - start) / 2);
      search_element = list[search_index];
    }
  }

  return search_index;
}

console.log(searchInRotatedArray1([25, 1, 3, 4, 5, 7], 5));

console.log(searchInRotatedArray2([25, 1, 3, 4, 5, 7], 5));

console.log(searchInRotatedArray3([25, 1, 3, 4, 5, 7], 5));

// // results:
// searchInRotatedArray1 x 21,662,541 ops/sec ±2.90% (50 runs sampled)
// searchInRotatedArray2 x 21,232,607 ops/sec ±1.73% (49 runs sampled)
// searchInRotatedArray3 x 81,352,211 ops/sec ±1.25% (53 runs sampled)
// Fastest is searchInRotatedArray3
