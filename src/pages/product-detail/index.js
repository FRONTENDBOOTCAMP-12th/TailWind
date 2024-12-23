import '@/layout/header.js';
import '@/components/footer/footer.js';
import '@/components/tab/tab.js';
import '@/components/modal/modal.js';
import { LitElement, html } from 'lit';
import { pb } from '@/api/pockethost.js';
import '@/components/product-header/productHeader.js';
import { productDetailStyles } from './productDetailStyles.js';
import resetStyles from '@/styles/reset.js';

class ProductDetail extends LitElement {
    static properties = {
        productId: { type: String, required: true },
        modalOpen: { type: Boolean, required: true },
        modalTitle: { type: String, required: true },
        isQuestion: { type: Boolean, required: true },
    };

    static styles = [resetStyles, productDetailStyles];

    constructor() {
        super();
        this.productId = new URLSearchParams(window.location.search).get('id');
        this.modalOpen = false;
        this.modalTitle = '';
        this.isQuestion = false;
    }

    async connectedCallback() {
        super.connectedCallback();

        this.product = await pb.collection('product').getOne('l8125u60nj73e27');
        localStorage.setItem('product', JSON.stringify(this.product));
        this.requestUpdate();
    }

    handleModal(event) {
        this.modalTitle = event.detail.title;
        this.isQuestion = event.detail.isQuestion;
        this.modalOpen = true;
    }

    handleModalClosed() {
        this.modalOpen = false;
    }

    render() {
        return html`
            <modal-component
                ?isOpen=${this.modalOpen}
                modalTitle=${this.modalTitle}
                ?isQuestion=${this.isQuestion}
                @modal-closed="${this.handleModalClosed}"
            ></modal-component>
            ${this.product
                ? html`
                      <div class="product-detail-container">
                          <product-header></product-header>
                          <c-tab @open-modal="${this.handleModal}"></c-tab>
                      </div>
                  `
                : html` <div>로딩중...</div> `}
        `;
    }
}

customElements.define('product-detail', ProductDetail);
