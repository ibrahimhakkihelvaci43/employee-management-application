import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import * as Yup from 'yup';

@customElement('validation-form')
export class ValidationForm extends LitElement {
  @property({ type: Object }) initialValues = {};
  @property({ type: Object }) validationSchema: Yup.ObjectSchema<any> | null = null;
  @property({ type: Function }) onSubmit = (_values: any) => { };

  @state() private formValues: any = {};
  @state() private formErrors: any = {};
  @state() private touchedFields: any = {};

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <form @submit="${this.handleSubmit}">
        <slot></slot>
      </form>
    `;
  }

  firstUpdated() {
    this.formValues = { ...this.initialValues };
    this.setupInputListeners();
  }

  private setupInputListeners() {
    const inputs = this.querySelectorAll('input-component, select-component');

    inputs.forEach((input: any) => {
      const name = input.getAttribute('name');
      if (name) {
        input.value = this.formValues[name] || '';

        input.addEventListener('input-change', (e: any) => {
          this.formValues[name] = e.detail.value;
          this.validateField(name);
        });

        input.addEventListener('blur', () => {
          this.touchedFields[name] = true;
          this.validateField(name);
        });
      }
    });
  }

  private async validateField(fieldName: string) {
    if (!this.validationSchema) return;

    try {
      await (this.validationSchema as any).validateAt(fieldName, this.formValues);
      this.formErrors[fieldName] = '';
    } catch (error: any) {
      this.formErrors[fieldName] = error.message;
    }

    const input = this.querySelector(`[name="${fieldName}"]`) as any;
    if (input) {
      const isTouched = this.touchedFields[fieldName] === true;
      const errorMessage = this.formErrors[fieldName] && isTouched ? this.formErrors[fieldName] : '';
      input.error = errorMessage;
      input.requestUpdate();
    }
  }



  private async handleSubmit(e: Event) {
    e.preventDefault();

    const inputs = this.querySelectorAll('input-component, select-component');
    const currentValues: any = {};

    inputs.forEach((input: any) => {
      const name = input.getAttribute('name');
      if (name) {
        currentValues[name] = input.value || '';
      }
    });

    inputs.forEach((input: any) => {
      const name = input.getAttribute('name');
      if (name) {
        this.touchedFields[name] = true;
      }
    });

    if (this.validationSchema) {
      try {
        await (this.validationSchema as any).validate(currentValues, { abortEarly: false });
        this.formErrors = {};
      } catch (validationError: any) {
        const errors: any = {};
        if (validationError.inner) {
          validationError.inner.forEach((err: any) => {
            errors[err.path] = err.message;
          });
        }
        this.formErrors = errors;
      }
    }

    this.formValues = currentValues;


    inputs.forEach((input: any) => {
      const name = input.getAttribute('name');
      if (name) {
        const errorMessage = this.formErrors[name] || '';
        input.error = errorMessage;
        input.requestUpdate();
      }
    });

    const isValid = Object.keys(this.formErrors).length === 0;

    if (isValid) {
      this.onSubmit(currentValues);
    }

  }
}
