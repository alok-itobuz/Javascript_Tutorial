'use strict';

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

document.querySelector('.check.btn').addEventListener('click', function () {
  console.log(document.querySelector('.guess').value);
  console.log('...');
});

*/
const messageTag = document.querySelector('.message');
const numberTag = document.querySelector('.number');
const guessTag = document.querySelector('.guess');
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, secretNumber);

  if (!guess) {
    messageTag.textContent = '⛔ No number!';
  } else if (guess === secretNumber) {
    messageTag.textContent = '🎉 Correct Number!';
    document.querySelector('body').style.backgroundColor = '#60b347';
    numberTag.textContent = secretNumber;
    numberTag.style.width = '30rem';
    guessTag.setAttribute('readonly', true);
    if (highScore < score) {
      highScore = score;
      document.querySelector('.highscore').textContent = score;
    }
  } else if (score > 1) {
    score--;
    document.querySelector('.score').textContent = score;
    messageTag.textContent =
      guess < secretNumber ? '📉 Too low' : '📈 Too high';
  } else {
    messageTag.textContent = '👎 Loose the game!';
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  messageTag.textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  guessTag.value = null;
  numberTag.textContent = '?';
  numberTag.style.width = '15rem';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  guessTag.removeAttribute('readonly');
});
