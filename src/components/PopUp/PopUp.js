import { html, LitElement } from 'lit';
import resetCss from '@/styles/Reset.js';
import popupStyle from './PopUpStyle.js';

class PopUp extends LitElement {
    static styles = [resetCss, popupStyle];

    constructor() {
        super();
        this.isHidden = false;
    }

    connectedCallback() {
        super.connectedCallback();
        this.isHidden = localStorage.getItem('dontShowPopupToday') === 'true';
    }

    // 팝업 닫기
    closePopup() {
        this.isHidden = true;
        this.requestUpdate();
    }

    // 오늘 하루 안 보기
    dontShowToday() {
        this.closePopup();
        localStorage.setItem('dontShowPopupToday', 'true');
    }

    render() {
        return html`
            <div class="popup" style="display: ${this.isHidden ? 'none' : 'flex'};">
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

customElements.define('pop-up', PopUp);

console.log(1);
