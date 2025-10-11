/**
 * Manages the playing of sounds for the Simon game.
 */
export class SoundManager {
    constructor() {
        this.soundFiles = {
            green: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
            red: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
            blue: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
            yellow: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
        };
    }
    play(color) {
        const audio = new Audio(this.soundFiles[color]);
        audio.play();
    }
}
