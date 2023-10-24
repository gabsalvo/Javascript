'use strict';
//VARIABLES

let score = 20;
let highscore = 0;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

//INPUT LISTENER

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //IF NO OUTPUT

  if (!guess) {
    displayMessage('No Output!');
  }

  //IF OUTPUT IS WRONG

  if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too High' : 'Too Low');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You Lose');
      document.querySelector('.score').textContent = 0;
    }
  }

  //IF OUTPUT IS CORRECT
  else if (guess === secretNumber) {
    displayMessage('CORRECT NUMBER');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
});

//AGAIN BUTTON
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
