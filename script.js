const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

// Background music
const bgMusic = document.getElementById("bg-music");

// Sound effects
const clickSound = new Audio("clicksound.mp3");
const winSound = new Audio("clicksound.mp3");

let currentPlayer = "X";
let board = Array(9).fill("");
let running = true;

// Win conditions
const winConditions = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // columns
  [0,4,8],[2,4,6]          // diagonals
];

// Track if music has started
let musicStarted = false;

// Start music on first user click anywhere
document.addEventListener("click", () => {
  if (!musicStarted) {
    bgMusic.play().catch(err => console.log("Autoplay blocked until user interaction"));
    musicStarted = true;
  }
}, { once: true });

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", () => {
  restartGame();
  clickSound.play();
});

function handleClick() {
  const index = this.dataset.index;
  if (board[index] || !running) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  clickSound.currentTime = 0;
  clickSound.play();

  checkWinner();
}

function checkWinner() {
  let won = winConditions.some(condition => {
    const [a,b,c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });

  if (won) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    running = false;
    winSound.play();
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    running = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  board.fill("");
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  running = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}
