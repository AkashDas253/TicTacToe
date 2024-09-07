// Initial state
let board = [];
let currentPlayer = 'X';
let gameActive = true;
let selectedBot = null;
let gridSize = 3;
let gameType = '1v1';
let firstPlayer = 'player';
let bot = null; // Variable to hold the bot instance

// Avoid multiple event listeners by disabling the board after a move is made
let boardDisabled = false;

function toggleBotOptions() {
    gameType = document.getElementById('game-type').value;
    const botOptions = document.getElementById('bot-options');
    botOptions.style.display = gameType === '1vBot' ? 'block' : 'none';
}

function startGame() {
    gridSize = parseInt(document.getElementById('grid-size').value);
    gameType = document.getElementById('game-type').value;
    selectedBot = document.getElementById('bot-type').value;
    firstPlayer = document.getElementById('first-player').value;

    // Initialize the game board based on grid size
    board = Array(gridSize * gridSize).fill('');
    currentPlayer = firstPlayer === 'player' ? 'X' : 'O';
    gameActive = true;
    boardDisabled = false;

    // Create grid dynamically
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    boardDiv.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
    boardDiv.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;

    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.onclick = () => makeMove(i);
        boardDiv.appendChild(cell);
    }

    // Initialize bot if needed
    if (gameType === '1vBot') {
        if (selectedBot === 'easyBot') {
            bot = new EasyBot(board, 'X', 'O', firstPlayer);
        } else if (selectedBot === 'minimaxBot') {
            bot = new MinimaxBot(board, 'X', 'O', firstPlayer);
        } else if (selectedBot === 'alphaBetaBot') {
            bot = new AlphaBetaBot(board, 'X', 'O', firstPlayer);
        }
    }

    // Show game board, hide config
    document.getElementById('config').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    if (gameType === '1vBot' && firstPlayer === 'bot') {
        botMove();
    }
}

function makeMove(index) {
    if (!boardDisabled && board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        document.querySelector(`.cell[data-index='${index}']`).textContent = currentPlayer;

        // Check for a win after a short delay to allow UI update
        setTimeout(() => {
            if (checkWin()) {
                gameActive = false;
                alert(`Player ${currentPlayer} wins!`);
                return;
            }

            if (!board.includes('')) {
                gameActive = false;
                alert('It\'s a tie!');
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player after the move

            if (gameType === '1vBot' && currentPlayer === bot.botSymbol) {
                boardDisabled = true;
                setTimeout(botMove, 500); // Short delay before bot moves
            }
        }, 100); // Short delay to allow the symbol to be shown
    }
}

function botMove() {
    if (bot) {
        const botMoveIndex = bot.makeMove();
        board[botMoveIndex] = bot.botSymbol;
        document.querySelector(`.cell[data-index='${botMoveIndex}']`).textContent = bot.botSymbol;

        // Check for a win after a short delay to allow UI update
        setTimeout(() => {
            if (checkWin()) {
                gameActive = false;
                alert(`Player ${bot.botSymbol} wins!`);
                return;
            }

            boardDisabled = false;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch back to the player after bot move
        }, 100); // Short delay to allow the symbol to be shown
    }
}

function checkWin() {
    const winningCombinations = getWinningCombinations(gridSize);

    for (const combination of winningCombinations) {
        if (combination.every(index => board[index] === currentPlayer)) {
            return true;
        }
    }

    return false;
}

function getWinningCombinations(size) {
    const combinations = [];
    
    // Rows
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(i * size + j);
        }
        combinations.push(row);
    }

    // Columns
    for (let i = 0; i < size; i++) {
        const column = [];
        for (let j = 0; j < size; j++) {
            column.push(i + j * size);
        }
        combinations.push(column);
    }

    // Diagonals
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < size; i++) {
        diagonal1.push(i * size + i);
        diagonal2.push(i * size + (size - i - 1));
    }
    combinations.push(diagonal1, diagonal2);

    return combinations;
}

function resetGame() {
    board = Array(gridSize * gridSize).fill('');
    currentPlayer = firstPlayer === 'player' ? 'X' : 'O';
    gameActive = true;
    boardDisabled = false;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');

    if (gameType === '1vBot' && firstPlayer === 'bot') {
        botMove();
    }
}

function newGame() {
    // Reset to the configuration screen
    document.getElementById('config').style.display = 'block';
    document.getElementById('game').style.display = 'none';

    // Reset game variables
    board = [];
    currentPlayer = 'X';
    gameActive = true;
    boardDisabled = false;
    selectedBot = null;
    gridSize = 3;
    gameType = '1v1';
    firstPlayer = 'player';

    // Clear the board UI
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    boardDiv.style.gridTemplateColumns = '';
    boardDiv.style.gridTemplateRows = '';
}
