/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are
eating too much or too little.
Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10%
above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"
5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects 😉)
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1 Dog Right Amount of Food
dogs.forEach((dog) => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

console.log('                                ');
console.log('--------------------------------');
console.log('                                ');

//2 Sarah's dog
const dogSarah = dogs.find((dog) => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog is eating ${
    dogSarah.curFood > dogSarah.recFood ? 'too much' : 'too little'
  }`
);
console.log('                                ');
console.log('--------------------------------');
console.log('                                ');

//3 Too Much/Little Food

const ownersEaTooMuch = dogs
  .filter((quantity) => quantity.curFood > quantity.recFood)
  .flatMap((dogs) => dogs.owners);
console.log(ownersEaTooMuch);

const ownersEaTooLittle = dogs
  .filter((quantity) => quantity.curFood < quantity.recFood)
  .flatMap((dogs) => dogs.owners);
console.log(ownersEaTooLittle);

console.log('                                ');
console.log('--------------------------------');
console.log('                                ');

//4 String saying it
console.log(`${ownersEaTooMuch.join(' and ')} dogs eat too much`);
console.log('                                ');
console.log(`${ownersEaTooLittle.join(' and ')} dogs eat too little`);

console.log('                                ');
console.log('--------------------------------');
console.log('                                ');

//5 There's someone eating right?
const whoEatingRight = dogs.some(
  (quantity) => (quantity.curFood = quantity.recFood)
);
console.log(whoEatingRight);

console.log('                                ');
console.log('--------------------------------');
console.log('                                ');

//6 There's someone eating ok?
const whoEatingOk = dogs.some(
  (quantity) =>
    quantity.curFood >= quantity.curFood * 0.9 &&
    quantity.curFood <= quantity.curFood * 1.1
);

console.log(whoEatingOk);

console.log('                                ');
console.log('--------------------------------');
console.log('                                ');

//7 Create array
const whoEatingOkArr = dogs.filter(
  (quantity) =>
    quantity.curFood >= quantity.curFood * 0.9 &&
    quantity.curFood <= quantity.curFood * 1.1
);
console.log(whoEatingOkArr);

console.log('                                ');
console.log('--------------------------------');
console.log('                                ');

//8
const doggo = dogs.splice(0, dogs.length).sort((a, b) => a.recFood - b.recFood);
console.log(doggo);
