import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('home-page')
export class HomePage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="home-page">
        <h1 class="home-page__greeting">Selam! </h1>
      </div>
    `;
  }
}
