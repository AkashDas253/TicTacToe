function minimaxBotMove() {
    const bestMove = minimax(board, currentPlayer);
    board[bestMove.index] = currentPlayer;
    document.querySelectorAll('.cell')[bestMove.index].textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function minimax(newBoard, player) {
    const availSpots = newBoard.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);

    // Check for terminal states (win/tie)
    if (checkWinForMinimax(newBoard, 'X')) return { score: -10 };
    if (checkWinForMinimax(newBoard, 'O')) return { score: 10 };
    if (availSpots.length === 0) return { score: 0 };

    const moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        const move = {};
        move.index = availSpots[i];
        newBoard[availSpots[i]] = player;

        if (player === 'O') {
            const result = minimax(newBoard, 'X');
            move.score = result.score;
        } else {
            const result = minimax(newBoard, 'O');
            move.score = result.score;
        }

        newBoard[availSpots[i]] = '';
        moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function checkWinForMinimax(board, player) {
    const winningCombinations = getWinningCombinations(gridSize);
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === player)
    );
}
