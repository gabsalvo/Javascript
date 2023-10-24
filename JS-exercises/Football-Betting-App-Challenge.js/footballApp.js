const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//CHALLENGE #1

//1
const [players1, players2] = game.players;
console.log(players1);

console.log('------------------');

//2
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

console.log('------------------');

//3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

console.log('------------------');

//4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

console.log('------------------');

//5
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

console.log('------------------');

//6
const printGoals = function (...players) {
  console.log(`${players.length} goals scored!!`);
};
printGoals(...game.scored);

console.log('------------------');

//7
team1 < team2 ? console.log('Team1 wins') : console.log('Team2 wins');

console.log('------------------');

//---------------------------------------------------------------------\\

//CHALLENGE #2

//1
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

console.log('------------------');

//2
let averege = 0;
const allOdds = Object.values(game.odds);
for (const odds of allOdds) averege += odds;
averege /= allOdds.length;
console.log(averege);

console.log('------------------');

//3
let oddsValues = Object.entries(game.odds);
for (const [teams, oddPrint] of oddsValues) {
  const str = teams === 'x' ? 'Draw' : `Victory ${game[teams]}`;
  console.log(`Odd of ${str}: ${oddPrint}`);
}

console.log('------------------');

//4
const scorers = {};
for (const score of game.scored.values())
  scorers[score] ? scorers[score]++ : (scorers[score] = 1);
console.log(scorers);

console.log('------------------');

//---------------------------------------------------------------------\\

//CHALLENGE #3
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1

const events = new Set(gameEvents.values());
console.log(events);

console.log('---------------------------------');

//2
gameEvents.delete(64);
console.log(gameEvents);

console.log('---------------------------------');

//3
console.log(
  `An event happened, on averege, every ${92 / gameEvents.size} minutes`
);

console.log('---------------------------------');

//4

for (const [min, eve] of gameEvents) {
  const half = min <= 45 ? '[FIRST' : '[SECOND';
  console.log(`${half} HALF] ${min}: ${eve}`);
}
