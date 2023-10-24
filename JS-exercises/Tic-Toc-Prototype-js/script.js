'use strict';
/* TODO:
1.VARIABLES FOR DOC QUERY
2.CHANGE IN X OR 0 WHEN BUTTON CLICKED BASED ON WHO'S PLAYING
2.1 SWITCH PLAYER AFTER EACH CLICK
3.RESET GAME
4.WIN WHEN RIGHT COMBINATION
*/

//VARIABLES tic or toe
const btnAll = document.querySelectorAll('.btn');
const btn1 = document.querySelector('.btn--1');
const btn2 = document.querySelector('.btn--2');
const btn3 = document.querySelector('.btn--3');
const btn4 = document.querySelector('.btn--4');
const btn5 = document.querySelector('.btn--5');
const btn6 = document.querySelector('.btn--6');
const btn7 = document.querySelector('.btn--7');
const btn8 = document.querySelector('.btn--8');
const btn9 = document.querySelector('.btn--9');
const switchPlayer = document.querySelector('.switch');
const resetGame = document.querySelector('.reset');

let activePlayer, playing;

const init = function () {
  activePlayer = 0;
  playing = true;
  for (let i = 0; i < btnAll.length; i++) {
    btnAll[i].textContent = '';
  }
};
init();

//CONDITINONS
for (let i = 0; i < btnAll.length; i++) {
  btnAll[i].addEventListener('click', function () {
    if (activePlayer === 0 && playing) {
      btnAll[i].textContent = 'X';
    } else if (activePlayer === 1 && playing) {
      btnAll[i].textContent = 'O';
    }
  });
}

switchPlayer.addEventListener('click', function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  console.log('it works');
});

resetGame.addEventListener('click', init);
