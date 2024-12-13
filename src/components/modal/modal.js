// lit을 이용한 공통 모달 컴포넌트
import { html, LitElement } from 'lit';
import { modalStyles } from './modalStyle';
import resetStyles from '@/styles/reset.js';
import '@/components/button/button.js';

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

    get secretQuestionCheckbox() {
        return this.shadowRoot.querySelector('#secret-question');
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
        this.secretQuestionCheckbox.checked = false; // 체크박스 초기화
        this.registerBtnDisabled = true; // 버튼 비활성화
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
                              <input type="checkbox" name="secret-question" id="secret-question" />
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <g fill="none" fill-rule="evenodd">
                                      <circle cx="12" cy="12" r="12" />
                                      <path
                                          fill-rule="nonzero"
                                          d="M17.474 7.966c.295-.291.77-.287 1.06.008.265.268.286.685.066.977l-.074.083-7.615 7.5c-.266.262-.677.286-.969.072l-.084-.072-3.384-3.333c-.295-.29-.299-.765-.008-1.06.264-.269.68-.296.976-.08l.084.071 2.858 2.815 7.09-6.981z"
                                      />
                                  </g>
                              </svg>
                              <label for="secret-question">비밀글로 문의하기</label>
                          </div>`
                        : ''}
                </div>
                <div class="modal-footer">
                    <c-button class="outline" @click=${this.closeModal}>취소</c-button>
                    <c-button class="fill" ?disabled=${this.registerBtnDisabled} @click=${this.closeModal}>등록</c-button>
                </div>
            </div>
        </div>`;
    }
}

customElements.define('modal-component', Modal);
