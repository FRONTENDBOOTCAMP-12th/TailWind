import { LitElement, html } from 'lit';
import productPaginationStyle from './ProductPaginationStyle.js';
import resetCss from '@/styles/Reset.js';

class ProductPagination extends LitElement {
    static get styles() {
        return [resetCss, productPaginationStyle];
    }
    render() {
        return html`
            <ul class="product-pagination">
                <li>
                    <a href="/"><<</a>
                </li>
                <li>
                    <a href="/"><</a>
                </li>
                <li>
                    <a href="/">1</a>
                </li>
                <li>
                    <a href="/">2</a>
                </li>
                <li>
                    <a href="/">></a>
                </li>
                <li>
                    <a href="/">>></a>
                </li>
            </ul>
        `;
    }
}
customElements.define('product-pagination', ProductPagination);
