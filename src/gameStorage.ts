import { GameState } from "./types/gamestate.types";

/**
 * Manages the storage and retrieval of game state in local storage.
 */
export class GameStorage {
  private storageKey = "timon_game_state";

  saveGame(level: number, sequence: string[]): void {
    const currentState = this.loadGame();
    const highScore = Math.max(currentState?.highScore || 0, level);

    const gameState: GameState = {
      level,
      sequence,
      highScore,
      lastPlayed: new Date().toISOString(),
    };

    localStorage.setItem(this.storageKey, JSON.stringify(gameState));
  }

  /**
   * Loads the game state from local storage.
   * @returns {GameState | null} The loaded game state or null if no game state is found or an error occurs.
   */
  loadGame(): GameState | null {
    const savedData = localStorage.getItem(this.storageKey);
    if (!savedData) return null;

    try {
      return JSON.parse(savedData) as GameState;
    } catch (error) {
      console.error("Error loading game state:", error);
      return null;
    }
  }
  /**
   * Retrieves the high score from local storage.
   * @returns {number} The high score, or 0 if no high score is found.
   */

  getHighScore(): number {
    const savedData = this.loadGame();
    return savedData?.highScore || 0;
  }

  /**
   * Checks if there is a saved game in local storage.
   * A game is considered saved if there is data and the level is greater than 0.
   * @returns {boolean} True if a saved game exists, false otherwise.
   */
  hasSavedGame(): boolean {
    const savedData = this.loadGame();
    return savedData !== null && savedData.level > 0;
  }
  /**
   * Clears the saved game state from local storage.
   */
  clearGame(): void {
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Updates the high score if the provided level is higher than the current high score.
   * @param {number} level - The current game level to compare with the high score.
   */
  updateHighScore(level: number): void {
    const currentState = this.loadGame();
    if (currentState && level > currentState.highScore) {
      currentState.highScore = level;
      localStorage.setItem(this.storageKey, JSON.stringify(currentState));
    }
  }
  /**
   * Retrieves the last played date from local storage.
   * @returns {Date | null} The last played date or null if not found.
   */

  getLastPlayed(): Date | null {
    const savedData = this.loadGame();
    if (!savedData?.lastPlayed) return null;
    return new Date(savedData.lastPlayed);
  }
}
