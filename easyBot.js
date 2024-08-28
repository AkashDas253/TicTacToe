function easyBotMove() {
    const emptyCells = board.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = currentPlayer;
        document.querySelectorAll('.cell')[randomIndex].textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}
