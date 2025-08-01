import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('uk-sidebar-item')
export class UkSidebarItem extends LitElement {
  // Цвет
  @property({ type: String }) color?: string;

  // Счетчик
  @property({ type: Number }) count?: number;

  // Заполнение цветом
  @property({ type: Boolean }) active?: boolean = false;

  static styles = css`
    .sidebar-item__button {
      --color: currentColor;

      width: 100%;
      background-color: var(--uk-background-item);
      line-height: 1;
      border: 1px solid var(--color);
      border-radius: 50px;
      text-transform: uppercase;
      text-align: left;
      padding: 8px 16px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      transition: opacity var(--uk-animation-time) var(--uk-animation-fn);
      display: flex;
    }

    .sidebar-item__content {
      text-overflow: ellipsis;
      overflow: hidden;
      display: block;
      white-space: nowrap;
    }

    .sidebar-item__counter {
      white-space: nowrap;
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

  render() {
    return html` <button
      class="sidebar-item__button"
      style=${styleMap({ '--color': this.color ?? 'currentColor' })}
      @click=${this.#dispatchClick}
    >
      <span class="sidebar-item__content"><slot></slot></span>
      <span class="sidebar-item__counter">
        ${this.count !== undefined ? `: ${this.count}` : ''}
      </span>
    </button>`;
  }
}
