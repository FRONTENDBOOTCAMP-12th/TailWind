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
        currentReviewPage: { type: Number },
        currentQnaPage: { type: Number },
        totalReviewPages: { type: Number },
        totalQnaPages: { type: Number },
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
        this.currentReviewPage = 1;
        this.currentQnaPage = 1;
        this.totalReviewPages = 0;
        this.totalQnaPages = 0;
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
    }

    async fetchProductData() {
        const product = await pb.collection('product').getOne(this.productId);
        this.product = product;
        localStorage.setItem('product', JSON.stringify(this.product));
    }

    async fetchReviewData() {
        const reviewList = await pb.collection('reviews').getList(this.currentReviewPage, 5, {
            productId: this.productId,
            expand: 'author',
        });
        this.reviewList = reviewList.items;
        this.totalReviewPages = Math.ceil(reviewList.totalItems / 5);
    }

    async fetchQnaData() {
        const qnaList = await pb.collection('questions_answers').getList(this.currentQnaPage, 5, {
            productId: this.productId,
            expand: 'author',
        });
        this.qnaList = qnaList.items;
        this.totalQnaPages = Math.ceil(qnaList.totalItems / 5);
    }

    async fetchData() {
        await Promise.all([this.fetchProductData(), this.fetchReviewData(), this.fetchQnaData()]);
    }

    handleModal(event) {
        this.modalTitle = event.detail.title;
        this.isQuestion = event.detail.isQuestion;
        this.modalOpen = true;
    }

    handleModalClosed() {
        this.modalOpen = false;
    }

    handlePageChange(e) {
        const { type, page } = e.detail;
        if (type === 'review') {
            this.currentReviewPage = page;
            this.fetchReviewData();
        } else {
            this.currentQnaPage = page;
            this.fetchQnaData();
        }
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
                          <c-tab
                              @open-modal="${this.handleModal}"
                              @page-change="${this.handlePageChange}"
                              .reviewList=${this.reviewList}
                              .qnaList=${this.qnaList}
                              .currentReviewPage=${this.currentReviewPage}
                              .currentQnaPage=${this.currentQnaPage}
                              .totalReviewPages=${this.totalReviewPages}
                              .totalQnaPages=${this.totalQnaPages}
                          ></c-tab>
                      </div>
                  `
                : html` <div>로딩중...</div> `}
        `;
    }
}

customElements.define('product-detail', ProductDetail);
