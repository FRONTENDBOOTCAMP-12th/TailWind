import '@/components/IncDecComponent/IncDecComponent.js';
import '@/components/CheckBox/CheckBox.js';
import resetCss from '@/styles/Reset.js';
import { pb } from '@/api/PocketHost.js';
import cartStyle from './CartStyle.js';
import { LitElement, html } from 'lit';

// 이후 컴포넌트 분리를 위한 외부로 보내는 객체(모든 품목의 체크 상태를 저장)
const itemCounter = {};

class Cart extends LitElement {
    static styles = [resetCss, cartStyle];

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
        totalPrice: { type: Number },
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
        this.cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? {};
        const localStorageKeys = Object.keys(this.cartItems);

        // 'id = "abc" || id="def" || ... 와 같이 변환
        // 단, localStorage가 비어있다면 id = '' 를 할당
        // itemCounter에 id값으로는 물품 id를, value로는 초기 설정값인 true를 저장
        const filter =
            localStorageKeys
                .map((idx) => {
                    itemCounter[idx] = true;
                    return `id = "${idx}"`;
                })
                .join(' || ') || "id = '' ";

        // pockethost를 통해 통신

        // localStorage에 해당하는 key값만 추출
        this.productList = await pb.collection('product').getFullList({ filter: filter });

        if (!this.productList) this.prouctList = [];

