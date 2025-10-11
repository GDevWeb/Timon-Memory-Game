import { StatsModal } from "./components/StatsModal";
import { SimonGame } from "./game";
import { GameStorage } from "./gameStorage";
import { Toast } from "./toast";
import { GameAnalytics } from "./utils/analytics";
import { DOMHelpers } from "./utils/domHelpers";
/**
 * Initializes the game by setting up elements, storage, analytics, and event listeners.
 * This is the entry point for the game application.
 */
function initializeGameElements() {
    const highScoreDisplay = DOMHelpers.createElement("div", {
        classes: ["high-score"],
    });
    document.querySelector("main")?.prepend(highScoreDisplay);
    return {
        padGreen: DOMHelpers.querySelector(".pad.green"),
        padRed: DOMHelpers.querySelector(".pad.red"),
        padBlue: DOMHelpers.querySelector(".pad.blue"),
        padYellow: DOMHelpers.querySelector(".pad.yellow"),
        startButton: DOMHelpers.querySelector("#start-button"),
        levelDisplay: DOMHelpers.querySelector(".level"),
        highScoreDisplay,
    };
}
function createStatsButton(statsModal) {
    const statsButton = DOMHelpers.createElement("button", {
        classes: ["stats-button"],
        attributes: {
            "aria-label": "View Statistics",
            title: "View your game statistics",
        },
        textContent: "📊",
    });
    statsButton.addEventListener("click", () => statsModal.show());
    document.body.appendChild(statsButton);
}
function setupKeyboardShortcuts(game, statsModal) {
    document.addEventListener("keydown", (event) => {
        switch (event.key.toLowerCase()) {
            case "s":
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    statsModal.show();
                }
                break;
            case "escape":
                statsModal.hide();
                break;
            case " ":
                event.preventDefault();
                const startButton = DOMHelpers.querySelector("#start-button");
                startButton?.click();
                break;
        }
    });
}
function showWelcomeMessage(analytics, toast) {
    const stats = analytics.getStats();
    if (stats.gamesPlayed === 0) {
        setTimeout(() => {
            toast.info("👋 Welcome to Timon! Press Start or Spacebar to begin.", 5000);
        }, 1000);
    }
}
function main() {
    const toast = new Toast();
    const gameStorage = new GameStorage();
    const analytics = new GameAnalytics();
    const elements = initializeGameElements();
    const statsModal = new StatsModal(analytics);
    const game = new SimonGame(elements, gameStorage, toast, {
        maxLevel: 20,
        sequenceDelay: 800,
        flashDuration: 300,
    });
    createStatsButton(statsModal);
    setupKeyboardShortcuts(game, statsModal);
    showWelcomeMessage(analytics, toast);
    if (import.meta.env.DEV) {
        window.__TIMON_DEBUG__ = {
            game,
            analytics,
            storage: gameStorage,
            toast,
            statsModal,
        };
        console.log("🎮 Debug mode enabled. Access game via window.__TIMON_DEBUG__");
    }
}
// Démarrer l'application quand le DOM est prêt
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
}
else {
    main();
}
