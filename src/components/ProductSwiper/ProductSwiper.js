import { LitElement, html, css } from 'lit';
import { register } from 'swiper/element/bundle';
import productSwiperStyle from './ProductSwiperStyle.js';
import '@/components/ProductCard/ProductCard.js';
import resetCss from '@/styles/reset.js';
import { pb } from '@/api/PocketHost.js';

register();

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
            <swiper-container disableOnInteraction="false" navigation="true" slides-per-view="4" slides-per-group="4">
                ${Array.isArray(this.products)
                    ? this.products.map((idx) => {
                          return html`<swiper-slide><product-card idx=${JSON.stringify(idx)}></product-card></swiper-slide>`;
                      })
                    : ''}
            </swiper-container>
        `;
    }
}

customElements.define('product-swiper', ProductSwiper);
