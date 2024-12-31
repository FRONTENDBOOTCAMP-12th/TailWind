import '@/components/IncDecComponent/IncDecComponent.js';
import '@/components/CheckBox/CheckBox.js';
import '@/components/Spinner/Spinner.js';
import resetCss from '@/styles/Reset.js';
import { pb } from '@/api/PocketHost.js';
import '@/components/Button/Button.js';
import cartStyle from './CartStyle.js';
import { LitElement, html } from 'lit';
import Swal from 'sweetalert2';
import { gsap } from 'gsap';

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
        loading: { type: Boolean },
    };

    constructor() {
        super();
        // 임시 유저 설정
        this.user = JSON.parse(localStorage.getItem('auth')) ?? { user: { address: '로그인 해주시기 바랍니다' } };
        this.loading = true;
    }

    // 카트 상품 페이지에 들어가게 되면 데이터를 불러와서 렌더링할 준비
    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
    }

    // 데이터를 불러오는 함수
    async fetchData() {
        this.loading = true;
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
        // loading spinner 사용을 위한 try catch
        try {
            this.loading = true;
            this.productList = await pb.collection('product').getFullList({ filter: filter });
        } catch (err) {
            console.error(err);
        } finally {
            setTimeout(() => {
                this.loading = false;
            }, 500);
        }

        if (!this.productList) this.prouctList = [];

        // 각각의 배송 타입에 따라 냉동,냉장,상온으로 분류(filter)
        this.productFrozen = this.productList.filter((index) => index.package_type === '냉동');
        this.productChilled = this.productList.filter((index) => index.package_type === '냉장');
        this.productTemperature = this.productList.filter((index) => index.package_type === '상온');
    }

    // 각각의 토글 버튼(각각의 항목을 숨김,보임 처리) -> gsap 애니메이션 활용
    handleShowHideTemperautre() {
        this.hideTemperature = !this.hideTemperature;

        const target = this.renderRoot.querySelector('.temperature-container');

        if (this.hideTemperature) {
            gsap.to(target, {
                height: '3.5rem',
            });
        } else {
            gsap.to(target, {
                height: 'auto',
            });
        }
    }

    // 각각의 토글 버튼(각각의 항목을 숨김,보임 처리) -> gsap 애니메이션 활용
    handleShowHideFrozen() {
        this.hideFrozen = !this.hideFrozen;
        const target = this.renderRoot.querySelector('.frozen-container');

        if (this.hideFrozen) {
            gsap.to(target, {
                height: '3.5rem',
            });
        } else {
            gsap.to(target, {
                height: 'auto',
            });
        }
    }

    // 각각의 토글 버튼(각각의 항목을 숨김,보임 처리) -> gsap 애니메이션 활용
    handleShowHideChilled() {
        this.hideChilled = !this.hideChilled;
        const target = this.renderRoot.querySelector('.chilled-container');

        if (this.hideChilled) {
            gsap.to(target, {
                height: '3.5rem',
            });
        } else {
            gsap.to(target, {
                height: 'auto',
            });
        }
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

    // 수량 변경에 따른 localStorage의 데이터 변경
    storeCartItems(e) {
        const id = e.target.closest('div').id;
        const newValue = e.detail.itemQuantity;

        this.cartItems[id] = newValue;

        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        this.handleUpdate();
    }

    // 값의 변경에 따라 유동적으로 리렌더링 유도
    handleUpdate() {
        this.requestUpdate();
    }

    // 주문하기 버튼 클릭시 띄워주는 팝업창
    handleOrder() {
        // 만약 로그인 되지 않은 상태라면 클릭 시 로그인 페이지로 이동
        if (!JSON.parse(localStorage.getItem('auth'))) {
            location.href = '/src/pages/Login/index.html';
        } else {
            // 주문을 확인하는 팝업
            Swal.fire({
                title: '주문하시겠습니까?',
                showCancelButton: true,
                confirmButtonText: '주문하기',
                cancelButtonText: '취소하기',
                confirmButtonColor: 'var(--primary)',
                cancelButtonColor: 'var(--gray--500)',
                imageUrl: `/logo.svg`,
                imageHeight: 200,
                imageWidth: 200,
            }).then(async (result) => {
                // 확인을 누르면 발생하는 이벤트
                if (result.isConfirmed) {
                    // 선택한 물품을 담는 변수
                    const deliveryItem = {};
                    // 선택을 했다면 객체에 담기
                    for (const value of Object.keys(this.cartItems)) {
                        if (itemCounter[value]) {
                            deliveryItem[value] = this.cartItems[value];
                        }
                    }

                    // 만약 선택된 물품이 없다면 에러 팝업
                    if (Object.keys(deliveryItem).length === 0) {
                        Swal.fire({
                            title: '현재 선택된 상품이 없습니다!',
                            icon: 'error',
                            timer: 3000,
                        });
                    } else {
                        // 주문을 확정하면 확정됐다는 팝업과 동시에 localStorage삭제, 유저 정보 등록
                        Swal.fire({
                            title: '주문이 완료되었습니다!',
                            icon: 'success',
                            timer: 3000,
                        }).then(() => {
                            location.href = '/src/pages/MainPages/index.html';
                        });

                        // data에 정보를 저장해서 api 전송
                        const data = {
                            user: this.user.user.id,
                            order_list: JSON.stringify(deliveryItem),
                        };

                        await pb.collection('delivery').create(data);

                        localStorage.removeItem('cartItems');
                    }
                }
            });
        }
    }

    render() {
        // 데이터 불러오는 중 스피너 렌더링
        if (this.loading) {
            return html` <c-spinner></c-spinner>`;
        } else {
            return html`
                <!--장바구니라는 타이틀이 있어 section으로 마크업-->
                <section class="cart-container">
                    <h2 class="title-text">장바구니</h2>
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
                            <li class="chilled-container">
                                <div class="category-bar">
                                    <div class="food-category-container">
                                        <img src="/assets/chilled.svg" />
                                        <span class="category-text">냉장 식품</span>
                                    </div>
                                    <button class="dropdown-btn" type="button">
                                        <!-- 품목 숨김 버튼 -->
                                        <img src="/assets/dropdown-arrow.svg" @click=${this.handleShowHideChilled} />
                                    </button>
                                </div>
                                <!-- 아까 분류했던 냉장 식품을 불러와 렌더링 -->

                                <div>
                                    ${Array.isArray(this.productChilled)
                                        ? this.productChilled.map(
                                              (idx) => html`
                                                  <div class="cart-product" id=${idx['id']}>
                                                      <!-- 체크박스 컴포넌트에 overflow가 제대로 동작하지 않아 hidden을 부여 -->
                                                      <c-checkbox
                                                          ?checked=${itemCounter[idx['id']]}
                                                          @checkbox-change=${this.handleChangeCount}
                                                          ?hidden=${this.hideChilled}
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
                                                  </div>
                                              `
                                          )
                                        : ''}
                                </div>
                            </li>
                            <li class="frozen-container">
                                <div class="category-bar">
                                    <div class="food-category-container">
                                        <img src="/assets/frozen.svg" />
                                        <span class="category-text">냉동 식품</span>
                                    </div>
                                    <button class="dropdown-btn" type="button">
                                        <!-- 품목 숨김 버튼 -->
                                        <img src="/assets/dropdown-arrow.svg" @click=${this.handleShowHideFrozen} />
                                    </button>
                                </div>
                                <!--분류해뒀던 냉동 타입 렌더링-->
                                <div>
                                    ${Array.isArray(this.productFrozen)
                                        ? this.productFrozen.map(
                                              (idx) =>
                                                  html` <div class="cart-product" id=${idx['id']}>
                                                      <!-- 체크박스 컴포넌트에 overflow가 제대로 동작하지 않아 hidden을 부여 -->
                                                      <c-checkbox
                                                          ?checked=${itemCounter[idx['id']]}
                                                          @checkbox-change=${this.handleChangeCount}
                                                          ?hidden=${this.hideFrozen}
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
                            </li>
                            <li class="temperature-container">
                                <div class="category-bar">
                                    <div class="food-category-container">
                                        <img src="/assets/temperature.svg" />
                                        <span class="category-text">상온 식품</span>
                                    </div>
                                    <button class="dropdown-btn" type="button">
                                        <!-- 품목 숨김 버튼 -->
                                        <img src="/assets/dropdown-arrow.svg" @click=${this.handleShowHideTemperautre} />
                                    </button>
                                </div>
                                <!--분류해뒀던 상온 타입 렌더링-->
                                <div>
                                    ${Array.isArray(this.productTemperature)
                                        ? this.productTemperature.map(
                                              (idx) =>
                                                  html` <div class="cart-product" id=${idx['id']}>
                                                      <!-- 체크박스 컴포넌트에 overflow가 제대로 동작하지 않아 hidden을 부여 -->
                                                      <c-checkbox
                                                          ?checked=${itemCounter[idx['id']]}
                                                          @checkbox-change=${this.handleChangeCount}
                                                          ?hidden=${this.hideTemperature}
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
                            </li>
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
                                <h2 class="address-title">
                                    <img src="/assets/place-pin.svg" />
                                    <span>배송지</span>
                                </h2>
                                <p class="address-info">${this.user.user.address ?? ''}</p>
                                <p class="delivery-text">샛별배송</p>
                                <c-button type="button" mode="outline" size="btn-sm" ?hidden=${localStorage.getItem('auth') ? false : true}
                                    >배송지 변경</c-button
                                >
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
                                                <!--localStroage와 api를 연동하여 총 가격 합산 배송비는 상황에 따라 추가(20000원 기준) -->
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
                            <!-- 만약 로그인 된 상태라면 주문하기를 아니라면 로그인 텍스트를 표시 -->
                            <c-button type="submit" mode="fill" size="btn-sm" class="purchase-confirm" @click=${this.handleOrder}
                                >${localStorage.getItem('auth') ? '주문하기' : '로그인'}</c-button
                            >
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
}

export default itemCounter;
export const checkAll = { state: true };
customElements.define('c-cart', Cart);
