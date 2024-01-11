#! usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import showBanner from "node-banner";

let sleep = () => new Promise((r) => setTimeout(r, 2000));


async function displayBanner(): Promise<void> {
    await showBanner(
        "Number Guessing Game",
        "Guess the number generated by computer. You've max 5 rounds to play. You can play again if you want."
    );
    await sleep();
};


async function getGameSettings(): Promise<{ difficulty: string; userRound: number }> {
    let { difficulty } = await inquirer.prompt([{
        name: "difficulty",
        type: "list",
        choices: ["Easy", "Medium", "Difficult"],
        message: "Select difficulty level: ",
    }]);

    let { userRound } = await inquirer.prompt([{
        name: "userRound",
        type: "number",
        message: `How many rounds you want to play (Max 5): `,
        validate: (input) => {
            if (isNaN(input) || input < 1 || input > 5)
                return `Please input a number between 1 to 5`
            else
                return true;
        }
    }]);

    return { difficulty, userRound }
};



async function playRound(number_range: number, guessCount: number, correctAnswer: number): Promise<{ guessCount: number; correctAnswer: number }> {
    let { userNumber } = await inquirer.prompt([{
        name: "userNubmer",
        type: "number",
        validate: (input) => {
            if (isNaN(input)) {
                return `Please enter a number between 1 to ${number_range}`
            } else if (input < 1 || input > number_range) {
                return `Please enter a number between 1 and ${number_range}.`;
            } else {
                return true;
            }
        },
        message: `Guessed the number between 1 to ${number_range}: `,
    }]);

    let randomNumber = Math.floor(Math.random() * number_range + 1);

    let spinner = createSpinner("Guessing").start();
    await sleep();

    if (userNumber === randomNumber) {
        spinner.success({ text: chalk.greenBright(`congragulations! You win. 🎉`) });
        correctAnswer++;
    } else {
        spinner.error({ text: chalk.redBright(`Ooops! You Lose. ☹️`) });
    }

    return { guessCount: guessCount + 1, correctAnswer };
};



async function playAgain(): Promise<boolean> {
    let { playAgain } = await inquirer.prompt([{
        name: "playAgain",
        type: "confirm",
        message: `Do you want to play again? `
    }]);

    return playAgain;
};



async function startGame(): Promise<void> {
    await displayBanner();
    let { difficulty, userRound } = await getGameSettings();

    let number_range = difficulty === "Easy" ? 5 : difficulty === "Medium" ? 10 : 15;
    let initialGuessCount = 0;
    let initialCorrectAnswer = 0;


    while (initialGuessCount < userRound) {
        let { guessCount, correctAnswer } = await playRound(number_range, initialGuessCount, initialCorrectAnswer);
        initialGuessCount = guessCount;
        initialCorrectAnswer = correctAnswer;
    }

    console.log(`You've guessed ${initialCorrectAnswer} out of ${userRound}`);



    if (await playAgain()) {
        startGame();

    } else {
        console.log(`Thank you for playing the game.`)
    }

};


startGame();

