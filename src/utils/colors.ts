import { Color } from "../types/game";

/**
 * Generates a random color from the available Simon game colors.
 * @returns {Color} A randomly selected color ("green", "red", "blue", or "yellow").
 */
export function getRandomColor(): Color {
  const colors: Color[] = ["green", "red", "blue", "yellow"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

/**
 * Flashes a given HTML element by adding and removing an "active" class.
 * @param {HTMLElement} pad - The HTML element to be flashed.
 * @param {number} [duration=300] - The duration (in milliseconds) for which the "active" class will be applied.
 */
export function flashPad(pad: HTMLElement, duration: number = 300): void {
  pad.classList.add("active");
  setTimeout(() => {
    pad.classList.remove("active");
  }, duration);
}
