var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('zeroMatrix1', function() {
    zeroMatrix1([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]);
  })
  .add('zeroMatrix2', function() {
    zeroMatrix2([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]);
  })
  .add('zeroMatrix3', function() {
    zeroMatrix3([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]);
  })
  .add('zeroMatrix4', function() {
    zeroMatrix4([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]);
  })
  .add('zeroMatrix5', function() {
    zeroMatrix5([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]);
  })
  .add('zeroMatrix6', function() {
    zeroMatrix6([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]);
  })
  .add('zeroMatrix7', function() {
    zeroMatrix7([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]);
  })
  .add('zeroMatrix8', function() {
    zeroMatrix8([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]);
  })
  .add('zeroMatrix9', function() {
    zeroMatrix9([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]);
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

// stackhouse
function zeroMatrix1(matrix) {
  let zero_rows = [];
  let zero_columns = [];

  // Find the row and column of every 0 in the original matrix
  for (let [r, row] of matrix.entries()) {
    for (let [c, value] of row.entries()) {
      if (value === 0) {
        zero_rows.push(r);
        zero_columns.push(c);
      }
    }
  }
  // Iterate through the matrix and replace the appropriate values with 0
  for (let [r, row] of matrix.entries()) {
    for (let [c, value] of row.entries()) {
      if (zero_rows.includes(r) || zero_columns.includes(c)) {
        matrix[r][c] = 0;
      }
    }
  }
  return matrix;
}

// CTCI JS
/* Helper Functions */
var checkZeros = function(matrix) {
  var matrixHeight = matrix.length;
  var matrixWidth = matrix[0].length;
  var rowsToZeroify = {}; // use hashtables to remove duplicates
  var colsToZeroify = {};

  for (var i = 0; i < matrixHeight; i++) {
    for (var j = 0; j < matrixWidth; j++) {
      if (matrix[i][j] === 0) {
        rowsToZeroify[i] = true;
        colsToZeroify[j] = true;
      }
    }
  }
  return {
    rowsToZeroify: rowsToZeroify,
    colsToZeroify: colsToZeroify
  };
};

var printMatrix = function(matrix) {
  for (var i = 0; i < matrix.length; i++) {
    console.log(matrix[i]);
  }
};

var zeroifyCol = function(matrix, col) {
  for (var i = 0; i < matrix.length; i++) {
    matrix[i][col] = 0;
  }
};

var zeroifyCols = function(matrix, zeroScan) {
  for (var col in zeroScan.colsToZeroify) {
    zeroifyCol(matrix, Number(col));
  }
};

var zeroifyRow = function(matrix, row) {
  for (var i = 0; i < matrix[row].length; i++) {
    matrix[row][i] = 0;
  }
};

var zeroifyRows = function(matrix, zeroScan) {
  for (var row in zeroScan.rowsToZeroify) {
    zeroifyRow(matrix, Number(row));
  }
};

/* Main Function */
var zeroMatrix2 = function(matrix) {
  if (matrix.length === 0) {
    return [];
  }

  var zeroScan = checkZeros(matrix);

  zeroifyCols(matrix, zeroScan);
  zeroifyRows(matrix, zeroScan);
  return matrix;
};

// CTCI JS Sol1
function zeroMatrix3(matrix) {
  // if (!matrix || !matrix.length) throw Error('invalid matrix');

  if (matrix.length === 1 && matrix[0].length === 1) return matrix;

  const coordsSet = new Set();

  matrix.forEach((row, i) => {
    row.forEach((cell, x) => cell === 0 && coordsSet.add([i, x]));
  });

  coordsSet.forEach(coord => {
    const row = coord[0],
      col = coord[1];
    matrix[row].forEach((cell, index) => (matrix[row][index] = 0));

    // Going through each row again to check for column even though column
    // will have changed when the row it's in changed
    matrix.forEach(rowArr => (rowArr[col] = 0));
  });

  return matrix;
}

// CTCI JS Sol2, more optimized
function zeroMatrix4(matrix) {
  // if (!matrix || !matrix.length) throw Error('invalid matrix');

  if (matrix.length === 1 && matrix[0].length === 1) return matrix;

  const colCoords = new Set();

  matrix.forEach(row => {
    if (row.includes(0)) {
      row.forEach((columnCell, index) => {
        if (columnCell === 0) colCoords.add(index);
        row[index] = 0;
      });
    }
  });

  // Only goes through columns that have not already changed to zero
  matrix.forEach(row => {
    if (row[0] !== 0) {
      colCoords.forEach(col => (row[col] = 0));
    }
  });

  return matrix;
}

/** ZERO MATRIX
 *
 * I: MxN matrix, 1 element has value of 0
 * O: MxN matrix with element of 0 having its whole row and column 0s
 * C: optimize
 * E: empty matrix
 */

// Time complexity: O(n^2)
// Space complexity: O(n)

// Try3
let zeroMatrix5 = m => {
  if (m[0]) {
    M = m[0].length;
  }
  N = m.length;
  jA = [];
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (m[i][j] === 0) {
        jA.push(j);
      }
    }
  }
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (m[i][j] === 0) {
        for (let k = 0; k < M; k++) {
          m[i][k] = 0;
        }
      }
    }
  }
  // for every saved j, make all columns 0.
  for (let p = 0; p < N; p++) {
    for (let index = 0; index < jA.length; index++) {
      m[p][jA[index]] = 0;
    }
  }
  return m;
};

