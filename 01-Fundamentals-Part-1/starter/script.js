let js = "amazing";
if (js === "amazing") alert("JS is FUN!");

let $alok = "Alok Ranjan Joshi";
console.log($alok);

console.log(
  "-------------------------------------------------------------------"
);

//DATA TYPES
let javascriptIsFun = true;
console.log(javascriptIsFun);
console.log(typeof javascriptIsFun);
console.log(typeof "alok");

console.log("------------");

num = 4;
num = 5;
console.log(num);
console.log(typeof num);

console.log("------------");

console.log(typeof undefined); // undefined
console.log(typeof null); // object    (it's a bug of javascript, null is simply like undefined)

console.log(
  "-------------------------------------------------------------------"
);

// BASIC OPERATORS
const num1Str = "5";
const num2Str = "3";
console.log(num1Str + num2Str); //53
console.log(num1Str - num2Str); //2
console.log(typeof (num1Str - num2Str)); // number

const fname = "Alok";
const lname = "Joshi";
console.log(fname - lname); //NaN   (Not a Number)
console.log(lname - fname); //NaN
console.log(typeof (fname - lname)); // Number

let x, y;
x = y = 25 - 10 - 5;
console.log(x, y);

console.log(
  "-------------------------------------------------------------------"
);

// STRING LITERALS
console.log(
  "String \n\
multiple \n\
lines"
);

console.log(`String
multiple
lines`);

console.log(
  "-------------------------------------------------------------------"
);

// TYPE CONVERSION & COERCION
//Conversion
const inputYear = "1991";
console.log(Number(inputYear), inputYear);
console.log(inputYear + 18);

console.log(Number("Alok")); // NaN   (Not a Number)
console.log(typeof NaN); // number

console.log(12, String(23));

//Coercion
console.log("I am " + 23 + " years old"); // Here 23 will be automatically considered as String
console.log("I am " + "23" + " years old");
console.log("23" - "10" - 3); // 10 (- operator convert String to Number)

console.log("-----------------");

let n = "1" + 1;
n = n - 1;
console.log(n); // 10

console.log(
  "-------------------------------------------------------------------"
);

// 5 falsy values: 0, ' ', undefined, null, NaN
// all these numbers are not false but when coverted to Boolean then become false, these are called falsy values. Any values except these when converted to boolean give true.

// falsy values
console.log(Boolean(0)); // false
console.log(Boolean(" ")); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(null)); // false
console.log(Boolean(NaN)); // false
// truthy values
console.log(Boolean(3));
true;
console.log(Boolean("Alok"));
true;
console.log(Boolean({}));
true;

// This is mainly used in case of testing whether a variable is defined or not.

let height;
console.log(height); // undefined
if (height) console.log("Height is defined!");
else console.log("Height is undefined!"); // it'll be executed

console.log(
  "-------------------------------------------------------------------"
);

// SWITCH CASE
const day = "monday";

switch (Dau) {
  case "monday": // day === 'monday'
    console.log("It's monday");
    break;
}

console.log(
  "-------------------------------------------------------------------"
);
