/*
Move the first letter of each word to the end of it,
then add "ay" to the end of the word. Leave punctuation marks untouched.

Examples

pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
pigIt('Hello world !');     // elloHay orldway !

*/

const pigIt = function (str) {
  const arr = [str].forEach((ele) => {
    const le = ele.length - 1;
    const transform = ele
      .replace(ele[le], ele[0])
      .replace(ele[0], ele[le])
      .padEnd(le + 3, 'ay')
      .split(' ');
    console.log(transform);
  });
};
pigIt('Hello World');
