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
//   .add('tripleStep4', function() {
//     tripleStep4(10);
//   })
//   .add('tripleStep5', function() {
//     tripleStep5(10);
//   })
//   .add('tripleStep6', function() {
//     tripleStep6(10);
//   })
//   .add('tripleStep7', function() {
//     tripleStep7(10);
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
var findPaths = function(grid) {
  var paths = [];
  var endRow = grid.length - 1;
  var endCol = grid[0].length - 1;
  var recurse = function(row, col, currPath) {
    if (row === endRow && col === endCol) {
      paths.push(currPath.concat([[row, col]]));
    } else if (row <= endRow && col <= endCol) {
      if (row < endRow && grid[row + 1][col] !== 'x') {
        recurse(row + 1, col, currPath.concat([[row, col]]));
      }
      if (col < endCol && grid[row][col + 1] !== 'x') {
        recurse(row, col + 1, currPath.concat([[row, col]]));
      }
    }
  };
  recurse(0, 0, []);
  return paths;
};

/* TEST */

var grid = [['0', '0', '0', '0'], ['0', 'x', '0', 'x'], ['x', '0', '0', '0']];

console.log(findPaths(grid));

// CTCI JS Sol
// O(ROWS * COLUMNS) TIME WITH SET
// O(2ˆr+c) TIME WITHOUT SET

function getPathForRobot(maze) {
  if (!maze || !maze.length) return null;
  return findPath(maze, maze.length - 1, maze[0].length - 1);
}

function findPath(maze, row, column, path = [], failedPoints = new Set()) {
  if (column < 0 || row < 0 || !maze[row][column]) return null;

  const isAtOrigin = !row && !column,
    point = `(${row}, ${column})`;

  if (failedPoints.has(point)) return null;

  if (
    isAtOrigin ||
    findPath(maze, row, column - 1, path, failedPoints) ||
    findPath(maze, row - 1, column, path, failedPoints)
  ) {
    path.push(point);
    return path;
  }

  failedPoints.add(point);
  return null;
}

const maze = [
  [true, true, true, false], // 0
  [false, true, true, false], // 1
  [true, false, true, false], // 2
  [true, true, true, false], // 3
  [false, true, true, true], // 4
  [true, false, false, true] // 5
];
console.log(getPathForRobot(maze));

// algo sol
//https://www.youtube.com/watch?v=GO5QHC_BmvM
// GeeksForGeeks
// https://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/

// not recursive way
function create_table(row, col) {
  let result = new Array(row);
  for (let i = 0; i < row; i++) {
    result[i] = new Array(col);
  }
  return result;
}

function numberOfPaths(r, c) {
  let count = create_table(r, c);
  for (let i = 0; i < c; i++) {
    count[i][0] = 1;
  }
  for (let j = 0; j < r; j++) {
    count[0][j] = 1;
  }
  for (let i = 1; i < c; i++) {
    for (let j = 1; j < r; j++) {
      count[i][j] = count[i - 1][j] + count[i][j - 1];
    }
  }
  return count[c - 1][r - 1];
}

numberOfPaths(5, 3);

// recursive way
function RobotInaGrid(c, r) {
  if (c === 1 || r === 1) {
    return 1;
  } else {
    return RobotInaGrid(c - 1, r) + RobotInaGrid(c, r - 1);
  }
}

let ans = RobotInaGrid(3, 3);
console.log(ans);

// stackhouse ... none

/** ROBOT IN A GRID
 * I: off-limit positions, r, c
 * O: path positions(coordinates or directions) for reaching bottom right.
 * C: off-limit positions in rxc, only move right or down 1 at a time.
 * E: outside rxc
 */

// Try 1
// I can do this but it seems difficult. My solution is very likely different from
// the book's solution. Also my solution is likely very slow.
// I have a conceptual solution to the problem but solving it out would take
// obscene amounts of time, and would be like homework, when my goal is understanding.

// I realize that I can't really test these against one another b/c the solution
// for each depends on how the problem was thought about and how the maze was
// created.

// To be honest... this problem is very hard to put into words and mind, since
// the variables are too different for any one solution to be compared to the other.
