import { LitElement, html } from 'lit';
import productSwiperStyle from './ProductSwiperStyle.js';
import '@/components/ProductCard/ProductCard.js';
import resetCss from '@/styles/reset.js';
import { pb } from '@/api/PocketHost.js';

class ProductSwiper extends LitElement {
    static styles = [resetCss, productSwiperStyle];

    static properties = {
        products: { type: Object },
    };

    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
    }

    async fetchData() {
        try {
            const data = await pb.collection('product').getFullList();
            this.products = data;
        } catch {
            alert('에러');
        }
    }

    render() {
        return html`
            <div class="recommend-text">
                <slot></slot>
            </div>
            <swiper-container navigation="true" slides-per-view="4" slides-per-group="4">
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
        `;
    }
}

customElements.define('product-swiper', ProductSwiper);
