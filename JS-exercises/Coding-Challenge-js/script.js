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

const [players1, players2] = game.players;

const [gk, ...fieldsPlayers] = players1;
console.log(gk, fieldsPlayers);

console.log('------------');

const allPLayers = [...players1, ...players2];
console.log(allPLayers);

console.log('------------');

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

console.log('------------');

const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

console.log('------------');

const printGoals = function (...players) {
  console.log(`${players.length} goals were scored!`);
};
printGoals(...game.scored);

console.log('------------');

team1 < team2 && console.log('Team1 wins');
