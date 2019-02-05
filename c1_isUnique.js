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
//benchmark: 3.022ms(too slow)
console.time('with very few records in the map');
console.log('striggnp', isUnique('striggnp'));
console.timeEnd('with very few records in the map');

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
//benchmark 1.155ms(much faster)
console.time('with very few records in the map');
console.log('striggnp', isUnique('striggnp'));
console.timeEnd('with very few records in the map');

// try 3
