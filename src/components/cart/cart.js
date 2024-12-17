import cartStyle from '@/components/cart/cartStyle.js';
import '@/components/inc-dec-component/incDecComponent.js';
import reset from '@/styles/reset.js';
import { LitElement, html } from 'lit';
import PocketBase from 'pocketbase';

class Cart extends LitElement {
    static styles = [reset, cartStyle];

    static properties = {
        user: { type: Object },
        cartItems: { type: Object },
        productList: { type: Array },
        productFrozen: { type: Array },
        productChilled: { type: Array },
        productTemperature: { type: Array },
        hideChilled: { type: Boolean },
        hideFrozen: { type: Boolean },
        hideTemperature: { type: Boolean },
    };

    constructor() {
        super();
        // 임시 유저 설정
        this.user = {
            address: '서울 중랑구 면목로 42길 11 (행운빌딩) 603호',
            id: 'abc123',
        };
    }

    // 카트 상품 페이지에 들어가게 되면 데이터를 불러와서 렌더링할 준비
    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
    }

    // 데이터를 불러오는 함수
    async fetchData() {
        // localStorage에 저장된 데이터만 렌더링하도록 유도
        this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
        console.log(this.cartItems);
        const localStorageKeys = Object.keys(this.cartItems);

        // 'id = "abc" || id="def" || ... 와 같이 변환
        // 단, localStorage가 비어있다면 id = '' 를 할당
        const filter =
            localStorageKeys
                .map((idx) => {
                    return `id = "${idx}"`;
                })
                .join(' || ') || "id = '' ";

        // pockethost를 통해 통신
        const pb = new PocketBase('https://통신주소.pockethost.io');

        // localStorage에 해당하는 key값만 추출
        this.productList = await pb.collection('product').getFullList({ filter: filter });

        // 각각의 배송 타입에 따라 냉동,냉장,상온으로 분류(filter)
        this.productFrozen = this.productList.filter((index) => index.product_type === 'frozen');
        this.productChilled = this.productList.filter((index) => index.product_type === 'chilled');
        this.productTemperature = this.productList.filter((index) => index.product_type === 'temperature');
    }

    // 값의 수량이 변할때마다 렌더링되도록 유도
    updateList() {
        this.requestUpdate();
    }

    // x버튼을 누르면 화면에서 사라지도록 설계(이는 이후 변동)
    deleteList(e) {
        // 클릭하는 영역의 id값을 가져오기 후 그 영역을 안보이게 처리
        const target = e.target.closest('div');
        target.style.display = 'none';

        // cartItems에서 클릭한 영역의 id 값을 제거 후 localStorage에 다시 저장
        delete this.cartItems[target.id];
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

        // 이후 가격의 계산을 위해 productList를 재할당
        this.productList = this.productList.filter((idx) => {
            return idx['id'] !== target.id;
        });
    }

    // 각각의 토글 버튼(각각의 항목을 숨김,보임 처리)
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
            <!--장바구니라는 타이틀이 있어 section으로 마크업-->
            <section class="cart-container">
                <h1 class="title-text">장바구니</h1>
                <!-- 모든 품목을 포함하는 container -->
                <div class="li-purchase-container">
                    <ul class="li-container">
                        <li>
                            <div class="product-check-container">
                                <!-- 이후 라디오 컴포넌트 결합을 통해 구현-->
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
                        <!-- 아까 분류했던 냉장 식품을 불러와 렌더링 -->
                        <!-- 접근성 고려하여 화면에 표시되지 않더라도 알 수 있게 sr-only로 처리 -->
                        <div class=${this.hideChilled ? 'sr-only' : ''}>
                            ${this.productChilled.map(
                                (idx) =>
                                    html` <div class="cart-product" id=${idx['id']}>
                                        <!-- 이미지는 다음과 같이 불러와야함-->
                                        <img
                                            class="cart-product-image"
                                            src="https://통신주소.pockethost.io/api/files/product/${idx['id']}/${idx['product_img']}"
                                        />
                                        <span class="cart-product-title">${idx['product_desc']}</span>
                                        <inc-dec-btn id=${idx['id']} @click=${this.updateList} incartpage="true"></inc-dec-btn>
                                        <span class="cart-product-price">
                                            <!--할인된 금액으로 결정되며 localStorage에 저장된 갯수만큼 현재 품목의 가격을 나타냄-->
                                            ${(
                                                (idx['price'] - idx['price'] * idx['discount'] * 0.01) *
                                                JSON.parse(localStorage.getItem('cartItems'))[`${idx['id']}`]
                                            ).toLocaleString()}원</span
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
                                <span class="frozen">냉동 식품</span>
                            </div>
                            <button class="dropdown-btn" type="button">
                                <img src="/assets/dropdown-arrow.svg" @click=${this.handleShowHideFrozen} />
                            </button>
                        </li>
                        <!-- TODO : 라디오 컴포넌트 삽입 -->
                        <!--분류해뒀던 냉동 타입 렌더링-->
                        <!-- 접근성 고려하여 화면에 표시되지 않더라도 알 수 있게 sr-only로 처리 -->
                        <div class=${this.hideFrozen ? 'sr-only' : ''}>
                            ${this.productFrozen.map(
                                (idx) =>
                                    html` <div class="cart-product" id=${idx['id']}>
                                        <img
                                            class="cart-product-image"
                                            src="https://통신주소.pockethost.io/api/files/product/${idx['id']}/${idx['product_img']}"
                                        />
                                        <span class="cart-product-title">${idx['product_desc']}</span>
                                        <inc-dec-btn id=${idx['id']} @click=${this.updateList} incartpage="true"></inc-dec-btn>
                                        <span class="cart-product-price">
                                            <!--할인된 금액으로 결정되며 localStorage에 저장된 갯수만큼 현재 품목의 가격을 나타냄-->
                                            ${(
                                                (idx['price'] - idx['price'] * idx['discount'] * 0.01) *
                                                JSON.parse(localStorage.getItem('cartItems'))[`${idx['id']}`]
                                            ).toLocaleString()}원</span
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
                                <span class="temperature">상온 식품</span>
                            </div>
                            <button class="dropdown-btn" type="button">
                                <img src="/assets/dropdown-arrow.svg" @click=${this.handleShowHideTemperautre} />
                            </button>
                        </li>
                        <!-- TODO : 라디오 컴포넌트 삽입 -->
                        <!--분류해뒀던 상온 타입 렌더링-->
                        <!-- 접근성 고려하여 화면에 표시되지 않더라도 알 수 있게 sr-only로 처리 -->
                        <div class=${this.hideTemperature ? 'sr-only' : ''}>
                            ${this.productTemperature.map(
                                (idx) =>
                                    html` <div class="cart-product" id=${idx['id']}>
                                        <img
                                            class="cart-product-image"
                                            src="https://통신주소.pockethost.io/api/files/product/${idx['id']}/${idx['product_img']}"
                                        />
                                        <span class="cart-product-title">${idx['product_desc']}</span>
                                        <inc-dec-btn id=${idx['id']} @click=${this.updateList} incartpage="true"></inc-dec-btn>
                                        <span class="cart-product-price">
                                            <!--할인된 금액으로 결정되며 localStorage에 저장된 갯수만큼 현재 품목의 가격을 나타냄-->
                                            ${(
                                                (idx['price'] - idx['price'] * idx['discount'] * 0.01) *
                                                JSON.parse(localStorage.getItem('cartItems'))[`${idx['id']}`]
                                            ).toLocaleString()}원</span
                                        >
                                        <button class="product-delete-btn" type="button" @click=${this.deleteList}>
                                            <img class="cart-product-delete" src="/assets/product-cancel.svg" />
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
                            <!-- TODO:배송지변경 버튼 작동시키기 -->
                            <button class="delivery-btn" type="button">배송지 변경</button>
                        </section>
                        <div class="purchase-price">
                            <div class="purchase-price-detail">
                                <div>
                                    <span>상품금액</span>
                                    <span>
                                        <!--localStroage와 api를 연동하여 가격 합산-->
                                        ${this.productList
                                            .reduce(
                                                (acc, cur) => (acc += cur['price'] * JSON.parse(localStorage.getItem('cartItems'))[`${cur['id']}`]),
                                                0
                                            )
                                            .toLocaleString()} <b>원</b></span
                                    >
                                </div>
                                <div>
                                    <span>상품할인금액</span>
                                    <span>
                                        <!--localStroage와 api를 연동하여 할인하는 가격 합산-->
                                        -${this.productList
                                            .reduce(
                                                (acc, cur) =>
                                                    (acc +=
                                                        cur['price'] *
                                                        cur['discount'] *
                                                        0.01 *
                                                        JSON.parse(localStorage.getItem('cartItems'))[`${cur['id']}`]),
                                                0
                                            )
                                            .toLocaleString()} <b>원</b></span
                                    >
                                </div>
                                <div>
                                    <span>배송비</span>
                                    <span>+3,000 <b>원</b></span>
                                </div>
                            </div>
                            <div class="purchase-info">
                                <div class="purchase-total-price">
                                    <span>결제예정금액</span>
                                    <span
                                        ><b>
                                            <!--localStroage와 api를 연동하여 총 가격 합산-->
                                            ${this.productList
                                                .reduce(
                                                    (acc, cur) =>
                                                        (acc +=
                                                            (cur['price'] - cur['price'] * cur['discount'] * 0.01) *
                                                            JSON.parse(localStorage.getItem('cartItems'))[`${cur['id']}`]),
                                                    0
                                                )
                                                .toLocaleString()} </b
                                        >원</span
                                    >
                                </div>
                                <div class="purchase-saving">
                                    <span>적립</span>
                                    <span
                                        >최대
                                        <!--결제하는 가격에서 0.1%를 계산후 반올림-->
                                        ${Math.round(
                                            this.productList.reduce(
                                                (acc, cur) =>
                                                    (acc +=
                                                        (cur['price'] - cur['price'] * cur['discount'] * 0.01) *
                                                        JSON.parse(localStorage.getItem('cartItems'))[`${cur['id']}`]),
                                                0
                                            ) * 0.001
                                        )}원
                                        적립 일반 0.1%</span
                                    >
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
                <cart-component></cart-component>
            </section>
        `;
    }
}

customElements.define('c-cart', Cart);
