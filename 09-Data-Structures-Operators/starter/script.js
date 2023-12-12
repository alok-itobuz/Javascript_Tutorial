'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const arr = [4, 2, 7, 9, 1, 5, 3, 8];
let [a, b, , d] = arr;
console.log(a, b, d); // 4 2 9 (as we have given a extra comma in between so index-2 value i.e. 7 was not assigned)

// Swapping two values
console.log(a, b); // 4 2
[a, b] = [b, a];
console.log(a, b); // 2 4

// Nested array
const nested = [2, 4, [7, 9]];
const [i, j, [k, l]] = nested;
console.log(i, j, k, l);

console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);

const { name, starterMenu, categories } = restaurant;
console.log(name, starterMenu, categories);
const {
  name: restaurentName,
  starterMenu: restaurentMenu,
  categories: tags,
} = restaurant;
console.log(restaurentName, restaurentMenu, tags);

// *: DEFAULT VALUES
// *: If any property is not present inside the object then we can assign any default value to any variable. See the following example
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters); // [] ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

//*: MUTATING VARIABLES
let m = 456;
let n = 221;
const obj = { m: 34, n: 56 };
// {m, n} = obj; // ERROR It'll give an error as when the curly braces are given JS accepts a code block so "=" sign will give an error

({ m, n } = obj); // CORRECT It'll not give any error as it's wrapped inside the parenthesis
console.log(m, n); // 34 56

const { openingHours } = restaurant;
// const {thu} = openingHours
// const {open, close} = thu
console.log(open, close); // 12 22
//*: If we want to directly get the variable open, close then
const {
  thu: { open: o, close: c },
} = openingHours;
console.log(o, c); // 12 22

// -------------------------------------------------------------------

console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------SPREAD OPERATOR----------------------------'
);

//*: SPREAD OPERATOR   (...)
const array = [1, 2, 3, 4, 5];
console.log(array); // [1, 2, 3, 4, 5]
console.log(...array); // 1 2 3 4 5

/** IMPORTANT:
 *: The ... operator simply takes an array of values and write all of them individually being separated by ,
    IMPORTANT:
 *: In the above console log of ...array the output was 1 2 3 4 5
 *: They were not separated by comma (,) because
 *: console.log(1, 2, 3, 4, 5) will give 1 2 3 4 5 as output.
 *: So, inside the console.log() the number were present being separated by ,
*:
    IMPORTANT:
 *: A very big difference between array destructuring and sprear operator(...) is that spread operator doesn't create new variables like destructuring and the values can be used only when it is needed.
 NOTE: The spread operator can be used in all the iterables like arrays, strings, maps, sets. Objects are not iterable but spread operator works on objects too.
 */

const str = 'Alok';
const letters = [...str, ' ', 'Hehehehe'];
console.log(str); // Alok    (just like, console.log('Alok'); )
console.log(...str); // A l o k    (just like, console.log('A', 'l', 'o', 'k'); )
console.log(letters); // ['A', 'l', 'o', 'k', ' ', 'Hehehehe']

// Use in function
function orderPasta(ing1, ing2, ing3) {
  console.log(`ordered paste containing ${ing1}, ${ing2}, and ${ing3}.`);
}
const ingredients = ['a', 'b', 'c'];
orderPasta(...ingredients); // It's just like orderPasta('a', 'b', 'c');

function orderPasta2(...ingredients) {
  // it's simply like function orderPasta2(arg1, arg2, ..etc)
  console.log(
    `ordered paste containing the following ingredients. `,
    ...ingredients
  );
}
orderPasta2(...ingredients); // ordered paste containing the following ingredients.  a b c

// -------------------------------------------------------------------

console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------REST PATTERN----------------------------'
);

//*: REST PATTERN   (...)    It's opposite of spread operator but having same syntax

const anArray = [1, 2, ...[3, 4]]; // spread because on RIGHT side of =
const [first, second, ...others] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //REST,  because on LEFT side of =

// const [first, ...others, second] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // ERROR the rest element should be the last element in the array always which stored all the remaining elements

console.log(first, second, others); // 1 2 (8)[3, 4, 5, 6, 7, 8, 9, 10]

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); // {thu: {…}, fri: {…}}

// Functions
const add = function (...values) {
  console.log(values); // [4, 3, 5, 3, 6, 3, 5, 7]
};
add(3, 5);
add(4, 3, 5, 3, 6, 3, 5, 7); // It simply like add(...[4, 3, 5, 3, 6, 3, 5, 7])

// -------------------------------------------------------------------

console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '-------------------------SHORT CIRCUITING (&& ||)--------------------'
);
console.log(3 || 'Alok'); // 3
console.log('' || 'Alok'); // Alok
console.log(true || 0); // true
console.log(undefined || null); // null
console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello
/**
 IMPORTANT:
NOTE: in case of || The fist truthy operand will be executed. If all the operands are falsy then the last falsy operand will be executed.
 */

console.log(0 && 'Alok'); // 0
console.log(7 && 'Alok'); // Alok
console.log('Hello' && 23 && null && 'Alok'); // null

