import { LitElement, html } from 'lit';
import { fileUrl } from '@/api/pockethost.js';

class ProductHeader extends LitElement {
    static properties = {
        product: { type: Object, required: true },
    };

    constructor() {
        super();
    }

    async connectedCallback() {
        super.connectedCallback();
        this.product = JSON.parse(localStorage.getItem('product'));
    }

    render() {
        return html`
            <div class="product-header">
                ${this.product
                    ? html`
                <img class="product-image" src="${fileUrl + this.product.id + '/' + this.product.main_image}" alt="${this.product.name}" />

                <div class="delivery-type">샛별배송</div>

                <h1 class="product-title">${this.product.name}</h1>
                <p class="product-subtitle">${this.product.description}</p>

                <div class="product-price">
                    <span class="price">${this.product.price.toLocaleString()}</span>
                </div>

                    <p class="delivery-info">${this.product.delivery}</p>
                </div>
                `
                    : html` <div>로딩중...</div> `}
            </div>
        `;
    }
}

customElements.define('product-header', ProductHeader);
