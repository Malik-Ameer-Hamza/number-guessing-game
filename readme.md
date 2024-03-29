## Number Guessing Game

This is a simple command-line game that lets you guess a number between 1 and 10. The game is written in TypeScript and uses the inquirer and chalk packages for user input and output. The game also uses the node-banner package to display a banner at the start of the game.

## Installation

To install the game, you need to have Node.js and npm installed on your system. You can download them from their official websites.
 - To install the game from npm, run the following command:

```bash
npm install -g number_guess_game_proj
```


#### To install the game from GitHub, clone the repository and run the following commands:

```bash
 git clone https://github.com/Malik-Ameer-Hamza/number-guessing-game.git
 ```
 
 ```bash
 cd number-guessing-game
 ```

 ```bash
npm install
 ```


## Usage

To start the game, run the following command in your terminal:

```bash
npx ameer-number-guess-game
```

You will see a banner and a prompt to guess the number. You have 3 chances to guess the correct number. If you guess correctly, you win. If you guess wrong, you will get a hint whether your guess is too big or too small. If you run out of chances, you lose. You can also choose to play again after each round.