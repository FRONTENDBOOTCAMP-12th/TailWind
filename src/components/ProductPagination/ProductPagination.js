import { LitElement, html } from 'lit';
import productPaginationStyle from './ProductPaginationStyle.js';
import resetCss from '@/styles/Reset.js';

class ProductPagination extends LitElement {
    static get styles() {
        return [resetCss, productPaginationStyle];
    }

    static properties = {
        totalItems: { type: Number }, // 총 아이템 수
        itemsPerPage: { type: Number }, // 페이지당 아이템 수
        currentPage: { type: Number }, // 현재 페이지
    };

    get totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    handlePageChange(page) {
        this.dispatchEvent(new CustomEvent('page-change', { detail: { page } }));
    }

    handlePageClick(event) {
        const page = Number(event.target.dataset.page);
        this.handlePageChange(page);
    }

    onFirstPageClick() {
        this.handlePageChange(1);
    }

    onPreviousPageClick() {
        this.handlePageChange(this.currentPage - 1);
    }

    onPageClick(page) {
        this.handlePageChange(page);
    }

    onNextPageClick() {
        this.handlePageChange(this.currentPage + 1);
    }

    onLastPageClick() {
        this.handlePageChange(this.totalPages);
    }

    render() {
        const pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

        return html`
            <ul class="product-pagination">
                <li>
                    <button @click="${this.onFirstPageClick}" ?disabled="${this.currentPage === 1}"><<</button>
                </li>
                <li>
                    <button @click="${this.onPreviousPageClick}" ?disabled="${this.currentPage === 1}"><</button>
                </li>
                ${pages.map(
                    (page) =>
                        html`<li>
                            <button @click="${this.handlePageClick}" data-page="${page}" class="${this.currentPage === page ? 'active' : ''}">
                                ${page}
                            </button>
                        </li>`
                )}

                <li>
                    <button @click="${this.onNextPageClick}" ?disabled="${this.currentPage === this.totalPages}">></button>
                </li>
                <li>
                    <button @click="${this.onLastPageClick}" ?disabled="${this.currentPage === this.totalPages}">>></button>
                </li>
            </ul>
        `;
    }
}

customElements.define('product-pagination', ProductPagination);
