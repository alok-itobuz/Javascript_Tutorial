'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const arr1 = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['i', 'h', 'g', 'f'];

console.log(
  '------------------ slice: Here the original array is not mutated ------------------'
);
console.log('arr1 with slice', arr1.slice(1, 3)); // from 1 to 2
console.log(arr1.slice(-2));
console.log('arr1', arr1);

console.log(
  '------------------ splice: Here the original array is mutated ------------------'
);
// console.log('arr1 with splice', arr1.splice(1, 3)); // from 1 and count 3 (it means from 1 to 3)
console.log('arr1', arr1);

console.log(
  '------------------ reverse: Here the original array is mutated ------------------'
);
// console.log('arr1 reverse', arr1.reverse());
console.log(arr1);

console.log('------at method-----');
console.log(arr1.at(2));
console.log(arr1.at(-2));

console.log('------ foreach -----');
arr1.forEach((val, i, arr1) => {
  console.log(`index-${i}: ${val}, whole array: ${arr1}`);
});
console.log('--------------------------------------------');

//---------------------------
// UI
let currentAccount;
function createUserNames() {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(str => str[0])
      .join('');
  });
}
createUserNames();

function displayMovements(sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? currentAccount.movements.slice().sort((a, b) => a - b)
    : currentAccount.movements;

  movs.forEach((mov, i) => {
    const type = mov < 1 ? 'withdrawal' : 'deposit';
    const html = `<div class="movements">
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}&nbsp;€</div>
    </div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

function calcDisplayBalance() {
  currentAccount.balance = currentAccount.movements.reduce(
    (total, curr) => curr + total,
    0
  );
  console.log(currentAccount.balance);
  labelBalance.textContent = `${currentAccount.balance.toString()} €`;
}

function calcDisplaySummary() {
  // const incomes = currentAccount.movements.reduce(
  //   (acc, curr) => (curr >= 0 ? curr + acc : acc),
  //   0
  // );

  const incomes = currentAccount.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr);

  const out = currentAccount.movements.reduce(
    (acc, curr) => (curr < 0 ? curr + acc : acc),
    0
  );

  const interest = currentAccount.movements
    .filter(mov => mov > 0)
    .map(dep => (dep * currentAccount.interestRate) / 100)
    .reduce((acc, curr) => acc + curr);

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${out}€`;
  labelSumInterest.textContent = `${interest}€`;
}

function updateUI() {
  displayMovements();

  calcDisplayBalance();

  calcDisplaySummary();
}
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount) {
    if (currentAccount.pin.toString() === inputLoginPin.value) {
      labelWelcome.innerText = `Welcome back, ${
        currentAccount.owner.split(' ')[0]
      }`;
      containerApp.style.opacity = 1;

      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();

      updateUI(currentAccount);
    } else {
      console.log('Invalid Pin');
    }
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(!sorted);
  displayMovements(!sorted);
  sorted = !sorted;
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recepientAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    recepientAccount &&
    amount > 0 &&
    currentAccount.username !== recepientAccount.username &&
    currentAccount.balance >= amount
  ) {
    currentAccount.movements.push(-1 * amount);
    recepientAccount.movements.push(amount);
    updateUI();
  }
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    currentAccount.movements.push(amount);

    updateUI();
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputCloseUsername.value;
  if (
    username === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    accounts.splice(
      accounts.findIndex(acc => acc.username === currentAccount.username),
      1
    );

    containerApp.style.opacity = 0;
  }
});

const x = new Array(7);
x.fill(3, 2, 5);

// console.log(x);

const y = Array.from({ length: 7 }, (curr, k) => k + 1);
console.log(y);

const randomDiceRolls = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1
);
console.log(randomDiceRolls);

labelBalance.addEventListener('click', function (e) {
  // const movementsFromUI = document.querySelectorAll('.movements__value');
  // const movementsArray = Array.from(movementsFromUI);
  // console.log(movementsArray.map(el => el.textContent.replace('€', '')));

  const movementsArray = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent.replace('€', '')
  );

  const movementsArray2 = [
    ...document.querySelectorAll('.movements__value'),
  ].map(el => el.textContent.replace('€', ''));
  console.log(movementsArray2);
});

