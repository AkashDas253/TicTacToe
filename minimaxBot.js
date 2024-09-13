class MinimaxBot extends Player {
    constructor(symbol, gameBoard, winLength) {
        super(symbol, gameBoard);
        this.opponentSymbol = symbol === 'X' ? 'O' : 'X';
        this.boardSize = Math.sqrt(gameBoard.length); // Calculate board size dynamically
        this.winLength = winLength; // Define how many symbols in a row are needed to win
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
        const winPatterns = this.generateWinPatterns();

        for (let pattern of winPatterns) {
            let firstSymbol = board[pattern[0]];
            if (firstSymbol === '') continue;
            let won = pattern.every(index => board[index] === firstSymbol);
            if (won) {
                if (firstSymbol === this.symbol) return 10;
                else if (firstSymbol === this.opponentSymbol) return -10;
            }
        }
        return 0;
    }

    isFull(board) {
        return board.every(cell => cell !== '');
    }

    generateWinPatterns() {
        let patterns = [];

        // Rows
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col <= this.boardSize - this.winLength; col++) {
                let pattern = [];
                for (let i = 0; i < this.winLength; i++) {
                    pattern.push(row * this.boardSize + col + i);
                }
                patterns.push(pattern);
            }
        }

        // Columns
        for (let col = 0; col < this.boardSize; col++) {
            for (let row = 0; row <= this.boardSize - this.winLength; row++) {
                let pattern = [];
                for (let i = 0; i < this.winLength; i++) {
                    pattern.push((row + i) * this.boardSize + col);
                }
                patterns.push(pattern);
            }
        }

        // Diagonals (top-left to bottom-right)
        for (let row = 0; row <= this.boardSize - this.winLength; row++) {
            for (let col = 0; col <= this.boardSize - this.winLength; col++) {
                let pattern = [];
                for (let i = 0; i < this.winLength; i++) {
                    pattern.push((row + i) * this.boardSize + col + i);
                }
                patterns.push(pattern);
            }
        }

        // Diagonals (bottom-left to top-right)
        for (let row = this.winLength - 1; row < this.boardSize; row++) {
            for (let col = 0; col <= this.boardSize - this.winLength; col++) {
                let pattern = [];
                for (let i = 0; i < this.winLength; i++) {
                    pattern.push((row - i) * this.boardSize + col + i);
                }
                patterns.push(pattern);
            }
        }

        return patterns;
    }
}
