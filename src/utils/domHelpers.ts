export class DOMHelpers {
  static querySelector<T extends HTMLElement>(
    selector: string,
    parent: Document | HTMLElement = document
  ): T | null {
    return parent.querySelector<T>(selector);
  }

  static querySelectorAll<T extends HTMLElement>(
    selector: string,
    parent: Document | HTMLElement = document
  ): NodeListOf<T> {
    return parent.querySelectorAll<T>(selector);
  }

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
