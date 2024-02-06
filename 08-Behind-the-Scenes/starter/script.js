'use strict';

/**
 *: NOTE
 *: Modern JS is a mix of compilation and interpretation languages. It's Just-in-Time (JIT) compilation. Here entire code is converted into machine code at once, then executed immediately.
 *: Abstract syntax tree
 *: JS Engine consists of HEAP and CALL STACK. JS Engine can be considered as the heart of the Javascript runtime. Javaxcript runtime can be considered as everything that is needed to run the Javascript.
 *: WEB API's includes: (DOM, Timers, Fetch API, etc..)
 *: Also Javascript runtime includes CALLBACK QUEUE: (click, timer, data etc...). All functions that are ready to be executed.
 *:
 *:
 *:
IMPORTANT: 
 *: In Javascript, It first check the variable in the current scope. If not found then it'll check in the parent scope.
 *: Let an variable having some name is declared in the parent scope using const keyword. Then also we can declare same variable using const keyword in it's child scope. The value of the variable in the child scope will have more priority than that of the parent scope if it's used inside the child scope.
 */

function calcAge(birthYear) {
  const age = 2023 - birthYear;
  console.log(firstName);

  function printAge() {
    const output = `Heyyy ${firstName}! You are ${age}, born in ${birthYear}.`;
    console.log(output);
  }
  printAge();

  return age;
}

// calcAge(20012); // ERROR It'll throw error that firstName is not defined
const firstName = 'Alok';
calcAge(2002); // CORRECT It'll not throw any error

// *: Here the execution will be done line by line in the global context. When we call the functin before initialising the firstName variable it'll throw error though it's a global variable because till now the variable firstName is not created. But when we call the function after the initialization of the variable firstName, it'll not throw any error as firstName is global variable and also it is already initialized.

// -----------------------------------------------------------------

// TODO:  Now let's see the scope of variable that is created using var
function checkVarScope() {
  console.log('Above if block', x); // ERROR It'll be undefined as x is not created till now. If we access the value of x after the if block i.e. the initialization of x then we'll get a finite value of x.

  if (true) {
    var x = 4;
    console.log('x = ' + x);
  }

  console.log('Below if block', x); // CORRECT It'll not give any error
}

checkVarScope();

// -----------------------------------------------------------

function checkFunction() {
  if (true) {
    function add(a, b) {
      console.log('sum', a + b);
    }
  }

  // add(4, 5); // ERROR  in the strict-mode it'll throw an error saying that add is not defined. But as soon as we remove the strict-mode it'll execute the add function
}

checkFunction();

console.log('-------------------------------------------------------------');
console.log('-------------------------------------------------------------');
console.log('-------------------------------------------------------------');

/**  *:
 *: HOISITING: Makes some types of variables accessible/usable in the code before they ara actually declared. "Variables lifted to the top of their scope".
 *: Before execution, code is scanned for variable declarations, and for each variable, a new property is created in the variable environment object
 *:
 *:
 *: Function is block level. Without using strict-mode, it acts as function scope.
 */

console.log(myVar); // In this case we won't get any error but myVar will be undefined.
var myVar = 45;
console.log(myVar); // In this case myVar will be 45

// console.log(myConst);  // ERROR It'll throw an error saying "myConst" cannot be accessed before initialization
const myConst = 23;
/** IMPORTANT:
 *: The lines that are present before the declaration of a let or const variable is called as TEMPORAL DEAD ZONE of that variable. For example,  here myConst is declared in line-84. All the lines above that will be TEMPORAL DEAD ZONE for myConst variable.
 */
console.log(myConst); // CORRECT It's correct

// -----------------------------------------------------------------

console.log(me);
// console.log(job); // ERROR
// console.log(year); // ERROR
var me = 'Alok';
let job = 'Student';
const year = 2023;

console.log(addDecl(5, 6)); // CORRECT
function addDecl(a, b) {
  return a + b;
}

// console.log(addExpr(7, 9)); // ERROR
const addExpr = function (a, b) {
  // *: If we had wrritten var in place of const than the variable would be initialized but having value undefined. So the error would be "addExpr is not a method."
  return a + b;
};

// console.log(addArrow(6, 9)); // ERROR
const addArrow = (a, b) => a + b;

// --------------------------------------------------------------------

/** IMPORTANT:
 *: Variable created using var keyword will be act as a member of window object.
 */
var xVar = 5; // we can access it by window.xVar
let xLet = 5; // This will not be the member of window object
const xConst = 5; // This will also not be the member of the window object

console.log('-------------------------------------------------------------');
console.log('-------------------------------------------------------------');
console.log('-------------------------------------------------------------');

// *: THIS keyword

console.log('outside', this); // It'll give the window object
function funDecl() {
  console.log('decl', this);
}
const funExpr = function () {
  console.log('expr', this);
};
const funArrow = () => {
  console.log('arrow', this); // It'll give the window object
};
funDecl();
funExpr();
funArrow();

// IMPORTANT:
//*: As the arrow function doesn't get it's own this keyword. So, it carries it's parent's this keyword. in this case it's parent is global scope. so it gave the output of window object

