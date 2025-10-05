/**
 * Defines the configuration options for the Simon game.
 */
export interface GameConfig {
  maxLevel: number;
  sequenceDelay: number;
  flashDuration: number;
}

/**
 * Represents the possible colors in the Simon game.
 */
export type Color = "green" | "red" | "blue" | "yellow";

/**
 * Defines the structure for the HTML elements used in the Simon game.
 */
export interface GameElements {
  padGreen: HTMLElement | null;
  padRed: HTMLElement | null;
  padBlue: HTMLElement | null;
  padYellow: HTMLElement | null;
  startButton: HTMLButtonElement | null;
  levelDisplay: HTMLElement | null;
  highScoreDisplay: HTMLElement;
}
