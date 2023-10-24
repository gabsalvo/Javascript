function twiceAsOld(dadYearsOld, sonYearsOld) {
  // your code here
  //How many years ago father was twice as old as his son
  //FATHER IS 40, son is 10, FATHER 20 YEARS AGO WAS TWICE AS OLD AS HIS SON
  let sonDouble = sonYearsOld * 2;
  let dadWhen = dadYearsOld - sonDouble
  //ASSUMING DAD DIES FIRST, SO SON IS GONNA BE OLDER AND TO AVOID NEGATIVE RESULTS WE USE THE ABSOLUTE VALUE
  return Math.abs(dadWhen);
}
