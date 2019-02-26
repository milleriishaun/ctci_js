var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// add tests
suite
  .add('rotateMatrix1', function() {
    rotateMatrix1([[1, 2], [3, 4]]);
  })
  .add('rotateMatrix2', function() {
    rotateMatrix2([[1, 2], [3, 4]]);
  })
  .add('rotateMatrix3', function() {
    rotateMatrix3([[1, 2], [3, 4]]);
  })
  .add('rotateMatrix4', function() {
    rotateMatrix4([[1, 2], [3, 4]]);
  })
  .add('rotateMatrix5', function() {
    rotateMatrix5([[1, 2], [3, 4]]);
  })
  .add('rotateMatrix6', function() {
    rotateMatrix6([[1, 2], [3, 4]]);
  })
  .add('rotateMatrix7', function() {
    rotateMatrix7([[1, 2], [3, 4]]);
  })
  .add('rotateMatrix8', function() {
    rotateMatrix8([[1, 2], [3, 4]]);
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
function rotateMatrix1(matrix) {
  let m_index = matrix.length - 1;
  let rotated_matrix = [];
  for (let i = 0; i <= m_index; i++) {
    rotated_matrix.push([]);
  }

  for (let [i, row] of matrix.entries()) {
    for (let [j, value] of row.entries()) {
      rotated_matrix[m_index - (m_index - j)][m_index - i] = value;
    }
  }
  return rotated_matrix;
}

// ctci javascript
function rotateMatrix2(matrix) {
  // for an empty matrix simply return
  if (matrix.length === 0) {
    return matrix;
  }

  // matrix exists and is square
  // if (matrix.length !== matrix[0].length) {
  //   throw new Error('matrix not square');
  // }

  // to rotate 90 matrix in place first reverse the rows
  matrix = matrix.reverse();

  // then swap the symmetric elements
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < i; j += 1) {
      // use destructing
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  return matrix;
}

// CTCI JS
var rotateMatrix3 = function(matrix) {
  var edge = matrix.length - 1;

  var movePixels = function(row, col) {
    // starts at m[row][col]
    // moves to m[col][edge - row]
    var fromRow;
    var fromCol;
    var fromPixel;

    // first transformation
    var toRow = row; // 0
    var toCol = col; // 1
    var toPixel = matrix[row][col];

    // Do rotational transformation 4 times
    for (var i = 0; i < 4; i++) {
      fromRow = toRow;
      fromCol = toCol;
      toRow = fromCol;
      toCol = edge - fromRow;

      fromPixel = toPixel;
      toPixel = matrix[toRow][toCol];
      matrix[toRow][toCol] = fromPixel;
    }
  };

  for (var i = 0; i < matrix.length / 2; i++) {
    for (var j = i; j < edge - i; j++) {
      movePixels(i, j);
    }
  }

  return matrix;
};

// CTCI ES5
/**
 * Go through the matrix diagonally from 0,0 until half way through (one less
 * where odd N). For each diagonal starting point move through matrix along row
 * until length - starting index. For each index in the matrix go through all 4
 * sides moving items along one place.
 *
 * N = dimension of matrix
 * Time: O(N^2)
 * Additional space: O(1)
 */
function rotateMatrix4(matrix) {
  // if (!matrix || matrix.length === 0 || matrix.length !== matrix[0].length) {
  //   throw new Error('invalid matrix');
  // }
  if (matrix.length < 2) {
    return matrix; // no need to do anything to rotate a 1,1 matrix
  }

  let len = matrix.length - 1,
    half = Math.floor(matrix.length / 2);
  // loop through diagonal
  for (let start = 0; start < half; ++start) {
    // loop through x axis
    for (let i = 0; i < len - start * 2; ++i) {
      let y = start,
        x = start + i,
        prev = matrix[y][x];

      // loop through all 4 corners
      for (let j = 0; j < 4; ++j) {
        let nextY = x,
          nextX = len - y,
          next = matrix[nextY][nextX];
        matrix[nextY][nextX] = prev;
        prev = next;
        x = nextX;
        y = nextY;
      }
    }
  }

  return matrix;
}

/** ROTATE MATRIX
 * I: NxN matrix(array of arrays)
 * O: rotated matrix - 90 deg clockwise
 * C: rotate matrix in place, optimize
 * E: empty matrix, even and odd values for n
 */

// Time complexity:
// Space complexity:

// ChirpingmermaidCodes
let rotateMatrix5 = m => {
  let n = m.length;

  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < n - 2 * i - 1; j++) {
      let t = m[i + j][n - 1 - i]; // copy AB
      m[i + j][n - 1 - i] = m[i][i + j]; // B=A
      m[i][i + j] = t; // A=t

      t = m[n - 1 - i][n - 1 - i - j]; // copy BC
      m[n - 1 - i][n - 1 - i - j] = m[i][i + j]; // C=B
      m[i][i + j] = t; // B=t

      t = m[n - 1 - i - j][i]; // copy CD
      m[n - 1 - i - j][i] = m[i][i + j]; // D=C
      m[i][i + j] = t; // C=t
    }
  }
  return m;
};

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
// good to draw this out...

