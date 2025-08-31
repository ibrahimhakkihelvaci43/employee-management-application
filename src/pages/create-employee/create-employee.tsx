import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('create-employee')
export class CreateEmployee extends LitElement {
  createRenderRoot() {
    return this;
  }

  private handleEmployeeSubmit = (event: CustomEvent) => {
    const { values } = event.detail;
    console.log('Creating employee:', values);
  };

  private handleEmployeeCancel = () => {
    console.log('Create employee cancelled');
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
