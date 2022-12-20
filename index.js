const boxes = [...Array(9)].map((_, i) => document.getElementById(`${i}`));
const reset = document.getElementById('reset');
const scoreCounter = document.getElementById('score-counter');
const turn = document.getElementById('turn');

const game = {
  isWon: false,
  turn: 0
}

const players = [
  {
    id: 0,
    name: 'Player 1',
    score: 0,
    mark: 'X',
    avatar: '',
    colour: '',
    plots: []
  },
  {
    id: 1,
    name: 'Player 2',
    score: 0,
    mark: 'O',
    avatar: '',
    colour: '',
    plots: []
  }
];

const isWin = (winArrLine, plots) => {
  for (const x of winArrLine) {
    if (!plots.includes(x)) {
      return false;
    }
  }
  return true;
};

const checkWinner = (player) => {
  const { plots, name } = player;
  if (
    (isWin(['0', '1', '2'], plots)) ||
    (isWin(['3', '4', '5'], plots)) ||
    (isWin(['6', '7', '8'], plots)) ||
    (isWin(['0', '3', '6'], plots)) ||
    (isWin(['1', '4', '7'], plots)) ||
    (isWin(['2', '5', '8'], plots)) ||
    (isWin(['0', '4', '8'], plots)) ||
    (isWin(['6', '4', '2'], plots))
  ) {
    turn.textContent = `${name} Wins!!`;
    game.isWon = true;
    player.score++;
    scoreCounter.textContent = `Player 1 > ${players[0].score} - ${players[1].score} < Player 2`;
  }

  if (boxes.every(x => x.textContent) && !game.isWon) {
    turn.textContent = 'Draw!!';
  }
};

const changeTurn = (turn) => {
  const nextPlayer = (game.turn + 1) % players.length;
  game.turn = nextPlayer;
  turn.textContent = `${players[nextPlayer].name}'s turn`;
};

boxes.forEach(x => {
  x.addEventListener('click', () => {
    if (game.isWon) {
      return;
    }
    if (!x.textContent) {
      const player = players[game.turn];
      x.textContent = player.mark;
      player.plots.push(x.id);
      changeTurn(turn);
      players.forEach(x => checkWinner(x));
    }
  });
});

reset.addEventListener('click', () => {
  boxes.forEach(x => x.textContent = undefined);
  game.turn = 0;
  turn.textContent = `${players[0].name}'s turn`;
  game.isWon = false;
  players.forEach(x=> x.plots = []);
});
