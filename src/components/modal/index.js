// lit을 이용한 공통 모달 컴포넌트
import { html, LitElement } from 'lit';
import { modalStyles } from './modalCss';
import resetStyles from '@/styles/reset.js';

class Modal extends LitElement {
    static properties = {
        isOpen: { type: Boolean, attribute: true },
        productImage: { type: String, attribute: true },
        productName: { type: String, attribute: true },
        modalTitle: { type: String, attribute: true },
        isQuestion: { type: Boolean, attribute: true },
    };

    static styles = [resetStyles, modalStyles];

    constructor() {
        super();
        this.isOpen = false;
        this.isQuestion = true;
    }

    connectedCallback() {
        super.connectedCallback();

        const openButton = document.querySelector('#openModalBtn');
        openButton.addEventListener('click', () => this.openModal());
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        const openButton = document.querySelector('#openModalBtn');
        openButton.removeEventListener('click', () => this.openModal());
    }

    openModal() {
        this.isOpen = true;
    }

    closeModal() {
        this.isOpen = false;
    }

    render() {
        return html`<div class="modal ${this.isOpen ? 'open' : ''}">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${this.modalTitle}</h2>
                    <button class="close-btn" @click=${this.closeModal}>X</button>
                </div>
                <div class="product-wrapper">
                    <img src=${this.productImage} />
                    <h4>${this.productName}</h4>
                </div>
                <div class="modal-body">
                    <div class="input-group title-group">
                        <label for="modal-input">제목</label>
                        <input type="text" id="modal-input" placeholder="제목을 입력해주세요." />
                    </div>
                    <div class="input-group content-group">
                        <label for="modal-textarea">내용</label>
                        <textarea id="modal-textarea" placeholder="내용을 입력해주세요."></textarea>
                    </div>
                    ${this.isQuestion
                        ? html`<div class="checkbox-group">
                              <input type="checkbox" name="secret-question" id="secret-question" />
                              <label for="secret-question">비밀글로 문의하기</label>
                          </div>`
                        : ''}
                </div>
                <div class="modal-footer">
                    <button class="cancel-btn" @click=${this.closeModal}>취소</button>
                    <button class="register-btn" @click=${this.closeModal}>등록</button>
                </div>
            </div>
        </div>`;
    }
}

customElements.define('modal-component', Modal);
