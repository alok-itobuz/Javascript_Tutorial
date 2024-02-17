'use strict';

function conFun(name, age) {
  this.name = name;
  this.age = age;
  console.log(name, age);
}
// const ob = new conFun('Alok', 23);
// console.log(ob);

// console.log('------------------');
// conFun(
//   'Ranjan',
//   45
// );

/* If this keyword is not mentioned inside the function, then it can be both i.e. normal function as well as constructor function. But when we mention this keyword inside the function, then it become as the constructor function only. */

// NOTE: Arrow function can't be a constructor function as it has no this keyword of its own.
const anyFun = name => {
  this.name = name;
  console.log(name);
};
// anyFun('Alok');

// const obArrow = new anyFun('Ranjan'); //error
// console.log(obArrow);

///////////////////////////////////////////////////////
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
  //   console.log(this);

  // We shouldn't do this. when we write a function like this, all the instances of this constructor will carry this function.
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const alok = new Person('Alok', 2002);
const matilda = new Person('Matilda', 2017);

// console.log(alok, matilda);
// console.log(alok instanceof Person); // true

// alok.calcAge();

/* Prototypes (It'll not carried by the object, when we console.log the object, then also the function will not be inside the object. It'll be at the prototype section.) */
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// console.log(Person.prototype);
// console.log(alok);
// alok.calcAge();
// matilda.calcAge();

console.log(Person.prototype);
console.log(alok.__proto__);
console.log(Person);

console.log('------');

console.log(Person.prototype.isPrototypeOf(alok)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// console.log(Person.prototype.constructor);

/* When we call alok.calcAge(), JS look at the object and can't find the calcAge method, then it look inside the prototypes. */
// console.log(alok.hasOwnProperty('name'));

/*---------------------- Important ----------------------*/
Array.prototype.name = 'Heyyy! Array property name it is';
Object.prototype.name = 'Heyyyy! Object property name it is';
console.log(alok.name); //'Heyyyy! Object property name it is';

const arr = [2, 3, 4, 5, 6];

console.log(arr.name); //'Heyyy! Array property name it is';

console.log('----------------');
console.log(alok);
console.log(alok.__proto__); // Person.prototype
console.log(alok.__proto__.__proto__); // Object.prototype
console.log(alok.__proto__.__proto__.__proto__); // null

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mer = new Car('Mercedes', 95);

// bmw.accelerate();
// mer.accelerate();
// bmw.brake();
// mer.brake();

console.log(
  '-----------------------------------ES6 Class------------------------------------------'
);

// const PersonCl = class {}                    // both are valid
class PersonCl {
  constructor(firstName, birthYear) {
    this._firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be automatically added to .ptototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set firstName(name) {
    this._firstName = name;
  }

  get firstName() {
    return this._firstName;
  }
}

// We can also create prototypes like this just like the function constructor
PersonCl.prototype.greet = function () {
  console.log(`Heyyyy, ${this.firstName}`);
};

const jesica = new PersonCl('Jesica', 1996);
console.log(jesica);
console.log(jesica.firstName);

// ---------------------------------
const account = {
  _owner: 'Alok',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },

  // set owner(name) {
  //   this._owner = name;
  // },
};

const ownerLatest = account.latest;
// console.log(ownerLatest);

account.latest = 180;
// console.log(account.movements);

// account.owner = 'Ranjan';
// console.log(account);

////////////////////////////////////////////////////////////
console.log('---------------------STATIC METHOD---------------------------');

// just like Array.from

function FunConstructorSt(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
}

FunConstructorSt.hey = function () {
  console.log(`Heyyyyy`);
  console.log(this);
};

FunConstructorSt.hey();

class ClassSt {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  static hey() {
    console.log(`Heyyyyyy from class`);
  }
}
ClassSt.hey();

////////////////////////////////////////////////////////////
console.log('---------------------OBJECT.CREATE---------------------------');

const PersonProto = {
  // birthYear: 2002,
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
// console.log(PersonProto);
const alokOC = Object.create(PersonProto);
// console.log(alokOC);
alokOC.init('Alok', 2002);
// console.log(alokOC);
alokOC.calcAge();

console.log(alokOC.__proto__ === PersonProto); // true

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

//////////////////////////////////////////////////////
console.log('-----------------INHERITANCE-------------------');

const PersonI = function (firstName, birthYear) {
  console.log(this); // Student
  this.firstName = firstName;
  this.birthYear = birthYear;
};
PersonI.prototype.calcAge = function () {
  return 2037 - this.birthYear;
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;

  PersonI.call(this, firstName, birthYear);
  // It means the this keyword inside the PersonI function will refer to Student function.

  this.course = course;
};

// Student.prototype = PersonI.prototype;
Student.prototype = Object.create(PersonI.prototype);
Student.prototype.introduce = function () {
  console.log(`Hello, It's ${this.firstName} having course ${this.course}`);
};

const alokI = new Student('Alok', 2002, 'Computer Science');
console.log(alokI);
