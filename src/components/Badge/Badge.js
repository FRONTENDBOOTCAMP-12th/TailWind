import { LitElement, html } from 'lit';
import badgeStyle from './BadgeStyle.js';

class Badge extends LitElement {
    static properties = {
        type: { type: String },
    };

    static styles = [badgeStyle];

    constructor() {
        super();
        this.type = 'info';
    }

    render() {
        return html` <span class="badge ${this.type}"><slot></slot></span> `;
    }
}

customElements.define('c-badge', Badge);
