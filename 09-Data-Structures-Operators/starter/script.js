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
