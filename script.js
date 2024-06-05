// Function to make the bot's move
const makeBotMove = (board) => {
  // Check if the bot can win in the next move
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        board[i][j] = 'O';
        if (checkWin(board, 'O')) {
          return;
        }
        board[i][j] = '';
      }
    }
  }

  // Check if the player can win in the next move, and block it
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        board[i][j] = 'X';
        if (checkWin(board, 'X')) {
          board[i][j] = 'O';
          return;
        }
        board[i][j] = '';
      }
    }
  }

  // If no immediate win or block possible, make a random move
  let row, col;
  do {
    row = Math.floor(Math.random() * 3);
    col = Math.floor(Math.random() * 3);
  } while (board[row][col] !== '');
  board[row][col] = 'O';
};

// Function to play the game with the bot
const playGameAgainstBot = () => {
  let board = createBoard();
  let currentPlayer = 'X';
  while (true) {
    console.clear();
    console.log(`Player ${currentPlayer}'s turn`);
    displayBoard(board);
    if (currentPlayer === 'X') {
      let row = prompt('Enter row (0, 1, or 2):');
      let col = prompt('Enter column (0, 1, or 2):');
      if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        if (checkWin(board, currentPlayer)) {
          console.clear();
          displayBoard(board);
          console.log(`Player ${currentPlayer} wins!`);
          break;
        } else if (isBoardFull(board)) {
          console.clear();
          displayBoard(board);
          console.log('It\'s a draw!');
          break;
        } else {
          currentPlayer = 'O';
        }
      } else {
        console.log('Cell already taken. Try again.');
      }
    } else {
      makeBotMove(board);
      if (checkWin(board, currentPlayer)) {
        console.clear();
        displayBoard(board);
        console.log(`Player ${currentPlayer} wins!`);
        break;
      } else if (isBoardFull(board)) {
        console.clear();
        displayBoard(board);
        console.log('It\'s a draw!');
        break;
      } else {
        currentPlayer = 'X';
      }
    }
  }
};

// Start the game against the bot
playGameAgainstBot();