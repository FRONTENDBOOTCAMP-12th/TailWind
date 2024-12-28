import checkboxStyle from './CheckBoxStyle.js';
import resetCss from '@/styles/Reset.js';
import { html, LitElement } from 'lit';

class Checkbox extends LitElement {
    static styles = [resetCss, checkboxStyle];

    static properties = {
        checked: { type: Boolean, attribute: 'checked', reflect: true },
    };

    constructor() {
        super();
        this.checked = false;
    }

    _handleChange(event) {
        this.checked = event.target.checked;
        this.dispatchEvent(
            new CustomEvent('checkbox-change', {
                detail: { checked: this.checked },
                bubbles: true,
                composed: true,
            })
        );
    }

    // 리셋 메서드 추가
    reset() {
        this.checked = false;
        // 체크박스 상태 변경 이벤트 발생
        this.dispatchEvent(
            new CustomEvent('checkbox-change', {
                detail: { checked: false },
                bubbles: true,
                composed: true,
            })
        );
    }

    render() {
        return html`<input type="checkbox" name="checkbox" id="checkbox" .checked=${this.checked} @change=${this._handleChange} />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-label="체크박스">
                <g fill="none" fill-rule="evenodd">
                    <circle cx="12" cy="12" r="12" />
                    <path
                        fill-rule="nonzero"
                        d="M17.474 7.966c.295-.291.77-.287 1.06.008.265.268.286.685.066.977l-.074.083-7.615 7.5c-.266.262-.677.286-.969.072l-.084-.072-3.384-3.333c-.295-.29-.299-.765-.008-1.06.264-.269.68-.296.976-.08l.084.071 2.858 2.815 7.09-6.981z"
                    />
                </g>
            </svg>
            <label for="checkbox">
                <slot></slot>
            </label>`;
    }
}

customElements.define('c-checkbox', Checkbox);
