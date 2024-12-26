import { LitElement, html } from 'lit';
import addCartStyle from '@/components/add-cart/addCartStyle.js';
import reset from '@/styles/reset.js';
import '@/components/inc-dec-component/incDecComponent.js';
import '@/components/button/button.js';

class AddCart extends LitElement {
    static styles = [reset, addCartStyle];

    //
    static properties = {
        // idx를 받아 모달의 렌더링을 관리
        // isModalOpen과 itemQuantity로 모달의 상태를 관리(수량, 열림상태)
        isModalOpen: { type: Boolean },
        itemQuantity: { type: Number },
        idx: { type: Object, attribute: 'idx' },
    };

    // 변수값 초기 설정
    constructor() {
        super();
        // 초기값은 항상 1과 닫힘 상태
        this.itemQuantity = 1;
        this.isModalOpen = false;
    }

    // 취소 시 모달 창 닫는 이벤트
    handleCancel() {
        // 닫힐 때 수량을 초기화
        this.renderRoot.querySelector('inc-dec-btn').itemQuantity = 1;
        this.itemQuantity = 1;

        // 부모 컴포넌트에서 열고 닫을때 값이 정상적으로 변할 수 있도록 유도
        this.dispatchEvent(new CustomEvent('modal-close', { bubbles: true, composed: true }));
    }

    // 장바구니 담기 버튼 이벤트
    handleConfirm() {
        // cartItems에 저장해야하므로 localStorage에서 불러오기
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? {};

        // 만약 cartItems에 key에 대한 값이 존재한다면 기존의 값에다 등록하는 값을 더하고 아니라면 신규 등록
        let itemValue = cartItems[this.idx['id']] ?? 0;
        itemValue > 0
            ? (itemValue += this.renderRoot.querySelector('inc-dec-btn').itemQuantity)
            : (itemValue = this.renderRoot.querySelector('inc-dec-btn').itemQuantity);
        cartItems[this.idx['id']] = itemValue;

        // 이후 다시 localStorage에 저장
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // 값은 취소 했을때와 같이 초기화
        this.renderRoot.querySelector('inc-dec-btn').itemQuantity = 1;
        this.itemQuantity = 1;

        this.dispatchEvent(new CustomEvent('modal-close', { bubbles: true, composed: true }));
    }

    // 수량에 대한 값을 계산하기 위한 이벤트
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
                            <!-- 할인된 가격을 계산 -->
                            <span class="item-price"
                                >${Math.floor(this.idx['price'] - this.idx['price'] * this.idx['discount'] * 0.01).toLocaleString()}원</span
                            >
                            <!-- 초기값은 1로 설정 -->
                            <inc-dec-btn .itemQuantity=${this.itemQuantity} @quantity-change=${this.handleChange}></inc-dec-btn>
                        </div>
                    </section>
                    <section>
                        <div class="sum-container">
                            <h1 class="sum">합계</h1>
                            <!-- 제품 수량 * 제품 가격을 표시 -->
                            <div class="total-price">
                                <!-- 수량에 대한 가격을 계산 -->
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
                        <!-- 취소와 담기 컴포넌트-->
                        <c-button size="btn-md" type="button" @click=${this.handleCancel}>취소</c-button>
                        <c-button size="btn-md" mode="fill" type="button" @click=${this.handleConfirm}>장바구니 담기</c-button>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('add-cart', AddCart);
