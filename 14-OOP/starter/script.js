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
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be automatically added to .ptototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

// We can also create prototypes like this just like the function constructor
PersonCl.prototype.greet = function () {
  console.log(`Heyyyy, ${this.firstName}`);
};

const jesica = new PersonCl('Jesica', 1996);
