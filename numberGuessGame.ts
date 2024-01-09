#! usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import showBanner from "node-banner";


interface GameOptions {
    userNumber?: number
}


let userAnswer = [{
    name: "userNumber",
    type: "number",
    validate: (input: number) => {
        if (isNaN(input)) {
            console.log(chalk.red("Enter a number between 1 to 10."))
        } else {
            return true;
        }
    },
    message: chalk.rgb(59,122,87)("Guess the number between 1 to 10: ")
}]


let userPlay = [{
    name: "playAgain",
    type: "confirm",
    message: chalk.cyan("Do you want to play again?")
}]


async function playRound(randomNumber: number): Promise<GameOptions> {
    let { userNumber } = await inquirer.prompt(userAnswer);

    if (userNumber === randomNumber) {
        console.log(`${chalk.rgb(0, 179, 30)(`Congragulations! You win`)}.`);
    } else if (userNumber === randomNumber - 1 || userNumber === randomNumber + 1) {
        console.log(` ${chalk.rgb(255, 127, 0)(`You were very close! `)} ${chalk.rgb(227, 38, 54)(`Try again.`)}`)
    } else {
        console.log(userNumber > randomNumber ? ` ${chalk.rgb(255, 127, 0)(`Too big!`)} ${chalk.rgb(227, 38, 54)(`Try again.`)}` : ` ${chalk.rgb(255, 127, 0)(`Too small!`)} ${chalk.rgb(227, 38, 54)(`Try again.`)}`)
    }

    return { userNumber }

}


async function startGame() {
    await showBanner("Number Guessing Game", chalk.rgb(255, 191, 0)("Guess the number generated by computer. You've 3 rounds to play. You can play again if you want."));

    let randomNumber = Math.floor(Math.random() * 10 + 1);

    let guessCount = 0;

    while (guessCount < 3) {

        try {
            await playRound(randomNumber);
            guessCount++;
        }
        catch (error) {
            console.log(`Error during gameplay. ${error}`)
        }
    }

    try {
        let { playAgain } = await inquirer.prompt(userPlay);

        if (playAgain) {
            startGame();
        } else {
            console.log(chalk.rgb(233, 30, 99)(`Thank you for playing the game. Hope you like it.`))
        }
    } catch (error) {
        console.log(`Error during play again ${error}`)
    }
}

startGame();