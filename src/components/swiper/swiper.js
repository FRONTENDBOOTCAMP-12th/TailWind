import { LitElement, html } from 'lit';
import { register } from 'swiper/element/bundle';
import reset from '@/styles/Reset.js';
import { SwiperStyles } from './swiperStyle.js';

register();

class BannerSwiper extends LitElement {
    static styles = [reset, SwiperStyles];

    render() {
        return html`
            <swiper-container autoplay="true" autoplay-delay="3000" disableOnInteraction="true" navigation="true" pagination="true" loop="true">
                <img class="swiper-slide" src="/assets/main-banner-1.png" alt="이 주의 특가 한 눈에 보기" />

                <img class="swiper-slide" src="/assets/main-banner-2.png" alt="특가부터 인기 브랜드까지 최대 77% 할인 + 쿠폰팩" />
            </swiper-container>
        `;
    }
}

customElements.define('banner-swiper', BannerSwiper);
