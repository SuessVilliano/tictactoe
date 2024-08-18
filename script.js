const cells = document.querySelectorAll('[data-cell]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let oTurn;
let playerXScore = 0;
let playerOScore = 0;
let isAI = false;

const aiButton = document.getElementById('aiButton');
const twoPlayerButton = document.getElementById('twoPlayerButton');
const gameModeDiv = document.getElementById('game-mode');
const gameDiv = document.getElementById('game');

// Add event listeners to the buttons
aiButton.addEventListener('click', () => {
    isAI = true;
    startGame();
    gameModeDiv.classList.add('hidden');
    gameDiv.classList.remove('hidden');
});

twoPlayerButton.addEventListener('click', () => {
    isAI = false;
    startGame();
    gameModeDiv.classList.add('hidden');
    gameDiv.classList.remove('hidden');
});

// Event listener for restarting the game
restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.setAttribute('data-symbol', ''); // Reset symbol display
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.style.display = 'none';
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    const symbol = oTurn ? 'O' : 'X';
    placeMark(cell, currentClass, symbol);
    if (checkWin(currentClass)) {
        endGame(false);
        updateScore(currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        if (isAI && oTurn) {
            setTimeout(makeAIMove, 500);  // Add a slight delay for AI move
        }
    }
}

function makeAIMove() {
    const availableCells = [...cells].filter(cell => 
        !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)
    );
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    placeMark(randomCell, O_CLASS, 'O');
    if (checkWin(O_CLASS)) {
        endGame(false);
        updateScore(O_CLASS);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.style.display = 'flex';
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass, symbol) {
    cell.classList.add(currentClass);
    cell.setAttribute('data-symbol', symbol);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    document.querySelector('.game-board').classList.remove(X_CLASS);
    document.querySelector('.game-board').classList.remove(O_CLASS);
    document.querySelector('.game-board').classList.add(oTurn ? O_CLASS : X_CLASS);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function updateScore(winner) {
    if (winner === X_CLASS) {
        playerXScore++;
    } else {
        playerOScore++;
    }
    document.getElementById('scoreX').innerText = `X: ${playerXScore}`;
    document.getElementById('scoreO').innerText = `O: ${playerOScore}`;
}
