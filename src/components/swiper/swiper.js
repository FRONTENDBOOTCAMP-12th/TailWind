import { LitElement, html, css } from 'lit';
import { register } from 'swiper/element/bundle';
import reset from '@/styles/reset.js';
register();

class ProductSwiper extends LitElement {
    static styles = [reset, css``];

    render() {
        return html`
            <swiper-container autoplay delay="100" disableOnInteraction="false" navigation="true" pagination="true" loop="true">
                <img class="swiper-slide" src="/public/assets/main-banner-1.png" alt="이 주의 특가 한 눈에 보기" />
                <img class="swiper-slide" src="/public/assets/main-banner-2.png" alt="특가부터 인기 브랜드까지 최대 77% 할인 + 쿠폰팩" />
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </swiper-container>
        `;
    }
}

customElements.define('product-swiper', ProductSwiper);