/**
 IMPORTANT:
NOTE: in case of && the first falsy operand will be executed. If all are true then the last truthy operand will be executed.
 */

// -------------------------------------------------------------------

console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------    NULLISH    ---------------------------'
);

restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10; // BUG As the guests count is 0 so we want 0 but in this case 0 is falsy value so by default the guests will be 10.
console.log(guests); // 10 BUG

const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); // 0 CORRECT

/** IMPORTANT:
 *: NULLISH (??) takes the null and undefined as falsy values only.
 NOTE: It consider 0, '' as truthy values.
 */

// -------------------------------------------------------------------

console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '------------------- LOGICAL ASSIGNMENT OPERATORS --------------------'
);

const rest1 = {
  name: 'Capri',
  numGuests: 0,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Alok Ranjan',
};

// rest1.numGuests = rest1.numGuests || 10; // 10
// rest2.numGuests = rest2.numGuests || 10; // 10
// *: We can write these in the following way, a ||= b it means
// *:   a = a || b      OR ASSIGNMENT OPERATOR
// rest1.numGuests ||= 10;  // BUG 10
// rest2.numGuests ||= 10; // BUG 10

// BUG Here also if i set the numGuests to 0, then the output will be not satisfactory.

// IMPORTANT:
//*: NULLISH ASSIGNENT OPERATOR
rest1.numGuests ??= 10; // CORRECT 0
rest2.numGuests ??= 10; // CORRECT 10

console.log(rest1);
console.log(rest2);

// *: Also we can use  AND ASSIGNMENT OPERATOR
//*:              &&=

// -------------------------------------------------------------------

console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------- for-of loop ----------------------------'
);

const menuu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menuu) console.log(item);

console.log([...menuu.entries()]); // it is the array of array of 2 size that contains the index and value of the array.
/*
(2) [0, 'Focaccia']
(2) [1, 'Bruschetta']
(2) [2, 'Garlic Bread']
(2) [3, 'Caprese Salad']
(2) [4, 'Pizza']
(2) [5, 'Pasta']
(2) [6, 'Risotto']
*/

for (const [index, elem] of menuu.entries()) {
  console.log(`${index}: ${elem}`);
}

// -------------------------------------------------------------------

console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '--------------------- enhanced object literals ----------------------'
);

//*: first enhancement: we can assign an object inside another just by putting it. example:
const inn = {
  hii: {
    text: 'Hello',
    any: 'NoNoNo',
  },
  bye: {
    text: 'Byeee',
    any: 'HeHeHe',
  },
};

const ob = {
  name: 'OB',
  inn,
  // NOTE: It's the first enhancement. we don't have to write inn: inn
  other: 10,
};

//*: second enhancement: we can write function in a very simple way

const obFun = {
  myFun(a, b) {
    // NOTE: It's the second enhancement
    return a + b;
  },
};

//*: third enhancement: we can write the property name inside any object from a variable by putting it inside a square braces    []
const weekdayss = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const myHolidays = {
  [weekdayss[0]]: {
    reason: 'GOVT Holiday',
  },
  [`Other days except ${weekdayss[0]}`]: {
    reason: 'Unknown',
  },
};
//NOTE: It's the third enhancement.
console.log(myHolidays);

// -------------------------------------------------------------------

console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '------------------------- optional chaining --------------------------'
);

// console.log(restaurant.openingHours.mon.open); // ERROR as "mon" property is not inside the openingHours object inside the restaurant object
console.log(restaurant.openingHours.mon?.open); // CORRECT It'll give undefined as mon is not an property inside the openingHours object

// Also we can check multiple properties like
console.log(restaurant?.openingHours?.mon?.open);

for (const day of weekdayss) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`${day}: ${open}`);
}
console.log('------');
// IMPORTANT: It's also works in function
const opChOb = {
  fun: x => x,
};
console.log(opChOb.fun?.(6) ?? "Method doesn't exist"); // 6
console.log(opChOb.funAny?.(6) ?? "Method doesn't exist"); // Method doesn't exist

// -------------------------------------------------------------------

console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '------------------------- looping object --------------------------'
);

// Property names
const properties = Object.keys(openingHours);
console.log(properties); // (3) ['thu', 'fri', 'sat']

for (const day of properties) {
  console.log(day);
}

console.log('-----');

// Property values
const values = Object.values(openingHours);
console.log(values);
/*
{open: 12, close: 22}
{open: 11, close: 23}
{open: 0, close: 24}
*/

console.log('-----');
// Entire object
const entries = Object.entries(openingHours); // [[key1, value1], [key2, value2], ...etc]     just like array entries
console.log(entries);

for (const [prop_name, { open, close }] of entries) {
  console.log(`${prop_name}: open: ${open} & close: ${close}`);
}
/*
thu: open: 12 & close: 22
open: 11 & close: 23
at: open: 0 & close: 24
*/

// -------------------------------------------------------------------

console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '------------------------------- sets --------------------------------'
);

const orderSet = new Set(['Risotto', 'Pizza', 'Pasta', 'Pizza', 'Risotto']);
console.log(orderSet); // Set(3) {'Risotto', 'Pizza', 'Pasta'}

