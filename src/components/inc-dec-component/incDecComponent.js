import { LitElement, html } from 'lit';
import reset from '@/styles/reset.js';
import incDecComponentStyle from '@/components/inc-dec-component/incDecComponentStyle.js';

class IncDecBtn extends LitElement {
    static styles = [reset, incDecComponentStyle];

    static properties = {
        id: { type: String, attribute: 'id' },
        idValue: { type: Number },
        cartItems: { type: Object },
        inCartPage: { type: Boolean, attribute: 'incartpage', reflect: true },
    };

    constructor() {
        super();
        this.inCartPage = false;
    }

    connectedCallback() {
        super.connectedCallback();
        this.inCartPage = this.getAttribute('incartpage') === 'true' ? true : false;
        this.cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? {};
        this.inCartPage ? (this.idValue = this.cartItems[`${this.id}`] ?? 0) : (this.idValue = 0);
    }

    calcQuantity(calc) {
        this.cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? {};
        if (calc === 'add') {
            this.idValue += 1;
        } else {
            this.idValue -= 1;
        }
        this.cartItems[`${this.id}`] = this.idValue;
        this.inCartPage ? localStorage.setItem('cartItems', JSON.stringify(this.cartItems)) : localStorage.setItem(`${this.id}`, this.idValue);
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
                <button
                    type="button"
                    class="minus-button"
                    @click=${this.handleDecreaseItem}
                    ?disabled=${this.idValue < 1}
                    aria-label="제품 수량 감소 버튼"
                >
                    <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0V2H0V0H10Z" fill="currentColor" />
                    </svg>
                </button>
                <span class="sr-only">제품 수량</span>
                <span class="item-amount">${this.idValue}</span>
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
