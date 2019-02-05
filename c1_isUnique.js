// try 1
// time: O(n^2)
// space: O(1)
function isUnique(str) {
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
//benchmark
console.time('start');
console.log(isUnique('sttriggnp'));
console.timeEnd('end');

// try 2
// time: O(n)
// space: O(1)
function isUnique(str) {
  let arr = [128];
  for (let i = 0; i < arr.length; i++) {
    arr[i] = true;
  }
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
//benchmark
// console.log(isUnique('string'));
console.time('start');
console.log(isUnique('sttriggnp'));
console.timeEnd('end');

// try 3
console.log(isUnique('dsdsd'));
