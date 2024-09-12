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


