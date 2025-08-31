import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
export class EmployeeListComponent extends LitElement {
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
          { label: 'Ad', value: employee.firstName },
          { label: 'Soyad', value: employee.lastName },
          { label: 'Email', value: employee.email },
          { label: 'Telefon', value: employee.phone },
          { label: 'Departman', value: employee.department },
          { label: 'Pozisyon', value: employee.position },
          { label: 'İşe Başlama', value: employee.dateOfEmployment },
          { label: 'Doğum Tarihi', value: employee.dateOfBirth }
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
