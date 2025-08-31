import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { usersIcon } from '../../assets/icons';
import { plusIcon } from '../../assets/icons';
import { navigateTo } from '../../router';
import { LitReduxMixin } from '../../utils/litReduxMixin';
import { setLanguage } from '../../store/employee/employeeSlice';
import { getTranslation } from '../../utils/translations';

@customElement('header-component')
export class HeaderComponent extends LitReduxMixin(LitElement) {
  createRenderRoot() {
    return this;
  }

  private handleEmployeesClick() {
    navigateTo('/');
  }

  private handleAddNewClick() {
    navigateTo('/create-employee');
  }

  private handleLanguageChange = (event: CustomEvent) => {
    const { value } = event.detail;
    this.dispatch(setLanguage(value as 'tr' | 'en'));
  }

  render() {
    const { language } = this.store.employee;
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
            text="${getTranslation('employees')}"
            .icon="${usersIcon}"
            @click="${this.handleEmployeesClick}"
          ></button-component>

          <button-component
            variant="link"
            text="${getTranslation('addNew')}"
            .icon="${plusIcon}"
            @click="${this.handleAddNewClick}"
          ></button-component>

          <select-component
            .options="${languageOptions}"
            .value="${language}"
            placeholder="🇹🇷"
            @select-change="${this.handleLanguageChange}"
          ></select-component>
        </div>
      </header>
    `;
  }
}
