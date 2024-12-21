import { LitElement, html } from 'lit';
import cartProductListStyle from '@/components/cart-product-list/cartProductListStyle.js';
import resetCss from '@/styles/reset.js';
import obj from '@/components/cart/cart.js';

class ProductList extends LitElement {
    static styles = [resetCss, cartProductListStyle];

    static properties = {
        idx: { type: Object, reflect: true, attribute: 'idx' },
        cartItems: { type: Object },
    };

    constuctor() {
        this.idx = {};
    }

    // localStorage에 저장된 장바구니 목록을 변수에 할당
    connectedCallback() {
        super.connectedCallback();
        this.cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? {};
    }

    deleteList(e) {
        // 클릭하는 영역의 id값을 가져오기 후 그 영역을 안보이게 처리
        const target = e.target.closest('div');
        target.style.display = 'none';

        // cartItems에서 클릭한 영역의 id 값을 제거 후 localStorage에 다시 저장
        delete this.cartItems[target.id];
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

        delete obj[target.id];
    }

    handleChangeCount() {
        obj[this.idx['id']] = false;
    }

    render() {
        return html` <div class="cart-product" id=${this.idx['id']}>
            <c-checkbox checked="true" @checkbox-change=${this.handleChangeCount}>ff</c-checkbox>
            <!-- 이미지는 다음과 같이 불러와야함-->
            <img class="cart-product-image" src="${import.meta.env.VITE_API_URL}/api/files/product/${this.idx['id']}/${this.idx['main_image']}" />
            <span class="cart-product-title">${this.idx['name']}</span>
            <inc-dec-btn id=${this.idx['id']} incartpage="true"></inc-dec-btn>
            <span class="cart-product-price">
                <!--할인된 금액으로 결정되며 localStorage에 저장된 갯수만큼 현재 품목의 가격을 나타냄-->
                ${(
                    Math.floor(this.idx['price'] - this.idx['price'] * this.idx['discount'] * 0.01) *
                    JSON.parse(localStorage.getItem('cartItems'))[`${this.idx['id']}`]
                ).toLocaleString()}원</span
            >
            <button class="product-delete-btn" type="button" @click=${this.deleteList}>
                <img class="cart-product-delete" src="/assets/product-cancel.svg" />
            </button>
        </div>`;
    }
}

customElements.define('product-list', ProductList);
