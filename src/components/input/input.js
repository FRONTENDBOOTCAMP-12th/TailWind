import { LitElement, html, css } from 'lit';
import reset from '@/styles/reset.js';
import inputCss from './inputCss.js';

class Input extends LitElement {
    static properties = {
        text: { type: String },
        placeholder: { type: String },
        errorMessage: { type: String },
        validation: { type: String },
    };

    static get styles() {
        return [reset, inputCss];
    }

    constructor() {
        super();
        this.text = 'text';
        this.placeholder = '입력';
        this.errorMessage = '에러메세지';
        this.validation = /^[A-Za-z]+$/;
    }

    get errorData() {
        return this.shadowRoot.querySelector('.error-message');
    }

    handleInput(event) {
        this.inputValue = event.target.value;
        this.handleError();
    }

    handleError() {
        if (!this.handleErrorReg(this.inputValue)) {
            this.errorData.style.display = 'block';
        } else {
            this.errorData.style.display = 'none';
        }
    }

    handleErrorReg(text) {
        return this.validation.test(String(text).toLowerCase());
    }

    render() {
        return html`
            <div class="input-container">
                <input
                    @input="${(event) => {
                        this.handleInput(event);
                    }}"
                    type="${this.type}"
                    class="input-st"
                    placeholder="${this.placeholder}"
                />
                <span class="error-message">${this.errorMessage}</span>
            </div>
        `;
    }
}

customElements.define('c-input', Input);
