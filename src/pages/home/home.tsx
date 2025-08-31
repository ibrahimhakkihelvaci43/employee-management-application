import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LitReduxMixin } from '../../utils/litReduxMixin';
import { setCurrentPage, deleteEmployee, deleteMultipleEmployees, setViewMode } from '../../store/employee/employeeSlice';
import { editIcon, trashIcon, gridIcon, listIcon } from '../../assets/icons';
import { navigateTo } from '../../router';
import { getTranslation } from '../../utils/translations';
import '../../components/employee-list/employee-list';

@customElement('home-page')
export class HomePage extends LitReduxMixin(LitElement) {
  createRenderRoot() {
    return this;
  }

  private handlePageChange = (pageNumber: number) => {
    this.dispatch(setCurrentPage(pageNumber));
  }

  private handleEditEmployee = (employee: any) => {
    navigateTo(`/edit-employee/${employee.id}`);
  }

  private selectedItems: any[] = [];

  private handleDeleteEmployee = (employee: any) => {
    if (this.selectedItems.length > 1) {
      const selectedIds = this.selectedItems.map(item => item.id);
      if (confirm(getTranslation('deleteConfirmMultiple', { count: selectedIds.length }))) {
        this.dispatch(deleteMultipleEmployees(selectedIds));
        this.selectedItems = []; 
      }
    } else {
      if (confirm(`${employee.firstName} ${employee.lastName} ${getTranslation('deleteConfirmSingle')}`)) {
        this.dispatch(deleteEmployee(employee.id));
      }
    }
  }

  private handleSelectionChange = (selectedItems: any[]) => {
    this.selectedItems = selectedItems;
  }

  private handleViewModeChange = (mode: 'table' | 'list') => {
    this.dispatch(setViewMode(mode));
  }

  render() {
    const { employees, viewMode, currentPage, pageSize, totalCount, language } = this.store.employee;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedEmployees = employees.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalCount / pageSize);
    
    const columns = [
      { key: 'firstName', label: getTranslation('firstName') },
      { key: 'lastName', label: getTranslation('lastName') },
      { key: 'email', label: getTranslation('email') },
      { key: 'phone', label: getTranslation('phone') },
      { key: 'department', label: getTranslation('department') },
      { key: 'position', label: getTranslation('position') },
      { key: 'dateOfEmployment', label: getTranslation('dateOfEmployment') },
      { key: 'dateOfBirth', label: getTranslation('dateOfBirth') }
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
          <page-title text="${getTranslation('employeeList')}"></page-title>
          
          <div class="home-page__view-toggle">
            <button-component
              variant="icon"
              .icon="${gridIcon}"
              size="md"
              iconColor="#ff6b35"
              @click="${() => this.handleViewModeChange('table')}"
              class="${viewMode === 'table' ? 'active' : ''}"
            ></button-component>
            
            <button-component
              variant="icon"
              .icon="${listIcon}"
              size="md"
              iconColor="#ff6b35"
              @click="${() => this.handleViewModeChange('list')}"
              class="${viewMode === 'list' ? 'active' : ''}"
            ></button-component>
          </div>
        </div>
        
${employees.length === 0 ? html`
          <div class="home-page__empty">
            <div class="empty-state">
              <div class="empty-state__title">${getTranslation('noEmployeesFound')}</div>
            </div>
          </div>
        ` : viewMode === 'table' ? html`
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
          <employee-list
            .rowData="${{
              items: paginatedEmployees,
              pageNumber: currentPage,
              totalPages: totalPages,
              totalCount: totalCount
            }}"
            .actions="${[
              {
                label: editIcon,
                variant: 'edit',
                onClick: this.handleEditEmployee
              },
              {
                label: trashIcon,
                variant: 'delete',
                onClick: this.handleDeleteEmployee
              }
            ]}"
            .handleChangePage="${this.handlePageChange}"
          ></employee-list>
        `}
      </div>
    `;
  }
}
