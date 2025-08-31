import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface InputState {
  hasError: boolean;
} 

@customElement('input-component')
export class InputComponent extends LitElement {
  @property() label!: string;
  @property() value: string = '';
  @property() placeholder: string = '';
  @property({ type: Boolean }) required: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property() error: string = '';

  onChange?: (value: string) => void;

  @state() private state: InputState = {
    hasError: false
  };

  createRenderRoot() {
    return this;
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    
    this.state = { ...this.state, hasError: false };
    
    this.onChange?.(this.value);
    
    this.dispatchEvent(new CustomEvent('input-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private get inputClasses() {
    let classes = 'input__control';
    if (this.error || this.state.hasError) classes += ' input__control--error';
    if (this.disabled) classes += ' input__control--disabled';
    return classes;
  }

  private get labelClasses() {
    let classes = 'input__label';
    if (this.required) classes += ' input__label--required';
    if (this.error || this.state.hasError) classes += ' input__label--error';
    return classes;
  }

  render() {
    return html`
      <div class="input">
        <label class="${this.labelClasses}">
          ${this.label}
        </label>
        
        <div class="input__field">
          <input
            class="${this.inputClasses}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?required="${this.required}"
            ?disabled="${this.disabled}"
            @input="${this.handleInput}"
          />
        </div>

        ${this.error ? html`
          <div class="input__error-message">
            ${this.error}
          </div>
        ` : ''}
      </div>
    `;
  }
}
