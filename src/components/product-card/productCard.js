import { LitElement, html, css } from 'lit';
import reset from '@/styles/reset.js';

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
    static styles = [
        reset,
        css`
            /* 이미지와 버튼을 포함하는 스타일링 */
            body {
                font-family: 'Pretendard Variable', sans-serif;
            }

            /* 줄바꿈 허용을 위한 container설정 */
            .product-card-container {
                width: 15rem;
                overflow-wrap: break-word;
            }

            .img-container {
                position: relative;
                display: inline-block;

                .product-img {
                    /* 해당 컴포넌트에 맞는 사이즈로 조정 */
                    width: 15.5625rem;
                    height: 20rem;
                }

                /* 카트에 추가하는 버튼 스타일링 */
                .save-item {
                    background-image: url('/assets/cart.svg');

                    height: 2.8125rem;
                    width: 2.8125rem;
                    position: absolute;
                    bottom: 1.0625rem;
                    right: 0.9375rem;
                    border: none;
                    background-color: transparent;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }

            /* 상품 설명과 가격에 대한 스타일링 */
            .text-container {
                width: 100%;
                margin-top: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                text-decoration: none;

                /* 제품 설명에 대한 특별 설명 */
                .special-desc {
                    line-height: 150%;
                    color: var(--gray--400);
                    font-size: var(--label---small);
                    font-weight: 600;
                }

                /* 제품 제목 */
                .title {
                    line-height: 160%;
                    font-size: var(--paragraph---medium);
                    font-weight: 400;
                    color: var(--content);
                }

                /* 할인율 */
                .discount {
                    line-height: 150%;
                    font-size: var(--label---large);
                    font-weight: 600;
                    color: var(--accent--yellow);
                }

                /* 할인된 실제 판매 가격 */
                .real-price {
                    line-height: 150%;
                    font-size: var(--label---large);
                    font-weight: 600;
                    color: var(--content);
                }

                /* 원래 판매 가격(할인되기 전) */
                .price {
                    line-height: 160%;
                    font-size: var(--paragraph---small);
                    color: var(--gray--400);
                    text-decoration: line-through;
                }

                /* 제품 설명 간단 요약 */
                .desc {
                    line-height: 160%;
                    font-size: var(--paragraph---small);
                    color: var(--gray--400);
                }

                /* 해당 제품에 적용되는 룰 카드 */
                .tag {
                    display: flex;
                    flex-direction: row;
                    gap: 0.5rem;
                    line-height: 150%;
                    font-size: var(--label---small);
                    font-weight: 600;

                    /* KarlyOnly와 한정 수량 이외에 올 카드가 생각나지 않아서 nth-child로 처리 */
                    & span:nth-child(1) {
                        padding: 0.25rem;
                        background-color: var(--gray--100);
                        border-radius: 0.25rem;
                        color: var(--primary);
                    }

                    & span:nth-child(2) {
                        padding: 0.25rem;
                        background-color: var(--gray--100);
                        border-radius: 0.25rem;
                        color: var(--content);
                    }
                }
            }

            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip-path: inset(50%);
                border: 0;
                clip: rect(0 0 0 0);
            }
        `,
    ];

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
