import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('page-title')
export class PageTitle extends LitElement {
  @property({ type: String }) text = '';

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <h1 class="page-title">${this.text}</h1>
    `;
  }
}
