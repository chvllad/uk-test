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

@customElement('uk-button')
export class UkButton extends LitElement {
  /** Button visual type */
  @property({ type: Number }) type?: ButtonType;

  /** What background color to use */
  @property({ type: String }) backgroundColor?:
    | 'accent'
    | 'orange'
    | 'blue'
    | 'green'
    | 'black'
    | 'red';

  /** Is button small? */
  @property({ type: Boolean }) small?: boolean = false;

  /** Is button disabled? */
  @property({ type: Boolean }) disabled?: boolean = false;

  /** Is button border dashed (ignored for primary buttons? */
  @property({ type: Boolean }) dashed?: boolean = false;

  /** Expand button's touch/click area by provided pixels. */
  @property({ type: Number }) touchMargin?: number = 0;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: max(32px, 100%);
    }

    button {
      --border-size: 1px;
      --border-style: solid;
      display: grid;
      grid-template-rows: 1fr;
      grid-auto-columns: minmax(0, auto);
      grid-auto-flow: column;
      gap: 6px;
      align-items: center;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
      margin: 0;
      padding: calc(5px + var(--border-size));
      height: max(32px, 100%);
      min-width: min-content;
      width: 100%;
      background: none;
      border: 1px var(--border-style) var(--bg-color);
      border-radius: 3px;
      cursor: pointer;
      vertical-align: middle;
      color: var(--color);
      font-size: 14px;
      line-height: 16px;
      font-weight: 500;
      transition:
        color var(--uk-animation-time) var(--uk-animation-fn),
        background-color var(--uk-animation-time) var(--uk-animation-fn),
        border-color var(--uk-animation-time) var(--uk-animation-fn),
        filter var(--uk-animation-time) var(--uk-animation-fn),
        opacity var(--uk-animation-time) var(--uk-animation-fn);
      width: inherit;
    }

    button:hover {
      filter: brightness(1.2);
      opacity: 0.8;
    }
    button:disabled {
      opacity: 0.5;
      pointer-events: none;
      cursor: unset;
    }
    .primary {
      background-color: var(--bg-color);
    }
    .ternary {
      --border-size: 0px;
      border: none;
      border-radius: 0;
    }
    .underline-slot {
      display: block;
      border-bottom: 1px var(--border-style) currentColor;
    }
    .dashed {
      --border-style: dashed;
    }
    .touch-margin::before {
      content: '';
      position: absolute;
      top: var(--touch-margin);
      left: var(--touch-margin);
      bottom: var(--touch-margin);
      right: var(--touch-margin);
    }
    .small {
      height: max(24px, 100%);
      line-height: 10px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2%;
      text-transform: uppercase;
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
    const backgroundColor = this.backgroundColor ?? 'accent';
    const isPrimary = this.type === ButtonType.Primary;
    return html`
      <button
        type="button"
        class=${classMap({
          primary: isPrimary,
          ternary: this.type === ButtonType.Ternary,
          dashed: !!this.dashed,
          small: !!this.small,
          'touch-margin': !!this.touchMargin,
        })}
        .disabled=${!!this.disabled}
        @click=${this.#dispatchPress}
        style=${styleMap({
          color: isPrimary ? `var(--uk-button-fg)` : 'inherit',
          '--bg-color': `var(--uk-${backgroundColor})`,
          '--touch-margin': this.touchMargin
            ? `-${this.touchMargin}px`
            : undefined,
        })}
      >
        <slot
          class=${this.type === ButtonType.Ternary ? 'underline-slot' : ''}
        ></slot>
      </button>
    `;
  }
}
