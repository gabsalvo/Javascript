'use strict';
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    //console.log(second[0]);

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(18)}${'✅'.repeat(i + 1)}`);
  }
});

//CONVERT TWO WORDS VARIABLE IN camelCase

//let input = '  first_name';
//const newInput = input.toLowerCase().trim();

//FUNCTION
/*const converter = function (textCovertible) {
  const placeAfter = newInput.indexOf('_') + 1;

  const stonks =
    newInput.slice(0, placeAfter - 1) +
    newInput[placeAfter].toUpperCase() +
    newInput.slice(placeAfter + 1, newInput.length);

  //console.log(stonks);
};*/
//converter(input);

//console.log(textArea);

/*const placeAfter = newInput.indexOf('_') + 1;
    const stonks =
      newInput.slice(0, placeAfter - 1) +
      newInput[placeAfter].toUpperCase() +
      newInput.slice(placeAfter + 1, newInput.length);*/
