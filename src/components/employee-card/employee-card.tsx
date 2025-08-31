import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface EmployeeCardItem {
  label: string;
  value: string;
}

interface EmployeeCardAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'link' | 'icon';
  onClick: (id?: number) => void;
}

@customElement('employee-card')
export class EmployeeCardComponent extends LitElement {
  @property({ type: Array }) items: EmployeeCardItem[] = [];
  @property({ type: Array }) actions: EmployeeCardAction[] = [];
  @property({ type: Number }) employeeId?: number;

  createRenderRoot() {
    return this;
  }

  private renderItems() {
    return html`
      <div class="employee-card__items">
        ${this.items.map(item => html`
          <div class="employee-card__item">
            <div class="employee-card__label">${item.label}</div>
            <div class="employee-card__value">${item.value}</div>
          </div>
        `)}
      </div>
    `;
  }

  private renderActions() {
    if (!this.actions || !this.actions.length) {
      return html``;
    }

    return html`
      <div class="employee-card__actions">
        ${this.actions.map(action => html`
          <button-component
            variant="${action.variant || 'secondary'}"
            text="${action.label}"
            size="sm"
            @click="${() => action.onClick(this.employeeId)}"
          ></button-component>
        `)}
      </div>
    `;
  }

  render() {
    return html`
      <div class="employee-card">
        ${this.renderItems()}
        ${this.renderActions()}
      </div>
    `;
  }
}
