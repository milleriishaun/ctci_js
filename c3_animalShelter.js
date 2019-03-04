var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

/*
// add tests
suite
  .add('isUnique1', function() {
    isUnique1('striggnp');
  })
  .add('isUnique2', function() {
    isUnique2('striggnp');
  })
  .add('isUnique3', function() {
    isUnique3('striggnp');
  })
  .add('isUnique4', function() {
    isUnique4('striggnp');
  })
  .add('isUnique5', function() {
    isUnique5('striggnp');
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
  */

// ctci (modern w/ readability, missing 3inOne but organized, best for c3)
// algo sol (2nd Best for c3, missing animalShelter clear format, <10 months old)
// CTCI JS (good full c3, with DataStructures clearly shown)
// CTCI JS Sol (great for c3, uses 'this' so has multiple applications)
// CTCI ES5 (useful c3 even though 3 years old, very concise and well-described)

// Just try to have ctci and algo sol easily accessible and tested.

// ctci
const List = require('./c2_List.js');

class Queue {
  constructor() {
    this.storage = new List();
  }

  enqueue(v) {
    this.storage.add(v);
  }

  dequeue() {
    return this.storage.removeHead();
  }

  peek() {
    return this.storage.head.value.count;
  }
}

class shelter {
  constructor() {
    this.dogs = new Queue();
    this.cats = new Queue();
    this.counter = 0;
  }

  enqueue(v) {
    v.count = this.counter;
    this.counter++;

    if (v.type === 'dog') this.dogs.enqueue(v);
    if (v.type === 'cat') this.cats.enqueue(v);
  }

  dequeueAny() {
    if (this.dogs.peek() < this.cats.peek()) {
      return this.dequeueDog();
    } else {
      return this.dequeueCat();
    }
  }

  dequeueCat() {
    return this.cats.dequeue().value;
  }

  dequeueDog() {
    return this.dogs.dequeue().value;
  }
}

let s = new shelter();
s.enqueue({ type: 'dog', name: 'spike' });
s.enqueue({ type: 'dog', name: 'spot' });
s.enqueue({ type: 'dog', name: 'rover' });
s.enqueue({ type: 'cat', name: 'garfield' });
s.enqueue({ type: 'cat', name: 'felix' });
s.enqueue({ type: 'cat', name: 'sylvester' });

console.log(s.dequeueAny().name);
console.log(s.dequeueCat().name);
console.log(s.dequeueDog().name);
// belisimo

// algo sol ... none available

// // CTCI JS
// var Queue = require('./../util/Queue');

// Queue.prototype.enqueue = Queue.prototype.add;

// var AnimalShelter = function() {
//   this.dogQ = new Queue();
//   this.catQ = new Queue();
//   this.allQ = new Queue();
//   this.tempQ = new Queue();
// };

// AnimalShelter.prototype.enqueue = function(animal) {
//   if (animal.type === 'dog') {
//     this.dogQ.enqueue(animal);
//   } else if (animal.type === 'vat') {
//     this.catQ.enqueue(animal);
//   }
//   this.allQ.enqueue(animal);
// };

// AnimalShelter.prototype.dequeueAny = function() {
//   if (this.allQ.peek() === this.dogQ.peek()) {
//     this.dogQ.remove();
//   } else if (this.allQ.peek() === this.catQ.peek()) {
//     this.catQ.remove();
//   }
//   return this.allQ.remove();
// };

// AnimalShelter.prototype.dequeueByType = function(type) {
//   var yesQ;
//   if (type === 'dog') {
//     yesQ = this.dogQ;
//   } else if (type === 'cat') {
//     yesQ = this.catQ;
//   }
//   while (!this.allQ.isEmpty() && this.allQ.peek().type !== type) {
//     this.tempQ.enqueue(this.allQ.remove());
//   }
//   var animal = this.allQ.remove();
//   yesQ.remove();

//   while(!this.allQ.isEmpty()) {
//     this.tempQ.enqueue(this.allQ.remove());
//   }

//   while(!this.tempQ.isEmpty()) {
//     this.allQ.enqueue(this.tempQ.remove());
//   }
//   return animal;
// };

// AnimalShelter.prototype.dequeueDog = function() {
//   return this.dequeueByType('dog');
// };

// AnimalShelter.prototype.dequeueCat = function() {
//   return this.dequeueByType('cat');
// };

// /* TESTS */

// var a = new AnimalShelter();
// a.enqueue({type:'dog', name:'machi'});
// a.enqueue({type:'dog', name:'daisy'});
// a.enqueue({type:'cat', name:'peanuts'});
// a.enqueue({type:'dog', name:'miso'});
// a.enqueue({type:'cat', name:'dada'});
// a.enqueue({type:'cat', name:'xiaoxiao'});

// console.log(a.dequeueAny(), 'dog machi');

// console.log(a.dequeueCat(), 'cat peanuts');

// console.log(a.dequeueAny(), 'dog daisy');

// console.log(a.dequeueAny(), 'dog miso');

/*
// CTCI JS Sol
class AnimalShelter {
  constructor() {
    this._cats = [];
    this._dogs = [];
    this._id = 0;
  }

  enqueueCat(cat) {
    this._cats.push( {name: cat, id: this._id++} );
  }

  enqueueDog(dog) {
    this._dogs.push( {name: dog, id: this._id++} );
  }

  dequeueCat() {
    return this._cats.shift().name;
  }

  dequeueDog() {
    return this._dogs.shift().name;
  }

  dequeueAny() {
    const catsLength = this._cats.length, dogsLength = this._dogs.length;

    if (catsLength && dogsLength) {
      return this._peek(this._cats).id < this._peek(this._dogs).id ? this.dequeueCat() : this.dequeueDog();
    } else {
      if (catsLength) return this.dequeueCat();
      if (dogsLength) return this.dequeueDog();
    }

  }

  _peek(queue) {
    return queue[0];
  }

}
*/

// // CTCI ES5
// /**
//  * Uses two different queues one for dogs and one for cats. Each entry is
//  * assigned a unique identifier which allows dequeueAny to determine which of
//  * the two queues to dequeue an item from.
//  *
//  * N = number of animals
//  * Time: enqueue O(1), dequeue O(1), dequeueAny O(1)
//  * Additional space: enqueue O(N), dequeue O(1), dequeueAny O(1)
//  * Additional space required to hold unique id per animal.
//  */
// export class AnimalShelter {
//   constructor() {
//     this._dogs = [];
//     this._cats = [];
//     this._id = 0;
//   }

//   enqueueCat(name) {
//     this._cats.push({
//       name: name,
//       id: ++this._id
//     });
//   }

//   enqueueDog(name) {
//     this._dogs.push({
//       name: name,
//       id: ++this._id
//     });
//   }

//   dequeueAny() {
//     let dogId =
//         this._dogs.length > 0 ? this._dogs[0].id : Number.POSITIVE_INFINITY,
//       catId =
//         this._cats.length > 0 ? this._cats[0].id : Number.POSITIVE_INFINITY;

//     if (
//       dogId !== Number.POSITIVE_INFINITY ||
//       catId !== Number.POSITIVE_INFINITY
//     ) {
//       if (dogId < catId) {
//         return this._dogs.shift().name;
//       } else {
//         return this._cats.shift().name;
//       }
//     }
//   }

//   dequeueCat() {
//     return this._cats.shift().name;
//   }

//   dequeueDog() {
//     return this._dogs.shift().name;
//   }
// }
