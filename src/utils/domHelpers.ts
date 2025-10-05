export class DOMHelpers {
  /**
   * Safely selects a single HTML element from the DOM.
   * @template T - The expected type of the HTMLElement.
   * @param {string} selector - The CSS selector string.
   * @param {Document | HTMLElement} [parent=document] - The parent element to search within.
   * @returns {T | null} The first matching HTMLElement or null if not found.
   */
  static querySelector<T extends HTMLElement>(
    selector: string,
    parent: Document | HTMLElement = document
  ): T | null {
    return parent.querySelector<T>(selector);
  }

  /**
   * Safely selects multiple HTML elements from the DOM.
   * @template T - The expected type of the HTMLElements.
   * @param {string} selector - The CSS selector string.
   * @param {Document | HTMLElement} [parent=document] - The parent element to search within.
   * @returns {NodeListOf<T>} A NodeListOf matching HTMLElements (can be empty).
   */
  static querySelectorAll<T extends HTMLElement>(
    selector: string,
    parent: Document | HTMLElement = document
  ): NodeListOf<T> {
    return parent.querySelectorAll<T>(selector);
  }

  /**
   * Creates a new HTML element with optional classes, attributes, and text content.
   * @template K - The tag name of the element to create (e.g., 'div', 'button').
   * @param {K} tag - The HTML tag name.
   * @param {object} [options] - Optional configuration for the element.
   * @param {string[]} [options.classes] - An array of class names to add.
   * @param {Record<string, string>} [options.attributes] - An object of attribute key-value pairs.
   * @param {string} [options.textContent] - The text content for the element.
   * @returns {HTMLElementTagNameMap[K]} The newly created HTML element.
   */
  static createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    options?: {
      classes?: string[];
      attributes?: Record<string, string>;
      textContent?: string;
    }
  ): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);

    if (options?.classes) {
      element.classList.add(...options.classes);
    }

    if (options?.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    if (options?.textContent) {
      element.textContent = options.textContent;
    }

    return element;
  }
}
