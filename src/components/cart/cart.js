import { LitElement, html } from 'lit';
import reset from '@/styles/reset.js';
import cartStyle from '@/components/cart/cartStyle.js';
import '@/components/inc-dec-component/incDecComponent.js';

class Cart extends LitElement {
    static styles = [reset, cartStyle];

    static properties = {
        productList: { type: Array },
        productFrozen: { type: Array },
        productChilled: { type: Array },
        productTemperature: { type: Array },
    };

    constructor() {
        super();
        this.productList = [
            {
                img: '/assets/product01.png',
                productName: '제품 이름1',
                price: 4980,
                priceNum: 3,
                productTreat: 'frozen',
            },
            {
                img: '/assets/product01.png',
                productName: '제품 이름',
                price: 4980,
                priceNum: 3,
                productTreat: 'temperature',
            },
        ];

        this.productFrozen = this.productList.filter((index) => index.productTreat === 'frozen');
        this.productChilled = this.productList.filter((index) => index.productTreat === 'chilled');
        this.productTemperature = this.productList.filter((index) => index.productTreat === 'temperature');
    }

    render() {
        return html`
            <section class="cart-container">
                <h1 class="title-text">장바구니</h1>
                <div class="li-purchase-container">
                    <ul class="li-container">
                        <li>
                            <div class="product-check-container">
                                <img src="/assets/product-check.svg" />
                                <span @click=${this.handleChilck}>전체선택</span>
                            </div>
                        </li>
                        <li>
                            <div class="food-category-container">
                                <img src="/assets/chilled.svg" />
                                <span class="chilled">냉장 식품</span>
                            </div>
                            <img src="/assets/dropdown-arrow.svg" />
                        </li>
                        ${this.productFrozen.map(
                            (idx) =>
                                html`<img src="${idx.img}" /> <span>${idx.productName}</span> <span>${idx.price.toLocaleString()}원</span>
                                    <inc-dec-btn></inc-dec-btn>
                                    <img src="/assets/product-cancel.svg" /> `
                        )}
                        <li>
                            <div class="food-category-container">
                                <img src="/assets/frozen.svg" />
                                <span>냉동 식품</span>
                            </div>
                            <img src="/assets/dropdown-arrow.svg" />
                        </li>
                        <li>
                            <div class="food-category-container">
                                <img src="/assets/temperature.svg" />
                                <span>상온 식품</span>
                            </div>
                            <img src="/assets/dropdown-arrow.svg" />
                        </li>
                        <li>
                            <div class="product-check-container">
                                <img src="/assets/product-check.svg" />
                                <span>전체선택</span>
                            </div>
                        </li>
                    </ul>
                    <div class="purchase-container"></div>
                </div>
            </section>
        `;
    }
}

customElements.define('c-cart', Cart);
