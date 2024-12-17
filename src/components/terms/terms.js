import { LitElement, html, css } from 'lit';
import resetCss from '@/styles/reset.js';
class Terms extends LitElement {
    static styles = [
        resetCss,
        css`
            .terms-text {
                font-size: var(--paragraph---medium);
                color: var(--content);
            }
        `,
    ];
    render() {
        return html` <p class="terms-text"><slot></slot></p>`;
    }
}

customElements.define('c-terms', Terms);
