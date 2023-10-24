/*
Wrting a simple daily compound calcolator
*/
const btnInput = document.querySelector('.capital');
const btnDailyInt = document.querySelector('.daily_interest');
const btnAll = document.querySelectorAll('.calculation');
const btnCompute = document.querySelector('.computing');
const btnAgain = document.querySelector('.again');
const par = document.querySelector('.compute');
const btnDays = document.querySelector('.days');

btnCompute.addEventListener('click', function () {
  const capital = Number(btnInput.value);
  const dailyInt = Number(btnDailyInt.value);
  const howManyDa = Number(btnDays.value);
  const percentage = (dailyInt / 100) * howManyDa;
  const result = capital * percentage + capital;
  console.log(percentage);
  par.textContent = result;
});

btnAgain.addEventListener('click', function () {
  btnInput.value = 'Your Initial Capital';
  btnDailyInt.value = 'DailyInt without `%` symbol';
  btnDays.value = 'Time in days';
  par.textContent = 'Your Earnings will be displayed here';
});
