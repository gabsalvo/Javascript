//Complete the function that takes two integers (a, b, where a < b) and return
//an array of all integers between the input parameters, including them.
/*For example:
a = 1
b = 4
--> [1, 2, 3, 4]
*/

const inBetween = function (a, b) {
  const arr = [];
  for (let i = a; i <= b; i++) {
    arr.push(i);
  }
  return arr;
  console.log(arr);
};

inBetween(1, 4);
inBetween(-2, 2);
