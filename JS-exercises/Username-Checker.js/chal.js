function CodelandUsernameValidation(str) {
  str.charAt(0) !== '_' &&
  str.charAt(str.length - 1) !== '_' &&
  /\w/ &&
  str.length >= 4 &&
  str.length <= 25
    ? console.log('true')
    : console.log('false');

  return str;
}