// ctci
function zeroMatrix6(matrix) {
  const zeros = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) zeros.push([i, j]);
    }
  }

  for (let i = 0; i < zeros.length; i++) {
    const row = zeros[i][0];
    const col = zeros[i][1];
    matrix[row].map((n, i) => (matrix[row][i] = 0));
    matrix.forEach(r => (r[col] = 0));
  }

  return matrix;
}

// JS Algos
function zeroMatrix7(matrix) {
  var M = matrix.length;
  if (matrix[0]) {
    N = matrix[0].length;
  }
  let zeroSet = [];
  for (var r = 0; r < M; r++) {
    for (var c = 0; c < N; c++) {
      if (matrix[r][c] === 0) {
        zeroSet.push([r, c]);
      }
    }
  }
  zeroSet.forEach(function(coord) {
    setZeros7(matrix, coord[0], coord[1]);
  });
  return matrix;
}
function setZeros7(matrix, r, c) {
  var M = matrix.length,
    N = matrix[0].length;
  len = M > N ? M : N;
  for (var i = 0; i < len; i++) {
    if (matrix[r] && matrix[r][i]) matrix[r][i] = 0;
    if (matrix[i] && matrix[i][c]) matrix[i][c] = 0;
  }
  return matrix;
}

// CTCI ES5
/**
 * Do a first pass through the matrix to find which cells have 0's. When a 0 is
 * found then mark that row and column as needing to be zeroed out. On the second
 * pass zero out any cells that need to be zeroed out based on the row or column
 * indicators.
 *
 * N = matrix Y dimension
 * M = matrix X dimension
 * Time: O(N * M)
 * Additional space: O(N + M)
 */
function zeroMatrix8(matrix) {
  if (!matrix) {
    throw new Error('invalid matrix');
  }
  if (matrix.length === 0) {
    return matrix;
  }

  let rows = new Array(matrix.length),
    cols = new Array(matrix[0].length);

  rows.fill(false);
  cols.fill(false);

  for (let y = 0; y < rows.length; ++y) {
    for (let x = 0; x < cols.length; ++x) {
      if (matrix[y][x] === 0) {
        rows[y] = true;
        cols[x] = true;
      }
    }
  }

  for (let y = 0; y < rows.length; ++y) {
    for (let x = 0; x < cols.length; ++x) {
      if (rows[y] || cols[x]) {
        matrix[y][x] = 0;
      }
    }
  }

  return matrix;
}

