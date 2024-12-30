import { LitElement, html } from 'lit';
import badgeStyle from './BadgeStyle.js';

class Badge extends LitElement {
    static properties = {
        type: { type: String },
    };

    static styles = [badgeStyle];

    constructor() {
        super();
        this.type = 'normal';
    }

    textContent() {
        switch (this.type) {
            case 'best':
                return '베스트';
            case 'normal':
                return '일반';
            default:
                return '공지';
        }
    }

    render() {
        return html` <span class="badge ${this.type}">${this.textContent()}</span> `;
    }
}

customElements.define('c-badge', Badge);
