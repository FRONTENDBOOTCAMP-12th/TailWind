import { LitElement, html } from 'lit';
import addCartStyle from '@/components/add-cart/addCartStyle.js';
import reset from '@/styles/reset.js';
import '@/components/inc-dec-component/incDecComponent.js';

class AddCart extends LitElement {
    // resetCss가 정상적으로 적용된다면 js파일 분리 안할 예정(이건 상황에 따라 유동적으로 결정)
    static styles = [reset, addCartStyle];

    // 모달 오픈 여부, 제품 수량, 제품 가격, 제품 설명 변수(TODO : 모달제외 모두 Get 통신 예정)
    static properties = {
        isModalOpen: { type: Boolean },
        itemQuantity: { type: Number },
        productPrice: { type: Number },
        itemDesc: { type: String },
        idx: { type: Object, attribute: 'idx' },
    };

    // 변수값 초기 설정
    constructor() {
        super();
        this.itemQuantity = 1;
        this.isModalOpen = false;
    }

    // 취소 시 모달 창 닫는 이벤트
    handleCancel() {
        this.renderRoot.querySelector('inc-dec-btn').itemQuantity = 1;
        this.itemQuantity = 1;

        this.dispatchEvent(new CustomEvent('modal-close', { bubbles: true, composed: true }));
    }

    // 확인 시 모달 창 닫는 이벤트(TODO : 장바구니에 설정한 값을 저장)
    handleConfirm() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? {};
        let itemValue = cartItems[this.idx['id']] ?? 0;
        itemValue > 0
            ? (itemValue += this.renderRoot.querySelector('inc-dec-btn').itemQuantity)
            : (itemValue = this.renderRoot.querySelector('inc-dec-btn').itemQuantity);
        cartItems[this.idx['id']] = itemValue;

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        this.renderRoot.querySelector('inc-dec-btn').itemQuantity = 1;
        this.itemQuantity = 1;

        this.dispatchEvent(new CustomEvent('modal-close', { bubbles: true, composed: true }));
    }

    handleChange(e) {
        this.itemQuantity = e.detail.itemQuantity;
    }

    render() {
        return html`
            <!-- isModalOpen에 따라 모달창 표시 -->
            <div class="add-cart  ${this.isModalOpen ? 'visible' : ''}">
                <div class="add-cart-container">
                    <section>
                        <h2 class="item-title">${this.idx['name']}</h2>
                        <div class="total-price-container">
                            <span class="item-price"
                                >${Math.floor(this.idx['price'] - this.idx['price'] * this.idx['discount'] * 0.01).toLocaleString()}원</span
                            >
                            <inc-dec-btn .itemQuantity=${this.itemQuantity} @quantity-change=${this.handleChange}></inc-dec-btn>
                        </div>
                    </section>
                    <section>
                        <div class="sum-container">
                            <h1 class="sum">합계</h1>
                            <!-- 제품 수량 * 제품 가격을 표시 -->
                            <div class="total-price">
                                ${Math.floor(
                                    (this.idx['price'] - this.idx['price'] * this.idx['discount'] * 0.01) * this.itemQuantity
                                ).toLocaleString()}
                                원
                            </div>
                        </div>
                        <div class="saving-container">
                            <span class="saving">적립</span>
                            <span class="saving-info">구매시 5원 적립</span>
                        </div>
                    </section>
                    <div class="add-confirm-container">
                        <button type="button" class="add-cancel" @click=${this.handleCancel}>취소</button>
                        <button type="submit" class="add-confirm" @click=${this.handleConfirm}>장바구니 담기</button>
                    </div>
                </div>
            </div>
            <!-- 이후 삭제될 예정 -->
        `;
    }
}

customElements.define('add-cart', AddCart);
