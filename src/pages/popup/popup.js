import { LitElement, html, css } from 'lit';
import reset from '/src/styles/reset.js';

class Popup extends LitElement {
    static proper;

    static styles = [
        reset,
        css`
            .popup {
                background-color: black;
                width: 27.5rem;
                height: 42rem;
                border-radius: 3%;
            }

            .popupText {
                position: flex;
                display: flex;
                flex-direction: column;
                width: 27.5rem;
                height: 36.625rem;
                justify-content: center;
                align-items: center;

                p {
                    color: white;
                    text-align: center;
                    line-height: 1.8;
                }
            }

            .popupClose {
                /* background-color: red; */
                position: flex;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 27.5rem;
                height: 5.375rem;
                color: black;
                border: none;
                background-color: #e1e1e1; /* -- gray100*/

                button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    width: 50%;
                    border: 1px solid gray;
                }

                .todaypopupClose {
                    border-bottom-left-radius: 8%;
                }

                .nowpopupClose {
                    border-bottom-right-radius: 8%;
                }
            }
        `,
    ];

    render() {
        return html`
            <div class="popup">
                <div class="popupText">
                    <p>
                        해당 사이트는 <br />가시안이며 비 상업적 취업을 위한<br />
                        포트폴리오 용으로만 사용하기 위해<br />
                        제작된 사이트 입니다.
                    </p>
                </div>
                <div class="popupClose">
                    <button class="todaypopupClose" type="button">오늘 하루 안 보기</button>
                    <button class="nowpopupClose" type="button">닫기</button>
                </div>
            </div>
        `;
    }
}

customElements.define('pop-up', Popup);
