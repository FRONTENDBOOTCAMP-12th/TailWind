import { html, LitElement } from 'lit';
import resetCss from '@/styles/Reset.js';
import popupStyle from './PopUpStyle.js';

class Popup extends LitElement {
    static styles = [resetCss, popupStyle];
    constructor() {
        super();
        this.isHidden = localStorage.getItem('dontShowPopupToday') === 'true';
    }

    closePopup() {
        this.isHidden = true;
        this.requestUpdate();
    }

    dontShowToday() {
        this.closePopup();
        localStorage.setItem('dontShowPopupToday', 'true');
    }

    render() {
        return html`
            <div class="popup">
                <div class="popup-content">
                    <p>
                        해당 사이트는 <br />가시안이며 비 상업적 취업을 위한<br />
                        포트폴리오 용으로만 사용하기 위해<br />
                        제작된 사이트입니다.
                    </p>
                    <div class="button-container">
                        <button @click=${this.dontShowToday}>오늘 하루 안 보기</button>
                        <button @click=${this.closePopup}>닫기</button>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('pop-up', Popup);
