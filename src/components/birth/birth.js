import { LitElement, html, css } from 'lit';
import resetCss from '@/styles/reset.js';

class Birth extends LitElement {
    static styles = [
        resetCss,
        css`
            .birth-container {
                display: flex;
                padding: 0.5625rem 1.25rem;
                border: 0.0625rem solid var(--gray--300);
                border-radius: 0.25rem;
                width: 20.8125rem;
                justify-content: center;
                color: var(--gray--400);
                & input {
                    width: 100%;
                    text-align: center;
                }

                & input:focus {
                    outline: none;
                }
                & input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
                & input::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            }
        `,
    ];

    get yearInput() {
        return this.renderRoot.querySelector < HTMLInputElement > '#year';
    }

    get monthInput() {
        return this.renderRoot.querySelector < HTMLInputElement > '#month';
    }
    get dayInput() {
        return this.renderRoot.querySelector < HTMLInputElement > '#day';
    }

    handleValidation(e) {
        const target = e.target;
        // 숫자만 입력하도록 함
        target.value = target.value.replace(/\D/g, '');
        // 입력한 최대 길이를 넘기지 않도록 함
        if (target.value.length > target.maxLength) {
            target.value = target.value.slice(0, target.maxLength);
        }
    }
    render() {
        return html`<span class="birth-container">
            <input type="number" id="year" placeholder="YYYY" @input=${this.handleValidation} maxlength="4" />
            /
            <input type="number" id="month" placeholder="MM" @input=${this.handleValidation} maxlength="2" />
            /
            <input type="number" id="day" placeholder="DD" @input=${this.handleValidation} maxlength="2" />
        </span>`;
    }
}

customElements.define('c-birth', Birth);
