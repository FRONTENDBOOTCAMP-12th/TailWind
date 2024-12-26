import { LitElement, html } from 'lit';
import { popupStyles } from './popupStyle';
import resetStyles from '@/styles/reset.js';

class Popup extends LitElement {
    static styles = [resetStyles, popupStyles];
    render() {
        return html`
            <div class="popup">
                <div class="popup-text">
                    <p>
                        해당 사이트는 <br />가시안이며 비 상업적 취업을 위한<br />
                        포트폴리오 용으로만 사용하기 위해<br />
                        제작된 사이트 입니다.
                    </p>
                </div>
                <div class="popup-close">
                    <button class="todaypopup-close" type="button">오늘 하루 안 보기</button>
                    <button class="nowpopup-close" type="button">닫기</button>
                </div>
            </div>
        `;
    }
}

customElements.define('pop-up', Popup);
