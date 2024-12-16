import '@/layout/header.js';
import '@/components/modal/modal.js';
import '@/components/label/label.js';
import '@/components/radio-group/radioGroup.js';
import { LitElement, html } from 'lit';
import PocketBase from 'pocketbase';

class ProductDetail extends LitElement {
    constructor() {
        super();
        this.pb = new PocketBase(import.meta.env.VITE_API_URL);
    }

    async connectedCallback() {
        super.connectedCallback();
        const product = await this.pb.collection('product_detail_info').getOne('l8125u60nj73e27');
        console.log(product);
        this.product = product;
    }

    render() {
        return html`<div>상품 상세</div>`;
    }
}

customElements.define('product-detail', ProductDetail);
