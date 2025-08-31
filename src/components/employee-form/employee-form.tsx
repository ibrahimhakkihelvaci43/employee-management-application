import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Employee } from '../../store/employee/types';
import { employeeFormValidationSchema, positionOptions } from './employee-form.validations';

@customElement('employee-form')
export class EmployeeForm extends LitElement {
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
              <label>First Name</label>
              <input-component
                name="firstName"
                placeholder="Enter first name"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>Last Name</label>
              <input-component
                name="lastName"
                placeholder="Enter last name"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>Date of Employment</label>
              <input-component
                name="dateOfEmployment"
                type="date"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>Date of Birth</label>
              <input-component
                name="dateOfBirth"
                type="date"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>Phone</label>
              <input-component
                name="phone"
                placeholder="Enter phone number"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>Email</label>
              <input-component
                name="email"
                type="email"
                placeholder="Enter email address"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>Department</label>
              <input-component
                name="department"
                placeholder="Enter department"
                required
              ></input-component>
            </div>

            <div class="employee-form__field">
              <label>Position</label>
              <select-component
                name="position"
                .options="${positionOptions}"
                placeholder="Select position level"
                required
              ></select-component>
            </div>
          </div>

          <div class="employee-form__actions">
            <button-component
              type="submit"
              variant="primary"
              text="${this.mode === 'create' ? 'Save' : 'Save'}"
              @click="${this.handleFormSubmit}"
            ></button-component>
            
            <button-component
              type="button"
              variant="secondary"
              text="Cancel"
              @click="${this.handleCancel}"
            ></button-component>
          </div>
        </validation-form>
      </div>
    `;
  }
}
