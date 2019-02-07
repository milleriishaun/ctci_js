// Pseudocode
// function getAllPermutations (string)
// define results
// if string is a single character
//   add the character to results
//   return results
// for each char in string
//   define innerPermutations as a char of string
//   set innerPermutations to getAllPermutations (without next char)
//   foreach string in innerPermutations
//     add defined char and innerPermutations char
// return results

function getAllPermutations(str) {
  let results = [];

  if (str.length === 1) {
    results.push(str);
    return results;
  }

  for (let i = 0; i < str.length; i++) {
    let firstChar = str[i];
    var charsLeft = str.substring(0, i) + str.substring(i + 1);
    let innerPermutations = getAllPermutations(charsLeft);
    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

function palindromePermutation(str) {
  let strArr = str
    .toLowerCase()
    .split('')
    .filter(function(el) {
      return el !== ' ';
    })
    .join('');
  let perms = getAllPermutations(strArr);
  if (perms.length > 0) {
    console.log('True (permutations: ', ...perms, ')');
  } else {
    console.log('False (permutations: none)');
  }
}

palindromePermutation('abcd');
