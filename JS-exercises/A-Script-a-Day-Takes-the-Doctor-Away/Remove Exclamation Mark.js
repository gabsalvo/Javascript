//Write function RemoveExclamationMarks which removes all exclamation marks from a given string.
const removeExclamationMarks = function (s) {
  const transform = s.replace(/!/g, '');
  return transform;
};
console.log(removeExclamationMarks('Hello World!'));
