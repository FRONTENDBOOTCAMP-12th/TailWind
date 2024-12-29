import { LitElement, html } from 'lit';
import productSwiperStyle from './ProductSwiperStyle.js';
import { register } from 'swiper/element/bundle';
import '@/components/ProductCard/ProductCard.js';
import resetCss from '@/styles/reset.js';
import { pb } from '@/api/PocketHost.js';

register();

class ProductSwiper extends LitElement {
    static styles = [resetCss, productSwiperStyle];

    static properties = {
        products: { type: Array },
        sort: { type: String, attribute: 'sort' },
        isLoading: { type: Boolean },
    };

    constructor() {
        super();
        this.isLoading = true;
        this.sort = 'price';
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
    }

    async fetchData() {
        try {
            const data = await pb.collection('product').getList(1, 12, {
                sort: `${this.sort}`,
            });
            this.products = [...data.items];
        } catch {
            console.log('error');
        } finally {
            this.isLoading = false;
        }
        setTimeout(() => {}, 1000);
    }

    get swiperContainer() {
        return this.renderRoot.querySelector('swiper-container');
    }

    get swiperInstance() {
        return this.swiperContainer.swiper || null;
    }

    firstUpdated() {
        if (this.swiperContainer) {
            if (!this.swiperInstance) {
                this.swiperContainer.addEventListener('swiper-init', () => {
                    this.attachNavigationEvent();
                });
            }
            if (this.swiperInstance) {
                this.attachNavigationEvent();

                this.swiperContainer.addEventListener('mousemove', () => {
                    const prev = this.renderRoot.querySelector('.custom-prev');
                    const next = this.renderRoot.querySelector('.custom-next');

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

    attachNavigationEvent() {
        const prev = this.renderRoot.querySelector('.custom-prev');
        const next = this.renderRoot.querySelector('.custom-next');

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
            <div class="recommend-text">
                <slot></slot>
            </div>
            <div class="swiper-container ${this.isLoading ? 'sr-only' : ''}">
                <swiper-container slides-per-view="4" slides-per-group="4" .navigation=${{ nextEl: '.custom-next', prevEl: '.custom-prev' }}>
                    ${Array.isArray(this.products)
                        ? this.products.map((idx) => {
                              return html`<swiper-slide><product-card idx=${JSON.stringify(idx)}></product-card></swiper-slide>`;
                          })
                        : ''}
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
                <div class="custom-prev">
                    <svg viewBox="0 0 10 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.71504 17.699C9.54482 17.8731 9.3169 17.9791 9.07406 17.9972C8.83122 18.0152 8.59013 17.944 8.39604 17.797L8.30104 17.715L0.301043 9.89798C0.12886 9.72974 0.0231428 9.50504 0.00330353 9.26513C-0.0165358 9.02523 0.0508347 8.78621 0.193043 8.59198L0.273043 8.49598L7.99604 0.313979C8.17057 0.128878 8.40909 0.0172553 8.66303 0.00183905C8.91696 -0.0135772 9.16723 0.0683727 9.36287 0.231001C9.55851 0.39363 9.68481 0.62471 9.71605 0.87719C9.7473 1.12967 9.68114 1.38457 9.53104 1.58998L9.45104 1.68598L2.40204 9.15498L9.69904 16.285C9.87317 16.4552 9.97921 16.6831 9.99725 16.926C10.0153 17.1688 9.94411 17.4099 9.79704 17.604L9.71504 17.699Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                <div class="custom-next">
                    <svg viewBox="0 0 10 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.284995 17.699C0.455221 17.8731 0.683135 17.9792 0.925979 17.9972C1.16882 18.0152 1.40991 17.9441 1.604 17.797L1.69899 17.715L9.69899 9.89799C9.87118 9.72976 9.97689 9.50506 9.99673 9.26515C10.0166 9.02524 9.9492 8.78623 9.80699 8.59199L9.72699 8.49599L2.004 0.313994C1.82947 0.128893 1.59095 0.0172706 1.33701 0.00185431C1.08307 -0.013562 0.832807 0.0683879 0.637168 0.231017C0.441529 0.393645 0.315228 0.624725 0.283984 0.877205C0.25274 1.12969 0.318903 1.38458 0.468997 1.58999L0.548995 1.686L7.598 9.15499L0.300994 16.285C0.126863 16.4552 0.0208302 16.6831 0.00278759 16.926C-0.015255 17.1688 0.055932 17.4099 0.202994 17.604L0.284995 17.699Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </div>
        `;
    }
}

customElements.define('c-swiper', ProductSwiper);
