import resetCss from '@/styles/Reset.js';
import labelStyle from './LabelStyle.js';
import { LitElement, html } from 'lit';

export class Label extends LitElement {
    static styles = [resetCss, labelStyle];

    static properties = {
        required: { type: Boolean, reflect: true },
    };

    constructor() {
        super();
        this.required = false;
    }

    render() {
        return html`<label class="c-label"> <slot></slot>${this.required ? html`<span class="required">*</span>` : ''} </label>`;
    }
}

customElements.define('c-label', Label);
