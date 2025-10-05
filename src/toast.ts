import { ToastType } from "./types/toast.types";

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

/**
 * Manages and displays toast notifications.
 */
export class Toast {
  private container: HTMLDivElement;

  constructor() {
    this.container = this.createContainer();
    document.body.appendChild(this.container);
  }

  /**
   * Creates the main container element for toast notifications.
   * @returns {HTMLDivElement} The created container element.
   */
  private createContainer(): HTMLDivElement {
    const container = document.createElement("div");
    container.className = "toast-container";
    return container;
  }

  show(options: ToastOptions) {
    const { message, type = "info", duration = 3000 } = options;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Icon based on type
    const icon = this.getIcon(type);
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;

    this.container.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
      toast.classList.add("toast-show");
    }, 10);

    // Auto remove
    setTimeout(() => {
      toast.classList.remove("toast-show");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  }

  /**
   * Returns the appropriate icon for a given toast type.
   * @param {ToastType} type - The type of the toast notification.
   * @returns {string} The icon character for the specified toast type.
   */
  private getIcon(type: ToastType): string {
    const icons = {
      success: "✓",
      error: "✕",
      info: "ℹ",
      warning: "⚠",
    };
    return icons[type];
  }

  success(message: string, duration?: number) {
    this.show({ message, type: "success", duration });
  }

  error(message: string, duration?: number) {
    this.show({ message, type: "error", duration });
  }

  info(message: string, duration?: number) {
    this.show({ message, type: "info", duration });
  }

  warning(message: string, duration?: number) {
    this.show({ message, type: "warning", duration });
  }
}
