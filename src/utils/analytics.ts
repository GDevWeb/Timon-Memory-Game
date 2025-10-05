import { GameStats } from "../types/gamestats.types";

export class GameAnalytics {
  private storageKey = "timon_analytics";
  private startTime: number = 0;

  startSession(): void {
    this.startTime = Date.now();
  }

  endSession(level: number, won: boolean): void {
    const stats = this.getStats();
    const sessionTime = Date.now() - this.startTime;

    stats.gamesPlayed++;
    if (won) stats.gamesWon++;
    stats.highestLevel = Math.max(stats.highestLevel, level);
    stats.totalTime += sessionTime;
    stats.averageLevel =
      (stats.averageLevel * (stats.gamesPlayed - 1) + level) /
      stats.gamesPlayed;

    this.saveStats(stats);
  }

  getStats(): GameStats {
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

  private saveStats(stats: GameStats): void {
    localStorage.setItem(this.storageKey, JSON.stringify(stats));
  }

  getWinRate(): number {
    const stats = this.getStats();
    if (stats.gamesPlayed === 0) return 0;
    return (stats.gamesWon / stats.gamesPlayed) * 100;
  }

  getAverageGameTime(): number {
    const stats = this.getStats();
    if (stats.gamesPlayed === 0) return 0;
    return stats.totalTime / stats.gamesPlayed / 1000;
  }

  reset(): void {
    localStorage.removeItem(this.storageKey);
  }
}
