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
        // id:해당 inc-dec-btn 컴포넌트에 할당될 id
        // idValue : 그 id에 대응하는 값. 만약 null or undefined라면 0
        // cartItems : 현재 localStorage에 저장된 카트 정보
        // inCartPage : 이 컴포넌트가 장바구니 페이지에서 사용되는지에 대한 여부
    };

    constructor() {
        super();
        this.inCartPage = false;
    }

    connectedCallback() {
        super.connectedCallback();
        // 만약 값을 true로 전달받았다면 true를 그 외에는 false로 처리
        this.inCartPage = this.getAttribute('incartpage') === 'true' ? true : false;
        // localStorage에 cartItems가 없다면 빈 객체 할다
        this.cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? {};
        // 만약 장바구니 페이지라면 저장된 value를, 아니라면 0을 할당
        this.inCartPage ? (this.idValue = this.cartItems[`${this.id}`] ?? 0) : (this.idValue = 0);

        this.changeEvent = new CustomEvent('change', { bubbles: true, composed: true });
    }

    calcQuantity(calc) {
        // 새로운 localStorage의 값을 참조하기 위한 할당
        this.cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? {};
        if (calc === 'add') {
            this.idValue += 1;
        } else {
            this.idValue -= 1;
        }

        // localStorage에 값을 변경(저장X)
        this.cartItems[`${this.id}`] = this.idValue;
        // 장바구니 페이지라면 객체를 저장, 아니라면 id를 key로 저장
        this.inCartPage ? localStorage.setItem('cartItems', JSON.stringify(this.cartItems)) : localStorage.setItem(`${this.id}`, this.idValue);

        this.dispatchEvent(this.changeEvent);
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
                    ?disabled=${this.idValue < 1}
                    aria-label="제품 수량 감소 버튼"
                >
                    <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0V2H0V0H10Z" fill="currentColor" />
                    </svg>
                </button>
                <!--접근성 향상을 위한 텍스트-->
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
// 사용 예시
// 카트 페이지 내부 : <inc-dec-btn id=`${불러오는 제품의 id값}` incartpage="true"></inc-dec-btn>
// 카트 페이지 제외 : <inc-dec-btn id=`${불러오는 제품의 id값}` incartpage="false"></inc-dec-btn>
