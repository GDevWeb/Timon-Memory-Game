import { GameAnalytics } from "../utils/analytics";
import { DOMHelpers } from "../utils/domHelpers";

export class StatsModal {
  private modal: HTMLDivElement;
  private analytics: GameAnalytics;

  constructor(analytics: GameAnalytics) {
    this.analytics = analytics;
    this.modal = this.createModal();
    document.body.appendChild(this.modal);
  }

  private createModal(): HTMLDivElement {
    const modal = DOMHelpers.createElement("div", {
      classes: ["stats-modal", "hidden"],
    });

    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <h2>📊 Your Statistics</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value" id="games-played">0</span>
            <span class="stat-label">Games Played</span>
          </div>
          <div class="stat-item">
            <span class="stat-value" id="win-rate">0%</span>
            <span class="stat-label">Win Rate</span>
          </div>
          <div class="stat-item">
            <span class="stat-value" id="highest-level">0</span>
            <span class="stat-label">Highest Level</span>
          </div>
          <div class="stat-item">
            <span class="stat-value" id="avg-level">0</span>
            <span class="stat-label">Average Level</span>
          </div>
          <div class="stat-item">
            <span class="stat-value" id="avg-time">0s</span>
            <span class="stat-label">Avg. Game Time</span>
          </div>
        </div>
        <button class="reset-stats-btn">Reset Statistics</button>
      </div>
    `;

    // Event listeners
    const closeBtn = modal.querySelector(".modal-close");
    const overlay = modal.querySelector(".modal-overlay");
    const resetBtn = modal.querySelector(".reset-stats-btn");

    closeBtn?.addEventListener("click", () => this.hide());
    overlay?.addEventListener("click", () => this.hide());
    resetBtn?.addEventListener("click", () => this.resetStats());

    return modal;
  }

  show(): void {
    this.updateStats();
    this.modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  hide(): void {
    this.modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  private updateStats(): void {
    const stats = this.analytics.getStats();
    const winRate = this.analytics.getWinRate();
    const avgTime = this.analytics.getAverageGameTime();

    this.modal.querySelector("#games-played")!.textContent =
      stats.gamesPlayed.toString();
    this.modal.querySelector("#win-rate")!.textContent = `${winRate.toFixed(
      1
    )}%`;
    this.modal.querySelector("#highest-level")!.textContent =
      stats.highestLevel.toString();
    this.modal.querySelector("#avg-level")!.textContent =
      stats.averageLevel.toFixed(1);
    this.modal.querySelector("#avg-time")!.textContent = `${avgTime.toFixed(
      0
    )}s`;
  }

  private resetStats(): void {
    if (confirm("Are you sure you want to reset all statistics?")) {
      this.analytics.reset();
      this.updateStats();
    }
  }
}
