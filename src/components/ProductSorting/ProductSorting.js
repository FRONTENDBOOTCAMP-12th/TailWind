import { LitElement, html } from 'lit';
import resetCss from '@/styles/reset.js';
import ProductSortingStyle from '@/components/ProductSorting/ProductSortingStyle.js';

class ProductSorting extends LitElement {
    static get styles() {
        return [resetCss, ProductSortingStyle];
    }

    static properties = {
        productsNum: { type: Number },
        activeSort: { type: String },
    };

    constructor() {
        super();
        this.productsNum = 0;
        this.activeSort = 'newest';
        this.handleNewest = this.handleNewest.bind(this);
        this.handleLowToHigh = this.handleLowToHigh.bind(this);
        this.handleHighToLow = this.handleHighToLow.bind(this);
    }

    handleSortChange(order) {
        this.activeSort = order;

        this.dispatchEvent(
            new CustomEvent('sort-change', {
                detail: { order }, // 정렬 순서를 전달
                bubbles: true,
                composed: true,
            })
        );
    }

    handleNewest() {
        this.handleSortChange('newest');
        this.dispatchEvent(
            new CustomEvent('sort-change', {
                detail: { order: 'newest' },
                bubbles: true,
                composed: true,
            })
        );
    }

    handleLowToHigh() {
        this.handleSortChange('low-to-high');
        this.dispatchEvent(
            new CustomEvent('sort-change', {
                detail: { order: 'low-to-high' },
                bubbles: true,
                composed: true,
            })
        );
    }

    handleHighToLow() {
        this.handleSortChange('high-to-low');
        this.dispatchEvent(
            new CustomEvent('sort-change', {
                detail: { order: 'high-to-low' },
                bubbles: true,
                composed: true,
            })
        );
    }

    render() {
        return html`
            <div class="product-top-menu">
                <span class="product-num">총 ${this.productsNum}건</span>
                <ul class="product-sorting-list">
                    <li>
                        <button type="button" @click="${this.handleNewest}" class="btn-product-sort ${this.activeSort === 'newest' ? 'active' : ''}">
                            신상품순
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            @click="${this.handleLowToHigh}"
                            class="btn-product-sort ${this.activeSort === 'low-to-high' ? 'active' : ''}"
                        >
                            낮은 가격순
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            @click="${this.handleHighToLow}"
                            class="btn-product-sort ${this.activeSort === 'high-to-low' ? 'active' : ''}"
                        >
                            높은 가격순
                        </button>
                    </li>
                </ul>
            </div>
        `;
    }
}

customElements.define('product-sorting', ProductSorting);
