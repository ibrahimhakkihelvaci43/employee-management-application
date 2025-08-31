import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LitReduxMixin } from '../../utils/litReduxMixin';
import { getTranslation } from '../../utils/translations';
import '../employee-card/employee-card';
import '../custom-pagination/custom-pagination';

interface EmployeeListAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'link' | 'icon' | 'edit' | 'delete';
  onClick: (item: any) => void;
}

interface EmployeeListData {
  items: any[];
  pageNumber?: number;
  totalPages?: number;
  totalCount?: number;
}

@customElement('employee-list')
export class EmployeeListComponent extends LitReduxMixin(LitElement) {
  @property({ type: Object }) rowData: EmployeeListData = { items: [] };
  @property({ type: Array }) actions: EmployeeListAction[] = [];
  @property({ type: Function }) handleChangePage?: (pageNumber: number) => void;

  createRenderRoot() {
    return this;
  }

  private renderEmployeeCard(employee: any) {
    return html`
      <employee-card
        .items="${[
          { label: getTranslation('firstName'), value: employee.firstName },
          { label: getTranslation('lastName'), value: employee.lastName },
          { label: getTranslation('email'), value: employee.email },
          { label: getTranslation('phone'), value: employee.phone },
          { label: getTranslation('department'), value: employee.department },
          { label: getTranslation('position'), value: employee.position },
          { label: getTranslation('dateOfEmployment'), value: employee.dateOfEmployment },
          { label: getTranslation('dateOfBirth'), value: employee.dateOfBirth }
        ]}"
        .actions="${this.actions.map(action => ({
          label: action.label,
          variant: action.variant,
          onClick: () => action.onClick(employee)
        }))}"
        .employeeId="${employee.id}"
      ></employee-card>
    `;
  }

  render() {
    return html`
      <div class="employee-list">
        <div class="employee-list__cards">
          ${this.rowData.items.map(employee => this.renderEmployeeCard(employee))}
        </div>
        
        <custom-pagination
          .currentPage="${this.rowData.pageNumber || 1}"
          .totalPages="${this.rowData.totalPages || 0}"
          .onPageChange="${this.handleChangePage}"
        ></custom-pagination>
      </div>
    `;
  }
}
