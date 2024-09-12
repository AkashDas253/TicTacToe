class Player {
    constructor(symbol, gameBoard) {
        this.symbol = symbol;
        this.gameBoard = gameBoard;
    }

    makeMove() {
        // This method is intentionally left blank
    }

    updateBoard(index, symbol) {
        this.gameBoard[index] = symbol;
    }
}

class HumanPlayer extends Player {
    makeMove(index) {
        if (this.gameBoard[index] === '') {
            return index;
        }
        return -1;
    }
}

class RandomBot extends Player {
    makeMove() {
        const emptyPositions = this.gameBoard.reduce((acc, val, idx) => val === '' ? acc.concat(idx) : acc, []);
        if (emptyPositions.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyPositions.length);
            return emptyPositions[randomIndex];
        }
        return -1;
    }
}



class MinimaxBot extends Player {
    constructor(symbol, gameBoard) {
        super(symbol, gameBoard);
        this.opponentSymbol = symbol === 'X' ? 'O' : 'X';
    }

    // Minimax algorithm to determine the best move
    makeMove() {
        const bestMove = this.minimax(this.gameBoard, this.symbol).index;
        return bestMove;
    }

    // Minimax algorithm implementation
    minimax(board, player) {
        const availableMoves = board.reduce((acc, val, idx) => val === '' ? acc.concat(idx) : acc, []);
        const winner = this.checkWinner(board);

        if (winner === this.symbol) return { score: 10 };
        if (winner === this.opponentSymbol) return { score: -10 };
        if (availableMoves.length === 0) return { score: 0 };

        const moves = [];
        
        for (let move of availableMoves) {
            const newBoard = board.slice();
            newBoard[move] = player;

            const result = this.minimax(newBoard, player === this.symbol ? this.opponentSymbol : this.symbol);
            moves.push({ index: move, score: result.score });
        }

        let bestMove;
        if (player === this.symbol) {
            let bestScore = -Infinity;
            for (const move of moves) {
                if (move.score > bestScore) {
                    bestScore = move.score;
                    bestMove = move.index;
                }
            }
        } else {
            let bestScore = Infinity;
            for (const move of moves) {
                if (move.score < bestScore) {
                    bestScore = move.score;
                    bestMove = move.index;
                }
            }
        }

        return { index: bestMove, score: bestScore };
    }

    // Check if there is a winner on the board
    checkWinner(board) {
        const winningCombinations = this.getWinningCombinations(Math.sqrt(board.length));

        for (const combination of winningCombinations) {
            if (combination.every(index => board[index] === this.symbol)) return this.symbol;
            if (combination.every(index => board[index] === this.opponentSymbol)) return this.opponentSymbol;
        }

        return null;
    }

    // Get the winning combinations
    getWinningCombinations(size) {
        const combinations = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            const column = [];
            for (let j = 0; j < size; j++) {
                row.push(i * size + j);
                column.push(i + j * size);
            }
            combinations.push(row, column);
        }

        const diagonal1 = [];
        const diagonal2 = [];
        for (let i = 0; i < size; i++) {
            diagonal1.push(i * size + i);
            diagonal2.push(i * size + (size - i - 1));
        }
        combinations.push(diagonal1, diagonal2);

        return combinations;
    }
}