// ctci javascript
function zeroMatrix9(matrix) {
  // special case empty matrix
  if (matrix.length === 0) {
    return matrix;
  }

  // separate into 2 passes where we first identify zero'd rows & cols
  let rows = new Array(matrix.length);
  rows.fill(false);
  let cols = new Array(matrix[0].length);
  cols.fill(false);
  for (let i = 0; i < rows.length; ++i) {
    for (let j = 0; j < cols.length; ++j) {
      if (matrix[i][j] === 0) {
        rows[i] = cols[j] = true;
      }
    }
  }

  // 2 zero marked rows and cols
  for (let i = 0; i < rows.length; ++i) {
    for (let j = 0; j < cols.length; ++j) {
      if (rows[i] || cols[j]) {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
}

// Since objects in JS are arrays, and arrays of arrays cannot be
// compared using the == operator in JS, we use a compareMatrix
// function to make the comparison.
let compareMatrix = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return a === b;
  } else {
    let out = true;
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      if (out) {
        out = compareMatrix(a[i], b[i]);
      } else {
        return false;
      }
    }
    return out;
  }
};

// Try1... fail to pass one fo the significant tests
// let zeroMatrixX1 = m => {
//   M = m[0].length;
//   N = m.length;
//   // iA = [];
//   // jA = [];
//   for (let i = 0; i < M; i++) {
//     for (let j = 0; j < N; j++) {
//       if (m[i][j] === 0) {
//         // iA.push[i];
//         // jA.push[j];
//         for (let k = 0; k < M; k++) {
//           if (m[i][k] === 0 && m[i - 1][k] !== 0) {
//             m[i][k] = 0;
//           }
//         }
//         for (let p = 0; p < N; p++) {
//           if (m[p][j] !== 0 && m[p][j - 1] !== 0) {
//             m[p][j] = 0;
//           }
//         }
//       }
//     }
//   }
//   return m;
// };

// // Try2 // fail b/s can't model correctly.
// let zeroMatrixX2 = m => {
//   M = m[0].length;
//   N = m.length;
//   iA = [];
//   jA = [];
//   for (let i = 0; i < M; i++) {
//     for (let j = 0; j < N; j++) {
//       if (m[i][j] === 0) {
//         iA.push[i];
//         jA.push[j];
//       }
//     }
//   }
//   for (let k = 0; k < M; k++) {
//     for (let p = 0; p < N; p++) {
//       if (
//         String(k).indexOf(iA) !== -1 &&
//         String(p).indexOf(jA) !== -1 &&
//         String(k).indexOf(iA) === String(p).indexOf(jA) &&
//         k in iA
//       ) {
//         console.log(m);
//         // for one full row, make all zero if it matches i and j indices
//         // and matches i exactly.
//         for (let row = 0; row < N; row++) {
//           for (let col = 0; col < M; col++) {
//             m[row][p] = 0;
//             m[k][col] = 0;
//           }
//         }
//       }
//     }
//   }
//   return m;
// };

console.log(
  compareMatrix(zeroMatrix1([[1, 2], [0, 4]]), [[0, 2], [0, 0]]),
  compareMatrix(
    zeroMatrix1([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ]),
    [
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [0, 0, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1]
    ]
  ),
  compareMatrix(zeroMatrix1([[1, 2, 3], [4, 0, 6], [7, 8, 9]]), [
    [1, 0, 3],
    [0, 0, 0],
    [7, 0, 9]
  ]),
  compareMatrix(zeroMatrix1([[1, 2, 3], [4, 5, 6], [7, 0, 9]]), [
    [1, 0, 3],
    [4, 0, 6],
    [0, 0, 0]
  ]),
  compareMatrix(
    zeroMatrix1([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]),
    [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 9, 0, 7]]
  ),
  compareMatrix(zeroMatrix1([]), [])
);

console.log(
  compareMatrix(zeroMatrix2([[1, 2], [0, 4]]), [[0, 2], [0, 0]]),
  compareMatrix(
    zeroMatrix2([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ]),
    [
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [0, 0, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1]
    ]
  ),
  compareMatrix(zeroMatrix2([[1, 2, 3], [4, 0, 6], [7, 8, 9]]), [
    [1, 0, 3],
    [0, 0, 0],
    [7, 0, 9]
  ]),
  compareMatrix(zeroMatrix2([[1, 2, 3], [4, 5, 6], [7, 0, 9]]), [
    [1, 0, 3],
    [4, 0, 6],
    [0, 0, 0]
  ]),
  compareMatrix(
    zeroMatrix2([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]),
    [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 9, 0, 7]]
  ),
  compareMatrix(zeroMatrix2([]), [])
);

