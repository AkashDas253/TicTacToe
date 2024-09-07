class MinimaxBot {
    constructor(board, playerSymbol, botSymbol, initialPlayer) {
        this.board = board;
        this.playerSymbol = playerSymbol;
        this.botSymbol = botSymbol;
        this.currentPlayer = initialPlayer;
        this.tree = null;

        this.loadTree().then(() => {
            console.log('Minimax tree loaded successfully.');
            this.runTests(); // Run tests after the tree is loaded
        }).catch(error => {
            console.error('Error loading minimax tree:', error);
        });
    }

    async loadTree() {
        try {
            const response = await fetch('data/minimaxTree_3.json'); // Adjust path if necessary
            if (!response.ok) throw new Error('Network response was not ok.');
            this.tree = await response.json();
        } catch (error) {
            console.error('Failed to load tree:', error);
            throw error;
        }
    }

    playerMove(playerMove) {
        if (this.board[playerMove] === '') {
            this.board[playerMove] = this.playerSymbol;
            this.currentPlayer = this.botSymbol; // Switch to bot's turn
            return true;
        }
        return false;
    }

    makeMove() {
        const bestMove = this.minimax(this.board, this.botSymbol);
        this.board[bestMove.index] = this.botSymbol;
        this.currentPlayer = this.playerSymbol; // Switch back to player's turn
        return bestMove.index;
    }

    minimax(newBoard, player) {
        const node = this.findNode(this.compressBoard(newBoard));
        if (!node) {
            console.error('Node not found in the Minimax tree.');
            return { index: -1 }; // Handle missing node case
        }

        const availSpots = this.emptyIndices(newBoard);
        if (availSpots.length === 0) {
            return { score: 0 }; // Tie
        }

        const moves = [];
        for (let i = 0; i < availSpots.length; i++) {
            const move = {};
            move.index = availSpots[i];
            newBoard[availSpots[i]] = player;

            if (player === this.botSymbol) {
                const result = this.minimax(newBoard, this.playerSymbol);
                move.score = result.score;
            } else {
                const result = this.minimax(newBoard, this.botSymbol);
                move.score = result.score;
            }

            newBoard[availSpots[i]] = '';
            moves.push(move);
        }

        let bestMove;
        if (player === this.botSymbol) {
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

    findNode(boardString) {
        const searchNode = (node) => {
            if (node.board === boardString) return node;
            for (const child of node.children) {
                const result = searchNode(child);
                if (result) return result;
            }
            return null;
        };
        return searchNode(this.tree);
    }

    emptyIndices(board) {
        return board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    }

    compressBoard(board) {
        return board.join('');
    }

    runTests() {
        console.log('Running tests...');

        const size = 3; // Change based on the size used
        const board = Array(size * size).fill('');
        const playerSymbol = 'X';
        const botSymbol = 'O';
        const initialPlayer = 'X';

        const bot = new MinimaxBot(board, playerSymbol, botSymbol, initialPlayer);

        // Wait until the tree is loaded
        setTimeout(() => {
            console.log('Initial Board:', board);
            const move = bot.makeMove();
            console.log('Bot move:', move);
            board[move] = botSymbol;
            console.log('Updated Board:', board);
        }, 1000);
    }
}

// Initialize MinimaxBot with a test case
const initialBoard = Array(9).fill('');
const minimaxBot = new MinimaxBot(initialBoard, 'X', 'O', 'X');
