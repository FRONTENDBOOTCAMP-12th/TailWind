// lit을 이용한 공통 모달 컴포넌트
import { html, LitElement } from 'lit';
import { modalStyles } from './modalStyle';
import resetStyles from '@/styles/reset.js';
import './../checkbox/checkbox.js';

class Modal extends LitElement {
    static properties = {
        isOpen: { type: Boolean, attribute: true },
        productImage: { type: String, attribute: true },
        productName: { type: String, attribute: true },
        modalTitle: { type: String, attribute: true },
        isQuestion: { type: Boolean, attribute: true },
        registerBtnDisabled: { type: Boolean, attribute: true },
    };

    static styles = [resetStyles, modalStyles];

    constructor() {
        super();
        this.isOpen = false;
        this.isQuestion = true;
        this.registerBtnDisabled = true;
    }

    get titleInput() {
        return this.shadowRoot.querySelector('#modal-input');
    }

    get contentInput() {
        return this.shadowRoot.querySelector('#modal-textarea');
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
        this.resetValues();
    }

    resetValues() {
        this.titleInput.value = ''; // 제목 입력 필드 초기화
        this.contentInput.value = ''; // 내용 입력 필드 초기화
        this.shadowRoot.querySelector('#secret-question').reset();
        this.registerBtnDisabled = true; // 버튼 비활성화
    }

    handleCheckboxChange(e) {
        this.isSecretQuestion = e.detail.checked;
        console.log('비밀글 설정:', this.isSecretQuestion);
    }

    handleInput() {
        const titleVal = this.titleInput.value;
        const contentVal = this.contentInput.value;

        console.log(titleVal !== '' && contentVal !== '');

        if (titleVal !== '' && contentVal !== '') {
            this.registerBtnDisabled = false;
        } else {
            this.registerBtnDisabled = true;
        }
    }

    render() {
        return html`<div class="modal ${this.isOpen ? 'open' : ''}">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${this.modalTitle}</h2>
                    <button class="close-btn" @click=${this.closeModal}>
                        <img src="/assets/icon/x-btn.svg" alt="닫기" />
                    </button>
                </div>
                <div class="product-wrapper">
                    <img src=${this.productImage} />
                    <h4>${this.productName}</h4>
                </div>
                <div class="modal-body">
                    <div class="input-group title-group">
                        <label for="modal-input">제목</label>
                        <input type="text" id="modal-input" placeholder="제목을 입력해주세요." @input=${this.handleInput} />
                    </div>
                    <div class="input-group content-group">
                        <label for="modal-textarea">내용</label>
                        <textarea id="modal-textarea" placeholder="내용을 입력해주세요." @input=${this.handleInput}></textarea>
                    </div>
                    ${this.isQuestion
                        ? html` <div class="checkbox-group">
                              <c-checkbox id="secret-question" @checkbox-change=${this.handleCheckboxChange}>비밀글로 문의하기</c-checkbox>
                          </div>`
                        : ''}
                </div>
                <div class="modal-footer">
                    <button class="cancel-btn" @click=${this.closeModal}>취소</button>
                    <button class="register-btn" ?disabled=${this.registerBtnDisabled} @click=${this.closeModal}>등록</button>
                </div>
            </div>
        </div>`;
    }
}

customElements.define('modal-component', Modal);