// As string is also iterable, so if we pass a string in set then
console.log(new Set('Hello')); // Set(4) {'H', 'e', 'l', 'o'}

//*: Set methods
//add
orderSet.add('Bread');
orderSet.add('Omlette');
console.log(orderSet); // Set(5) {'Risotto', 'Pizza', 'Pasta', 'Bread', 'Omlette'}
//has
const isBreadPresent = orderSet.has('Bread');
const isMomosPresent = orderSet.has('Momos');
console.log(isBreadPresent, isMomosPresent); // true false
//delete
orderSet.delete('Bread');
console.log(orderSet); // Set(4) {'Risotto', 'Pizza', 'Pasta', 'Omlette'}

const setSize = orderSet.size;

// traversing in the set
for (const order of orderSet) console.log(order);

//*: If we want only unique elements of an array
/**IMPORTANT:
 *: Spread Operator is used for every iterables
 */

const staff = ['Waiter', 'Chef', 'Waiter', 'mananger', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staff); // (6) ['Waiter', 'Chef', 'Waiter', 'mananger', 'Chef', 'Waiter']
console.log(staffUnique); // (3) ['Waiter', 'Chef', 'mananger']

// -------------------------------------------------------------------

console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '------------------------------- maps --------------------------------'
);

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

// we can add multiple elements like the following. No need to write rest.set() multiple times
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed :(');
console.log(rest);

console.log(rest.get(true)); // We are open
console.log(rest.get(1)); // Firenze, Italy

const time = 21;
console.log(rest.get(time >= rest.get('open') && time <= rest.get('close'))); // We are open

//methods
console.log(rest.has('categories')); // true
rest.delete(2);
// rest.clear(); // clear the map completely

// IMPORTANT:
// rest.set([1, 2], 'Test');
// console.log(rest.get([1, 2])); // ERROR undefined
const aaa = [1, 2];
rest.set(aaa, 'Test');
console.log(rest.get(aaa)); // CORRECT'Test'

console.log('------------ Map Iteration ------------');

/**
 *: We can create a new map with values then:
 new Map([
  [prop1, value1],
  [prop2, value2],
  [prop3, value3], ...etc
 ])
 */
//NOTE: This method can be used to convert an object into a map. (by using Object.entries() method)
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again!'],
]);
console.log(question);

/**
 * NOTE: We can see now, the Object.entries() method convert the object into a map i.e. an array of arrays.
 */
console.log(Object.entries(openingHours)); // It'll return an 2-d array of the object which can be used to create an map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log('...............');

for (const [key, value] of question) console.log(`${key} : ${value}`);

console.log(question.entries());
console.log(question.keys());
console.log(question.values());

// -------------------------------------------------------------------

console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '---------------------------------------------------------------------'
);
console.log(
  '------------------------------ strings ------------------------------'
);

const airLine = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]); // A
console.log(plane[1]); // 3
console.log('B737'[0]); // B

console.log('..........');
console.log(airLine.length); // 16
console.log('B737'.length); // 4

console.log('..........');
console.log(airLine.indexOf('r')); // 6
console.log(airLine.lastIndexOf('r')); // 10
console.log(airLine.lastIndexOf('Portugal')); // 8
console.log(airLine.lastIndexOf('portugal')); // -1

console.log('..........');
console.log(airLine.slice(4)); // Air Portugal  (from index-4 to end)
console.log(airLine.slice(4, 7)); // Air Portugal  (from index-4 to index-6)
console.log(airLine.slice(-2)); // al
console.log(airLine.slice(1, -1)); // AP Air Portuga     (index-1 to the 2nd from last index)

console.log('..........');
console.log(new String('Alok'));
console.log(typeof new String('Alok')); // object
console.log(typeof new String('Alok').slice('2')); // string
const myStr = new String('Alok');
console.log(typeof myStr); // object
console.log(myStr[0]); // A

console.log(
  '------------------------------ strings-2 ------------------------------'
);

console.log(airLine.toLowerCase());
console.log(airLine.toUpperCase());

console.log('.....trim....');
const email = 'hello@alok.com';
const loginEmail = '     Hello@alok.cOM       \n';

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(loginEmail);
console.log(normalizedEmail);

console.log('.....replace....');
const str1 = 'Alok, Ranjan';
const str2 = str1.replace(',', '-').replace('A', 'L');
console.log(str2);

console.log('.....replace....');
console.log(str1.includes('Ranjan')); // true

console.log(
  '------------------------------ strings-3 ------------------------------'
);
console.log('a+very+nice+string'.split('+'));
const [firstName, lastName] = 'Alok Ranjan'.split(' ');
console.log(firstName, lastName);

const newName = ['Mr.', firstName, lastName].join(' ');
console.log(newName);

// padding
console.log('...padding...');
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+')); // +++++++++++Go to gate 23!

function maskCreditCard(number) {
  return number.toString().slice(-4).padStart(16, '*');
}
console.log(maskCreditCard(4658302856738294));
