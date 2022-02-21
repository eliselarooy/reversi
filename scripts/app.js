console.log('working');

// // DOM elements
const grid = document.querySelector('.grid');
// const instructions = document.querySelector('.instructions');
// const gameMessage = document.querySelector('.game-message');
// const blackScore = document.querySelector('.black-score');
// const whiteScore = document.querySelector('.white-score');

// // grid variables
const length = 8;

// // game variables
let counter = 1;
let player = counter % 2 === 0 ? 'w' : 'b';
// let currentPlayer = 'b';
// let remainingDiscs = 60;
let gameBoard = [];

const coordsToIndex = (x, y) => {
  return x + y * length;
};

const getSquareForCoords = (x, y) => {
  let index = coordsToIndex(x, y);
  // console.log('get square', { x, y, index });
  return gameBoard[index];
};

// const indexToCoords = (index) => {
//   let x = index % length;
//   let y = Math.floor(index / length);
//   return [x, y];
// };

// const placeDisc = (square) => {
//   const playersDisc = currentPlayer;
//   const discElement = document.createElement('div');
//   discElement.innerText = playersDisc;
//   square.element.appendChild(discElement);
//   square.disc = playersDisc;
//   square.discElement = discElement;
//   discElement.classList.add('disc');
//   if (playersDisc === 'b') {
//     discElement.classList.add('black-disc');
//   } else {
//     discElement.classList.add('white-disc');
//   }

//   remainingDiscs--;
//   console.log('remaining discs', remainingDiscs);

//   if (currentPlayer === 'b') {
//     currentPlayer = 'w';
//   } else {
//     currentPlayer = 'b';
//   }
//   console.log('current player', currentPlayer);

//   updateValidMoves();
// };

const onClick = (x, y) => {
  console.log('you clicked', x, y);
  let square = getSquareForCoords(x, y);
  let index = coordsToIndex(x, y);
  console.log('you clicked', square);
  if (square.disc === null) {
    // check is there is an opponents disc adjacent
    if (checkIsAdjacent(player, x, y)) {
      createDisc(player, index);

      console.log(counter);
      player = counter % 2 === 0 ? 'w' : 'b';
      console.log(player);
    }
  }
};

//   // if move is valid
//   if (checkIsValidMove(x, y)) {
//     placeDisc(square);
//     console.log(square);
//   }
// };

const createBoard = () => {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const index = coordsToIndex(x, y);
      const element = document.createElement('div');
      element.innerText = index;
      grid.appendChild(element);

      element.onclick = () => {
        onClick(x, y);
      };

      const square = {
        x: x,
        y: y,
        disc: null,
        element: element,
      };

      gameBoard[index] = square;
    }
  }
  createDisc('b', 27);
  createDisc('b', 36);
  createDisc('w', 28);
  createDisc('w', 35);
};

const createDisc = (color, index) => {
  const discElement = document.createElement('div');
  discElement.innerText = color;
  discElement.classList.add('disc');
  gameBoard[index].disc = color;
  if (color === 'b') {
    discElement.classList.add('black-disc');
  } else {
    discElement.classList.add('white-disc');
  }
  gameBoard[index].element.appendChild(discElement);
  gameBoard[index].discElement = discElement;

  counter++;
};

createBoard();

const checkIsAdjacent = (player, x, y) => {
  let directions = [
    [x, y - 1], //N
    [x + 1, y - 1], //NE
    [x + 1, y], //E
    [x + 1, y + 1], //SE
    [x, y + 1], //S
    [x - 1, y + 1], //SW
    [x - 1, y], //W
    [x - 1, y - 1], //NW
  ];
  let directionsWithDisc = directions.filter((p) => {
    let x = p[0];
    let y = p[1];
    let square = getSquareForCoords(x, y);

    if (!square) {
      return false;
    }

    console.log('checking adjacent: x', x, 'y', y, 'square', square);
    return square.disc !== null && square.disc !== player;
  });

  if (directionsWithDisc.length > 0) {
    return true;
  }
};

// const checkIsAdjacent = (x, y) => {
//   // check all directions starting with N
//   let directions = [
//     { x, y: y - 1 },
//     // { x: x + 1, y: y - 1 },
//     // { x: x + 1, y },
//     // [x + 1, y + 1],
//     // [x, y + 1],
//     // [x - 1, y + 1],
//     // [x - 1, y],
//     // [x - 1, y - 1],
//   ];
//   let directionsWithDisc = directions.filter((p) => {
//     let x = p.x;
//     let y = p.y;
//     let playersDisc = currentPlayer;
//     console.log({ x, y });
//     let square = getSquareForCoords(x, y);

//     if (!square) {
//       return false;
//     }

//     console.log({
//       x,
//       y,
//       playersDisc,
//       square,
//     });
//     // if square is not equal to null or current players disc
//     return square.disc !== null && square.disc !== playersDisc;
//   });
//   console.log('checking adjacent squares', directionsWithDisc);
//   if (directionsWithDisc.length > 0) {
//     return true;
//   }
// };

// const checkIsValidMove = (x, y) => {
//   // is there already a disc in the square
//   let square = getSquareForCoords(x, y);
//   if (square.disc === null) {
//     return checkIsAdjacent(x, y);
//   }
// };

// const updateValidMoves = () => {
//   for (let i = 0; i < gameBoard.length; i++) {
//     let square = gameBoard[i];

//     let isValidMove = checkIsValidMove(square.x, square.y);

//     // if (isValidMove) {
//     //   square.element.makegreen();
//     // } else {
//     //   square.element.makeplain();
//     // }
//   }
// };
