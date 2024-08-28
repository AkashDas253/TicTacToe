function alphaBetaBotMove() {
    const bestMove = alphaBeta(board, 0, -Infinity, Infinity, true);
    board[bestMove.index] = currentPlayer;
    document.querySelectorAll('.cell')[bestMove.index].textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function alphaBeta(newBoard, depth, alpha, beta, maximizingPlayer) {
    const availSpots = newBoard.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);

    // Check for terminal states (win/tie)
    if (checkWinForMinimax(newBoard, 'X')) return { score: -10 + depth };
    if (checkWinForMinimax(newBoard, 'O')) return { score: 10 - depth };
    if (availSpots.length === 0) return { score: 0 };

    if (maximizingPlayer) {
        let maxEval = -Infinity;
        let bestMove;
        for (let i = 0; i < availSpots.length; i++) {
            newBoard[availSpots[i]] = 'O';
            const eval = alphaBeta(newBoard, depth + 1, alpha, beta, false).score;
            newBoard[availSpots[i]] = '';
            if (eval > maxEval) {
                maxEval = eval;
                bestMove = availSpots[i];
            }
            alpha = Math.max(alpha, eval);
            if (beta <= alpha) break;
        }
        return { index: bestMove, score: maxEval };
    } else {
        let minEval = Infinity;
        let bestMove;
        for (let i = 0; i < availSpots.length; i++) {
            newBoard[availSpots[i]] = 'X';
            const eval = alphaBeta(newBoard, depth + 1, alpha, beta, true).score;
            newBoard[availSpots[i]] = '';
            if (eval < minEval) {
                minEval = eval;
                bestMove = availSpots[i];
            }
            beta = Math.min(beta, eval);
            if (beta <= alpha) break;
        }
        return { index: bestMove, score: minEval };
    }
}
