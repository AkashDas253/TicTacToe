# Tic-Tac-Toe Game

## Overview

This is a web-based Tic-Tac-Toe game with various bots implemented using different algorithms. The game supports playing against both bots and another player. The available bots include:

- **Easy Bot**: A simple bot with basic move selection.
- **Minimax Bot**: An AI bot using the Minimax algorithm for optimal moves.
- **Alpha-Beta Bot**: An optimized version of Minimax with Alpha-Beta pruning.

## Features

- **Dynamic Board Size**: Supports different grid sizes (e.g., 3x3, 5x5).
- **Multiple Game Modes**: Play against a bot or another player.
- **Bot Selection**: Choose between different types of bots.
- **First Player Selection**: Choose whether the player or the bot goes first.

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, etc.)
- [Node.js](https://nodejs.org/) (for running the Minimax tree generator and tests)

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/tic-tac-toe.git
    cd tic-tac-toe
    ```

2. **Install dependencies:**

    No dependencies are required for running the front-end. For generating the Minimax tree, you will need Node.js.

3. **Generate Minimax Tree:**

    Navigate to the directory where `minimaxTreeGenerator.js` is located and run:

    ```bash
    node minimaxTreeGenerator.js
    ```

    This will generate a file named `minimaxTree_3.json` with the Minimax tree for a 3x3 board.

4. **Open the Game:**

    Open `index.html` in a web browser to play the game.

## Usage

1. **Configure Game:**
    - Select grid size.
    - Choose game type (1v1 or 1vBot).
    - Select bot type (if playing against a bot).
    - Choose the first player.

2. **Start Game:**
    - Click the "Start Game" button to initialize the game board.

3. **Play:**
    - Click on the cells to make a move.
    - If playing against a bot, the bot will make a move automatically.

4. **Reset Game:**
    - Click the "Reset Game" button to start a new game with the same configuration.

5. **New Game:**
    - Click the "New Game" button to return to the configuration screen and set up a new game.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**

    ```bash
    git checkout -b feature/your-feature
    ```

3. **Commit your changes:**

    ```bash
    git commit -am 'Add some feature'
    ```

4. **Push to the branch:**

    ```bash
    git push origin feature/your-feature
    ```

5. **Create a new Pull Request.**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Minimax Algorithm](https://en.wikipedia.org/wiki/Minimax)
- [Alpha-Beta Pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning)
- [Open Source Libraries](https://opensource.com/resources)