console.log(
  compareMatrix(zeroMatrix3([[1, 2], [0, 4]]), [[0, 2], [0, 0]]),
  compareMatrix(
    zeroMatrix3([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ]),
    [
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [0, 0, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1]
    ]
  ),
  compareMatrix(zeroMatrix3([[1, 2, 3], [4, 0, 6], [7, 8, 9]]), [
    [1, 0, 3],
    [0, 0, 0],
    [7, 0, 9]
  ]),
  compareMatrix(zeroMatrix3([[1, 2, 3], [4, 5, 6], [7, 0, 9]]), [
    [1, 0, 3],
    [4, 0, 6],
    [0, 0, 0]
  ]),
  compareMatrix(
    zeroMatrix3([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]),
    [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 9, 0, 7]]
  ),
  compareMatrix(zeroMatrix3([]), [])
);

console.log(
  compareMatrix(zeroMatrix4([[1, 2], [0, 4]]), [[0, 2], [0, 0]]),
  compareMatrix(
    zeroMatrix4([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ]),
    [
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [0, 0, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1]
    ]
  ),
  compareMatrix(zeroMatrix4([[1, 2, 3], [4, 0, 6], [7, 8, 9]]), [
    [1, 0, 3],
    [0, 0, 0],
    [7, 0, 9]
  ]),
  compareMatrix(zeroMatrix4([[1, 2, 3], [4, 5, 6], [7, 0, 9]]), [
    [1, 0, 3],
    [4, 0, 6],
    [0, 0, 0]
  ]),
  compareMatrix(
    zeroMatrix4([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]),
    [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 9, 0, 7]]
  ),
  compareMatrix(zeroMatrix4([]), [])
);

console.log(
  compareMatrix(zeroMatrix5([[1, 2], [0, 4]]), [[0, 2], [0, 0]]),
  compareMatrix(
    zeroMatrix5([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ]),
    [
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [0, 0, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1]
    ]
  ),
  compareMatrix(zeroMatrix5([[1, 2, 3], [4, 0, 6], [7, 8, 9]]), [
    [1, 0, 3],
    [0, 0, 0],
    [7, 0, 9]
  ]),
  compareMatrix(zeroMatrix5([[1, 2, 3], [4, 5, 6], [7, 0, 9]]), [
    [1, 0, 3],
    [4, 0, 6],
    [0, 0, 0]
  ]),
  compareMatrix(
    zeroMatrix5([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]),
    [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 9, 0, 7]]
  ),
  compareMatrix(zeroMatrix5([]), [])
);

console.log(
  compareMatrix(zeroMatrix6([[1, 2], [0, 4]]), [[0, 2], [0, 0]]),
  compareMatrix(
    zeroMatrix6([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ]),
    [
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [0, 0, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1]
    ]
  ),
  compareMatrix(zeroMatrix6([[1, 2, 3], [4, 0, 6], [7, 8, 9]]), [
    [1, 0, 3],
    [0, 0, 0],
    [7, 0, 9]
  ]),
  compareMatrix(zeroMatrix6([[1, 2, 3], [4, 5, 6], [7, 0, 9]]), [
    [1, 0, 3],
    [4, 0, 6],
    [0, 0, 0]
  ]),
  compareMatrix(
    zeroMatrix6([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]),
    [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 9, 0, 7]]
  ),
  compareMatrix(zeroMatrix6([]), [])
);

console.log(
  compareMatrix(zeroMatrix7([[1, 2], [0, 4]]), [[0, 2], [0, 0]]),
  compareMatrix(
    zeroMatrix7([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ]),
    [
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [0, 0, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1]
    ]
  ),
  compareMatrix(zeroMatrix7([[1, 2, 3], [4, 0, 6], [7, 8, 9]]), [
    [1, 0, 3],
    [0, 0, 0],
    [7, 0, 9]
  ]),
  compareMatrix(zeroMatrix7([[1, 2, 3], [4, 5, 6], [7, 0, 9]]), [
    [1, 0, 3],
    [4, 0, 6],
    [0, 0, 0]
  ]),
  compareMatrix(
    zeroMatrix7([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]),
    [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 9, 0, 7]]
  ),
  compareMatrix(zeroMatrix7([]), [])
);

