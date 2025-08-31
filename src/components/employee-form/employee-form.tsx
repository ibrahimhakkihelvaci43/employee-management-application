import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Employee } from '../../store/employee/types';
import { employeeFormValidationSchema } from './employee-form.validations';
import { LitReduxMixin } from '../../utils/litReduxMixin';
import { getTranslation } from '../../utils/translations';

@customElement('employee-form')
export class EmployeeForm extends LitReduxMixin(LitElement) {
  @property({ type: Object }) employee?: Employee;

  createRenderRoot() {
    return this;
  }

  private get mode(): 'create' | 'edit' {
    return this.employee ? 'edit' : 'create';
  }

  private handleSubmit = (values: any) => {
    const submitEvent = new CustomEvent('employee-submit', {
      detail: { values, mode: this.mode },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(submitEvent);
  };

  private handleCancel = () => {
    const cancelEvent = new CustomEvent('employee-cancel', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(cancelEvent);
  };

  private handleFormSubmit = () => {
    const form = this.querySelector('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }
  };

  private getTranslatedPositionOptions() {
    return [
      { value: 'junior', label: getTranslation('junior') },
      { value: 'mid', label: getTranslation('midLevel') },
      { value: 'senior', label: getTranslation('senior') }
    ];
  }

  render() {
    const initialValues = {
      firstName: this.employee?.firstName || '',
      lastName: this.employee?.lastName || '',
      dateOfEmployment: this.employee?.dateOfEmployment || '',
      dateOfBirth: this.employee?.dateOfBirth || '',
      phone: this.employee?.phone || '',
      email: this.employee?.email || '',
      department: this.employee?.department || '',
      position: this.employee?.position || ''
    };

    return html`
      <div class="employee-form">
        <validation-form
          .initialValues="${initialValues}"
          .validationSchema="${employeeFormValidationSchema}"
          .onSubmit="${this.handleSubmit}"
        >
          <div class="employee-form__grid">
            <div class="employee-form__field">
              <label>${getTranslation('firstName')}</label>
              <input-component
                name="firstName"
                placeholder="${getTranslation('enterFirstName')}"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>${getTranslation('lastName')}</label>
              <input-component
                name="lastName"
                placeholder="${getTranslation('enterLastName')}"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>${getTranslation('dateOfEmployment')}</label>
              <input-component
                name="dateOfEmployment"
                type="date"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>${getTranslation('dateOfBirth')}</label>
              <input-component
                name="dateOfBirth"
                type="date"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>${getTranslation('phone')}</label>
              <input-component
                name="phone"
                placeholder="${getTranslation('enterPhone')}"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>${getTranslation('email')}</label>
              <input-component
                name="email"
                type="email"
                placeholder="${getTranslation('enterEmail')}"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>${getTranslation('department')}</label>
              <input-component
                name="department"
                placeholder="${getTranslation('enterDepartment')}"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>${getTranslation('position')}</label>
              <select-component
                name="position"
                .options="${this.getTranslatedPositionOptions()}"
                placeholder="${getTranslation('selectPosition')}"
                required
              ></select-component>
            </div>
          </div>

          <div class="employee-form__actions">
            <button-component
              type="submit"
              variant="primary"
              text="${getTranslation('save')}"
              @click="${this.handleFormSubmit}"
            ></button-component>
            
            <button-component
              type="button"
              variant="secondary"
              text="${getTranslation('cancel')}"
              @click="${this.handleCancel}"
            ></button-component>
          </div>
        </validation-form>
      </div>
    `;
  }
}
