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
        user: { type: Object },
        hideChilled: { type: Boolean },
        hideFrozen: { type: Boolean },
        hideTemperature: { type: Boolean },
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

        this.user = {
            address: '서울 중랑구 면목로 42길 11 (행운빌딩) 603호',
        };
    }

    deleteList(e) {
        e.target.closest('div').style.display = 'none';
        // TODO : api에서 삭제
    }

    handleShowHideTemperautre() {
        this.hideTemperature = !this.hideTemperature;
    }

    handleShowHideFrozen() {
        this.hideFrozen = !this.hideFrozen;
    }

    handleShowHideChilled() {
        this.hideChilled = !this.hideChilled;
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
                            <button class="dropdown-btn" type="button">
                                <img src="/assets/dropdown-arrow.svg" @click=${this.handleShowHideChilled} />
                            </button>
                        </li>
                        <!-- TODO : 라디오 컴포넌트 삽입 -->
                        <div class=${this.hideChilled ? 'sr-only' : ''}>
                            ${this.productChilled.map(
                                (idx) =>
                                    html` <div class="cart-product">
                                        <img class="cart-product-image" src="${idx.img}" />
                                        <span class="cart-product-title">${idx.productName}</span>
                                        <inc-dec-btn></inc-dec-btn>
                                        <span class="cart-product-price">
                                            <!-- TODO : localStorage에서 수량을 공유하는데 이를 분리해야함 -->
                                            ${(idx.price * +localStorage.getItem('itemQuantity')).toLocaleString()}원</span
                                        >
                                        <button class="product-delete-btn" type="button" @click=${this.deleteList}>
                                            <img class="cart-product-delete" src="/assets/product-cancel.svg" />
                                        </button>
                                    </div>`
                            )}
                        </div>
                        <li>
                            <div class="food-category-container">
                                <img src="/assets/frozen.svg" />
                                <span>냉동 식품</span>
                            </div>
                            <button class="dropdown-btn" type="button">
                                <img src="/assets/dropdown-arrow.svg" @click=${this.handleShowHideFrozen} />
                            </button>
                        </li>
                        <div class=${this.hideFrozen ? 'sr-only' : ''}>
                            ${this.productFrozen.map(
                                (idx) =>
                                    html` <div class="cart-product">
                                        <img class="cart-product-image" src="${idx.img}" />
                                        <span class="cart-product-title">${idx.productName}</span>
                                        <inc-dec-btn></inc-dec-btn>
                                        <span class="cart-product-price">
                                            <!-- TODO : localStorage에서 수량을 공유하는데 이를 분리해야함 -->
                                            ${(idx.price * +localStorage.getItem('itemQuantity')).toLocaleString()}원</span
                                        >
                                        <button class="product-delete-btn" type="button" @click=${this.deleteList}>
                                            <img class="cart-product-delete" src="/assets/product-cancel.svg" />
                                        </button>
                                    </div>`
                            )}
                        </div>
                        <li>
                            <div class="food-category-container">
                                <img src="/assets/temperature.svg" />
                                <span>상온 식품</span>
                            </div>
                            <button class="dropdown-btn" type="button">
                                <img src="/assets/dropdown-arrow.svg" @click=${this.handleShowHideTemperautre} />
                            </button>
                        </li>
                        <div class=${this.hideTemperature ? 'sr-only' : ''}>
                            ${this.productTemperature.map(
                                (idx) =>
                                    html` <div class="cart-product">
                                        <img class="cart-product-image" src="${idx.img}" />
                                        <span class="cart-product-title">${idx.productName}</span>
                                        <inc-dec-btn></inc-dec-btn>
                                        <span class="cart-product-price">
                                            <!-- TODO : localStorage에서 수량을 공유하는데 이를 분리해야함 -->
                                            ${(idx.price * +localStorage.getItem('itemQuantity')).toLocaleString()}원</span
                                        >
                                        <button class="product-delete-btn" type="button">
                                            <img class="cart-product-delete" src="/assets/product-cancel.svg" @click=${this.deleteList} />
                                        </button>
                                    </div>`
                            )}
                        </div>
                        <li>
                            <div class="product-check-container">
                                <img src="/assets/product-check.svg" />
                                <span>전체선택</span>
                            </div>
                        </li>
                    </ul>
                    <div class="purchase-container">
                        <section class="purchase-address">
                            <h1 class="address-title">
                                <img src="/assets/place-pin.svg" />
                                <span>배송지</span>
                            </h1>
                            <p class="address-info">${this.user.address}</p>
                            <p class="delivery-text">샛별배송</p>
                            <button class="delivery-btn" type="button">배송지 변경</button>
                        </section>
                        <div class="purchase-price">
                            <div class="purchase-price-detail">
                                <div>
                                    <span>상품금액</span>
                                    <span>40,680 <b>원</b></span>
                                </div>
                                <div>
                                    <span>상품할인금액</span>
                                    <span>-4,651 <b>원</b></span>
                                </div>
                                <div>
                                    <span>배송비</span>
                                    <span>+3,000 <b>원</b></span>
                                </div>
                            </div>
                            <div class="purchase-info">
                                <div class="purchase-total-price">
                                    <span>결제예정금액</span>
                                    <span><b>40,680</b>원</span>
                                </div>
                                <div class="purchase-saving">
                                    <span>적립</span>
                                    <span>최대 36원 적립 일반 0.1%</span>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="purchase-confirm">주문하기</button>
                        <div class="purchase-detail">
                            쿠폰/적립금은 주문서에서 사용 가능합니다<br />
                            [주문완료] 상태일 경우에만 주문 취소 가능합니다.<br />
                            [마이컬리 > 주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.<br />
                            쿠폰, 적립금 사용 금액을 제외한 실 결제 금액 기준으로 최종 산정됩니다.<br />
                            상품별로 적립금 지급 기준이 다를 수 있습니다. (상품 상세 페이지에서 확인 가능합니다)<br />
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('c-cart', Cart);