console.log(
  compareMatrix(zeroMatrix8([[1, 2], [0, 4]]), [[0, 2], [0, 0]]),
  compareMatrix(
    zeroMatrix8([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ]),
    [
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [0, 0, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1]
    ]
  ),
  compareMatrix(zeroMatrix8([[1, 2, 3], [4, 0, 6], [7, 8, 9]]), [
    [1, 0, 3],
    [0, 0, 0],
    [7, 0, 9]
  ]),
  compareMatrix(zeroMatrix8([[1, 2, 3], [4, 5, 6], [7, 0, 9]]), [
    [1, 0, 3],
    [4, 0, 6],
    [0, 0, 0]
  ]),
  compareMatrix(
    zeroMatrix8([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]),
    [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 9, 0, 7]]
  ),
  compareMatrix(zeroMatrix8([]), [])
);

console.log(
  compareMatrix(zeroMatrix9([[1, 2], [0, 4]]), [[0, 2], [0, 0]]),
  compareMatrix(
    zeroMatrix9([
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ]),
    [
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [0, 0, 0, 0],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1]
    ]
  ),
  compareMatrix(zeroMatrix9([[1, 2, 3], [4, 0, 6], [7, 8, 9]]), [
    [1, 0, 3],
    [0, 0, 0],
    [7, 0, 9]
  ]),
  compareMatrix(zeroMatrix9([[1, 2, 3], [4, 5, 6], [7, 0, 9]]), [
    [1, 0, 3],
    [4, 0, 6],
    [0, 0, 0]
  ]),
  compareMatrix(
    zeroMatrix9([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]),
    [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 9, 0, 7]]
  ),
  compareMatrix(zeroMatrix9([]), [])
);

// console.log(
//   compareMatrix(zeroMatrix10([[1, 2], [0, 4]]), [[0, 2], [0, 0]]),
//   compareMatrix(
//     zeroMatrix10([
//       [1, 1, 1, 1],
//       [1, 1, 1, 1],
//       [1, 0, 1, 1],
//       [1, 1, 1, 1],
//       [1, 1, 1, 1],
//       [1, 1, 1, 1]
//     ]),
//     [
//       [1, 0, 1, 1],
//       [1, 0, 1, 1],
//       [0, 0, 0, 0],
//       [1, 0, 1, 1],
//       [1, 0, 1, 1],
//       [1, 0, 1, 1]
//     ]
//   ),
//   compareMatrix(zeroMatrix10([[1, 2, 3], [4, 0, 6], [7, 8, 9]]), [
//     [1, 0, 3],
//     [0, 0, 0],
//     [7, 0, 9]
//   ]),
//   compareMatrix(zeroMatrix10([[1, 2, 3], [4, 5, 6], [7, 0, 9]]), [
//     [1, 0, 3],
//     [4, 0, 6],
//     [0, 0, 0]
//   ]),
//   compareMatrix(
//     zeroMatrix10([[1, 2, 0, 4], [0, 13, 14, 5], [11, 16, 0, 6], [10, 9, 8, 7]]),
//     [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 9, 0, 7]]
//   ),
//   compareMatrix(zeroMatrix10([]), [])
// );

// results
// zeroMatrix1 x 394,052 ops/sec ±3.53% (49 runs sampled)
// zeroMatrix2 x 503,353 ops/sec ±1.82% (49 runs sampled)
// zeroMatrix3 x 1,290,878 ops/sec ±2.61% (50 runs sampled)
// zeroMatrix4 x 1,767,509 ops/sec ±3.47% (51 runs sampled)
// zeroMatrix5 x 1,780,638 ops/sec ±2.41% (47 runs sampled)
// zeroMatrix6 x 1,851,615 ops/sec ±3.12% (46 runs sampled)
// zeroMatrix7 x 1,982,018 ops/sec ±2.72% (47 runs sampled)
// zeroMatrix8 x 2,095,404 ops/sec ±4.35% (51 runs sampled)
// zeroMatrix9 x 2,158,025 ops/sec ±2.95% (50 runs sampled)
// Fastest is zeroMatrix9,zeroMatrix8
