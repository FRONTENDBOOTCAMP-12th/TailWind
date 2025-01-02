import '@/layout/Header/Header.js';
import '@/layout/Footer/Footer.js';
import '@/components/ProductSwiper/ProductSwiper.js';
import '@/components/BannerMiddle/BannerMiddle.js';
import '@/components/swiper/swiper.js';
import '@/components/PopUp/PopUp.js';
import { LitElement, html } from 'lit';

export default class App extends LitElement {
    render() {
        return html`
            <pop-up></pop-up>
            <banner-swiper></banner-swiper>
            <c-swiper>이 상품 어때요?</c-swiper>
            <banner-middle></banner-middle>
            <c-swiper sort="-discount">놓치면 후회할 가격</c-swiper>
        `;
    }
}

customElements.define('app-root', App);