// ------------
const myObj = {
  x: 6,
  myFun: function () {
    console.log('inside myFun', this); // myObj
    const insideMyFun = () => {
      console.log('inside insideMyFun inside myFun', this); // myObj
    };
    insideMyFun();
  },
  myFunArrow: () => {
    console.log('inside myFunArrow', this); // window object
  },
};
myObj.myFun();
myObj.myFunArrow();
/** IMPORTANT:
 *: The arrow function doesn't get it's own this keyword so it inherit the this keyword of it's parent function.
 *: Let's see the first function i.e. myFun: As it's a declarad function so it gets it's own this keyword. So the arrow function that is declared inside it will inherit the this keyword of it's parent function i.e. from myFun function. So it'll give the object myObj as the output for it's this keyword.
 *:
 *:
 *: Now for the second arrow function myFunArrow, as it's not present inside any function, so it'll inherit the global window object as it's this keyword.
  IMPORTANT:
  *: The this keyword always point to the object from which it is called. See the following example:
 */
console.log('----------------------');
const myObj1 = {
  x: 5,
  myFun: function () {
    console.log(this.x);
    console.log(this);
  },
};
const myObj2 = {
  x: 10,
};
myObj1.myFun(); //  5  {x: 5, myFun: ƒ}
console.log(myObj2); // {x: 10}
console.log('--');
myObj2.myFun = myObj1.myFun;
console.log(myObj2); // {x: 10, myFun: ƒ}
myObj2.myFun(); // 10   {x: 10, myFun: f}

console.log('-------------------------------------------------------------');
console.log('-------------------------------------------------------------');
console.log('-------------------------------------------------------------');

// *: How to access the outer this from a function that is declared inside a function which is a member of an object.
const alok = {
  x: 6,
  myFun: function () {
    // method-1
    const self = this;
    const insideMyFun1 = function () {
      // If we try to access this from this function then it'll give undefined.
      console.log('inside insideMyFun inside myFun', self);
    };

    // method-2, as arrow function inherit the this keyword of it's parent function
    const insideMyFun2 = () => {
      console.log('inside insideMyFun inside myFun', this); // myObj
    };
    insideMyFun1();
    insideMyFun2();
  },
};
alok.myFun();

console.log('-------------------------------------------------------------');
console.log('-------------------------------------------------------------');
console.log('-------------------------------------------------------------');

/** IMPORTANT:
 *: arrow function doesn't contain the argument object whereas the regular function contains this. Here is an example:
 */

const funReg = function (a, b) {
  console.log(arguments);
  return a + b;
};

const funArr = (a, b) => {
  // console.log(arguments); // ERROR
  return a + b;
};

// IMPORTANT:
//*: We can pass as many arguments we want. Here only 2 arguments is specified so only first two arguments will be stored in a and b. But in case of regular function we can access all arguments using the arguments keyword.

funReg(4, 5, 7, 9);
funArr(4, 7); // ERROR

console.log('-------------------------------------------------------------');
console.log('-------------------------------------------------------------');
console.log('-------------------------------------------------------------');

// Primitive Types
let x = 5;
let y = x;
x = 2;
console.log(x, y); // 2 5

// Reference Types
const mee = {
  name: 'Alok',
  age: 21,
};
const friend = mee;
friend.age = 27;
console.log('mee', mee); // Alok, 27
console.log('friend', friend); // Alok, 27
//*: Here i just changed the age of friend object but it reflected in the mee object too.

let mee2 = {
  name: 'Alok',
  age: 21,
};
let friend2 = mee2;
mee2 = {
  name: 'Alok Ranjan',
  age: 29,
};
console.log('mee', mee2); // Alok Ranjan, 29
console.log('friend', friend2); // Alok, 27

/** IMPORTANT:
 *: Let's understand how the above weired things happened.
 *:
 *: As there are 2 memory pools are present i.e. call stack and heap. 
 *: All the primitive variables are stored in the call stack. Function, arrays, object literals are stored in the heap.
 *:
 *: when we declare a normal variable like above x, y
 *: Here initially the value of x = 5. Let the address where 5 is stored is CS1.
 *: Here when we try to console log the value of x it gives 5. But here x doesn't store the value 5 in it rather it stores the address i.e. CS1 in it.
 *: Then we assign x to another variable y. Now y also point to the same address that x was pointing i.e. CS1.
 *: Now when we change the value of x, the value in the address CS1 doesn't change as it is fixed. Now the new value will be stored in another address (let CS2) and now x will point to the new address i.e. CS2.
 *: 
 *: So at the end, x will point to CS2 and y will point to CS1. As CS1 had contained 5 and CS2 had contained 2 so now the value of x will be 2 and value of y will be 5.
 *:
 *:
 *:
 *:
 *: Now for the object literals:
 *: When we create a object literal (here mee), It'll be stored in the heap (let H1). now H1 will be stored in call stack(let CS1) to which the variable mee will point. It means "mee" will now point to CS1, which contains the address H1 in it. And h1 contains the actual values i.e. name: Alok, age: 21
 *: Now when we assign the mee object to another object (here friend), the friend variable now refer to the same location i.e. CS1. Now when we try to change the value inside the "mee" object, it'll change in the heap.
 NOTE: We can change the value in heap but not in the call stack.
 *: So now the location H1 contains the updated values that is done by "mee" object and as "friend" object point to same location so it'll display the changed values.
 NOTE: If we think then we can see that in this case the value that is stored in the call stack (i.e. H1) is not changed. only the value present in the address H1 in head is changing.
 */
console.log('--------Copying Objects--------');
// Copying Objects
const mee3 = {
  name: 'Alok',
  age: 21,
  family: ['x', 'y'],
};
const friend3 = Object.assign({}, mee3);
friend3.age = 27;
friend3.family.push('m');
console.log('mee', mee3); // Alok, 21, family: Array(3)
console.log('friend', friend3); // Alok, 27, family: Array(3)
//*: So, It fails when there is an object present inside the object (here family (array))
