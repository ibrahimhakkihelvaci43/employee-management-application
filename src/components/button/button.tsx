import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type ButtonVariant = 'primary' | 'secondary' | 'link' | 'icon' | 'edit' | 'delete';
type ButtonSize = 'sm' | 'md' | 'lg';

@customElement('button-component')
export class ButtonComponent extends LitElement {
  @property() variant: ButtonVariant = 'primary';
  @property() size: ButtonSize = 'md';
  @property() text: string = '';
  @property() icon?: string;
  @property() type: string = 'button';
  @property() iconColor?: string;

  onClick?: () => void;

  createRenderRoot() {
    return this;
  }

  private handleClick() {    
    this.onClick?.();
    
    this.dispatchEvent(new CustomEvent('button-click', {
      bubbles: true,
      composed: true
    }));
  }

  private get buttonClasses() {
    let classes = 'button';
    classes += ` button--${this.variant}`;
    classes += ` button--${this.size}`;
    if (this.icon && !this.text) classes += ' button--icon-only';
    return classes;
  }

  render() {
    return html`
      <button
        class="${this.buttonClasses}"
        type="${this.type}"
        @click="${this.handleClick}"
      > 
        ${this.icon ? html`
          <span class="button__icon" style="${this.iconColor ? `color: ${this.iconColor} !important;` : ''}">
            ${this.icon}
          </span>
        ` : ''}
        
        ${this.text && this.variant !== 'icon' ? html`
          <span class="button__text">
            ${this.text}
          </span>
        ` : ''}
      </button>
    `;
  }
}