// JS Algos
function rotateMatrix6(matrix) {
  var min = 0;
  var max = matrix.length - 1;
  while (min < max) {
    var top = [];
    for (var i = min; i < max; i++) {
      top = matrix[min][i];
      matrix[min][i] = matrix[max - i + min][min];
      matrix[max - i + min][min] = matrix[max][max - i + min];
      matrix[max][max - i + min] = matrix[i][max];
      matrix[i][max] = top;
    }
    min++;
    max--;
  }
  return matrix;
}

// ctci
function rotateMatrix7(matrix) {
  for (let layer = 0; layer < matrix.length / 2; layer++) {
    const first = layer;
    const last = matrix.length - 1 - layer;

    for (let i = first; i < last; i++) {
      const offset = i - first;

      // top
      const top = matrix[first][i];

      // left -> top
      matrix[first][i] = matrix[last - offset][first];

      // bottom -> left
      matrix[last - offset][first] = matrix[last][last - offset];

      // right -> bottom
      matrix[last][last - offset] = matrix[i][last];

      // top -> right
      matrix[i][last] = top;
    }
  }
  return matrix;
}

// CTCI JS Sol
function rotateMatrix8(matrix) {
  // if (!matrix || !matrix.length) throw Error('invalid matrix');

  const len = matrix.length;
  for (let layer = 0; layer < len / 2; layer++) {
    const firstLayer = layer,
      lastLayer = len - 1 - layer;

    for (let i = layer; i < lastLayer; i++) {
      const offset = i - layer,
        top = matrix[firstLayer][i];

      // left -> top
      matrix[firstLayer][i] = matrix[lastLayer - offset][firstLayer];
      // bottom -> left
      matrix[lastLayer - offset][firstLayer] =
        matrix[lastLayer][lastLayer - offset];
      // right -> bottom
      matrix[lastLayer][lastLayer - offset] = matrix[i][lastLayer];
      // top -> right
      matrix[i][lastLayer] = top;
    }
  }
  return matrix;
}

/** ROTATE MATRIX
 * I:
 * O:
 * C:
 * E:
 */

// Time complexity: O(n^2) - but actually linear since n^2
// is just the number of items in the matrix. Since we are
// only looking through the values once, it is actually linear.
// Space complexity: O(2) - finite # of vars, and doesn't
// depend on the size of our Matrix, it is constant.

// Try1.. IDK how to go about this.
// function rotateMatrixX1() {

// }

// // algos sol
// // Might work... but fails, and hard to trace, at this point
// function swapX2(x, y) {
//   let temp = x;
//   x = y;
//   y = temp;
// }

// function rotateMatrixX2(m) {
//   let level = 0;
//   let N = m.length;
//   let toNumOfLevels = N;
//   let last = N;
//   while (level < toNumOfLevels) {
//     for (let i = level; i < last; i + 2) {
//       swapX2([level, i], [i, last]);
//       swapX2([level, i], [last, last - i]);
//       swapX2([level, i], [last - i, i]);
//     }
//     level += 2;
//     last -= 2;
//   }
//   // return m; // this added to fix, but it fails anyway on loop.
// }
console.log(
  compareMatrix(rotateMatrix1([[1, 2], [3, 4]]), [[3, 1], [4, 2]]),
  compareMatrix(rotateMatrix1([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]
  ]),
  compareMatrix(
    rotateMatrix1([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ]),
    [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]
  ),
  compareMatrix(
    rotateMatrix1([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
    ]),
    [
      [21, 16, 11, 6, 1],
      [22, 17, 12, 7, 2],
      [23, 18, 13, 8, 3],
      [24, 19, 14, 9, 4],
      [25, 20, 15, 10, 5]
    ]
  ),
  compareMatrix(rotateMatrix1([]), []),
  compareMatrix(rotateMatrix1([[]]), [[]]),
  compareMatrix(rotateMatrix1([[1]]), [[1]])
);

console.log(
  compareMatrix(rotateMatrix2([[1, 2], [3, 4]]), [[3, 1], [4, 2]]),
  compareMatrix(rotateMatrix2([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]
  ]),
  compareMatrix(
    rotateMatrix2([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ]),
    [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]
  ),
  compareMatrix(
    rotateMatrix2([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
    ]),
    [
      [21, 16, 11, 6, 1],
      [22, 17, 12, 7, 2],
      [23, 18, 13, 8, 3],
      [24, 19, 14, 9, 4],
      [25, 20, 15, 10, 5]
    ]
  ),
  compareMatrix(rotateMatrix2([]), []),
  compareMatrix(rotateMatrix2([[]]), [[]]),
  compareMatrix(rotateMatrix2([[1]]), [[1]])
);

console.log(
  compareMatrix(rotateMatrix3([[1, 2], [3, 4]]), [[3, 1], [4, 2]]),
  compareMatrix(rotateMatrix3([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]
  ]),
  compareMatrix(
    rotateMatrix3([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ]),
    [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]
  ),
  compareMatrix(
    rotateMatrix3([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
    ]),
    [
      [21, 16, 11, 6, 1],
      [22, 17, 12, 7, 2],
      [23, 18, 13, 8, 3],
      [24, 19, 14, 9, 4],
      [25, 20, 15, 10, 5]
    ]
  ),
  compareMatrix(rotateMatrix3([]), []),
  compareMatrix(rotateMatrix3([[]]), [[]]),
  compareMatrix(rotateMatrix3([[1]]), [[1]])
);

