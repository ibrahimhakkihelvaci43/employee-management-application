import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LitReduxMixin } from '../../utils/litReduxMixin';
import { createEmployee } from '../../store/employee/employeeSlice';
import { navigateTo } from '../../router';

@customElement('create-employee')
export class CreateEmployee extends LitReduxMixin(LitElement) {
  createRenderRoot() {
    return this;
  }

  private handleEmployeeSubmit = (event: CustomEvent) => {
    const { values } = event.detail;
    console.log('Creating employee:', values);
    
    this.dispatch(createEmployee(values));
    
    console.log('Updated state:', this.store);
    
    navigateTo('/');
  };

  private handleEmployeeCancel = () => {
    console.log('Create employee cancelled');
    navigateTo('/');
  };

  render() {
    return html`
      <div class="create-employee">
        <page-title text="Create Employee"></page-title>
        
        <div class="create-employee__form">
          <employee-form
            @employee-submit="${this.handleEmployeeSubmit}"
            @employee-cancel="${this.handleEmployeeCancel}"
          ></employee-form>
        </div>
      </div>
    `;
  }
}
