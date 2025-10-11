export class GameAnalytics {
    constructor() {
        this.storageKey = "timon_analytics";
        this.startTime = 0;
    }
    startSession() {
        this.startTime = Date.now();
    }
    endSession(level, won) {
        const stats = this.getStats();
        const sessionTime = Date.now() - this.startTime;
        stats.gamesPlayed++;
        if (won)
            stats.gamesWon++;
        stats.highestLevel = Math.max(stats.highestLevel, level);
        stats.totalTime += sessionTime;
        stats.averageLevel =
            (stats.averageLevel * (stats.gamesPlayed - 1) + level) /
                stats.gamesPlayed;
        this.saveStats(stats);
    }
    getStats() {
        const saved = localStorage.getItem(this.storageKey);
        if (!saved) {
            return {
                gamesPlayed: 0,
                gamesWon: 0,
                highestLevel: 0,
                totalTime: 0,
                averageLevel: 0,
            };
        }
        return JSON.parse(saved);
    }
    saveStats(stats) {
        localStorage.setItem(this.storageKey, JSON.stringify(stats));
    }
    getWinRate() {
        const stats = this.getStats();
        if (stats.gamesPlayed === 0)
            return 0;
        return (stats.gamesWon / stats.gamesPlayed) * 100;
    }
    getAverageGameTime() {
        const stats = this.getStats();
        if (stats.gamesPlayed === 0)
            return 0;
        return stats.totalTime / stats.gamesPlayed / 1000;
    }
    reset() {
        localStorage.removeItem(this.storageKey);
    }
}
