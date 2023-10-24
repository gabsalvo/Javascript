'use strict';
//TODO
/*0. VARIABLES FOR DOC.QUERYSELECTOR --
1. EVENT LISTENER ON BUTTONS --
2. SHOW OVERLAY AND MODAL ON CLICK --
3. cLOSE MODAL AND OVERLAY ON CLICK X --
4. CLOSE OVERLAY AND MODAL ON ESC PRESS --*/
//VARIABLES
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnshowModal = document.querySelectorAll('.show-modal');
const btncloseModal = document.querySelector('.close-modal');

//FUNCTIONS
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const keyPress = function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
};

//EVENT LISTENER IN BOTTONS TO OPEN
for (let i = 0; i < btnshowModal.length; i++) {
  btnshowModal[i].addEventListener('click', openModal);
}

//EVENT LISTENER FOR X TO CLOSE
btncloseModal.addEventListener('click', closeModal);

//EVENT LISTENER TO CLOSE ON OVERLAY click
overlay.addEventListener('click', closeModal);

//EVENT LISTENER TO CLOSE ON ESC KEY
document.addEventListener('keydown', keyPress);
