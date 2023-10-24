/*
The new "Avengers" movie has just been released! There are a lot of people
at the cinema box office standing in a huge line. Each of them has a single 100, 50 or 25 dollar bill.
An "Avengers" ticket costs 25 dollars.

Vasya is currently working as a clerk. He wants to sell a ticket to every single person in this line.

Can Vasya sell a ticket to every person and give change if he initially
has no money and sells the tickets strictly in the order people queue?

Return YES, if Vasya can sell a ticket to every person and give change with the bills
he has at hand at that moment. Otherwise return NO.
Examples:

tickets([25, 25, 50]) // => YES
tickets([25, 100]) // => NO. Vasya will not have enough money to give change to 100 dollars
tickets([25, 25, 50, 50, 100]) // => NO. Vasya will not have the right bills to give
75 dollars of change (you can't make two bills of 25 from one of 50)



const tickets = function (peopleInLine) {
  let vasyaMoney = [25];
  if (peopleInLine[0] === 25) {
    const calculator = peopleInLine.forEach((bill, i) => {
      const calc = vasyaMoney.push(peopleInLine[i - 1] + bill);
    });
    const finalMoneyArr = vasyaMoney.filter((word) => word % 5 === 0);
    console.log(finalMoneyArr);
  } else return 'NO';
};
tickets([25, 25, 50, 50, 100]);
*/

const tickets = function (peopleInLine) {
  if (peopleInLine[0] === 25) {
    let vasyaMoney = [];
    let sum = 0;
    for (let i = 0; i < peopleInLine.length; i++) {
      vasyaMoney.push((sum += peopleInLine[i] - 25));
    }
    if (peopleInLine.includes(25) && vasyaMoney.includes(0)) return 'YES';
    else if (peopleInLine.includes(50) && vasyaMoney.includes(25)) return 'YES';
    else if (peopleInLine.includes(100) && vasyaMoney.includes(75))
      return 'YES';
    else if (peopleInLine.includes(50) || vasyaMoney.includes(25)) return 'NO';
    else if (peopleInLine.includes(100) || vasyaMoney.includes(75)) return 'NO';
    else if (peopleInLine.includes(25) || vasyaMoney.includes(0)) return 'NO';
  }
};
tickets([25, 25, 50, 50, 100]);
tickets([25, 25, 50]);

/*const tickets = function (peopleInLine) {
  if (peopleInLine[0] === 25) {
    const add = (a, b) => a + b;
    let sum = peopleInLine.reduce(add);
    console.log(sum);
  }
};
tickets([25, 25, 50, 50, 100]);*/
