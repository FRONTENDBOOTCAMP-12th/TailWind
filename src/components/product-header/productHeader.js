import { LitElement, html } from 'lit';
import { fileUrl } from '@/api/pockethost.js';
import { productHeaderStyles } from './productHeaderStyles.js';
import '@/components/inc-dec-component/incDecComponent.js';
import '@/components/button/button.js';
import resetStyles from '@/styles/reset.js';

class ProductHeader extends LitElement {
    static properties = {
        product: { type: Object, required: true },
        totalPrice: { type: Number, required: true },
    };

    constructor() {
        super();
        this.totalPrice = 0;
    }

    static styles = [resetStyles, productHeaderStyles];

    async connectedCallback() {
        super.connectedCallback();
        this.product = JSON.parse(localStorage.getItem('product'));
        this.totalPrice = localStorage.getItem('itemQuantity') * this.product.price;
    }

    handleChange() {
        this.totalPrice = localStorage.getItem('itemQuantity') * this.product.price;
        this.requestUpdate();
    }

    handleAddToCart() {
        const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        cart.push({ [`${this.product.id}`]: localStorage.getItem('itemQuantity') });
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }

    render() {
        return html`
            <div class="product-header">
                <img class="product-image" src="${fileUrl + this.product.id + '/' + this.product.main_image}" alt="${this.product.name}" />

                <div class="product-info-wrapper">
                    <div class="delivery-type">${this.product.delivery}</div>

                    <h1 class="product-title">${this.product.name}</h1>
                    <p class="product-subtitle">${this.product.description}</p>

                    <div class="product-price">${this.product.price.toLocaleString()}</div>

                    <p class="delivery-info">로그인 후, 적립 혜택이 제공됩니다.</p>
                    <!-- TODO: 로그인 상태에 따라 다르게 표시 -->
                    <p class="delivery-info">${this.product.delivery}</p>
                    <!-- TODO: 로그인 상태에 따라 다르게 표시 -->
                    <table class="product-info-table">
                        <tr>
                            <th>배송</th>
                            <td>
                                ${this.product.delivery}
                                <div class="sub-desc">23시 전 주문 시 내일 아침 7시 전 도착</div>
                            </td>
                        </tr>
                        <tr>
                            <th>판매자</th>
                            <td>${this.product.seller}</td>
                        </tr>
                        <tr>
                            <th>포장타입</th>
                            <td>${this.product.package_type}</td>
                        </tr>
                        <tr>
                            <th>판매단위</th>
                            <td>${this.product.unit}</td>
                        </tr>
                        <tr>
                            <th>중량/용량</th>
                            <td>${this.product.weight}</td>
                        </tr>
                        <tr>
                            <th>원산지</th>
                            <td>${this.product.origin}</td>
                        </tr>
                        <tr>
                            <th>알레르기정보</th>
                            <td>${this.product.allergy_info}</td>
                        </tr>
                        <tr>
                            <th>상품선택</th>
                            <td>
                                <div class="product-option-box">
                                    <div class="product-option-name">상품선택</div>
                                    <div class="product-option-value">
                                        <inc-dec-btn @change=${this.handleChange}></inc-dec-btn>${this.product.price.toLocaleString()}원
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="product-total-price-box">
                        <div class="product-total-price">총 상품 금액:<span>${this.totalPrice.toLocaleString()}</span>원</div>
                        <div>로그인 후, 적립 혜택 제공</div>
                    </div>
                    <div class="product-btn-box">
                        <c-button type="button" mode="outline">찜하기</c-button>
                        <c-button type="button" mode="outline">알림</c-button>
                        <c-button type="button" mode="fill" ?disabled=${this.totalPrice === 0} @click=${this.handleAddToCart}>장바구니 담기</c-button>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('product-header', ProductHeader);
