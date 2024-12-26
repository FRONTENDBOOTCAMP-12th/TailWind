import { LitElement, html } from 'lit';
import { labelStyles } from '@/components/label/labelStyles.js';
import resetStyles from '@/styles/reset';

export class Label extends LitElement {
    static styles = [resetStyles, labelStyles];

    static properties = {
        required: { type: Boolean, reflect: true },
    };

    constructor() {
        super();
        this.required = false;
    }

    render() {
        return html`<label class="c-label"> <slot></slot>${this.required ? html` <span class="required" aria-hidden="true">*</span>` : ''} </label>`;
    }
}

customElements.define('c-label', Label);
