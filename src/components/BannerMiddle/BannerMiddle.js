import reset from '@/styles/Reset.js';
import { LitElement, html } from 'lit';
import BannerMiddleStyle from './BannerMiddleStyle.js';

class BannerMiddle extends LitElement {
    static styles = [reset, BannerMiddleStyle];

    render() {
        return html`
            <div class="bannermiddle">
                <img src="/assets/medium-banner.webp" alt="10월 컬리마켓 할인 적립률 up + 3종 쿠폰팩" />
            </div>
        `;
    }
}

customElements.define('banner-middle', BannerMiddle);
