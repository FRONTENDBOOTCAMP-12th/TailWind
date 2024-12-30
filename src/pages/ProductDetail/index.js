import '@/components/ProductDetailModal/ProductDetailModal.js';
import productDetailStyle from './ProductDetailStyle.js';
import '@/components/ProductHeader/ProductHeader.js';
import { pb } from '@/api/PocketHost.js';
import resetCss from '@/styles/Reset.js';
import '@/components/Footer/Footer.js';
import { LitElement, html } from 'lit';
import '@/components/ProductDetailTab/ProductDetailTab.js';
import '@/layout/Header.js';

class ProductDetail extends LitElement {
    static properties = {
        product: { type: Object, required: true },
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
        reviewSortOption: { type: String },
        noticeList: { type: Array },
    };

    static styles = [resetCss, productDetailStyle];

    constructor() {
        super();
        this.product = null;
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
        this.reviewSortOption = 'latest';
        this.noticeList = [];
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
        const sortOrder = this.reviewSortOption === 'latest' ? '-' : '+'; // '-'는 내림차순

        const reviewList = await pb.collection('reviews').getList(this.currentReviewPage, 5, {
            filter: `productId = "${this.productId}"`,
            sort: `${sortOrder}created`,
            expand: 'author',
        });
        this.reviewList = reviewList.items;
        this.totalReviewPages = Math.ceil(reviewList.totalItems / 5);
    }

    async fetchQnaData() {
        const qnaList = await pb.collection('questions_answers').getList(this.currentQnaPage, 5, {
            filter: `productId = "${this.productId}"`,
            expand: 'author',
        });
        this.qnaList = qnaList.items;
        this.totalQnaPages = Math.ceil(qnaList.totalItems / 5);
    }

    async fetchData() {
        try {
            await Promise.all([this.fetchProductData(), this.fetchReviewData(), this.fetchQnaData(), this.fetchNoticeData()]);
        } catch (error) {
            console.error('데이터 로드 실패', error);
        }
    }

    async fetchNoticeData() {
        const noticeList = await pb.collection('notices').getFullList();
        this.noticeList = noticeList;
    }

    handleModal(event) {
        this.modalTitle = event.detail.title;
        this.isQuestion = event.detail.isQuestion;
        this.modalOpen = true;
    }

    handleModalClosed(e) {
        this.modalOpen = false;
        console.log(e.detail);
        if (e.detail.isQuestion) {
            this.fetchQnaData();
        } else {
            this.fetchReviewData();
        }
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

    handleSort(e) {
        const { type, sort } = e.detail;
        if (type === 'review') {
            this.reviewSortOption = sort;
            this.currentReviewPage = 1; // 정렬이 바뀌면 첫 페이지로 돌아가기
            this.fetchReviewData();
        }
    }

    render() {
        return html`
            ${this.product && this.reviewList && this.qnaList
                ? html`
                      <product-detail-modal
                          ?isOpen=${this.modalOpen}
                          modalTitle=${this.modalTitle}
                          ?isQuestion=${this.isQuestion}
                          @modal-closed="${this.handleModalClosed}"
                      ></product-detail-modal>
                      <div class="product-detail-container">
                          <product-header></product-header>
                          <product-detail-tab
                              @open-modal="${this.handleModal}"
                              @page-change="${this.handlePageChange}"
                              @sort-change="${this.handleSort}"
                              .reviewList=${this.reviewList}
                              .qnaList=${this.qnaList}
                              .noticeList=${this.noticeList}
                              .currentReviewPage=${this.currentReviewPage}
                              .currentQnaPage=${this.currentQnaPage}
                              .totalReviewPages=${this.totalReviewPages}
                              .totalQnaPages=${this.totalQnaPages}
                          ></product-detail-tab>
                      </div>
                  `
                : html` <div>로딩중...</div> `}
        `;
    }
}

customElements.define('product-detail', ProductDetail);