// Array Method Practice - 1
// foreach
// map
// filter
// reduce
// find (return element)
const arrFind = [
  2,
  3,
  6,
  4,
  1,
  8,
  9,
  { name: 'Alok', age: 21 },
  { name: 'Ranjan', age: 29 },
  { name: 'Joshi', age: 23 },
  'ranjan',
  { name: 'Ram', age: 20 },
  { name: 'Charan', age: 23 },
  'alok',
];

const found = arrFind.find(({ name, age }) => name === 'Ram');
console.log(found);

// indexOf
console.log(arrFind.indexOf(9));

// findIndex
console.log(
  'findIndex',
  arrFind.findIndex((el, i, arr) => {
    // console.log(el, i, arr);
    return el.age == 20;
  })
);

// join
console.log(arrFind.slice(0, 7).join(' '));

// includes
console.log(arrFind.includes(4));

// some
console.log(arrFind.some(val => val % 2 == 0));

// every
console.log(arrFind.every(val => typeof val === 'int'));

// shift
//unshift
// pop
// push

// splice
const aspli = [2, 7, 3, 4, 5, 6, 9];
// const afterSpli = aspli.splice(2, 2, 1, 2, 3, 4, 5);
// console.log(aspli, afterSpli);

const sortedArr = aspli.slice().sort((a, b) => a - b);
console.log(sortedArr);

const arrFlatCheck = [
  [2, 3],
  [5, [34, 6, 3, [35, 2]]],
  [4, 3, 5, 3, [5, 3, 5]],
];
console.log(arrFlatCheck.flat(3));

const arrayCreation1 = new Array(10);
console.log(arrayCreation1);
arrayCreation1.fill(8);
console.log(arrayCreation1);

const arrayCreation2 = Array.from(
  [3, 2, 5, 2, 5, 5, 5, 3, 5, 2, 4, 3, 8],
  (value, k) => value + 3
);
console.log(arrayCreation2);

//----------------------------------
const totalMovementSum = accounts.reduce(
  (accumulator, acc) =>
    acc.movements.reduce((ac, mov) => ac + mov) + accumulator,
  0
);
console.log(totalMovementSum);

// total deposit sum
const bankDepositSum = accounts.reduce(
  (accumulator, acc) =>
    acc.movements.filter(mov => mov > 0).reduce((ac, dep) => ac + dep, 0) +
    accumulator,
  0
);
console.log(bankDepositSum);

let bankDepositSum2 = accounts
  .flatMap(acc => acc.movements)
  .filter(dep => dep > 0)
  .reduce((acc, dep) => acc + dep, 0);
console.log(bankDepositSum2);

// no. of deposit in the bank of atleast 1000
const countDeposit = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, mov) => (mov >= 1000 ? ++count : count), 0);
// const countDeposit = accounts
//   .flatMap(acc => acc.movements)
//   .filter(dep => dep >= 1000).length;
console.log(countDeposit);

// create object that contains sum of deposit and withdrawls
const sums = {
  deposits: accounts
    .flatMap(acc => acc.movements)
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov),
  withdrawls: accounts
    .flatMap(acc => acc.movements)
    .filter(mov => mov < 0)
    .reduce((acc, wid) => acc + Math.abs(wid), 0),
};
const sums2 = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curr) => {
      // curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += Math.abs(curr));
      sums[curr > 0 ? 'deposits' : 'withdrawals'] += Math.abs(curr);
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums2);

// ----------------
// this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const str = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  // const str = title
  //   .toLowerCase()
  //   .split(' ')
  //   .reduce(
  //     (acc, curr) =>
  //       exceptions.includes(curr)
  //         ? acc + ' ' + curr
  //         : `${acc} ${curr[0].toUpperCase()}${curr.slice(1)}`,
  //     ''
  //   );
  return str;
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
