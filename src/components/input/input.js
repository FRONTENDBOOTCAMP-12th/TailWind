import { LitElement, html, css } from 'lit';
import reset from '@/styles/reset.js';
import inputCss from './inputCss.js';

class Input extends LitElement {
    static get styles() {
        return [reset, inputCss];
    }

    constructor() {
        super();
    }

    handleError(params) {}

    render() {
        return html`
            <div class="input-container">
                <input @input=${this.handleError} type="text" class="input-st" placeholder="입력" />
                <span class="error-message">에러메세지</span>
            </div>
        `;
    }
}

customElements.define('c-input', Input);
