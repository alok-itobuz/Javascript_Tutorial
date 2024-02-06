'use strict';

const bookings = [];
const createBooking = function (
  flightNum = 'NULL',
  numPassengers = 1,
  price = 199 * numPassengers // If price is not given then it'll take the numPassenger and multiply it with 199. if numPassenger also not given then it takes the default value of numPassenger as 1 (as mentioned here)
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123'); // {flightNum: 'LH123', numPassengers: 1, price: 199}
createBooking('LH123', 3); // {flightNum: 'LH123', numPassengers: 3, price: 597}
createBooking('LH123', 2, 800); // {flightNum: 'LH123', numPassengers: 2, price: 800}
createBooking('LH768', undefined); // {flightNum: 'LH768', numPassengers: 1, price: 199}      (as setting a parameter undefined is same as not passing any value at the place of that parameter)

const flight = 'LH234';
const alok = {
  name: 'Alok Ranjan Joshi',
  passport: 6453867424380634,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LHH888';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 6453867424380634) {
    // alert('Checked in');
    console.log('Checked in');
  } else {
    console.log('Wrong passport!');
    // alert('Wrong passport!');
  }
};

checkIn(flight, alok);
console.log(flight); // LH234
console.log(alok); // {name: 'Mr. Alok Ranjan Joshi', passport: 6453867424380634}
/**IMPORTANT:
 *: We can see the flight value has not been changed but the name property of the alok object is changed. It's same as the assigning of primitive type and non-primitive type. The primitive variable values remain in stack which is immutable where as the non-primitives remain in heap which is mutable. So, here as flightNum is a primitive data type so it's value doesn't changed but as the alok is object literal and remain in heap, so it's value got changed.
 */

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000000);
};
newPassport(alok);
checkIn(flight, alok);

// NOTE: In Javascript, there is no call-by-reference type of function call like C, C++. etc.

console.log(
  '--------------------------------------------------------------------------------'
);
console.log(
  '--------------------------------------------------------------------------------'
);
console.log(
  '----------------------FIRST-CLASS and HIGHER-ORDER-FUNCTION---------------------'
);

// NOTE: Higher Order Function: The function that receives another function as an argument, that returns a new function, or both.

console.log('\n.......Function accepting callback function.......');

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...others] = str.split(' ');
  return [firstWord.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string by the function ${fn.name}: ${fn(str)}`);
};

transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);

console.log('\n.......Function returning callback function.......');

//NOTE: If we want to create variable functions depending upon any value then we can create this type of higher-order-function.
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}!`);
  };
};

const greetHey = greet('Hey');
greetHey('Alok');
greetHey('Steven');

greet('Hello')('Alok');

console.log('....Arrow function....');

const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

const greetHeyy = greetArrow('Hey');
greetHeyy('Alok');
greetHeyy('Steven');

greetArrow('Hello')('Alok');

console.log(
  '\n--------------------------------------------------------------------------------'
);
console.log(
  '----------------------------------------------------------------------------------'
);
console.log(
  '----------------------------------BIND and APPLY---------------------------------'
);

const alokk = {
  name: 'Alok Ranjan Joshi',
  birthYear: 2002,
};

const ranjan = {
  name: 'Ranjan Kumar Joshi',
  birthYear: 2000,
};

const joshi = {
  name: 'Joshi kumar',
  birthYear: 1990,
  printDetails(a, b, c) {
    console.log(`Your name: ${this.name} and birthYear: ${this.birthYear}`);
    console.log(`The arguments passed are: ${a}, ${b}, ${c}`);
  },
};

function printVals(cyear) {
  console.log(`Name is ${this.name} and age is ${cyear - this.birthYear}`);
}

printVals.call(alokk, 2024);
printVals.call(ranjan, 2024);

joshi.printDetails(4, 5, 6);
const printDetails = joshi.printDetails;
// printDetails(2, 3, 4); //ERROR It'll throw error, as it's just a function declaration which is called in the global scope

// We can rather call using call method
joshi.printDetails.call(ranjan, 4, 9, 1); //IMPORTANT:
printDetails.call(ranjan, 3, 4, 5);
printDetails.call(joshi, 1, 2, 4);

// APPLY method
printVals.apply(alokk, [2024]);
printDetails.apply(ranjan, [2, 5, 9]);

// NOTE: call() method accepts the arguments separated by commma(simple function call) where as the apply method accepts the argumnt as an array

//NOTE: call() and apply() method just call the method, we have to call the function each time adding the postfix.

//NOTE: bind() method, It return an instance of the function by defining the target object of "this" keyword

console.log('-----------');
const printValAlokk = printVals.bind(alokk);
printValAlokk(2024);
//Also we can specify some of arguments like
const printDetailsAlokkWithArgs = printDetails.bind(alokk, 2, 4); //IMPORTANT: Here a = 2, b = 4, these 2 are fixed. Now when we call the newly formed function we have to pass 1 arguments only (as there are 3 arguments needed and 2 are already specified)

printDetailsAlokkWithArgs(4);

console.log('-----------');
//IMPORTANT: It's main usecase is given below
const planes = {
  planeCount: 0,
  buyPlane() {
    this.planeCount++;
    console.log(`The number of planes: ${this.planeCount}`);
  },
};

// document.querySelector('.buy').addEventListener('click', planes.buyPlane); //ERROR NaN, this is because when we pass the call back function inside any eventListner, then the traget of the "this" keyword will be the dom element.

document
  .querySelector('.buy')
  .addEventListener('click', planes.buyPlane.bind(planes)); //CORRECT

console.log(
  '\n--------------------------------------------------------------------------------'
);
console.log(
  '----------------------------------------------------------------------------------'
);
console.log(
  '----------------------------------BIND and APPLY---------------------------------'
);

// When a function is defined inside any other function then it keeps the copy of all the variables that are present inside it's parent function scope at the instance when the inner function is created.
const closureFun = () => {
  let v = 0;

  return () => {
    v++;
    console.log(v);
  };
};

const close1 = closureFun();
console.dir(close1); // It console the variables environment of the function

close1(); // 1
close1(); //2

// We can also create closure without returning any function from any parent function.

let closureFunOuter;

const closureFun1 = () => {
  let v = 0;
  closureFunOuter = function () {
    v++;
    console.log(v);
  };
};

const closureFun2 = () => {
  let w = 1;
  closureFunOuter = function () {
    w *= w + 1;
    console.log(w);
  };
};

console.log(closureFunOuter); // undefined

closureFun1(); // here the closureFunOuter is initialized with a function
closureFunOuter(); // 1
closureFunOuter(); // 2
closureFun2(); // Here the closureFunOuter is reinitialized with another function inside the closureFun2
closureFunOuter(); // 2
closureFunOuter(); //6

// Now let's see if the variables of the parent function can be accessed by the function defined inside any timer function.

const checkBoarding = (noOfPassenger, waitingTime) => {
  setTimeout(function () {
    console.log('Bording started');
    console.log(
      `Please start bording in groups, each having ${noOfPassenger / 3} members`
    );
  }, waitingTime * 1000);

  console.log(`Boarding start in ${waitingTime} seconds.`);
};

checkBoarding(180, 4); // Here also the function that is created inside the setTimeOut function can access the variables passed inside the checkBording function.
