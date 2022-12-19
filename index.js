const boxes = [...Array(9)].map((_, i) => document.getElementById(`${i}`));

const reset = document.getElementById('reset');
const scoreCounter = document.getElementById('score-counter');

const turn = document.getElementById('turn');

const players = [
  {
    id: 0,
    name: 'Player 1',
    score: 0,
    avatar: '',
    colour: ''
  },
  {
    id: 1,
    name: 'Player 2',
    score: 0,
    avatar: '',
    colour: ''
  }
];

const xArray = [];
const oArray = [];

let gameIsWon = false;

const isWin = (arr, pArray) => {
  for (const x of arr) {
    if (!pArray.includes(x)) {
      return false;
    }
  }
  return true;
};

const checkWinner = (pArray) => {
  if (
    (isWin(['0', '1', '2'], xArray)) ||
    (isWin(['3', '4', '5'], xArray)) ||
    (isWin(['6', '7', '8'], xArray)) ||
    (isWin(['0', '3', '6'], xArray)) ||
    (isWin(['1', '4', '7'], xArray)) ||
    (isWin(['2', '5', '8'], xArray)) ||
    (isWin(['0', '4', '8'], xArray)) ||
    (isWin(['6', '4', '2'], xArray))
  ) {
    turn.textContent = 'Player 1 Wins!!';
    gameIsWon = true;
    players[0].score += 1;
    scoreCounter.textContent = `Player 1 > ${players[0].score} - ${players[1].score} < Player 2`;
  }

  if (
    (isWin(['0', '1', '2'], oArray)) ||
    (isWin(['3', '4', '5'], oArray)) ||
    (isWin(['6', '7', '8'], oArray)) ||
    (isWin(['0', '3', '6'], oArray)) ||
    (isWin(['1', '4', '7'], oArray)) ||
    (isWin(['2', '5', '8'], oArray)) ||
    (isWin(['0', '4', '8'], oArray)) ||
    (isWin(['6', '4', '2'], oArray))
  ) {
    turn.textContent = 'Player 2 Wins!!';
    gameIsWon = true;
    players[1].score++;
    scoreCounter.textContent = `Player 1 > ${players[0].score} - ${players[1].score} < Player 2`;
  }

  if (boxes.every(x => x.textContent) && !gameIsWon) {
    turn.textContent = 'Draw!!';
  }
};

const changeTurn = (turn) => {
  if (turn.textContent === `${players[0].name}'s turn`) {
    turn.textContent = `${players[1].name}'s turn`;
  } else {
    turn.textContent = `${players[0].name}'s turn`;
  }
};

boxes.forEach(x => {
  x.addEventListener('click', () => {
    if (gameIsWon) {
      return;
    }
    if (!x.textContent) {
      if (turn.textContent === `${players[0].name}'s turn`) {
        x.textContent = 'X';
        xArray.push(x.id);
      } else {
        x.textContent = 'O';
        oArray.push(x.id);
      }
      changeTurn(turn);
      checkWinner();
    }
  });
});

reset.addEventListener('click', () => {
  boxes.forEach(x => x.textContent = undefined);
  turn.textContent = `${players[0].name}'s turn`;
  gameIsWon = false;
  xArray.splice(0, xArray.length);
  oArray.splice(0, oArray.length);
});
