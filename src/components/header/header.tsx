import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { usersIcon } from '../../assets/icons';
import { plusIcon } from '../../assets/icons';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  createRenderRoot() {
    return this;
  }

  private handleEmployeesClick() {
    console.log('handleEmployeesClick');
  }

  private handleAddNewClick() {
    console.log('handleAddNewClick');
  }

  private handleLanguageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    console.log('handleLanguageChange', select.value);
  }

  render() {
    const languageOptions = [
      { value: 'tr', label: '🇹🇷' },
      { value: 'en', label: '🇺🇸' }
    ];

    return html`
      <header class="header">
        <div class="header__logo">
          app log
        </div>

        <div class="header__actions">
          <button-component
            variant="link"
            text="Employees"
            .icon="${usersIcon}"
            @click="${this.handleEmployeesClick}"
          ></button-component>

          <button-component
            variant="link"
            text="Add New"
            .icon="${plusIcon}"
            @click="${this.handleAddNewClick}"
          ></button-component>

          <select-component
            .options="${languageOptions}"
            placeholder="🇹🇷"
            @change="${this.handleLanguageChange}"
          ></select-component>
        </div>
      </header>
    `;
  }
}
