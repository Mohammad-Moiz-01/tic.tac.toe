const gameBoard = document.getElementById('gameBoard');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let board = Array(9).fill(null);
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

function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes(null)) {
        statusDisplay.innerHTML = 'Draw!';
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== null || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;

    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}

gameBoard.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', handleRestartGame);

statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
