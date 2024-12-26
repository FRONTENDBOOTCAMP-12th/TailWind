import { LitElement, html } from 'lit';
import { radioGroupStyles } from '@/components/radio-group/radioGroupStyles';
import resetStyles from '@/styles/reset';
import '@/components/radio/radio';

export class RadioGroup extends LitElement {
    static styles = [radioGroupStyles, resetStyles];

    static properties = {
        selectedValue: { type: String, state: true },
        name: { type: String, reflect: true },
    };

    constructor() {
        super();
        this.selectedValue = '';
        this.name = '';
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('radio-change', this._handleRadioChange);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('radio-change', this._handleRadioChange);
    }

    _handleRadioChange(e) {
        // 이벤트 전파 중지
        e.stopPropagation();

        const radios = this.querySelectorAll('c-radio');

        // 모든 라디오 버튼을 순회하면서 체크 해제
        radios.forEach((radio) => {
            radio.checked = false;
        });

        // 선택된 라디오만 체크
        const selectedRadio = e.target;
        selectedRadio.checked = true;
        this.selectedValue = selectedRadio.id;

        // 변경 이벤트 발생
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: this.selectedValue,
                },
                bubbles: true,
                composed: true,
            })
        );
    }

    firstUpdated() {
        const radios = this.querySelectorAll('c-radio');
        // name 속성 설정
        radios.forEach((radio) => {
            radio.name = this.name;
        });

        // 초기 선택된 라디오 확인
        const checkedRadio = Array.from(radios).find((radio) => radio.checked);
        if (checkedRadio) {
            this.selectedValue = checkedRadio.id;
        }
    }

    render() {
        return html`
            <div class="radio-container">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('c-radio-group', RadioGroup);
