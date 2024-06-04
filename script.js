// Initialize variables
let currentPlayer = "X"; // Player X starts the game
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Represents the game board
let gameActive = true; // Indicates if the game is still active

// Function to handle a player's move
function handleCellClick(index) {
  if (gameBoard[index] === "" && gameActive) {
    gameBoard[index] = currentPlayer; // Update game board with player's move
    document.getElementById(`cell-${index}`).innerText = currentPlayer; // Update UI
    // Check for winner or draw
    if (checkWinner() || checkDraw()) {
      gameActive = false; // Game over
      return;
    }
    // Switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    // Update status display
    document.getElementById(
      "status"
    ).innerText = `Player ${currentPlayer}'s turn`;
    // If it's now AI's turn, make a move
    if (currentPlayer === "O") {
      makeAIMove();
    }
  }
}

// Function to make AI move using Minimax algorithm with enhanced evaluation function
function makeAIMove() {
  // Get the best move for AI using Minimax algorithm
  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < 9; i++) {
    if (gameBoard[i] === "") {
      gameBoard[i] = "O"; // Make a hypothetical move
      let score = minimax(gameBoard, 0, false); // Calculate score for this move
      gameBoard[i] = ""; // Undo the hypothetical move
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  // Make the best move
  handleCellClick(bestMove);
}

// Minimax algorithm implementation with enhanced evaluation function
function minimax(board, depth, isMaximizing) {
  // Base cases: check for terminal states (win, lose, draw)
  if (checkWinner()) {
    return currentPlayer === "O" ? 10 - depth : -10 + depth; // Positive score for AI, negative score for player
  } else if (checkDraw()) {
    return 0; // Draw: return neutral score
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(bestScore, score);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(bestScore, score);
      }
    }
    return bestScore;
  }
}

// Function to check for a winner
function checkWinner() {
  // Define winning combinations
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  // Check each winning combination
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      // Highlight winning cells
      document.getElementById(`cell-${a}`).classList.add("win");
      document.getElementById(`cell-${b}`).classList.add("win");
      document.getElementById(`cell-${c}`).classList.add("win");
      // Update status display
      document.getElementById(
        "status"
      ).innerText = `Player ${currentPlayer} wins!`;
      return true; // Winner found
    }
  }
  return false; // No winner
}

// Function to check for a draw
function checkDraw() {
  if (!gameBoard.includes("")) {
    // Update status display
    document.getElementById("status").innerText = "It's a draw!";
    return true; // Draw
  }
  return false; // Not a draw
}

// Function to restart the game
function restartGame() {
  currentPlayer = "X"; // Reset current player
  gameBoard = ["", "", "", "", "", "", "", "", ""]; // Reset game board
  gameActive = true; // Reset game active status
  // Clear cell text and remove highlighting
  for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).innerText = "";
    document.getElementById(`cell-${i}`).classList.remove("win");
  }
  // Update status display
  document.getElementById(
    "status"
  ).innerText = `Player ${currentPlayer}'s turn`;
}

// Add event listeners to cells and restart button
document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", () => {
    const cellIndex = parseInt(cell.id.split("-")[1]);
    handleCellClick(cellIndex);
  });
});

document.getElementById("restartButton").addEventListener("click", restartGame);
