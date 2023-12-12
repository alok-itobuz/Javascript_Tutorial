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
