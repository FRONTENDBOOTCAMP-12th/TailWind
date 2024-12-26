import '@/layout/header.js';
import '@/components/footer/footer.js';
import '@/components/tab/tab.js';
import '@/components/ProductDetailModal/ProductDetailModal.js';
import { LitElement, html } from 'lit';
import { pb } from '@/api/pockethost.js';
import '@/components/ProductHeader/ProductHeader.js';
import productDetailStyles from './ProductDetailStyles.js';
import resetStyles from '@/styles/reset.js';

class ProductDetail extends LitElement {
    static properties = {
        productId: { type: String, required: true },
        modalOpen: { type: Boolean, required: true },
        modalTitle: { type: String, required: true },
        isQuestion: { type: Boolean, required: true },
        reviewList: { type: Array, required: true },
        qnaList: { type: Array, required: true },
    };

    static styles = [resetStyles, productDetailStyles];

    constructor() {
        super();
        this.productId = new URLSearchParams(window.location.search).get('id');
        this.modalOpen = false;
        this.modalTitle = '';
        this.isQuestion = false;
        this.reviewList = [];
        this.qnaList = [];
    }

    async connectedCallback() {
        super.connectedCallback();

        const [product, reviewList, qnaList] = await Promise.all([
            pb.collection('product').getOne('l8125u60nj73e27'),
            pb.collection('reviews').getList(1, 5, { productId: 'l8125u60nj73e27', expand: 'author' }),
            pb.collection('questions_answers').getList(1, 5, { productId: 'l8125u60nj73e27', expand: 'author' }),
        ]);
        this.product = product;
        this.reviewList = reviewList.items;
        this.qnaList = qnaList.items;
        localStorage.setItem('product', JSON.stringify(this.product));
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
            <product-detail-modal
                ?isOpen=${this.modalOpen}
                modalTitle=${this.modalTitle}
                ?isQuestion=${this.isQuestion}
                @modal-closed="${this.handleModalClosed}"
            ></product-detail-modal>
            ${this.product && this.reviewList && this.qnaList
                ? html`
                      <div class="product-detail-container">
                          <product-header></product-header>
                          <c-tab @open-modal="${this.handleModal}" .reviewList=${this.reviewList} .qnaList=${this.qnaList}></c-tab>
                      </div>
                  `
                : html` <div>로딩중...</div> `}
        `;
    }
}

customElements.define('product-detail', ProductDetail);
