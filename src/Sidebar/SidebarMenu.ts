import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('uk-sidebar-menu')
export class UkSidebarMenu extends LitElement {
  /** Выравнивание */
  @property({ type: String }) alignment: string = 'left';

  static styles = css`
    :host {
      float: var(--alignment, left);
      display: block;
      background-color: #fff;
    }

    .sidebar-menu {
      --padding-x: 20px;

      display: flex;
      flex-direction: column;
      row-gap: 24px;
      padding: 24px 20px;
      width: calc(320px - (var(--padding-x) * 2));
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

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('alignment')) {
      this.style.setProperty('--alignment', this.alignment);
    }
  }

  render() {
    return html`
      <div class="sidebar-menu">
        <slot></slot>
      </div>
    `;
  }
}
