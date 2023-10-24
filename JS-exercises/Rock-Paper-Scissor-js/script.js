'use strict';

//VARIABLES
const announcer = document.querySelector('.displayWinLoss');
const btnRock = document.querySelector('.btn--rock');
const btnPaper = document.querySelector('.btn--paper');
const btnScissors = document.querySelector('.btn--scissors');
const player = document.querySelector('.player');
const cpu = document.querySelector('.cpu');
const scorePlayer = document.getElementById('score-player');
const scoreCPU = document.getElementById('score-cpu');

let conditionsPlayer;
let conditionsCpu;
let scoreP = 0;
let scoreC = 0;
//FUNCTIONS
const init = function () {
  player.classList.add('hidden');
  cpu.classList.add('hidden');
  announcer.textContent = 'READY?!...PLAY';
  scorePlayer.textContent = 0;
  scoreCPU.textContent = 0;
};

init();

const initIngame = function () {
  player.classList.add('hidden');
  cpu.classList.add('hidden');
  announcer.textContent = 'READY?!...PLAY';
};

const cpuGame = function (draw, lose, win) {
  cpu.classList.remove('hidden');
  let cpuPlay = Number(Math.trunc(Math.random() * 3) + 1);
  cpu.src = `${cpuPlay}.png`;
  conditionsCpu = `${cpuPlay}`;

  if (draw == conditionsCpu) {
    announcer.textContent = 'DRAW!';
    setTimeout(initIngame, 1000);
  } else if (lose == conditionsCpu) {
    announcer.textContent = 'YOU LOSE!';
    scoreC += 1;
    scoreCPU.textContent = scoreC;
    setTimeout(initIngame, 1000);
  } else if (win == conditionsCpu) {
    announcer.textContent = 'YOU WIN!';
    scoreP += 1;
    scorePlayer.textContent = scoreP;
    setTimeout(initIngame, 1000);
  }
};

//PLAYER VS CPU
btnRock.onclick = function () {
  player.classList.remove('hidden');
  player.src = 'rock0.png';
  cpuGame(1, 2, 3);
};

btnPaper.onclick = function () {
  player.classList.remove('hidden');
  player.src = 'paper0.png';
  cpuGame(2, 3, 1);
};

btnScissors.onclick = function () {
  player.classList.remove('hidden');
  player.src = 'scissors0.png';
  cpuGame(3, 1, 2);
};
