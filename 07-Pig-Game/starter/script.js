'use strict';

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const players = document.querySelectorAll('.player');
const currentScores = document.querySelectorAll('.current-score');
const scores = document.querySelectorAll('.score');
const playerScores = [0, 0];

let currentPlayer = 0;
let score = 0;

const switchPlayer = function () {
  score = 0;
  players[currentPlayer].classList.remove('player--active');
  currentScores[currentPlayer].textContent = score;
  currentPlayer = (currentPlayer + 1) % 2;
  players[currentPlayer].classList.add('player--active');
};

btnHold.addEventListener('click', function () {
  playerScores[currentPlayer] += score;
  scores[currentPlayer].textContent = playerScores[currentPlayer];
  switchPlayer();
});

btnRoll.addEventListener('click', function () {
  const diceValue = Math.trunc(Math.random() * 6) + 1;
  document.querySelector('.dice').setAttribute('src', `dice-${diceValue}.png`);

  if (diceValue !== 1) {
    score += diceValue;
    currentScores[currentPlayer].textContent = score;
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  console.log('new game');
  score = 0;
  if (!currentPlayer) {
    players[0].classList.add('player--active');
    players[1].classList.remove('player--active');
  }
  currentPlayer = 0;
  playerScores[0] = 0;
  playerScores[1] = 0;
  scores[0].textContent = 0;
  scores[1].textContent = 0;
  currentScores[0].textContent = 0;
  currentScores[1].textContent = 0;
});
