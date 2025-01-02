import { fileUrl } from '@/api/PocketHost.js';
import resetCss from '@/styles/Reset.js';
import { LitElement, html } from 'lit';
import '@/components/Button/Button.js';
import tabStyle from './ProductDetailTabStyle.js';
import '@/components/Badge/Badge.js';
import swal from 'sweetalert2';
import { navigate } from '@/utils/utils.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

class ProductDetailTab extends LitElement {
    static styles = [resetCss, tabStyle];

    static properties = {
        activeTab: { type: String },
        noticeList: { type: Array },
        reviewList: { type: Array },
        qnaList: { type: Array },
        currentReviewPage: { type: Number },
        currentQnaPage: { type: Number },
        totalReviewPages: { type: Number },
        totalQnaPages: { type: Number },
        expandedId: { type: String },
        sortOption: { type: String },
        reviewNoticeList: { type: Array },
        qnaNoticeList: { type: Array },
        user: { type: Object },
    };

    constructor() {
        super();
        this.activeTab = 'description';
        this.noticeList = [];
        this.reviewList = [];
        this.qnaList = [];
        this.currentReviewPage = 1;
        this.currentQnaPage = 1;
        this.totalReviewPages = 0;
        this.totalQnaPages = 0;
        this.expandedId = null;
        this.sortOption = 'latest'; // 'latest' 또는 'recommended'
        this.reviewNoticeList = [];
        this.qnaNoticeList = [];
        this.user = JSON.parse(localStorage.getItem('pocketbase_auth'));
    }

    connectedCallback() {
        super.connectedCallback();
        this.setActiveTab('description');
        this.product = JSON.parse(localStorage.getItem('product'));
    }

    get filteredReviewNoticeList() {
        return this.noticeList.filter((notice) => notice.noticeType.includes('review'));
    }

    get filteredQnaNoticeList() {
        return this.noticeList.filter((notice) => notice.noticeType.includes('qna'));
    }

