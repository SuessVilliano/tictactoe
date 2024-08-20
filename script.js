document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = document.getElementById('themeToggle');
    icon.src = document.body.classList.contains('light-mode') ? 'sun-icon.png' : 'moon-icon.png';
});

document.getElementById('ticTacToeButton').addEventListener('click', () => {
    loadGame('ticTacToe');
});

document.getElementById('connectFourButton').addEventListener('click', () => {
    loadGame('connectFour');
});

function loadGame(game) {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = ''; // Clear existing content

    if (game === 'ticTacToe') {
        gameContainer.innerHTML = `
            <h2>Tic-Tac-Toe</h2>
            <!-- Insert Tic-Tac-Toe specific HTML here -->
        `;
        initializeTicTacToe(); // Call the function to set up Tic-Tac-Toe
    } else if (game === 'connectFour') {
        gameContainer.innerHTML = `
            <h2>Connect Four</h2>
            <!-- Insert Connect Four specific HTML here -->
        `;
        initializeConnectFour(); // Call the function to set up Connect Four
    }
}

function initializeTicTacToe() {
    // Your existing Tic-Tac-Toe JavaScript code goes here
}

function initializeConnectFour() {
    // The Connect Four JavaScript code goes here
}