        // 각각의 배송 타입에 따라 냉동,냉장,상온으로 분류(filter)
        this.productFrozen = this.productList.filter((index) => index.package_type === '냉동');
        this.productChilled = this.productList.filter((index) => index.package_type === '냉장');
        this.productTemperature = this.productList.filter((index) => index.package_type === '상온');
    }

    // 값의 수량이 변할때마다 렌더링되도록 유도

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

    // 전체 선택의 상태를 즉각적으로 변경해주기 위한 함수
    checkAllState() {
        // itemCounter에 저장된 모든 상태가 true일때만 true를 저장하고 리렌더링
        for (const value of Object.keys(itemCounter)) {
            if (!itemCounter[value]) {
                checkAll['state'] = false;
                break;
            }

            checkAll['state'] = true;
        }

        this.requestUpdate();
    }

    deleteList(e, id) {
        // 클릭하는 영역의 id값을 가져오기 후 그 영역을 안보이게 처리
        this.cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? {};
        let target;

        // 만약 id를 전달받았다면 그에 해당하는 element를 찾아 이벤트 실행
        if (!id) {
            target = e.target.closest('div');
        } else {
            target = this.renderRoot.getElementById(`${id}`);
        }
        target.style.display = 'none';

        // cartItems에서 클릭한 영역의 id 값을 제거 후 localStorage에 다시 저장
        delete this.cartItems[target.id];
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

        // 상태를 저장하는 객체에서도 제거
        delete itemCounter[target.id];

        this.checkAllState();
    }

    // 개별 품목의 체크 상태를 변경하는 이벤트 함수
    handleChangeCount(e) {
        // 선택된 영역의 div에서 id를 추출 후 상태를 현재와 반대로 저장
        const id = e.target.closest('div').id;
        itemCounter[id] = !itemCounter[id];

        this.checkAllState();
    }

    // 전체 선택 체크박스 이벤트
    handleAllProuct() {
        // 전체 선택 관리 클릭 시 itemCounter에 저장된 모든 value가 true라면 true를 아니라면 false를 저장 후 리렌더링
        if (!checkAll['state']) {
            Object.keys(itemCounter).map((idx) => {
                itemCounter[idx] = true;
            });
        } else {
            Object.keys(itemCounter).map((idx) => {
                itemCounter[idx] = false;
            });
        }

        // 전체선택은 항상 클릭 시 반대가 되므로 해당 값을 저장
        checkAll['state'] = !checkAll['state'];
        this.requestUpdate();
    }

    deleteSelectList(e) {
        // itemCounter의 key를 순회하며 그에 해당하는 value가 true인 것들만 delete실행
        for (const value of Object.keys(itemCounter)) {
            if (itemCounter[value]) {
                this.deleteList(e, value);
            }
        }
    }

    storeCartItems(e) {
        const id = e.target.closest('div').id;
        const newValue = e.detail.itemQuantity;

        this.cartItems[id] = newValue;

        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        this.handleUpdate();
    }

    handleUpdate() {
        this.requestUpdate();
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
                                <!-- 체크박스의 상태가 변경되면 이벤트 발생 -->
                                <c-checkbox ?checked=${checkAll['state']} @checkbox-change=${this.handleAllProuct}>
                                    <span>전체선택</span>
                                    <span>
                                        <!-- reduce로 전체 길이와 선택된 요소들을 계산 -->
                                        (${Object.entries(itemCounter).reduce((acc, cur) => {
                                            return (acc += +cur[1]);
                                        }, 0)}/${Object.keys(itemCounter).length})
                                        |
                                    </span>
                                </c-checkbox>
                                <!-- 품목 삭제 버튼 -->
                                <button type="button" @click=${this.deleteSelectList}>선택 삭제</button>
                            </div>
                        </li>
                        <li>
                            <div class="food-category-container">
                                <img src="/assets/chilled.svg" />
                                <span class="category-text">냉장 식품</span>
                            </div>
                            <button class="dropdown-btn" type="button">
                                <!-- 품목 숨김 버튼 -->
                                <img src="/assets/dropdown-arrow.svg" @click=${this.handleShowHideChilled} />
                            </button>
                        </li>
                        <!-- 아까 분류했던 냉장 식품을 불러와 렌더링 -->
                        <!-- 접근성 고려하여 화면에 표시되지 않더라도 알 수 있게 sr-only로 처리 -->
                        <div class=${this.hideChilled ? 'sr-only' : ''}>
                            ${Array.isArray(this.productChilled)
                                ? this.productChilled.map(
                                      (idx) =>
                                          html` <div class="cart-product" id=${idx['id']}>
                                              <c-checkbox ?checked=${itemCounter[idx['id']]} @checkbox-change=${this.handleChangeCount}
                                                  >ff</c-checkbox
                                              >
                                              <!-- 이미지는 다음과 같이 불러와야함-->
                                              <img
                                                  class="cart-product-image"
                                                  src="${import.meta.env.VITE_API_URL}/api/files/product/${idx['id']}/${idx['main_image']}"
                                              />
                                              <span class="cart-product-title">${idx['name']}</span>
                                              <inc-dec-btn
                                                  .itemQuantity=${this.cartItems[idx['id']]}
                                                  @quantity-change=${this.storeCartItems}
                                              ></inc-dec-btn>
                                              <span class="cart-product-price">
                                                  <!--할인된 금액으로 결정되며 localStorage에 저장된 갯수만큼 현재 품목의 가격을 나타냄-->
                                                  ${(
                                                      Math.floor(idx['price'] - idx['price'] * idx['discount'] * 0.01) *
                                                      JSON.parse(localStorage.getItem('cartItems'))[`${idx['id']}`]
                                                  ).toLocaleString()}원</span
                                              >
                                              <!-- 품목 삭제 버튼 -->
                                              <button class="product-delete-btn" type="button" @click=${this.deleteList}>
                                                  <img class="cart-product-delete" src="/assets/product-cancel.svg" />
                                              </button>
                                          </div>`
                                  )
                                : ''}
                        </div>
                        <li>
                            <div class="food-category-container">
                                <img src="/assets/frozen.svg" />
                                <span class="category-text">냉동 식품</span>
                            </div>
                            <button class="dropdown-btn" type="button">
                                <!-- 품목 숨김 버튼 -->
                                <img src="/assets/dropdown-arrow.svg" @click=${this.handleShowHideFrozen} />
                            </button>
                        </li>
                        <!--분류해뒀던 냉동 타입 렌더링-->
                        <!-- 접근성 고려하여 화면에 표시되지 않더라도 알 수 있게 sr-only로 처리 -->
                        <div class=${this.hideFrozen ? 'sr-only' : ''}>
                            ${Array.isArray(this.productFrozen)
                                ? this.productFrozen.map(
                                      (idx) =>
                                          html` <div class="cart-product" id=${idx['id']}>
                                              <c-checkbox ?checked=${itemCounter[idx['id']]} @checkbox-change=${this.handleChangeCount}
                                                  >ff</c-checkbox
                                              >
                                              <!-- 이미지는 다음과 같이 불러와야함-->
                                              <img
                                                  class="cart-product-image"
                                                  src="${import.meta.env.VITE_API_URL}/api/files/product/${idx['id']}/${idx['main_image']}"
                                              />
                                              <span class="cart-product-title">${idx['name']}</span>
                                              <inc-dec-btn
                                                  .itemQuantity=${this.cartItems[idx['id']]}
                                                  @quantity-change=${this.storeCartItems}
                                              ></inc-dec-btn>
                                              <span class="cart-product-price">
                                                  <!--할인된 금액으로 결정되며 localStorage에 저장된 갯수만큼 현재 품목의 가격을 나타냄-->
                                                  ${(
                                                      Math.floor(idx['price'] - idx['price'] * idx['discount'] * 0.01) *
                                                      JSON.parse(localStorage.getItem('cartItems'))[`${idx['id']}`]
                                                  ).toLocaleString()}원</span
                                              >
                                              <button class="product-delete-btn" type="button" @click=${this.deleteList}>
                                                  <img class="cart-product-delete" src="/assets/product-cancel.svg" />
                                              </button>
                                          </div>`
                                  )
                                : ''}
                        </div>
                        <li>
                            <div class="food-category-container">
                                <img src="/assets/temperature.svg" />
                                <span class="category-text">상온 식품</span>
                            </div>
                            <button class="dropdown-btn" type="button">
                                <!-- 품목 숨김 버튼 -->
                                <img src="/assets/dropdown-arrow.svg" @click=${this.handleShowHideTemperautre} />
                            </button>
                        </li>
                        <!--분류해뒀던 상온 타입 렌더링-->
                        <!-- 접근성 고려하여 화면에 표시되지 않더라도 알 수 있게 sr-only로 처리 -->
                        <div class=${this.hideTemperature ? 'sr-only' : ''}>
                            ${Array.isArray(this.productTemperature)
                                ? this.productTemperature.map(
                                      (idx) =>
                                          html` <div class="cart-product" id=${idx['id']}>
                                              <c-checkbox ?checked=${itemCounter[idx['id']]} @checkbox-change=${this.handleChangeCount}
                                                  >ff</c-checkbox
                                              >
                                              <!-- 이미지는 다음과 같이 불러와야함-->
                                              <img
                                                  class="cart-product-image"
                                                  src="${import.meta.env.VITE_API_URL}/api/files/product/${idx['id']}/${idx['main_image']}"
                                              />
                                              <span class="cart-product-title">${idx['name']}</span>
                                              <inc-dec-btn
                                                  .itemQuantity=${this.cartItems[idx['id']]}
                                                  @quantity-change=${this.storeCartItems}
                                              ></inc-dec-btn>
                                              <span class="cart-product-price">
                                                  <!--할인된 금액으로 결정되며 localStorage에 저장된 갯수만큼 현재 품목의 가격을 나타냄-->
                                                  ${(
                                                      Math.floor(idx['price'] - idx['price'] * idx['discount'] * 0.01) *
                                                      JSON.parse(localStorage.getItem('cartItems'))[`${idx['id']}`]
                                                  ).toLocaleString()}원</span
                                              >
                                              <button class="product-delete-btn" type="button" @click=${this.deleteList}>
                                                  <img class="cart-product-delete" src="/assets/product-cancel.svg" />
                                              </button>
                                          </div>`
                                  )
                                : ''}
                        </div>
                        <li>
                            <div class="product-check-container">
                                <c-checkbox ?checked=${checkAll['state']} @checkbox-change=${this.handleAllProuct}>
                                    <span>전체선택</span>
                                    <span
                                        >(${Object.entries(itemCounter).reduce((acc, cur) => {
                                            return (acc += +cur[1]);
                                        }, 0)}/${Object.keys(itemCounter).length})
                                        |
                                    </span>
                                </c-checkbox>
                                <!-- 품목 삭제 버튼 -->
                                <button type="button" @click=${this.deleteSelectList}>선택 삭제</button>
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
                                        ${Array.isArray(this.productList)
                                            ? Math.floor(
                                                  this.productList.reduce((acc, cur) => {
                                                      if (itemCounter[cur['id']]) {
                                                          acc += cur['price'] * this.cartItems[`${cur['id']}`];
                                                      }
                                                      return acc;
                                                  }, 0)
                                              ).toLocaleString()
                                            : 0} <b>원</b></span
                                    >
                                </div>
                                <div>
                                    <span>상품할인금액</span>
                                    <span>
                                        <!--localStroage와 api를 연동하여 할인하는 가격 합산-->
                                        -${Array.isArray(this.productList)
                                            ? Math.floor(
                                                  this.productList.reduce((acc, cur) => {
                                                      if (itemCounter[cur['id']]) {
                                                          acc += cur['price'] * cur['discount'] * 0.01 * this.cartItems[`${cur['id']}`];
                                                      }
                                                      return acc;
                                                  }, 0)
                                              ).toLocaleString()
                                            : 0} <b>원</b></span
                                    >
                                </div>
                                <div>
                                    <span>배송비</span>
                                    <!-- 배송비 계산 총 가격이 20000원 초과라면 0원 아니라면 3000원 -->
                                    <span
                                        >${(Array.isArray(this.productList)
                                            ? Math.floor(
                                                  this.productList.reduce((acc, cur) => {
                                                      if (itemCounter[cur['id']]) {
                                                          acc +=
                                                              (cur['price'] - cur['price'] * cur['discount'] * 0.01) *
                                                              JSON.parse(localStorage.getItem('cartItems'))[`${cur['id']}`];
                                                      }
                                                      return acc;
                                                  }, 0)
                                              )
                                            : 0) > 20000
                                            ? 0
                                            : '+3,000'} <b>원</b></span
                                    >
                                </div>
                            </div>
                            <div class="purchase-info">
                                <div class="purchase-total-price">
                                    <span>결제예정금액</span>
                                    <span
                                        ><b>
                                            <!--localStroage와 api를 연동하여 총 가격 합산-->
                                            ${((Array.isArray(this.productList)
                                                ? Math.floor(
                                                      this.productList.reduce((acc, cur) => {
                                                          if (itemCounter[cur['id']]) {
                                                              acc +=
                                                                  (cur['price'] - cur['price'] * cur['discount'] * 0.01) *
                                                                  JSON.parse(localStorage.getItem('cartItems'))[`${cur['id']}`];
                                                          }
                                                          return acc;
                                                      }, 0)
                                                  )
                                                : 0) > 20000
                                                ? Array.isArray(this.productList)
                                                    ? Math.floor(
                                                          this.productList.reduce((acc, cur) => {
                                                              if (itemCounter[cur['id']]) {
                                                                  acc +=
                                                                      (cur['price'] - cur['price'] * cur['discount'] * 0.01) *
                                                                      JSON.parse(localStorage.getItem('cartItems'))[`${cur['id']}`];
                                                              }
                                                              return acc;
                                                          }, 0)
                                                      )
                                                    : 0
                                                : (Array.isArray(this.productList)
                                                      ? Math.floor(
                                                            this.productList.reduce((acc, cur) => {
                                                                if (itemCounter[cur['id']]) {
                                                                    acc +=
                                                                        (cur['price'] - cur['price'] * cur['discount'] * 0.01) *
                                                                        JSON.parse(localStorage.getItem('cartItems'))[`${cur['id']}`];
                                                                }
                                                                return acc;
                                                            }, 0)
                                                        )
                                                      : 0) + 3000
                                            ).toLocaleString()} </b
                                        >원</span
                                    >
                                </div>
                                <div class="purchase-saving">
                                    <span>적립</span>
                                    <span
                                        >최대
                                        <!--결제하는 가격에서 0.1%를 계산후 반올림-->
                                        ${Array.isArray(this.productList)
                                            ? Math.round(
                                                  this.productList.reduce((acc, cur) => {
                                                      if (itemCounter[cur['id']]) {
                                                          acc +=
                                                              (cur['price'] - cur['price'] * cur['discount'] * 0.01) *
                                                              JSON.parse(localStorage.getItem('cartItems'))[`${cur['id']}`];
                                                      }
                                                      return acc;
                                                  }, 0) * 0.001
                                              )
                                            : 0}원
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
            </section>
        `;
    }
}

export default itemCounter;
export const checkAll = { state: true };
customElements.define('c-cart', Cart);
