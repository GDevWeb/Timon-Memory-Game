"use strict";
// DOM elements
const padGreen = document.querySelector(".pad.green");
const padRed = document.querySelector(".pad.red");
const padBlue = document.querySelector(".pad.blue");
const padYellow = document.querySelector(".pad.yellow");
const startButton = document.querySelector("#start-button");
const levelDisplay = document.querySelector(".level");
// Game variables
let sequence = [];
let playerSequence = [];
let level = 0;
let isStrict = false;
let turn = 0;
let maxLevel = 20;
// Sound files
const soundFiles = {
    green: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    red: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    blue: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    yellow: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
};
// Function to play sound
function playSound(color) {
    const audio = new Audio(soundFiles[color]);
    audio.play();
}
// Function to flash pad
function flashPad(pad) {
    pad.classList.add("active");
    setTimeout(() => {
        pad.classList.remove("active");
    }, 300);
}
// Function to generate random color
function getRandomColor() {
    const colors = ["green", "red", "blue", "yellow"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
// Function to start the game
function startGame() {
    sequence = [];
    playerSequence = [];
    level = 1; // Start at level 1
    if (levelDisplay) {
        levelDisplay.textContent = `Level: ${level}`;
    }
    turn = 0;
    if (startButton) {
        startButton.textContent = "Restart";
    }
    nextLevel();
}
// Function to advance to the next level
function nextLevel() {
    level++;
    // levelDisplay.textContent = `Level: ${level}`;
    if (levelDisplay) {
        levelDisplay.textContent = `Level: ${level}`;
    }
    playerSequence = [];
    const newColor = getRandomColor();
    sequence.push(newColor);
    playSequence();
}
// Function to play the sequence
function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        const color = sequence[i];
        const pad = document.querySelector(`.pad.${color}`);
        if (pad) {
            flashPad(pad);
        }
        playSound(color);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 800);
}
// Function to handle player input
function handlePadClick(event) {
    const clickedPad = event.target;
    const color = Array.from(clickedPad.classList).find((cls) => cls !== "pad"); // Get the color class
    if (!color)
        return; // Should not happen if event listener is only on color pads
    playerSequence.push(color);
    flashPad(clickedPad);
    playSound(color);
    checkPlayerSequence();
}
// Function to check player's sequence against the game sequence
function checkPlayerSequence() {
    const currentMove = playerSequence.length - 1;
    if (playerSequence[currentMove] !== sequence[currentMove]) {
        // Incorrect move
        if (isStrict) {
            alert("Game Over! Starting a new game.");
            startGame();
        }
        else {
            alert("Wrong move! Try again.");
            playerSequence = [];
            playSequence();
        }
        return;
    }
    if (playerSequence.length === sequence.length) {
        // Correct sequence for the level
        if (level === maxLevel) {
            alert("Congratulations! You won the game!");
            startGame();
            return;
        }
        setTimeout(() => {
            nextLevel();
        }, 1000);
    }
}
// Event Listeners
if (startButton) {
    startButton.addEventListener("click", startGame);
}
if (padGreen) {
    padGreen.addEventListener("click", handlePadClick);
}
if (padRed) {
    padRed.addEventListener("click", handlePadClick);
}
if (padBlue) {
    padBlue.addEventListener("click", handlePadClick);
}
if (padYellow) {
    padYellow.addEventListener("click", handlePadClick);
}
// 05.10 fixed audio sound
