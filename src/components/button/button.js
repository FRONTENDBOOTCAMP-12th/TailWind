import { LitElement, html } from 'lit';
import { buttonStyles } from './buttonStyles';
import resetStyles from '@/styles/reset.js';

class Button extends LitElement {
    static styles = [resetStyles, buttonStyles];

    static properties = {
        type: { type: String, attribute: 'type', reflect: true },

        /**
         * outline : 테두리만 있는 버튼
         * fill : 배경색이 채워져 있는 버튼
         */
        class: { type: String, attribute: 'class', reflect: true },
        disabled: { type: Boolean, attribute: 'disabled', reflect: true },
    };

    constructor() {
        super();
        this.type = 'button';
        this.class = '';
        this.disabled = false;
    }

    handleClick() {
        this.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
    }

    render() {
        return html`<button type=${this.type} class="c-button ${this.class}" ?disabled=${this.disabled} @click=${this.handleClick}>
            <slot></slot>
        </button>`;
    }
}

customElements.define('c-button', Button);
