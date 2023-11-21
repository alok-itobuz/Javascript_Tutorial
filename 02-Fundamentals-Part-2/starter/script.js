"use strict"; // if any variable is initialized without being declared, then it'll throw error. and many more

// const interface = 'Audio';  // By using use strict, it'll cause error as interface is a reserve keyword

console.log("------------------------ FUNCTION ------------------------");

// FUNCTION
function calcAge(birthYear) {
  return 2037 - birthYear;
}

// function without name -> Anonymous function
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

// Arrow function
const calcAge3 = (birthYear) => 2037 - birthYear;

console.log("------------------------ ARRAY ------------------------");

//ARRAYS
// JS arrays can hold elements of different data types

const arr = [1, 3, 5, "Alok", "Ranjan", "j"];
console.log(arr);
// insert at end (PUSH method)
arr.push("added at the end");
console.log(arr);
// insert at front (UNSHIFT method)
arr.unshift("added at front");
console.log(arr);

// Remove elements
// (POP)   remove from end
const popped = arr.pop();
console.log(arr);
console.log("Popped element = ", popped);

// shift    remove from front
const shifted = arr.shift();
console.log(arr);
console.log("Popped from front: ", shifted);

// To get the index we use,   indexOf
const index = arr.indexOf("Alok");
console.log("Index of the element 'Alok' is: ", index);

// includes method to check whether the element is present in the array or not
const isPresentAlok = arr.includes("Alok");
console.log("Is 'Alok' present in the array: ", isPresentAlok);

console.log("------------------------ OBJECT ------------------------");

const alok = {
  firstName: "Alok Ranjan",
  lastName: "Joshi",
  age: 2023 - 2002,
  job: "Web Developer",
  friends: ["Liza", "Sohan", "Abhinandan", "Bini", "Sailaja"],
};
console.log(alok);

console.log("Alok's friends are: ", alok.friends);
// or
console.log("Alok's friends are: ", alok["friends"]); // IT's very much useful, we can write any expression, for example:

const nameKey = "Name";
console.log(alok["first" + nameKey]);
console.log(alok["last" + nameKey]);

const interestedIn = prompt(
  "What do you want to know about Alok? Choose between firstName, lastName,age, job, and friends."
);
// here alok.interestedIn will give undefined

if (alok[interestedIn]) {
  console.log(interestedIn);
  console.log(alok[interestedIn]);
} else {
  console.log("Wrong request!");
}
