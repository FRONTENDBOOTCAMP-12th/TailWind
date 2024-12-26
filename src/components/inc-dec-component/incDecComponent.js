import { LitElement, html } from 'lit';
import reset from '@/styles/reset.js';
import incDecComponentStyle from '@/components/inc-dec-component/incDecComponentStyle.js';

class IncDecBtn extends LitElement {
    static styles = [reset, incDecComponentStyle];

    // 외부에서도 itemQuantity에 접근할 수 있도록 유도
    static properties = {
        itemQuantity: { type: Number, attribute: 'itemQuantity', reflect: true },
    };

    connectedCallback() {
        super.connectedCallback();
    }

    // 덧셈과 뺄셈만 수행하도록 단순화
    calcQuantity(calc) {
        if (calc === 'add') {
            this.itemQuantity += 1;
        } else {
            this.itemQuantity -= 1;
        }

        // itemQuantity의 변동에 따라 event할당하도록 유도
        this.dispatchEvent(new CustomEvent('quantity-change', { detail: { itemQuantity: this.itemQuantity }, bubbles: true, composed: true }));
    }

    handleIncreaseItem() {
        this.calcQuantity('add');
    }

    handleDecreaseItem() {
        this.calcQuantity('minus');
    }

    render() {
        return html`
            <div class="amount-container">
                <!-- 해당 수량이 0이라면 마이너스 버튼은 비활성화 -->
                <button
                    type="button"
                    class="minus-button"
                    @click=${this.handleDecreaseItem}
                    ?disabled=${this.itemQuantity < 2}
                    aria-label="제품 수량 감소 버튼"
                >
                    <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0V2H0V0H10Z" fill="currentColor" />
                    </svg>
                </button>
                <!--접근성 향상을 위한 텍스트-->
                <span class="sr-only">제품 수량</span>
                <span class="item-amount">${this.itemQuantity}</span>
                <button type="button" class="plus-button" @click=${this.handleIncreaseItem} aria-label="제품 수량 증가 버튼">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 0V4H10V6H6V10H4V6H0V4H4V0H6Z" fill="currentColor" />
                    </svg>
                </button>
            </div>
        `;
    }
}

customElements.define('inc-dec-btn', IncDecBtn);
// 사용 예시
// <inc-dec-btn .itemQuantity=${수량} @quantity-change=${이벤트함수}></inc-dec-btn> */