console.log(
  compareMatrix(rotateMatrix4([[1, 2], [3, 4]]), [[3, 1], [4, 2]]),
  compareMatrix(rotateMatrix4([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]
  ]),
  compareMatrix(
    rotateMatrix4([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ]),
    [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]
  ),
  compareMatrix(
    rotateMatrix4([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
    ]),
    [
      [21, 16, 11, 6, 1],
      [22, 17, 12, 7, 2],
      [23, 18, 13, 8, 3],
      [24, 19, 14, 9, 4],
      [25, 20, 15, 10, 5]
    ]
  ),
  compareMatrix(rotateMatrix4([]), []),
  compareMatrix(rotateMatrix4([[]]), [[]]),
  compareMatrix(rotateMatrix4([[1]]), [[1]])
);

console.log(
  compareMatrix(rotateMatrix5([[1, 2], [3, 4]]), [[3, 1], [4, 2]]),
  compareMatrix(rotateMatrix5([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]
  ]),
  compareMatrix(
    rotateMatrix5([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ]),
    [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]
  ),
  compareMatrix(
    rotateMatrix5([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
    ]),
    [
      [21, 16, 11, 6, 1],
      [22, 17, 12, 7, 2],
      [23, 18, 13, 8, 3],
      [24, 19, 14, 9, 4],
      [25, 20, 15, 10, 5]
    ]
  ),
  compareMatrix(rotateMatrix5([]), []),
  compareMatrix(rotateMatrix5([[]]), [[]]),
  compareMatrix(rotateMatrix5([[1]]), [[1]])
);

console.log(
  compareMatrix(rotateMatrix6([[1, 2], [3, 4]]), [[3, 1], [4, 2]]),
  compareMatrix(rotateMatrix6([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]
  ]),
  compareMatrix(
    rotateMatrix6([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ]),
    [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]
  ),
  compareMatrix(
    rotateMatrix6([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
    ]),
    [
      [21, 16, 11, 6, 1],
      [22, 17, 12, 7, 2],
      [23, 18, 13, 8, 3],
      [24, 19, 14, 9, 4],
      [25, 20, 15, 10, 5]
    ]
  ),
  compareMatrix(rotateMatrix6([]), []),
  compareMatrix(rotateMatrix6([[]]), [[]]),
  compareMatrix(rotateMatrix6([[1]]), [[1]])
);

console.log(
  compareMatrix(rotateMatrix7([[1, 2], [3, 4]]), [[3, 1], [4, 2]]),
  compareMatrix(rotateMatrix7([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]
  ]),
  compareMatrix(
    rotateMatrix7([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ]),
    [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]
  ),
  compareMatrix(
    rotateMatrix7([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
    ]),
    [
      [21, 16, 11, 6, 1],
      [22, 17, 12, 7, 2],
      [23, 18, 13, 8, 3],
      [24, 19, 14, 9, 4],
      [25, 20, 15, 10, 5]
    ]
  ),
  compareMatrix(rotateMatrix7([]), []),
  compareMatrix(rotateMatrix7([[]]), [[]]),
  compareMatrix(rotateMatrix7([[1]]), [[1]])
);

console.log(
  compareMatrix(rotateMatrix8([[1, 2], [3, 4]]), [[3, 1], [4, 2]]),
  compareMatrix(rotateMatrix8([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]
  ]),
  compareMatrix(
    rotateMatrix8([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ]),
    [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]
  ),
  compareMatrix(
    rotateMatrix8([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
    ]),
    [
      [21, 16, 11, 6, 1],
      [22, 17, 12, 7, 2],
      [23, 18, 13, 8, 3],
      [24, 19, 14, 9, 4],
      [25, 20, 15, 10, 5]
    ]
  ),
  compareMatrix(rotateMatrix8([]), []),
  compareMatrix(rotateMatrix8([[]]), [[]]),
  compareMatrix(rotateMatrix8([[1]]), [[1]])
);

// results
// rotateMatrix1 x 1,157,230 ops/sec ±4.42% (51 runs sampled)
// rotateMatrix2 x 10,383,184 ops/sec ±2.10% (57 runs sampled)
// rotateMatrix3 x 15,492,587 ops/sec ±4.85% (51 runs sampled)
// rotateMatrix4 x 18,030,399 ops/sec ±2.14% (52 runs sampled)
// rotateMatrix5 x 17,079,922 ops/sec ±3.36% (51 runs sampled)
// rotateMatrix6 x 19,464,215 ops/sec ±3.24% (51 runs sampled)
// rotateMatrix7 x 19,687,974 ops/sec ±1.90% (49 runs sampled)
// rotateMatrix8 x 19,682,950 ops/sec ±1.83% (52 runs sampled)
// Fastest is rotateMatrix8,rotateMatrix7,rotateMatrix6
