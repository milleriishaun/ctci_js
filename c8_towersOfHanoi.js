var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

// // add tests
// suite
//   .add('towerOfHanoi1', function() {
//     towerOfHanoi1(5);
//   })
//   .add('towerOfHanoi2', function() {
//     towerOfHanoi2(5);
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
var TowersOfHanoi = function(n) {
  this.first = [];
  this.second = [];
  this.third = [];
  for (var i = n; i >= 1; i--) {
    this.first.push(i);
  }
};

TowersOfHanoi.prototype.move = function(start, mid, dest, depth) {
  if (depth === 0) {
    return;
  } else if (depth === 1) {
    dest.push(start.pop());
  } else {
    var currDepth = depth;
    var shortTower;
    var placePiece;
    if (depth % 2 === 0) {
      shortTower = mid;
      placePiece = dest;
    } else {
      shortTower = dest;
      placePiece = mid;
    }
    var shortTowerDepth = 0;
    shortTower.push(start.pop());
    shortTowerDepth++;
    currDepth--;
    var towerSwap1;
    var towerSwap2;
    while (currDepth > 0) {
      placePiece.push(start.pop());
      currDepth--;
      this.move(shortTower, start, placePiece, shortTowerDepth);
      shortTowerDepth++;
      towerSwap1 = shortTower;
      towerSwap2 = placePiece;
      shortTower = towerSwap2;
      placePiece = towerSwap1;
    }
  }
};

/* TEST */
var th = new TowersOfHanoi(5);
console.log(th);
th.move(th.first, th.second, th.third, th.first.length);
console.log(th);

var th2 = new TowersOfHanoi(6);
console.log(th2);
th.move(th2.first, th2.second, th2.third, th2.first.length);
console.log(th2);

// CTCI JS Sol
('use strict');

function towersOfHanoi(numDisks) {
  const stacks = [[], [], []];
  for (let i = 1; i <= numDisks; i++) {
    stacks[0].push(i);
  }
  solveHanoi(numDisks, ...stacks);
  return stacks;
}

function solveHanoi(numDisks, startStack, buffer, endStack) {
  if (numDisks > 0) {
    // Move top n-1 disks from 'start' to 'buffer' by using 'end' as the buffer.
    solveHanoi(numDisks - 1, startStack, endStack, buffer);

    // Move top from 'start' to 'end'.
    endStack.unshift(startStack.shift());

    // Move top n-1 disks from 'buffer' to 'end' by using 'start' as the buffer.
    solveHanoi(numDisks - 1, buffer, startStack, endStack);
  }
}
console.log(towersOfHanoi(5));

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

function printTowersOfHanoi(numRings, startStack = 'start', endStack = 'last') {
  if (numRings > 0) {
    const availableSpot = ['start', 'middle', 'last'].filter(
      stack => stack !== startStack && stack !== endStack
    )[0];

    // perform towerOfHanoi up to the base case, from the start to an available opening
    printTowersOfHanoi(numRings - 1, startStack, availableSpot);

    console.log(`Move ring from ${startStack} to ${endStack}`);

    // move from the available smaller tower of hanoi from here to the end
    printTowersOfHanoi(numRings - 1, availableSpot, endStack);
  }
}
printTowersOfHanoi(5);

// algo sol ... none(missing)

// stackhouse no more solutions

/** TOWERS OF HANOI
 * I:
 * O:
 * C:
 * E:
 */

// Time Complexity: O(n)
// Space Complexity: O(n)
// Try 1
// fail... I barely know where to start with this recursion.
// I have done this recursion before in Python... but I forget.
// (no need to beat myself up about it this time)
// I think I would need an example to follow or at least a diagram.

// results:
// They cannot be compared because one prints steps and other prints results.
// Well, actually, I'll try to compare assuming that they both solve accurately.
// Nvm, this comparison isn't a good idea since one is new instance of a class, and
// using the move method, while the other is simple solution.
// Basically, I'm not sure about how the async Benchmark.js will interpret it.
