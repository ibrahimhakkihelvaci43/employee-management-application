import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { chevronLeftIcon, chevronRightIcon } from '../../assets/icons';

@customElement('custom-pagination')
export class CustomPaginationComponent extends LitElement {
  @property({ type: Number }) currentPage: number = 1;
  @property({ type: Number }) totalPages: number = 0;
  @property({ type: Function }) onPageChange?: (page: number) => void;

  createRenderRoot() {
    return this;
  }

  private handlePrevious() {
    if (this.currentPage > 1 && this.onPageChange) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  private handleNext() {
    if (this.currentPage < this.totalPages && this.onPageChange) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  private handlePageClick(page: number) {
    if (this.onPageChange) {
      this.onPageChange(page);
    }
  }

  private renderPageNumbers() {
    const pages = [];
    
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(html`
        <button
          class="pagination__page ${i === this.currentPage ? 'pagination__page--active' : ''}"
          @click="${() => this.handlePageClick(i)}"
        >
          ${i}
        </button>
      `);
    }
    return pages;
  }

  render() {
    return html`
      <div class="pagination">
        <button
          class="pagination__button"
          ?disabled="${this.currentPage === 1}"
          @click="${this.handlePrevious}"
        >
          ${chevronLeftIcon}
        </button>

        ${this.renderPageNumbers()}

        <button
          class="pagination__button"
          ?disabled="${this.currentPage === this.totalPages}"
          @click="${this.handleNext}"
        >
          ${chevronRightIcon}
        </button>
      </div>
    `;
  }
}
