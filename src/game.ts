import { GameStorage } from "./gameStorage";
import { Toast } from "./toast";
import { GameConfig, GameElements } from "./types/game";
import { flashPad, getRandomColor } from "./utils/colors";
import { SoundManager } from "./utils/sounds";

/**
 * Represents the Simon Game logic and state.
 */
export class SimonGame {
  private sequence: string[] = [];
  private playerSequence: string[] = [];
  private level: number = 0;
  private isStrict: boolean = false;
  private config: GameConfig;
  private elements: GameElements;
  private storage: GameStorage;
  private toast: Toast;
  private soundManager: SoundManager;

  constructor(
    elements: GameElements,
    storage: GameStorage,
    toast: Toast,
    config: Partial<GameConfig> = {}
  ) {
    this.elements = elements;
    this.storage = storage;
    this.toast = toast;
    this.soundManager = new SoundManager();

    this.config = {
      maxLevel: config.maxLevel || 40,
      sequenceDelay: config.sequenceDelay || 800,
      flashDuration: config.flashDuration || 300,
    };

    this.init();
  }

  private init(): void {
    this.attachEventListeners();
    this.displayHighScore();
    this.checkSavedGame();
  }

  /**
   * Attaches event listeners to the game pads and the start button.
   * This method is called once during initialization to set up user interaction.
   */
  private attachEventListeners(): void {
    const { startButton, padGreen, padRed, padBlue, padYellow } = this.elements;

    if (startButton) {
      startButton.addEventListener("click", () => this.start());
    }

    const pads = [padGreen, padRed, padBlue, padYellow];
    pads.forEach((pad) => {
      if (pad) {
        pad.addEventListener("click", (e) => this.handlePadClick(e));
      }
    });
  }
  /**
   * Displays the high score retrieved from storage on the UI.
   * This method updates the text content of the `highScoreDisplay` element.
   */
  private displayHighScore(): void {
    const highScore = this.storage.getHighScore();
    if (this.elements.highScoreDisplay) {
      this.elements.highScoreDisplay.textContent = `🏆 Best: Level ${highScore}`;
    }
  }
  /**
   * Checks if there's a saved game in local storage and notifies the user if it's recent.
   * This method is called during initialization to provide a seamless user experience.
   */
  private checkSavedGame(): void {
    if (this.storage.hasSavedGame()) {
      const lastPlayed = this.storage.getLastPlayed();
      if (lastPlayed) {
        const timeSince = Date.now() - lastPlayed.getTime();
        const hoursSince = Math.floor(timeSince / (1000 * 60 * 60));

        if (hoursSince < 24) {
          this.toast.info(
            "You have a game in progress! Click Start to continue.",
            4000
          );
        }
      }
    }
  }

  /**
   * Starts a new game or resumes a saved game.
   * If a saved game exists, it prompts the user to continue.
   * Resets the game state if the user chooses not to continue or if no saved game exists.
   */
  start(): void {
    if (this.storage.hasSavedGame()) {
      const savedGame = this.storage.loadGame();
      if (savedGame && confirm("Continue your previous game?")) {
        this.sequence = savedGame.sequence;
        this.level = savedGame.level - 1;
        this.toast.info(`Resuming from Level ${savedGame.level}`, 2000);
      } else {
        this.resetGame();
      }
    } else {
      this.resetGame();
    }

    if (this.elements.startButton) {
      this.elements.startButton.textContent = "Restart";
    }

    this.nextLevel();
  }
  /**
   * Resets the game to its initial state, clearing the sequence, level, and player's sequence.
   * Also clears any saved game data from storage.
   */

  private resetGame(): void {
    this.sequence = [];
    this.level = 0;
    this.playerSequence = [];
    this.storage.clearGame();
  }

  /**
   * Advances the game to the next level.
   * Increments the level, clears the player's sequence, adds a new random color to the game sequence,
   * saves the game state, updates the high score, and then plays the new sequence.
   */
  private nextLevel(): void {
    this.level++;

    if (this.elements.levelDisplay) {
      this.elements.levelDisplay.textContent = `Level: ${this.level}`;
    }

    this.playerSequence = [];
    const newColor = getRandomColor();
    this.sequence.push(newColor);

    this.storage.saveGame(this.level, this.sequence);
    this.storage.updateHighScore(this.level);
    this.displayHighScore();

    this.playSequence();
  }
  /**
   * Plays the current sequence of colors to the player.
   * Each color in the sequence is flashed and its corresponding sound is played.
   * The sequence playback is controlled by `sequenceDelay`.
   */

  private playSequence(): void {
    let i = 0;
    const interval = setInterval(() => {
      const color = this.sequence[i];
      const pad = document.querySelector(`.pad.${color}`) as HTMLElement;

      if (pad) {
        flashPad(pad, this.config.flashDuration);
      }

      this.soundManager.play(color);
      i++;

      if (i >= this.sequence.length) {
        clearInterval(interval);
      }
    }, this.config.sequenceDelay);
  }

  /**
   * Handles a click event on a game pad.
   * Records the player's move, flashes the pad, plays a sound, and checks the player's sequence.
   * @param {Event} event - The click event object.
   */
  private handlePadClick(event: Event): void {
    const clickedPad = event.target as HTMLElement;
    const color = Array.from(clickedPad.classList).find((cls) => cls !== "pad");

    if (!color) return;

    this.playerSequence.push(color);
    flashPad(clickedPad, this.config.flashDuration);
    this.soundManager.play(color);

    this.checkPlayerSequence();
  }
  /**
   * Checks the player's current move against the game sequence.
   * If the move is incorrect, `handleWrongMove` is called.
   * If the player completes the sequence for the current level, `handleCorrectSequence` is called.
   */

  private checkPlayerSequence(): void {
    const currentMove = this.playerSequence.length - 1;

    if (this.playerSequence[currentMove] !== this.sequence[currentMove]) {
      this.handleWrongMove();
      return;
    }

    if (this.playerSequence.length === this.sequence.length) {
      this.handleCorrectSequence();
    }
  }

  /**
   * Handles an incorrect move made by the player.
   * If strict mode is enabled, the game resets. Otherwise, the player is prompted to try again,
   * and the sequence is replayed.
   */
  private handleWrongMove(): void {
    if (this.isStrict) {
      this.toast.error("Game Over! Starting a new game.", 3000);
      this.storage.clearGame();
      setTimeout(() => this.start(), 3000);
    } else {
      this.toast.warning("Wrong move! Try again.", 2000);
      this.playerSequence = [];
      setTimeout(() => this.playSequence(), 2000);
    }
  }
  /**
   * Handles a correct sequence entry by the player.
   * If the current level is the maximum level, the player wins the game.
   * Otherwise, the game advances to the next level after a short delay.
   */

  private handleCorrectSequence(): void {
    if (this.level === this.config.maxLevel) {
      this.toast.success("🎉 Congratulations! You won the game!", 4000);
      this.storage.clearGame();
      setTimeout(() => this.start(), 4000);
      return;
    }

    this.toast.success(`Level ${this.level} completed!`, 1000);
    setTimeout(() => this.nextLevel(), 1000);
  }

  // Public APIs
  /**
   * Sets the strict mode for the game.
   * In strict mode, any incorrect move ends the game.
   * @param {boolean} isStrict - True to enable strict mode, false to disable.
   */

  public setStrictMode(isStrict: boolean): void {
    this.isStrict = isStrict;
  }

  public getCurrentLevel(): number {
    return this.level;
  }

  public getSequenceLength(): number {
    return this.sequence.length;
  }
}
