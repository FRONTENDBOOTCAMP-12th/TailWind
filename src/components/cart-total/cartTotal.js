import { LitElement, html } from 'lit';
import '@/components/checkbox/checkbox.js';
import cartTotalStyle from '@/components/cart-total/cartTotalStyle.js';
import resetCss from '@/styles/reset.js';
import itemCounter from '@/components/cart/cart.js';
import { obj1 } from '@/components/cart/cart.js';

// obj1 은 전체 선택에 대한 state를 저장하는 객체 이후 이름 재조정 필요(컴포넌트 분리 시)
// itemCounter는 각각의 product의 false와 true를 담당하는 객체

class CartTotal extends LitElement {
    static styles = [resetCss, cartTotalStyle];

    // 전체 체크 버튼을 클릭 시 만약 모두 true라면 false를 그렇지 않다면 모두 true로 변경(모든 id 값)
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

        // 전체 체크 버튼은 클릭 시 항상 본인의 상태와 반대로 설정
        obj1['state'] = !obj1['state'];
        this.requestUpdate();

        // 이후 상태가 변경됐다면 리렌더링 유도
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
                <!-- 체크 상태는 obj1의 state로 받아오기 그리고 체크박스가 변화됐다면 이벤트 발생 -->
                <c-checkbox ?checked=${obj1['state']} @checkbox-change=${this.handleAllProuct}>
                    <span>전체선택</span>
                    <span>
                        <!-- itemCounter의 key의 갯수와 true값을 계산 -->
                        (${Object.entries(itemCounter).reduce((acc, cur) => {
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
