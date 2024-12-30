import reset from '@/styles/Reset.js';
import { LitElement, html } from 'lit';
import BannerMiddleStyle from './BannerMiddleStyle.js';

class BannerMiddle extends LitElement {
    static styles = [reset, BannerMiddleStyle];

    render() {
        return html`
            <!-- 배너 -->
            <!-- 하이퍼 링크 나중에 추가하기 -->
            <div class="bannermiddle">
                <a href="/">
                    <img src="/public/assets/medium-banner.png" alt="10월 컬리마켓 할인 적립률 up + 3종 쿠폰팩" />
                </a>
            </div>
        `;
    }
}

customElements.define('banner-middle', BannerMiddle);
