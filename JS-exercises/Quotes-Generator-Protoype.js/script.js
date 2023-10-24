//VARIABLES
const displayQuotes = document.querySelector('.quotes');
const generateQuotes = document.querySelector('.generate-quote');
const yourQuote = document.getElementById('input');
const add = document.querySelector('.add');

const quotes = [
  'Act as if what you do makes a difference. It does.',
  'Success is not final, failure is not fatal: it is the courage to continue that counts.',
  'Never bend your head. Always hold it high. Look the world straight in the eye. ',
  'What you get by achieving your goals is not as important as what you become by achieving your goals.',
  'Believe you can and you`re halfway there. ',
  'When you have a dream, you`ve got to grab it and never let go.',
];

generateQuotes.onclick = function () {
  const randomQ = Math.floor(Math.random() * quotes.length);
  displayQuotes.textContent = quotes[randomQ];
};

/*add.onclick = function () {
  quotes.push = yourQuote;
};
*/

function add_element() {
  quotes.push(document.getElementById('t1').value); // adding element to array
  document.getElementById('t1').value = ''; // Making the text box blank
}

document.getElementById('disp').innerHTML = str; // Display the elements of the array
