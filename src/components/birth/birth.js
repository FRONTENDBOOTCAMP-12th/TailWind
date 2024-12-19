import { LitElement, html } from 'lit';
import resetCss from '@/styles/reset.js';
import { birthCss } from './birthCss';

class Birth extends LitElement {
    static styles = [resetCss, birthCss];

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
