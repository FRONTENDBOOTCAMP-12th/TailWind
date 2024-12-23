import { LitElement, html } from 'lit';
import { tabStyles } from './tabStyles.js';
import resetStyles from '@/styles/reset.js';
import { fileUrl } from '@/api/pockethost.js';
import '@/components/button/button.js';

class Tab extends LitElement {
    static styles = [resetStyles, tabStyles];

    static properties = {
        activeTab: { type: String },
    };

    constructor() {
        super();
        this.activeTab = 'description';
    }

    connectedCallback() {
        super.connectedCallback();
        this.setActiveTab('description');
        this.product = JSON.parse(localStorage.getItem('product'));
    }

    setActiveTab(sectionId) {
        this.activeTab = sectionId;
        const section = this.shadowRoot.getElementById(sectionId); // 섹션 ID로 요소 찾기
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 부드럽게 스크롤 이동
        }
    }

    handleReviewClick() {
        const event = new CustomEvent('open-modal', {
            detail: {
                title: '후기작성',
                isQuestion: false,
            },
        });
        this.dispatchEvent(event);
    }

    handleQnAClick() {
        const event = new CustomEvent('open-modal', {
            detail: {
                title: '문의하기',
                isQuestion: true,
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
                    <img class="product-image" src="${fileUrl + this.product.id + '/' + this.product.main_image}" alt="${this.product.name}" />
                </section>
                <section id="info">
                    <img class="product-image" src="${fileUrl + this.product.id + '/' + this.product.main_image}" alt="${this.product.name}" />
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
            <table>
                <thead>
                    <tr>
                        <th>작성자</th>
                        <th>내용</th>
                        <th>평점</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>사용자1</td>
                        <td>좋아요!</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>사용자2</td>
                        <td>만족합니다.</td>
                        <td>4</td>
                    </tr>
                </tbody>
            </table>
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
                        <th>작성자</th>
                        <th>문의내용</th>
                        <th>답변상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>사용자3</td>
                        <td>배송은 얼마나 걸리나요?</td>
                        <td>답변 완료</td>
                    </tr>
                    <tr>
                        <td>사용자4</td>
                        <td>재입고 예정이 있나요?</td>
                        <td>미답변</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
}

customElements.define('c-tab', Tab);
