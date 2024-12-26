import resetCss from '@/styles/Reset.js';
import radioStyle from './RadioStyle.js';
import { html, LitElement } from 'lit';

class Radio extends LitElement {
    static styles = [radioStyle, resetCss];

    static properties = {
        checked: { type: Boolean, reflect: true },
        id: { type: String },
        name: { type: String },
    };

    constructor() {
        super();
        this.checked = false;
        this.id = '';
        this.name = '';
    }

    handleChange(e) {
        e.stopPropagation();
        this.dispatchEvent(
            new CustomEvent('radio-change', {
                detail: {
                    id: this.id,
                    checked: true,
                },
                bubbles: true,
                composed: true,
            })
        );
    }

    render() {
        return html`
            <input type="radio" .checked=${this.checked} .id=${this.id} .name=${this.name} @change=${this.handleChange} />
            <label for=${this.id}>
                <slot></slot>
            </label>
        `;
    }
}

customElements.define('c-radio', Radio);
