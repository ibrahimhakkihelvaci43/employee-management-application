import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { chevronDownIcon } from '../../assets/icons';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectState {
  isOpen: boolean;
  hasError: boolean;
}

@customElement('select-component')
export class SelectComponent extends LitElement {
  @property() label!: string;
  @property() value: string = '';
  @property() placeholder: string = '';
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: Boolean }) required: boolean = false;
  @property() error: string = '';

  onChange?: (value: string) => void;

  @state() private state: SelectState = {
    isOpen: false,
    hasError: false
  };

  createRenderRoot() {
    return this;
  }

  private toggleDropdown() {
    this.state = { ...this.state, isOpen: !this.state.isOpen };
  }

  private selectOption(option: SelectOption) {    
    this.value = option.value;
    this.state = { isOpen: false, hasError: false };
    
    this.onChange?.(this.value);
    
    this.dispatchEvent(new CustomEvent('select-change', {
      detail: { value: this.value, option },
      bubbles: true,
      composed: true
    }));
  }

  private handleClickOutside = (event: Event) => {
    const target = event.target as Element;
    if (!this.contains(target)) {
      this.state = { ...this.state, isOpen: false };
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleClickOutside);
  }

  private get selectClasses() {
    let classes = 'select__control';
    if (this.error || this.state.hasError) classes += ' select__control--error';
    if (this.state.isOpen) classes += ' select__control--open';
    return classes;
  }

  private get labelClasses() {
    let classes = 'select__label';
    if (this.required) classes += ' select__label--required';
    if (this.error || this.state.hasError) classes += ' select__label--error';
    return classes;
  }

  private get selectedOption() {
    return this.options.find(option => option.value === this.value);
  }

  render() {
    return html`
      <div class="select">
        <label class="${this.labelClasses}">
          ${this.label}
        </label>
        
        <div class="select__field">
          <div
            class="${this.selectClasses}"
            @click="${this.toggleDropdown}"
          >
            <span class="select__value">
              ${this.selectedOption ? html`${this.selectedOption.label}` : html`${this.placeholder}`}
            </span>
            <span class="select__arrow ${this.state.isOpen ? 'select__arrow--up' : ''}">
              ${chevronDownIcon}
            </span>
          </div>

          ${this.state.isOpen ? html`
            <div class="select__dropdown">
              ${this.options.map(option => html`
                <div
                  class="select__option ${option.value === this.value ? 'select__option--selected' : ''}"
                  @click="${() => this.selectOption(option)}"
                >
                  ${html`${option.label}`}
                </div>
              `)}
            </div>
          ` : ''}
        </div>

        ${this.error ? html`
          <div class="select__error-message">
            ${this.error}
          </div>
        ` : ''}
      </div>
    `;
  }
}
