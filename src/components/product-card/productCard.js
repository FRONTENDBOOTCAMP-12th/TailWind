import { LitElement, html } from 'lit';
import reset from '@/styles/reset.js';
import productCardStyle from '@/components/product-card/productCardStyle.js';
import { fileUrl } from '@/api/pockethost.js';

class ProductCard extends LitElement {
    static properties = {
        // TODO : Get요청을 함에 따라 변하는 변수들 이후 attribute는 삭제해도 됨
        idx: { type: Object, attribute: 'idx' },
    };

    // 스타일 지정
    static styles = [reset, productCardStyle];

    handleClick() {
        console.log(this.idx);
    }

    // HTML 렌더 부분
    render() {
        return html`
            <section class="product-card-container">
                <div class="img-container">
                    <!-- TODO: 이미지 경로는 상황에 맞게 수정 -->
                    <img
                        src="${fileUrl + this.idx['id'] + '/' + this.idx['main_image']}"
                        alt="${this.idx['name']} 이미지"
                        class="product-img"
                        @click=${this.handleClick}
                    />
                    <button type="button" aria-label="장바구니에 추가하기" class="save-item"></button>
                </div>
                <!-- TODO: 이동하는 링크를 이후에 아이템에 맞춰 설정하여 렌더링 -->
                <a href="/src/pages/ProductDetail/index.html?id=${this.idx['id']}" class="text-container">
                    <!--TODO : 여기에 사용되는 모든 텍스트와 가격,할인율은 이후 get요청으로 받아오기-->
                    <!-- 접근성을 고려햐여 할인된 가격과 원래 가격, 할인율이 각각 무엇에 해당하는지 명시 -->
                    <span class="special-desc">${this.idx['category']}</span>
                    <h2 class="title">${this.idx['name']}</h2>
                    <div>
                        <span class="sr-only">할인율</span>
                        <span class="discount">${this.idx['discount']}%</span>
                        <!--TODO : 실제 판매 가격(할인된 가격)은 계산식으로 처리할 예정-->
                        <span class="sr-only">할인된 가격</span>
                        <span class="real-price">${(this.idx['price'] - this.idx['price'] * this.idx['discount'] * 0.01).toLocaleString()} 원</span>
                    </div>
                    <span class="sr-only">원래 가격</span>
                    <span class="price">${this.idx['price'].toLocaleString()} 원</span>
                    <span class="desc">${this.idx['description']}</span>
                    <!--TODO : 이를 데이터에 추가적으로 저장해서 넘기기-->
                    <div class="tag">
                        <span>Karly Only</span>
                        <span>한정 수량</span>
                    </div>
                </a>
            </section>
        `;
    }
}

customElements.define('product-card', ProductCard);
