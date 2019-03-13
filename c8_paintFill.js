var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// // add tests
// suite
//   .add('parens1', function() {
//     parens1(3);
//   })
//   .add('parens2', function() {
//     parens2(3);
//   })
//   .add('parens3', function() {
//     parens3(3);
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
var withinBounds = function(point, screen) {
  var [row, col] = point;
  var rowHeight = screen.length;
  var colWidth = screen[0].length;
  return row >= 0 && row < rowHeight && col >= 0 && col < colWidth;
};

var paintFill = function(screen, point, color) {
  var [row, col] = point;
  var currColor = screen[row][col];
  if (withinBounds(point, screen) && screen[row][col] !== color) {
    screen[row][col] = color;

    if (
      withinBounds([row + 1, col], screen) &&
      screen[row + 1][col] === currColor
    ) {
      paintFill(screen, [row + 1, col], color);
    }

    if (
      withinBounds([row + 1, col + 1], screen) &&
      screen[row + 1][col + 1] === currColor
    ) {
      paintFill(screen, [row + 1, col + 1], color);
    }

    if (
      withinBounds([row + 1, col - 1], screen) &&
      screen[row + 1][col - 1] === currColor
    ) {
      paintFill(screen, [row + 1, col - 1], color);
    }

    if (
      withinBounds([row, col + 1], screen) &&
      screen[row][col + 1] === currColor
    ) {
      paintFill(screen, [row, col + 1], color);
    }

    if (
      withinBounds([row, col - 1], screen) &&
      screen[row][col - 1] === currColor
    ) {
      paintFill(screen, [row, col - 1], color);
    }

    if (
      withinBounds([row - 1, col], screen) &&
      screen[row - 1][col] === currColor
    ) {
      paintFill(screen, [row - 1, col], color);
    }

    if (
      withinBounds([row - 1, col + 1], screen) &&
      screen[row - 1][col + 1] === currColor
    ) {
      paintFill(screen, [row - 1, col + 1], color);
    }

    if (
      withinBounds([row - 1, col - 1], screen) &&
      screen[row - 1][col - 1] === currColor
    ) {
      paintFill(screen, [row - 1, col - 1], color);
    }
  }
};

/* TEST */

var b = '#000000';
var w = '#ffffff';
var g = '#00ff00';

var testScreen = [[b, b, b, b], [b, w, w, b], [b, w, w, b], [b, b, b, b]];
var testScreen2 = [[b, w, w, b], [b, w, w, b], [b, b, w, b], [b, w, w, b]];

var testPoint = [1, 1];

paintFill(testScreen, testPoint, g);
paintFill(testScreen2, testPoint, g);

console.log(testScreen);
console.log(testScreen2);

// CTCI JS Sol
function paintFill(screenArr, row, column, newColor) {
  if (screenArr[row][column] === newColor) return false;
  return paint(screenArr, row, column, screenArr[row][column], newColor);
}

function paint(screenArr, row, column, oldColor, newColor) {
  if (
    row < 0 ||
    row >= screenArr.length ||
    column < 0 ||
    column >= screenArr[0].length
  )
    return false;

  if (screenArr[row][column] === oldColor) {
    screenArr[row][column] = newColor;
    paint(screenArr, row - 1, column, oldColor, newColor);
    paint(screenArr, row + 1, column, oldColor, newColor);
    paint(screenArr, row, column - 1, oldColor, newColor);
    paint(screenArr, row, column + 1, oldColor, newColor);
  }

  return true;
}

const screenArr = [
  ['green', 'blue', 'yellow', 'orange'],
  ['green', 'yellow', 'yellow', 'orange'],
  ['green', 'blue', 'yellow', 'orange'],
  ['green', 'blue', 'blue', 'orange']
];

console.log(paintFill(screenArr, 1, 2, 'green'));
console.log(screenArr);

// algo sol ...(this guy noticed how ridiculous this was to solve, so just gave vids)
// 1: https://www.geeksforgeeks.org/flood-fill-algorithm-implement-fill-paint/
// 2: https://www.programcreek.com/2014/05/leetcode-paint-house-java/
// youtube: Flood Fill Algrithm
// https://www.youtube.com/watch?v=Zwh-QNlsurI

// stackhouse... no more solutions

/** Paint Fill
 * I: 2D arry of colors, a point, a new color
 * O: Filled in array of colors, from the top left position to the bottom right.
 * C: none
 * E: none
 */

// Time Complexity: O(n)
// Time Complexity: O(n)
// Try 1... I ma not sure what the problem is asking of me.

// results:
// Note: this might be too hard to compare. I don't get it. Maybe I will watch
// the videos later.
