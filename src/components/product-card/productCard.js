import { LitElement, html } from 'lit';
import reset from '@/styles/reset.js';
import productCardStyle from '@/components/product-card/productCardStyle.js';

class ProductCard extends LitElement {
    static properties = {
        // TODO : Get요청을 함에 따라 변하는 변수들 이후 attribute는 삭제해도 됨
        src: { type: String },
        specialDesc: { type: String },
        productName: { type: String },
        discount: { type: Number },
        price: { type: Number },
        desc: { type: String },
    };

    constructor() {
        super();
        this.src = '/assets/product01.png';
        this.specialDesc = '제품 특별 설명';
        this.productName = '제품 명';
        this.discount = 15;
        this.price = 21900;
        this.desc = '제품 간단 설명';
    }
    // 스타일 지정
    static styles = [reset, productCardStyle];

    // HTML 렌더 부분
    render() {
        return html`
            <section class="product-card-container">
                <div class="img-container">
                    <!-- TODO: 이미지 경로는 상황에 맞게 수정 -->
                    <img src="${this.src}" alt="상품 이미지" class="product-img" />
                    <button type="button" aria-label="장바구니에 추가하기" class="save-item"></button>
                </div>
                <!-- TODO: 이동하는 링크를 이후에 아이템에 맞춰 설정하여 렌더링 -->
                <a href="/" class="text-container">
                    <!--TODO : 여기에 사용되는 모든 텍스트와 가격,할인율은 이후 get요청으로 받아오기-->
                    <!-- 접근성을 고려햐여 할인된 가격과 원래 가격, 할인율이 각각 무엇에 해당하는지 명시 -->
                    <span class="special-desc">${this.specialDesc}</span>
                    <h1 class="title">${this.productName}</h1>
                    <div>
                        <span class="sr-only">할인율</span>
                        <span class="discount">${this.discount}%</span>
                        <!--TODO : 실제 판매 가격(할인된 가격)은 계산식으로 처리할 예정-->
                        <span class="sr-only">할인된 가격</span>
                        <span class="real-price">${(this.price - this.price * this.discount * 0.01).toLocaleString()} 원</span>
                    </div>
                    <span class="sr-only">원래 가격</span>
                    <span class="price">${this.price.toLocaleString()} 원</span>
                    <span class="desc">${this.desc}</span>
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
