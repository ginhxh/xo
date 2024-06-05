document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const statusDisplay = document.getElementById('status');
  const restartButton = document.getElementById('restartButton');
  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let gameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWin = (board, player) => {
    return winningConditions.some(condition => {
      return condition.every(index => board[index] === player);
    });
  };

  const isBoardFull = (board) => {
    return board.every(cell => cell !== '');
  };

  const makeBotMove = () => {
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        if (checkWin(board, 'O')) {
          return i;
        }
        board[i] = '';
      }
    }

    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        if (checkWin(board, 'X')) {
          board[i] = 'O';
          return i;
        }
        board[i] = '';
      }
    }

    let emptyCells = [];
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        emptyCells.push(i);
      }
    }
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    return randomIndex;
  };

  const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (board[clickedCellIndex] !== '' || !gameActive) {
      return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin(board, currentPlayer)) {
      statusDisplay.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }

    if (isBoardFull(board)) {
      statusDisplay.textContent = 'It\'s a draw!';
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (currentPlayer === 'O') {
      const botMoveIndex = makeBotMove();
      cells[botMoveIndex].textContent = 'O';

      if (checkWin(board, 'O')) {
        statusDisplay.textContent = 'Player O wins!';
        gameActive = false;
        return;
      }

      if (isBoardFull(board)) {
        statusDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
      }

      currentPlayer = 'X';
      statusDisplay.textContent = `Player X's turn`;
    } else {
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
  };

  const handleRestartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `Player X's turn`;
    cells.forEach(cell => cell.textContent = '');
  };

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  restartButton.addEventListener('click', handleRestartGame);
});
