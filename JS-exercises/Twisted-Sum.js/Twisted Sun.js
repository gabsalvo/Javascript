/*
Find the sum of the digits of all the numbers from 1 to N (both ends included).
Examples

# N = 4
1 + 2 + 3 + 4 = 10

# N = 10
1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + (1 + 0) = 46

# N = 12
1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + (1 + 0) + (1 + 1) + (1 + 2) = 51


*/
const twistedSum = function (n) {
  if (n < 10) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    console.log(sum);
    return sum;
  } else {
    var sum = 0;
    const decine = Math.floor(n / 10) % 10;
    const unità = n % 10;
    for (var i = 1; i <= 9; i++) {
      sum += i;
      for (var z = 0; z < n; z = z + decine + unità) {
        console.log(sum + z);
        return sum + z;
      }
    }
    console.log(sum + z);
    return sum + z;
  }
};
twistedSum(10);
