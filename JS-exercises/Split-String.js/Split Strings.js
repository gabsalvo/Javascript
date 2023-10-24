/*
Complete the solution so that it splits the string into pairs of two characters.
If the string contains an odd number of characters then it should replace the missing
second character of the final pair with an underscore ('_').

Examples:
solution('abc') // should return ['ab', 'c_']
solution('abcdef') // should return ['ab', 'cd', 'ef']

*/

const solution = function (str) {
  if (str.length % 2 === 1) {
    const addUn = str.concat('_');
    const newStr = addUn.match(/.{1,2}/g);
    return newStr;
  } else if (str.length === 0) {
    return [];
  } else {
    const newS = str.match(/.{1,2}/g);
    return newS;
  }
};
solution('abcde');
