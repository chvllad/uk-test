import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export enum ButtonType {
  /** Interface expects user to use this button. */
  Primary = 0,
  Secondary = 1,
  Ternary = 2,
}

@customElement('uk-sidebar-group')
export class UkSidebarGroup extends LitElement {
  /** Открыт/закрыт */
  @property({ type: Boolean, reflect: true }) open?: boolean = false;

  /** Заголовок группы */
  @property({ type: String }) header?: string = '';

  static styles = css`
    .sidebar-group__items {
      flex-direction: column;
      padding-top: 24px;
      row-gap: 10px;
      opacity: 0;
      transition:
        transform 0.2s ease,
        opacity 0.3s ease;
      overflow: hidden;
      visibility: hidden;
      pointer-events: none;
      transform: translateY(-20px);
      position: absolute;
    }

    :host([open]) .sidebar-group__items {
      display: flex;
      position: relative;
      opacity: 1;
      visibility: visible;
      pointer-events: all;
      transform: translateY(0);
    }

    .sidebar-group__button {
      text-transform: uppercase;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      width: 100%;
      background-color: transparent;
      appearance: none;
      border: none;
      padding: 0;
      cursor: pointer;
      transition:
        color var(--uk-animation-time) var(--uk-animation-fn),
        background-color var(--uk-animation-time) var(--uk-animation-fn),
        border-color var(--uk-animation-time) var(--uk-animation-fn),
        filter var(--uk-animation-time) var(--uk-animation-fn),
        opacity var(--uk-animation-time) var(--uk-animation-fn);
    }

    .sidebar-group__button:hover {
      opacity: 0.6;
    }
  `;

  #dispatchPress(e: PointerEvent) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('press', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  toggle() {
    this.open = !this.open;
  }

  render() {
    const EXPANDED_ICON = html`<svg
      width="14"
      height="2"
      fill="none"
      viewBox="0 0 14 2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L7 0.999999L13 0.999998"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>`;

    const COLLAPSED_ICON = html`<svg
      width="14"
      height="9"
      viewBox="0 0 14 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L7 7L13 0.999998"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>`;

    return html`
      <div class="sidebar-group">
        <button @click="${this.toggle}" class="sidebar-group__button">
          ${this.header} ${this.open ? EXPANDED_ICON : COLLAPSED_ICON}
        </button>
        <div class="sidebar-group__items">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
