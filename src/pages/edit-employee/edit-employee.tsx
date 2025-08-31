import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LitReduxMixin } from '../../utils/litReduxMixin';
import { editEmployee } from '../../store/employee/employeeSlice';
import { navigateTo } from '../../router';
import './edit-employee.styles.scss';

@customElement('edit-employee')
export class EditEmployee extends LitReduxMixin(LitElement) {
  @property() employeeId: string = '';

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    const urlParts = window.location.pathname.split('/');
    if (urlParts[1] === 'edit-employee' && urlParts[2]) {
      this.employeeId = urlParts[2];
    }
  }

  private get employee() {
    return this.store.employee.employees.find(emp => emp.id === this.employeeId);
  }

  private handleEmployeeSubmit = (event: CustomEvent) => {
    const { values } = event.detail;    
    this.dispatch(editEmployee({
      ...values,
      id: this.employeeId
    }));    
    navigateTo('/');
  };

  private handleEmployeeCancel = () => {
    navigateTo('/');
  };
  
  render() {
    return html`
      <div class="edit-employee">
        <page-title text="Edit Employee"></page-title>
        
        <div class="edit-employee__form">
          <employee-form
            .employee="${this.employee}"
            @employee-submit="${this.handleEmployeeSubmit}"
            @employee-cancel="${this.handleEmployeeCancel}"
          ></employee-form>
        </div>
      </div>
    `;
  }
}
