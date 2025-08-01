import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('uk-sidebar-menu')
export class UkSidebarMenu extends LitElement {
  /** Выравнивание */
  @property({ type: String }) alignment?: string;

  static styles = css`
    :host {
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
      overflow-y: auto;
    }
  `;

  render() {
    return html`
      <div
        class="sidebar-menu"
        style=${styleMap({
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: this.alignment !== 'right' ? 0 : 'unset',
          right: this.alignment === 'right' ? 0 : 'unset',
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}
