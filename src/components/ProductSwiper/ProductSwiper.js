import { LitElement, html } from 'lit';
import productSwiperStyle from './ProductSwiperStyle.js';
import { register } from 'swiper/element/bundle';
import '@/components/ProductCard/ProductCard.js';
import resetCss from '@/styles/Reset.js';
import { pb } from '@/api/PocketHost.js';

register();

class ProductSwiper extends LitElement {
    static styles = [resetCss, productSwiperStyle];

    static properties = {
        // products : 제품을 담을 배열
        // sort : 어떤 기준으로 정렬할 것인지
        // isLoading : 모든 품목이 호출되고 렌더링 되도록 체크하는 boolean값
        products: { type: Array },
        sort: { type: String, attribute: 'sort' },
        isLoading: { type: Boolean },
    };

    constructor() {
        super();
        // 초기에 데이터 호출이 되지 않았으므로 isLoading을 true로 설정
        this.isLoading = true;
        // 만약 sort를 받아오지 않는다면 기본값을 price로 설정
        this.sort = 'price';
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
    }

    // 데이터를 불러오는 함수
    async fetchData() {
        // 연속적인 호출을 할 경우 이전 호출을 취소하는걸 방지하기 위한 메서드
        pb.autoCancellation(false);

        try {
            // 12개의 데이터만 추출
            const data = await pb.collection('product').getList(1, 12, {
                sort: `${this.sort}`,
            });
            this.products = [...data.items];
        } catch (error) {
            console.log(error);
        } finally {
            // 데이터 통신이 종료되면 렌더링
            this.isLoading = false;
        }
    }

    // 스와이퍼 컨테이너 getter
    get swiperContainer() {
        return this.renderRoot.querySelector('swiper-container');
    }

    // 스와이퍼의 기능 getter
    get swiperInstance() {
        return this.swiperContainer.swiper || null;
    }

    // 스와이퍼의 렌더링이 끝난 후(네이게이션 div 포함) 이벤트 부여 -> 그래야 정상적으로 부여 가능
    firstUpdated() {
        // 스와이퍼 컨테이너를 잡았을때만 실행
        if (this.swiperContainer) {
            // 스와이퍼 기능을 잡지 못했다면 초기화 후 이벤트 부여
            if (!this.swiperInstance) {
                this.swiperContainer.addEventListener('swiper-init', () => {
                    this.attachNavigationEvent();
                });
            }
            // 스와이퍼 기능을 잡았다면 이벤트 부여
            if (this.swiperInstance) {
                this.attachNavigationEvent();

                // 드래그로도 네비게이션이 사라지는 이벤트를 부여하기 위해 mousemove설정
                this.swiperContainer.addEventListener('mousemove', () => {
                    const prev = this.renderRoot.querySelector('.prev-btn');
                    const next = this.renderRoot.querySelector('.next-btn');

                    // activeIndex(현재 index)에따라 display결정
                    if (this.swiperInstance?.activeIndex === 0) {
                        prev.style.display = 'none';
                    } else if (this.swiperInstance?.activeIndex === this.products.length - 3) {
                        next.style.display = 'none';
                    } else {
                        prev.style.display = 'flex';
                        next.style.display = 'flex';
                    }
                });
            }
        }
    }

    // 네비게이션 이벤트
    attachNavigationEvent() {
        // 각각 index를 마지막과 처음으로 왔을때 버튼이 사라지게 하도록 유도
        const prev = this.renderRoot.querySelector('.prev-btn');
        const next = this.renderRoot.querySelector('.next-btn');

        prev.addEventListener('click', (e) => {
            this.swiperInstance?.slidePrev();

            next.style.display = 'flex';

            const target = e.target.closest('div');

            if (this.swiperInstance?.activeIndex === 0) {
                target.style.display = 'none';
            }
        });

        next.addEventListener('click', (e) => {
            this.swiperInstance?.slideNext();

            prev.style.display = 'flex';

            const target = e.target.closest('div');

            if (this.swiperInstance?.activeIndex === this.products.length - 3) {
                target.style.display = 'none';
            }
        });
    }

