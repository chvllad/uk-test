import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('uk-sidebar-item')
export class UkSidebarItem extends LitElement {
  // Цвет
  @property({ type: String }) color?: string = '#363C48';

  // Счетчик
  @property({ type: Number }) count?: number = undefined;

  // Заполнение цветом
  @property({ type: Boolean }) active?: boolean = false;

  static styles = css`
    .sidebar-item__button {
      --padding-x: 16px;
      --padding-y: 8px;

      width: 100%;
      background-color: #fff;
      line-height: 1;
      border: 1px solid var(--color);
      border-radius: 50px;
      text-transform: uppercase;
      text-align: left;
      padding: var(--padding-y) var(--padding-x);
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      transition:
        color var(--uk-animation-time) var(--uk-animation-fn),
        background-color var(--uk-animation-time) var(--uk-animation-fn),
        border-color var(--uk-animation-time) var(--uk-animation-fn),
        filter var(--uk-animation-time) var(--uk-animation-fn),
        opacity var(--uk-animation-time) var(--uk-animation-fn);
    }

    :host([active]) .sidebar-item__button {
      background-color: var(--color);
      color: #fff;
    }

    .sidebar-item__button:hover,
    .sidebar-item__button:focus {
      background-color: #fafaff;
    }
  `;

  #dispatchClick(e: PointerEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('click', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  // Обновляем свойство 'color' в компоненте при изменении
  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('color')) {
      this.style.setProperty('--color', this.color || null);
    }
  }

  render() {
    return html` <button
      class="sidebar-item__button"
      @click=${this.#dispatchClick}
    >
      <slot></slot>${this.count !== undefined ? `: ${this.count}` : ''}
    </button>`;
  }
}
