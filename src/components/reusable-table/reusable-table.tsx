import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../custom-pagination/custom-pagination';

interface TableColumn {
  label: string;
  key: string;
  width?: string;
}

interface TableAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'link' | 'icon';
  onClick: (item: any) => void;
}

interface RowData {
  items: any[];
  pageNumber?: number;
  totalPages?: number;
  totalCount?: number;
}

interface TableState {
  selectedItems: Set<any>;
  allSelected: boolean;
}

@customElement('reusable-table')
export class ReusableTableComponent extends LitElement {
  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Object }) rowData: RowData = { items: [] };
  @property({ type: Array }) actions: TableAction[] = [];
  @property({ type: Function }) handleChangePage?: (adjustPageNumber: number) => void;
  @property({ type: Function }) onSelectionChange?: (selectedItems: any[]) => void;
  @property({ type: Boolean }) selectable: boolean = true;

  @state() private state: TableState = {
    selectedItems: new Set(),
    allSelected: false
  };

  createRenderRoot() {
    return this;
  }

  private toggleSelectAll() {
    if (this.state.allSelected) {
      this.state = {
        ...this.state,
        selectedItems: new Set(),
        allSelected: false
      };
    } else {
      this.state = {
        ...this.state,
        selectedItems: new Set(this.rowData.items),
        allSelected: true
      };
    }
    this.onSelectionChange?.(Array.from(this.state.selectedItems));
  }

  private toggleSelectItem(item: any) {
    const newSelectedItems = new Set(this.state.selectedItems);
    
    if (newSelectedItems.has(item)) {
      newSelectedItems.delete(item);
    } else {
      newSelectedItems.add(item);
    }

    this.state = {
      ...this.state,
      selectedItems: newSelectedItems,
      allSelected: newSelectedItems.size === this.rowData.items.length
    };
    
    this.onSelectionChange?.(Array.from(this.state.selectedItems));
  }


  private renderCell(item: any, column: TableColumn) {
    const value = item[column.key];
    return html`<td class="table__cell">${value}</td>`;
  }

  private renderActions(item: any) {    
    if (!this.actions || !this.actions.length) {
      return html``;
    }
    
    return html`
      <td class="table__cell table__cell--actions">
        <div class="table__actions">
          ${this.actions.map(action => html`
            <button-component
              variant="${action.variant || 'secondary'}"
              .icon="${action.label}"
              size="sm"
              @click="${() => action.onClick(item)}"
            ></button-component>
          `)}
        </div>
      </td>
    `;
  }


  render() {
    return html`
      <div class="table">
        <div class="table__container">
          <table class="table__element">
            <thead class="table__head">
              <tr class="table__row">
                ${this.selectable ? html`
                  <th class="table__header table__header--checkbox">
                    <input
                      type="checkbox"
                      class="table__checkbox"
                      .checked="${this.state.allSelected}"
                      @change="${this.toggleSelectAll}"
                    />
                  </th>
                ` : ''}
                
                ${this.columns.map(column => html`
                  <th class="table__header" style="${column.width ? `width: ${column.width}` : ''}">
                    ${column.label}
                  </th>
                `)}
                
                ${this.actions && this.actions.length ? html`
                  <th class="table__header table__header--actions">İşlemler</th>
                ` : ''}
              </tr>
            </thead>
            
            <tbody class="table__body">
              ${this.rowData.items.map(item => html`
                <tr class="table__row ${this.state.selectedItems.has(item) ? 'table__row--selected' : ''}">
                  ${this.selectable ? html`
                    <td class="table__cell table__cell--checkbox">
                      <input
                        type="checkbox"
                        class="table__checkbox"
                        .checked="${this.state.selectedItems.has(item)}"
                        @change="${() => this.toggleSelectItem(item)}"
                      />
                    </td>
                  ` : ''}
                  
                  ${this.columns.map(column => this.renderCell(item, column))}
                  ${this.renderActions(item)}
                </tr>
              `)}
            </tbody>
          </table>
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