    render() {
        return html`
            <!-- 스와이퍼에 대한 정보 텍스트 -->
            <div class="recommend-text">${!this.isLoading ? html`<slot></slot>` : ''}</div>
            ${this.isLoading
                ? html`
                      <div class="skeleton-container">
                          ${[1, 2, 3, 4].map(
                              () => html`
                                  <div class="skeleton-item">
                                      <div class="skeleton-image"></div>
                                      <div class="skeleton-text"></div>
                                      <div class="skeleton-text"></div>
                                      <div class="skeleton-price"></div>
                                  </div>
                              `
                          )}
                      </div>
                  `
                : html` <!-- 만약 데이터 GET통신이 완료되지 않았다면 보이지 않도록 설정 -->
                      <div class="swiper-container ${this.isLoading ? 'sr-only' : ''}">
                          <!-- 스와이퍼 하나당 4개의 아이템과 한 번 슬라이드 시 4개씩 넘어가도록 설정 -->
                          <swiper-container slides-per-view="4" slides-per-group="4" .navigation=${{ nextEl: '.next-btn', prevEl: '.prev-btn' }}>
                              <!-- 타입 가드 -->
                              ${Array.isArray(this.products)
                                  ? this.products.map((idx) => {
                                        return html`<swiper-slide><product-card idx=${JSON.stringify(idx)}></product-card></swiper-slide>`;
                                    })
                                  : ''}
                              <!-- 마지막은 전체보기 버튼을 넣어 물품 리스트 페이지로 이동 -->
                              <swiper-slide class="move-productlist">
                                  <button type="button" onclick="location.href='/src/pages/ProductList/index.html'">
                                      <figure>
                                          <svg viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="view-all-icon">
                                              <path
                                                  d="M0.284995 17.699C0.455221 17.8731 0.683135 17.9792 0.925979 17.9972C1.16882 18.0152 1.40991 17.9441 1.604 17.797L1.69899 17.715L9.69899 9.89799C9.87118 9.72976 9.97689 9.50506 9.99673 9.26515C10.0166 9.02524 9.9492 8.78623 9.80699 8.59199L9.72699 8.49599L2.004 0.313994C1.82947 0.128893 1.59095 0.0172706 1.33701 0.00185431C1.08307 -0.013562 0.832807 0.0683879 0.637168 0.231017C0.441529 0.393645 0.315228 0.624725 0.283984 0.877205C0.25274 1.12969 0.318903 1.38458 0.468997 1.58999L0.548995 1.686L7.598 9.15499L0.300994 16.285C0.126863 16.4552 0.0208302 16.6831 0.00278759 16.926C-0.015255 17.1688 0.055932 17.4099 0.202994 17.604L0.284995 17.699Z"
                                                  fill="currentColor"
                                              />
                                          </svg>

                                          <figcaption class="view-all-text">전체보기</figcaption>
                                      </figure>
                                  </button>
                              </swiper-slide>
                          </swiper-container>
                          <!-- custom navigation 설정 -->
                          <div class="prev-btn">
                              <svg viewBox="0 0 10 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M9.71504 17.699C9.54482 17.8731 9.3169 17.9791 9.07406 17.9972C8.83122 18.0152 8.59013 17.944 8.39604 17.797L8.30104 17.715L0.301043 9.89798C0.12886 9.72974 0.0231428 9.50504 0.00330353 9.26513C-0.0165358 9.02523 0.0508347 8.78621 0.193043 8.59198L0.273043 8.49598L7.99604 0.313979C8.17057 0.128878 8.40909 0.0172553 8.66303 0.00183905C8.91696 -0.0135772 9.16723 0.0683727 9.36287 0.231001C9.55851 0.39363 9.68481 0.62471 9.71605 0.87719C9.7473 1.12967 9.68114 1.38457 9.53104 1.58998L9.45104 1.68598L2.40204 9.15498L9.69904 16.285C9.87317 16.4552 9.97921 16.6831 9.99725 16.926C10.0153 17.1688 9.94411 17.4099 9.79704 17.604L9.71504 17.699Z"
                                      fill="currentColor"
                                  />
                              </svg>
                          </div>
                          <div class="next-btn">
                              <svg viewBox="0 0 10 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M0.284995 17.699C0.455221 17.8731 0.683135 17.9792 0.925979 17.9972C1.16882 18.0152 1.40991 17.9441 1.604 17.797L1.69899 17.715L9.69899 9.89799C9.87118 9.72976 9.97689 9.50506 9.99673 9.26515C10.0166 9.02524 9.9492 8.78623 9.80699 8.59199L9.72699 8.49599L2.004 0.313994C1.82947 0.128893 1.59095 0.0172706 1.33701 0.00185431C1.08307 -0.013562 0.832807 0.0683879 0.637168 0.231017C0.441529 0.393645 0.315228 0.624725 0.283984 0.877205C0.25274 1.12969 0.318903 1.38458 0.468997 1.58999L0.548995 1.686L7.598 9.15499L0.300994 16.285C0.126863 16.4552 0.0208302 16.6831 0.00278759 16.926C-0.015255 17.1688 0.055932 17.4099 0.202994 17.604L0.284995 17.699Z"
                                      fill="currentColor"
                                  />
                              </svg>
                          </div>
                      </div>`}
        `;
    }
}

customElements.define('c-swiper', ProductSwiper);
