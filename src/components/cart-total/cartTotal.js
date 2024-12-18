import { LitElement, html } from 'lit';
import '@/components/checkbox/checkbox.js';
import cartTotalStyle from '@/components/cart-total/cartTotalStyle.js';
import resetCss from '@/styles/reset.js';

class CartTotal extends LitElement {
    static styles = [resetCss, cartTotalStyle];

    render() {
        return html`
            <div class="product-check-container">
                <!-- TODO : 이후 전체 개수를 받아와 처리하는 로직 구현 -->
                <c-checkbox checked="true"> 전체선택 (3/3) | </c-checkbox>
                <!-- TODO : 선택된 상품을 제거하는 로직 구현 -->
                <button type="button">선택 삭제</button>
            </div>
        `;
    }
}

customElements.define('cart-total', CartTotal);
