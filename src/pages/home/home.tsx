import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LitReduxMixin } from '../../utils/litReduxMixin';
import { setCurrentPage, deleteEmployee, deleteMultipleEmployees } from '../../store/employee/employeeSlice';
import { editIcon, trashIcon, gridIcon, listIcon } from '../../assets/icons';

@customElement('home-page')
export class HomePage extends LitReduxMixin(LitElement) {
  createRenderRoot() {
    return this;
  }

  private handlePageChange = (pageNumber: number) => {
    this.dispatch(setCurrentPage(pageNumber));
  }

  private handleEditEmployee = (employee: any) => {
    console.log('Edit employee:', employee);
  }

  private selectedItems: any[] = [];
  private viewMode: 'table' | 'list' = 'table';

  private handleDeleteEmployee = (employee: any) => {
    if (this.selectedItems.length > 1) {
      const selectedIds = this.selectedItems.map(item => item.id);
      if (confirm(`Seçilen ${selectedIds.length} çalışanı silmek istediğinizden emin misiniz?`)) {
        this.dispatch(deleteMultipleEmployees(selectedIds));
        this.selectedItems = []; 
      }
    } else {
      if (confirm(`${employee.firstName} ${employee.lastName} adlı çalışanı silmek istediğinizden emin misiniz?`)) {
        this.dispatch(deleteEmployee(employee.id));
      }
    }
  }

  private handleSelectionChange = (selectedItems: any[]) => {
    this.selectedItems = selectedItems;
  }

  private handleViewModeChange = (mode: 'table' | 'list') => {
    this.viewMode = mode;
    this.requestUpdate();
  }

  render() {
    const { employees, currentPage, pageSize, totalCount } = this.store.employee;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedEmployees = employees.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalCount / pageSize);
    
    const columns = [
      { key: 'firstName', label: 'Ad' },
      { key: 'lastName', label: 'Soyad' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Telefon' },
      { key: 'department', label: 'Departman' },
      { key: 'position', label: 'Pozisyon' },
      { key: 'dateOfEmployment', label: 'İşe Başlama' },
      { key: 'dateOfBirth', label: 'Doğum Tarihi' }
    ];

    const actions = [
      {
        label: editIcon,
        variant: 'icon' as const,
        onClick: this.handleEditEmployee
      },
      {
        label: trashIcon,
        variant: 'icon' as const,
        onClick: this.handleDeleteEmployee
      }
    ];

    return html`
      <div class="home-page">
        <div class="home-page__header">
          <page-title text="Employee List"></page-title>
          
          <div class="home-page__view-toggle">
            <button-component
              variant="icon"
              .icon="${gridIcon}"
              size="md"
              iconColor="#ff6b35"
              @click="${() => this.handleViewModeChange('table')}"
              class="${this.viewMode === 'table' ? 'active' : ''}"
            ></button-component>
            
            <button-component
              variant="icon"
              .icon="${listIcon}"
              size="md"
              iconColor="#ff6b35"
              @click="${() => this.handleViewModeChange('list')}"
              class="${this.viewMode === 'list' ? 'active' : ''}"
            ></button-component>
          </div>
        </div>
        
${employees.length === 0 ? html`
          <div class="home-page__empty">
            <div class="empty-state">
              <div class="empty-state__title">Çalışan bulunmuyor</div>
            </div>
          </div>
        ` : this.viewMode === 'table' ? html`
          <div class="home-page__table">
            <reusable-table
              .columns="${columns}"
              .rowData="${{
                items: paginatedEmployees,
                pageNumber: currentPage,
                totalPages: totalPages,
                totalCount: totalCount
              }}"
              .actions="${actions}"
              .handleChangePage="${this.handlePageChange}"
              .onSelectionChange="${this.handleSelectionChange}"
            ></reusable-table>
          </div>
        ` : html`
          <div class="home-page__cards">
            ${paginatedEmployees.map(employee => html`
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
                .actions="${[
                  {
                    label: editIcon,
                    variant: 'edit',
                    onClick: () => this.handleEditEmployee(employee)
                  },
                  {
                    label: trashIcon,
                    variant: 'delete',
                    onClick: () => this.handleDeleteEmployee(employee)
                  }
                ]}"
                .employeeId="${employee.id}"
              ></employee-card>
            `)}
          </div>
        `}
      </div>
    `;
  }
}
