import { LitElement, html } from 'lit';
import '@/components/checkbox/checkbox.js';
import cartTotalStyle from '@/components/cart-total/cartTotalStyle.js';
import resetCss from '@/styles/reset.js';
import itemCounter from '@/components/cart/cart.js';

class CartTotal extends LitElement {
    static styles = [resetCss, cartTotalStyle];

    static properties = {
        checkAll: { type: Boolean },
    };

    constructor() {
        super();
        this.checkAll = true;
    }

    handleAllProuct() {
        for (const value of Object.keys(itemCounter)) {
            if (!itemCounter[value]) {
                this.checkAll = false;
                break;
            }
        }

        console.log(this.checkAll);

        if (!this.checkAll) {
            Object.keys(itemCounter).map((idx) => {
                itemCounter[idx] = true;
            });
        } else {
            Object.keys(itemCounter).map((idx) => {
                itemCounter[idx] = false;
            });
        }

        this.checkAll = !this.checkAll;
        this.requestUpdate();
    }

    updateList() {
        this.requestUpdate();
    }

    render() {
        return html`
            <div class="product-check-container">
                <c-checkbox ?checked=${this.checkAll} @checkbox-change=${this.handleAllProuct}>
                    <span @click=${this.handleChilck}>전체선택</span>
                    <span @click=${this.updateList}
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
