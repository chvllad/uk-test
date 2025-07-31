import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ButtonType } from './Button.ts';
import './Button.ts';

export const CLOSE_ICON = html`<svg
  width="10"
  height="10"
  viewBox="0 0 12 12"
  fill="none"
>
  <path
    d="M0.335203 0.335205C0.78214 -0.111735 1.50677 -0.111735 1.95371 0.335205L11.6647 10.0463C12.1117 10.4932 12.1117 11.2179 11.6647 11.6648C11.2178 12.1117 10.4932 12.1117 10.0462 11.6648L0.335203 1.95372C-0.111734 1.50678 -0.111734 0.782145 0.335203 0.335205Z"
    fill="currentColor"
  />
  <path
    d="M11.6648 0.335205C11.2179 -0.111735 10.4932 -0.111735 10.0463 0.335205L0.335283 10.0463C-0.111654 10.4932 -0.111654 11.2179 0.335283 11.6648C0.78222 12.1117 1.50685 12.1117 1.95379 11.6648L11.6648 1.95372C12.1117 1.50678 12.1117 0.782145 11.6648 0.335205Z"
    fill="currentColor"
  />
</svg> `;

@customElement('uk-close-button')
export class UkButton extends LitElement {
  /** Expand button's touch/click area by provided pixels. */
  @property({ type: Number }) touchMargin?: number = 0;

  static styles = css`
    :host {
      display: block;
    }

    .button {
      width: 24px;
      height: 24px;
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

  render() {
    return html`
      <uk-button
        class="button"
        .type=${ButtonType.Primary}
        .backgroundColor=${'black'}
        .small=${true}
        .touchMargin=${this.touchMargin}
        @press=${this.#dispatchPress}
        >${CLOSE_ICON}</uk-button
      >
    `;
  }
}
