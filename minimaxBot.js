class MinimaxBot extends Player {
    constructor(symbol, gameBoard) {
        super(symbol, gameBoard);
        this.opponentSymbol = symbol === 'X' ? 'O' : 'X';
    }

    makeMove() {
        let bestMove = this.findBestMove();
        this.updateBoard(bestMove, this.symbol);
        return bestMove;
    }

    findBestMove() {
        let bestVal = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < this.gameBoard.length; i++) {
            if (this.gameBoard[i] === '') {
                this.gameBoard[i] = this.symbol;
                let moveVal = this.minimax(this.gameBoard, 0, false);
                this.gameBoard[i] = '';
                
                if (moveVal > bestVal) {
                    bestMove = i;
                    bestVal = moveVal;
                }
            }
        }
        return bestMove;
    }

    minimax(board, depth, isMaximizing) {
        let score = this.evaluate(board);

        if (score !== 0 || this.isFull(board)) {
            return score;
        }

        if (isMaximizing) {
            let best = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = this.symbol;
                    best = Math.max(best, this.minimax(board, depth + 1, false));
                    board[i] = '';
                }
            }
            return best;
        } else {
            let best = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = this.opponentSymbol;
                    best = Math.min(best, this.minimax(board, depth + 1, true));
                    board[i] = '';
                }
            }
            return best;
        }
    }

    evaluate(board) {
        // Winning patterns for a 3x3 board
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] === board[b] && board[b] === board[c]) {
                if (board[a] === this.symbol) return 10;
                else if (board[a] === this.opponentSymbol) return -10;
            }
        }
        return 0;
    }

    isFull(board) {
        return board.every(cell => cell !== '');
    }
}