    setActiveTab(sectionId) {
        this.activeTab = sectionId;
        const section = this.shadowRoot.getElementById(sectionId); // 섹션 ID로 요소 찾기
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 부드럽게 스크롤 이동
        }
    }

    handleReviewClick() {
        if (!this.user) {
            swal.fire({
                title: '로그인 후 이용해주세요',
                icon: 'warning',
                confirmButtonText: '확인',
            }).then(() => {
                navigate('/src/pages/Login/index.html');
            });
            return;
        } else {
            const event = new CustomEvent('open-modal', {
                detail: {
                    title: '후기작성',
                    isQuestion: false,
                },
            });
            this.dispatchEvent(event);
        }
    }

    handleQnAClick() {
        if (!this.user) {
            swal.fire({
                title: '로그인 후 이용해주세요',
                icon: 'warning',
                confirmButtonText: '확인',
            }).then(() => {
                navigate('/src/pages/Login/index.html');
            });
            return;
        } else {
            const event = new CustomEvent('open-modal', {
                detail: {
                    title: '문의하기',
                    isQuestion: true,
                },
            });
            this.dispatchEvent(event);
        }
    }

    handlePageChange(type, page) {
        const event = new CustomEvent('page-change', {
            detail: { type, page },
        });
        this.dispatchEvent(event);
    }

    toggleExpand(id) {
        this.expandedId = this.expandedId === id ? null : id;
    }

    handleSort(option) {
        this.sortOption = option;
        const event = new CustomEvent('sort-change', {
            detail: {
                type: 'review',
                sort: option,
            },
        });
        this.dispatchEvent(event);
    }

    render() {
        return html`
            <div class="tab-header">
                <button class="${this.activeTab === 'description' ? 'active' : ''}" @click="${() => this.setActiveTab('description')}">
                    상품설명
                </button>
                <button class="${this.activeTab === 'info' ? 'active' : ''}" @click="${() => this.setActiveTab('info')}">상세정보</button>
                <button class="${this.activeTab === 'review' ? 'active' : ''}" @click="${() => this.setActiveTab('review')}">후기</button>
                <button class="${this.activeTab === 'qna' ? 'active' : ''}" @click="${() => this.setActiveTab('qna')}">문의하기</button>
            </div>
            <div class="tab-content">
                <section id="description">
                    ${this.product.description_images.map(
                        (img) => html` <img class="product-image" loading="lazy" src="${fileUrl + this.product.id + '/' + img}" alt="" /> `
                    )}
                </section>
                <section id="info">
                    <img class="product-image" loading="lazy" src="${fileUrl + this.product.id + '/' + this.product.info_images}" alt="" />
                </section>
                <section id="review">${this.renderReviewTable()}</section>
                <section id="qna">${this.renderQnATable()}</section>
            </div>
        `;
    }

    renderReviewTable() {
        return html`
            <div class="table-header">
                <div class="title">
                    <h2>상품후기</h2>
                    <c-button mode="fill" @click="${this.handleReviewClick}">후기 작성하기</c-button>
                </div>
                <p>골드키가 50점 적립금 혜택이 있어요.</p>
                <ul>
                    <li>베스트 리뷰: 적립금 1,000점 지급 (주간 선정 기준)</li>
                    <li>일반 리뷰: 적립금 50점 지급 (10자 이상)</li>
                    <li>사진 첨부 시 추가 50점 지급</li>
                    <li>적립금 지급일은 리뷰 작성일로부터 익월 1~2주 소요</li>
                </ul>
            </div>
            <div class="review-meta">
                <span class="total-count">총 ${this.reviewList.length}개</span>
                <div class="sort-options">
                    <button
                        class="${this.sortOption === 'latest' ? 'active' : ''}"
                        @click="${() => this.handleSort('latest')}"
                        ?disabled=${this.sortOption === 'latest'}
                    >
                        최근 등록순
                    </button>
                    <span class="divider">|</span>
                    <button
                        class="${this.sortOption === 'oldest' ? 'active' : ''}"
                        @click="${() => this.handleSort('oldest')}"
                        ?disabled=${this.sortOption === 'oldest'}
                    >
                        오래된 순
                    </button>
                </div>
            </div>
            <table>
                <tbody>
                    ${this.filteredReviewNoticeList.map(
                        (notice) => html`
                            <tr class="notice-row ${this.expandedId === notice.id ? 'expanded' : ''}" @click="${() => this.toggleExpand(notice.id)}">
                                <td colspan="2"><c-badge type="info"></c-badge> ${notice.title}</td>
                            </tr>
                            ${this.expandedId === notice.id
                                ? html`
                                      <tr class="expanded-content">
                                          <td colspan="2">
                                              <div class="question">
                                                  <p>${unsafeHTML(notice.contents)}</p>
                                              </div>
                                          </td>
                                      </tr>
                                  `
                                : ''}
                        `
                    )}
                    ${this.reviewList.length !== 0
                        ? this.reviewList.map(
                              (review) => html`
                                  <tr>
                                      <td class="review-author">
                                          <c-badge type="${review.isBest ? 'best' : 'normal'}"></c-badge>${review.expand.author.name}
                                      </td>
                                      <td class="review-content-wrapper">
                                          <h4 class="review-title">${review.title}</h4>
                                          <div class="review-contents">${unsafeHTML(review.contents)}</div>
                                          <div class="review-date">${new Date(review.created).toLocaleDateString()}</div>
                                      </td>
                                  </tr>
                              `
                          )
                        : html`<tr>
                              <td colspan="3">따끈한 첫 후기를 기다리고 있어요</td>
                          </tr>`}
                </tbody>
            </table>
            ${this.renderPagination(this.currentReviewPage, this.totalReviewPages, 'review')}
        `;
    }

    renderQnATable() {
        return html`
            <div class="table-header">
                <div class="title">
                    <h2>Q&A</h2>
                    <c-button mode="fill" @click="${this.handleQnAClick}">문의하기</c-button>
                </div>
                <ul>
                    <li>베스트 리뷰: 적립금 1,000점 지급 (주간 선정 기준)</li>
                    <li>일반 리뷰: 적립금 50점 지급 (10자 이상)</li>
                    <li>사진 첨부 시 추가 50점 지급</li>
                    <li>적립금 지급일은 리뷰 작성일로부터 익월 1~2주 소요</li>
                </ul>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.filteredQnaNoticeList.map(
                        (notice) => html`
                            <tr class="notice-row ${this.expandedId === notice.id ? 'expanded' : ''}" @click="${() => this.toggleExpand(notice.id)}">
                                <td><c-badge type="info"></c-badge> ${notice.title}</td>
                                <td>운영자</td>
                                <td>${new Date(notice.created).toLocaleDateString()}</td>
                                <td>-</td>
                            </tr>
                            ${this.expandedId === notice.id
                                ? html`
                                      <tr class="expanded-content">
                                          <td colspan="4">
                                              <div class="question">
                                                  <p>${unsafeHTML(notice.contents)}</p>
                                              </div>
                                          </td>
                                      </tr>
                                  `
                                : ''}
                        `
                    )}
                    ${this.qnaList.map(
                        (qna) => html`
                            ${this.user?.record.id !== qna.expand.author.id && qna.isSecret
                                ? html`<tr class="qna-row">
                                      <td class="secret">비밀글입니다</td>
                                      <td>${qna.expand.author.name}</td>
                                      <td>${new Date(qna.created).toLocaleDateString()}</td>
                                      <td>${qna.status || '답변대기'}</td>
                                  </tr>`
                                : html`<tr
                                          class="qna-row ${this.expandedId === qna.id ? 'expanded' : ''}"
                                          @click="${() => this.toggleExpand(qna.id)}"
                                      >
                                          <td>${qna.title}</td>
                                          <td>${qna.expand.author.name}</td>
                                          <td>${new Date(qna.created).toLocaleDateString()}</td>
                                          <td>${qna.status || '답변대기'}</td>
                                      </tr>
                                      ${this.expandedId === qna.id
                                          ? html`
                                                <tr class="expanded-content">
                                                    <td colspan="4">
                                                        <div class="question">
                                                            <span class="q-icon">Q</span>
                                                            <p>${unsafeHTML(qna.contents)}</p>
                                                        </div>
                                                        ${qna.answer
                                                            ? html`
                                                                  <div class="answer">
                                                                      <span class="a-icon">A</span>
                                                                      <p>${unsafeHTML(qna.answer)}</p>
                                                                  </div>
                                                              `
                                                            : ''}
                                                    </td>
                                                </tr>
                                            `
                                          : ''}`}
                        `
                    )}
                </tbody>
            </table>
            ${this.qnaList.length !== 0 ? this.renderPagination(this.currentQnaPage, this.totalQnaPages, 'qna') : ''}
        `;
    }

    renderPagination(currentPage, totalPages, type) {
        return html`
            <div class="pagination">
                <button ?disabled=${currentPage === 1} @click=${() => this.handlePageChange(type, currentPage - 1)}>이전</button>
                <button ?disabled=${currentPage === totalPages} @click=${() => this.handlePageChange(type, currentPage + 1)}>다음</button>
            </div>
        `;
    }
}

customElements.define('product-detail-tab', ProductDetailTab);
