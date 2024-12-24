import { LitElement, html } from 'lit';
import '@/components/checkbox/checkbox.js';
import cartTotalStyle from '@/components/cart-total/cartTotalStyle.js';
import resetCss from '@/styles/reset.js';
import itemCounter from '@/components/cart/cart.js';
import { obj1 } from '@/components/cart/cart.js';

class CartTotal extends LitElement {
    static styles = [resetCss, cartTotalStyle];

    handleAllProuct() {
        if (!obj1['state']) {
            Object.keys(itemCounter).map((idx) => {
                itemCounter[idx] = true;
            });
        } else {
            Object.keys(itemCounter).map((idx) => {
                itemCounter[idx] = false;
            });
        }

        obj1['state'] = !obj1['state'];
        this.requestUpdate();
        console.log(itemCounter);

        this.dispatchEvent(
            new CustomEvent('request-update', {
                bubbles: true,
                composed: true,
            })
        );
    }

    render() {
        return html`
            <div class="product-check-container">
                <c-checkbox ?checked=${obj1['state']} @checkbox-change=${this.handleAllProuct}>
                    <span>전체선택</span>
                    <span
                        >(${Object.entries(itemCounter).reduce((acc, cur) => {
                            return (acc += +cur[1]);
                        }, 0)}/${Object.keys(itemCounter).length})
                        |
                    </span>
                </c-checkbox>
                <button type="button">선택 삭제</button>
            </div>
        `;
    }
}

customElements.define('cart-total', CartTotal);
