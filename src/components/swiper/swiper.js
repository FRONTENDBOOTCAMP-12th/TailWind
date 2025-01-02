import { SwiperStyles } from './swiperStyle.js';
import { register } from 'swiper/element/bundle';
import resetCss from '@/styles/Reset.js';
import { LitElement, html } from 'lit';

register();

class BannerSwiper extends LitElement {
    static styles = [resetCss, SwiperStyles];

    render() {
        return html`
            <swiper-container
                ?autoplay=${true}
                autoplay-delay="3000"
                disableOnInteraction="true"
                ?navigation=${true}
                ?pagination=${true}
                ?loop=${true}
            >
                <swiper-slide><img class="banner-img" src="/assets/main-banner-1.webp" alt="이 주의 특가 한 눈에 보기" /></swiper-slide>

                <swiper-slide
                    ><img class="banner-img" src="/assets/main-banner-2.webp" alt="특가부터 인기 브랜드까지 최대 77% 할인 + 쿠폰팩"
                /></swiper-slide>
            </swiper-container>
        `;
    }
}

customElements.define('banner-swiper', BannerSwiper);
