import '@/layout/header.js';
import '@/components/modal/modal.js';
import '@/components/label/label.js';
import '@/components/radio-group/radioGroup.js';
import { LitElement, html } from 'lit';
import { pb } from '@/api/pockethost.js';
import '@/components/product-header/productHeader.js';
import { productDetailStyles } from './productDetailStyles.js';
import resetStyles from '@/styles/reset.js';

class ProductDetail extends LitElement {
    static properties = {
        productId: { type: String, required: true },
    };

    static styles = [resetStyles, productDetailStyles];

    constructor() {
        super();
        this.productId = new URLSearchParams(window.location.search).get('id');
    }

    async connectedCallback() {
        super.connectedCallback();

        this.product = await pb.collection('product').getOne('l8125u60nj73e27');
        localStorage.setItem('product', JSON.stringify(this.product));
    }

    render() {
        return html` <div class="product-detail-container"><product-header></product-header></div> `;
    }
}

customElements.define('product-detail', ProductDetail);
