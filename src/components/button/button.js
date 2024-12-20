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
        mode: { type: String, attribute: 'mode', reflect: true },
        size: { type: String, attribute: 'size', reflect: true },
        disabled: { type: Boolean, attribute: 'disabled', reflect: true },
    };

    constructor() {
        super();
        this.type = 'button';
        this.mode = 'outline';
        this.size = 'btn-sm';
        this.disabled = false;
        this.clickEvent = new CustomEvent('click', { bubbles: true, composed: true });
    }

    handleClick(e) {
        e.stopPropagation();
        this.dispatchEvent(this.clickEvent);
    }

    render() {
        return html`<button type=${this.type} class="c-button ${this.mode} ${this.size}" ?disabled=${this.disabled} @click=${this.handleClick}>
            <slot></slot>
        </button>`;
    }
}

customElements.define('c-button', Button);
