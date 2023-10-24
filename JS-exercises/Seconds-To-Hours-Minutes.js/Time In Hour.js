/*
All Star Code Challenge #22

Create a function hat takes an integer argument of seconds and converts
the value into a string describing how many hours and minutes comprise that many seconds.

Any remaining seconds left over are ignored.

Note:
The string output needs to be in the specific form - "X hour(s) and X minute(s)"

For example:

3600 --> "1 hour(s) and 0 minute(s)"
3601 --> "1 hour(s) and 0 minute(s)"
3500 --> "0 hour(s) and 58 minute(s)"
23500 --> "89 hour(s) and 51 minute(s)"
*/

const toTime = function (seconds) {
  const inMin = Math.floor(seconds / 60);
  const inHour = Math.floor(inMin / 60);
  const str = `${inHour} hours(s) and ${inMin - 60 * inHour} minute(s)`;
  console.log(str);
  return str;
};
toTime(323500);
