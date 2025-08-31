import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-shell')
export class AppShell extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="layout">
        <header-component></header-component>
        <main class="layout__content">
          <div id="router-outlet"></div>
        </main>   
      </div>
    `;
  }
}
