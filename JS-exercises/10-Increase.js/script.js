//TRADE TO 1MIL TRADE STATISTICS\\

let capital = 1000;
const target = 1000000;

let average = 1.1;
let investment = capital * average + capital;
const arrResults = [capital];

for (let i = investment; i <= 1000000; i = i * 1.1) {
  arrResults.push(Math.trunc(i));
  //MARIANNA HELPED ME WITH THE COMPUTATION, THANKS <3
}

console.log(arrResults.length);
console.log(arrResults);
