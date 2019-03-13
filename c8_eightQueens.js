var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// // add tests
// suite
//   .add('tripleStep1', function() {
//     tripleStep1(10);
//   })
//   .add('tripleStep2', function() {
//     tripleStep2(10);
//   })
//   .add('tripleStep3', function() {
//     tripleStep3(10);
//   })
//   // add listeners
//   .on('cycle', function(event) {
//     console.log(String(event.target));
//   })
//   .on('complete', function() {
//     console.log('Fastest is ' + this.filter('fastest').map('name'));
//   })
//   // run async
//   .run({ async: true });

// CTCI JS (good full c8, with time and space clearly shown)
// CTCI JS Sol (great full c8, has multiple applications, time and space)
// algo sol (2nd Best for c3, missing q:6,13,14, clear format, <10 months old)
// stackhouse (only q:1345)

// Just try to have CTCI JS and CTCI JS Sol...
// Just accommodate algo sol and stackhouse. They are too formal.

// CTCI JS
// BITWISE SOLUTION
// this board will make use of a hybrid of bitwise operations and array storage to store the board
// and find solutions for nqueens

// for n queens, it is given that there must be one and only one queen per row

// there will be three bit strings of n-length--center, leftDiag, and rightDiag

// the center checks for whether a column is taken
// the leftDiag checks for whether a left diagonal is taken, and shifts left bitwise per recursive step
// the rightDiag checks for whether a right diagonal is taken, and shifts right bitwise per recursive step

var changeChar = function(string, position, char) {
  // note: will not work for emoji
  var answer = string.split('');
  answer[position] = char;
  return answer.join('');
};

var bitwiseOp = function(binaryString, n, callback) {
  var base10 = parseInt(binaryString, 2);
  base10 = callback(base10);
  var base2 = base10.toString(2);
  if (base2.length <= n) {
    var front = '';
    for (var i = base2.length; i < n; i++) {
      front += '0';
    }
    return front + base2;
  } else {
    return base2.slice(base2.length - n);
  }
};

var leftShift = function(binaryString, n) {
  return bitwiseOp(binaryString, n, number => number << 1);
};

var rightShift = function(binaryString, n) {
  return bitwiseOp(binaryString, n, number => number >>> 1);
};

var nqueens = function(n) {
  var board = [];
  var checker = '';
  var answers = [];

  for (var i = 0; i < n; i++) {
    board.push(-1);
    checker += '0';
  }

  var recurse = function(currentBoard, center, leftDiag, rightDiag, currRow) {
    if (currRow === n) {
      answers.push(currentBoard);
    }
    for (var i = 0; i < n; i++) {
      if (
        center.charAt(i) === '0' &&
        leftDiag.charAt(i) === '0' &&
        rightDiag.charAt(i) === '0'
      ) {
        currentBoard[i] = currRow;
        recurse(
          currentBoard,
          changeChar(center, i, '1'),
          leftShift(changeChar(leftDiag, i, '1'), n),
          rightShift(changeChar(rightDiag, i, '1'), n),
          currRow + 1
        );
        currentBoard[i] = -1; // untoggle board to save on space complexity for arrays per recursive step
      }
    }
  };
  recurse(board, checker, checker, checker, 0);
  return answers;
};

// Tests
// leftShift works as expected
console.log(leftShift('0001', 4) === '0010');

// rightShift works as expected
console.log(rightShift('0100', 4) === '0010');

// there are 0 solutions to represent 2 queens
console.log(nqueens(2).length === 0);

// there are 0 solutions to represent 2 queens
console.log(nqueens(2).length === 0);

// there are 0 solutions to represent 3 queens
console.log(nqueens(3).length === 0);

// there are 2 solutions to represent 4 queens
console.log(nqueens(4).length === 2);

// there are 92 solutions to represent 8 queens
console.log(nqueens(8).length === 92);

// CTCI JS Sol
function eightQueens() {
  const columns = [],
    gridSize = 8,
    result = [];
  placeQueens(0, columns, gridSize, result);
  return result;
}

function placeQueens(row, columns, gridSize, result) {
  if (row === gridSize) result.push(columns.slice());
  else {
    for (let col = 0; col < gridSize; col++) {
      if (validSpot(row, col, columns)) {
        columns[row] = col;
        placeQueens(row + 1, columns, gridSize, result);
      }
    }
  }
}

function validSpot(rowToPlace, colToPlace, columns) {
  for (let row2 = 0; row2 < rowToPlace; row2++) {
    const col2 = columns[row2];

    // Check if rows have queen in the same column
    if (colToPlace === col2) return false;
    // Check diagonals
    if (Math.abs(colToPlace - col2) === rowToPlace - row2) return false;
  }
  return true;
}
console.log(eightQueens());

// stackhouse ... no more solutions

/** EIGHT QUEENS
 * I:
 * O:
 * C:
 * E:
 */

// Time Complexity: O(n)
// Space Complexity: O(n)
// Try 1

// // algo sol ... fails because placeQueens function is not defined.
// // Too Difficult but found many articles and videos
// // https://www.youtube.com/watch?v=xouin83ebxE

// let GRID_SIZE = 8;

// function EightQueensX1(row, columns, results) {
//   if (row === GRID_SIZE) {
//     console.log(columns);
//   } else {
//     for (let col = 0; col < GRID_SIZE; col++) {
//       if (checkValid(columns, row, col)) {
//         columns[row] = col;
//         placeQueens(row + 1, columns, results);
//       }
//     }
//   }
// }

// function checkValid(columns, row, column) {
//   for (let r = 0; r < row; r++) {
//     let c = columns[r];
//     if (column === c) {
//       return false;
//     }
//     let columnDistance = Math.abs(c - column);
//     let rowDistance = row - r;
//     if (columnDistance === rowDistance) {
//       return false;
//     }
//   }
//   return true;
// }

// console.log(EightQueensX1(5, 5, []));

// results:
// Note: These may be hard to compare because o fthe use of different array
// strategies.
