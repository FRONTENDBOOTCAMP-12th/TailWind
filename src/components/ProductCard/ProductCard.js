import { createAriaText } from '@/utils/utils.js';
import productCardStyle from './ProductCardStyle.js';
import { fileUrl } from '@/api/PocketHost.js';
import resetCss from '@/styles/Reset.js';
import '@/components/AddCart/AddCart.js';
import { LitElement, html } from 'lit';

class ProductCard extends LitElement {
    static properties = {
        // idx를 부모 컴포넌트에서 전달받아 렌더링하도록 유도
        // hidden은 불필요한 요소를 숨기기 위한 값
        // isModalOpen은 장바구니 추가 모달을 관리하는 값
        idx: { type: Object, attribute: 'idx' },
        hidden: { type: Boolean },
        isModalOpen: { type: Boolean },
        imageLoaded: { type: Boolean },
    };

    constructor() {
        super();
        this.hidden = false;
        this.isModalOpen = false;
        this.imageLoaded = false;
    }

    // 스타일 지정
    static styles = [resetCss, productCardStyle];

    // 모달을 열고 닫는 이벤트함수
    handleOpenCartModal() {
        this.isModalOpen = true;
        console.log(console.log(this.idx));
    }

    closeModal(e) {
        this.isModalOpen = false;
        e.target.hidePopover();
    }

    connectedCallback() {
        super.connectedCallback();
        this.preloadImage();
    }

    preloadImage() {
        const img = new Image();
        img.onload = () => {
            this.imageLoaded = true;
            this.requestUpdate();
        };
        img.src = `${fileUrl}${this.idx.id}/${this.idx.main_image}`;
    }

    // HTML 렌더 부분
    render() {
        return html`
            <section class="product-card-container">
                <div class="img-container">
                    ${!this.imageLoaded
                        ? html`<div class="image-skeleton"></div>`
                        : html`
                              <a href="/src/pages/ProductDetail/index.html?id=${this.idx['id']}" class="product-detail-link">
                                  <img
                                      src="${fileUrl + this.idx['id'] + '/' + this.idx['main_image']}"
                                      alt="${createAriaText(this.idx['name'])} 이미지"
                                      class="product-img"
                                      @click=${this.handleClick}
                                  />
                              </a>
                              <!-- 모달 오픈을 위한 버튼 -->
                              <button
                                  type="button"
                                  popovertarget="popup"
                                  popovertargetaction="toggle"
                                  aria-label="장바구니에 추가하기"
                                  class="save-item"
                                  @click=${this.handleOpenCartModal}
                              ></button>

                              <!-- 장바구니 담기 모달 컴포넌트 -->
                              <add-cart
                                  popover
                                  id="popup"
                                  ?isModalOpen=${this.isModalOpen}
                                  idx=${JSON.stringify(this.idx)}
                                  @modal-close=${this.closeModal}
                              ></add-cart>
                          `}
                </div>

                <!-- 제품 상세 페이지 연결 링크 -->
                <a href="/src/pages/ProductDetail/index.html?id=${this.idx['id']}" class="text-container">
                    <!-- 접근성을 고려햐여 할인된 가격과 원래 가격, 할인율이 각각 무엇에 해당하는지 명시 -->
                    <span class="special-desc">${this.idx['category']}</span>
                    <h3 class="title" aria-hidden="true">${this.idx['name']}</h3>
                    <p class="sr-only">${createAriaText(this.idx['name'])}</p>
                    <div>
                        <!-- 할인율이 0이라면 불필요한 요소이므로 hidden처리 -->
                        <!-- sr-only 처리를 하여 screen reader가 읽을 수 있도록 유도 -->
                        <span class="sr-only">할인율</span>
                        <span class="discount" ?hidden=${this.idx['discount'] > 0 ? this.hidden : !this.hidden}>${this.idx['discount']}%</span>
                        <span class="sr-only">할인된 가격</span>

                        <!-- 할인된 가격을 계산하는 계산식 -->
                        <span class="real-price"
                            >${Math.floor(this.idx['price'] - this.idx['price'] * this.idx['discount'] * 0.01).toLocaleString()} 원</span
                        >
                    </div>

                    <!-- 할인율이 0이라면 불필요한 요소이므로 hidden 처리 -->
                    <span class="sr-only">원래 가격</span>
                    <span class="price" ?hidden=${this.idx['discount'] > 0 ? this.hidden : !this.hidden}>
                        <!-- 할인되기 전 가격 -->
                        ${this.idx['price'].toLocaleString()} 원
                    </span>
                    <span class="desc">${this.idx['description']}</span>

                    <!-- 각각의 요소들이 true인 상태일때만 보이게 설정 -->
                    <div class="product-tag">
                        <span ?hidden=${!this.idx['NatureKartOnly']}>NatureKart Only</span>
                        <span ?hidden=${!this.idx['limitedQuantity']}>한정 수량</span>
                    </div>
                </a>
            </section>
        `;
    }
}

customElements.define('product-card', ProductCard);
