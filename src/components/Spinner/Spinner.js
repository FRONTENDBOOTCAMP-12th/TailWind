import { html, LitElement } from 'lit';
import resetCss from '@/styles/Reset.js';
import spinnerStyle from './SpinnerStyle.js';

class Spinner extends LitElement {
    static styles = [resetCss, spinnerStyle];

    render() {
        return html` <div class="loader"></div> `;
    }
}

customElements.define('c-spinner', Spinner);
