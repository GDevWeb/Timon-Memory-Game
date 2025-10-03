// DOM elements
const padGreen = document.querySelector(".pad.green") as HTMLElement;
const padRed = document.querySelector(".pad.red") as HTMLElement;
const padBlue = document.querySelector(".pad.blue") as HTMLElement;
const padYellow = document.querySelector(".pad.yellow") as HTMLElement;
const startButton = document.querySelector(
  "#start-button"
) as HTMLButtonElement;
const levelDisplay = document.querySelector(".level") as HTMLElement;

// Game variables
let sequence: string[] = [];
let playerSequence: string[] = [];
let level: number = 0;
let isStrict: boolean = false;
let turn: number = 0;
let maxLevel: number = 20;

// Sound files
const soundFiles: { [key: string]: string } = {
  green: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  red: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
  blue: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
  yellow: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
};

// Function to play sound
function playSound(color: string) {
  const audio = new Audio(soundFiles[color]);
  audio.play();
}

// Function to flash pad
function flashPad(pad: HTMLElement) {
  pad.classList.add("active");
  setTimeout(() => {
    pad.classList.remove("active");
  }, 300);
}
// Function to generate random color
function getRandomColor(): string {
  const colors = ["green", "red", "blue", "yellow"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Function to start the game
function startGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  turn = 0;
  levelDisplay.textContent = `Level: ${level}`;
  startButton.textContent = "Restart";
  nextLevel();
}

// Function to advance to the next level
function nextLevel() {
  level++;
  levelDisplay.textContent = `Level: ${level}`;
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
    const pad = document.querySelector(`.pad.${color}`) as HTMLElement;
    flashPad(pad);
    playSound(color);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
    }
  }, 800);
}

// Function to handle player input
function handlePadClick(event: Event) {
  const clickedPad = event.target as HTMLElement;
  const color = clickedPad.classList[1];

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
    } else {
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
startButton.addEventListener("click", startGame);
padGreen.addEventListener("click", handlePadClick);
padRed.addEventListener("click", handlePadClick);
padBlue.addEventListener("click", handlePadClick);
padYellow.addEventListener("click", handlePadClick);
