import { LitElement, html, css } from 'lit';

class ProductCard extends LitElement {
    // 스타일 지정
    static styles = css`
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
                width: 15rem;
                height: 20rem;
            }

            /* 카트에 추가하는 버튼 스타일링 */
            .save-item {
                background-image: url('/src/assets/cart.svg');

                height: 2.8125rem;
                block-size: 2.8125rem;
                width: 2.8125rem;
                inline-size: 2.8125rem;
                position: absolute;
                bottom: 1rem;
                right: 1rem;
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
                color: #898989;
                font-size: 0.75rem;
                font-weight: 500;
            }

            /* 제품 제목 */
            .title {
                line-height: 160%;
                font-size: 1rem;
                font-weight: 400;
                color: #333;
            }

            /* 할인율 */
            .discount {
                line-height: 150%;
                font-size: 1.25rem;
                font-weight: 600;
                color: #fa622f;
            }

            /* 할인된 실제 판매 가격 */
            .real-price {
                line-height: 150%;
                font-size: 1.25rem;
                font-weight: 600;
                color: #333;
            }

            /* 원래 판매 가격(할인되기 전) */
            .price {
                line-height: 160%;
                font-size: 0.75rem;
                color: #898989;
                text-decoration: line-through;
            }

            /* 제품 설명 간단 요약 */
            .desc {
                line-height: 160%;
                font-size: 0.75rem;
                color: #898989;
            }

            /* 해당 제품에 적용되는 룰 카드 */
            .tag {
                display: flex;
                flex-direction: row;
                gap: 0.5rem;
                line-height: 150%;
                font-size: 0.75rem;
                font-weight: 600;

                /* KarlyOnly와 한정 수량 이외에 올 카드가 생각나지 않아서 nth-child로 처리 */
                & span:nth-child(1) {
                    padding: 0.25rem;
                    background-color: #e1e1e1;
                    border-radius: 0.25rem;
                    color: #5f0080;
                }

                & span:nth-child(2) {
                    padding: 0.25rem;
                    background-color: #e1e1e1;
                    border-radius: 0.25rem;
                    color: #333;
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
    `;

    // HTML 렌더 부분
    render() {
        return html`
            <section class="product-card-container">
                <div class="img-container">
                    <!-- TODO: 이미지 경로는 상황에 맞게 수정 -->
                    <img src="/src/assets/product01.png" alt="상품 이미지" class="product-img" />
                    <button type="button" aria-label="장바구니에 추가하기" class="save-item"></button>
                </div>
                <!-- TODO: 이동하는 링크를 이후에 아이템에 맞춰 설정하여 렌더링 -->
                <a href="/" class="text-container">
                    <!--TODO : 여기에 사용되는 모든 텍스트와 가격,할인율은 이후 get요청으로 받아오기-->
                    <!-- 접근성을 고려햐여 할인된 가격과 원래 가격, 할인율이 각각 무엇에 해당하는지 명시 -->
                    <span class="special-desc">[온더 바디] 죠르디 시카 자석 쿠션</span>
                    <h1 class="title">[온더 바디] 죠르디 시카 자석 쿠션</h1>
                    <div>
                        <span class="sr-only">할인율</span>
                        <span class="discount">15%</span>
                        <!--TODO : 실제 판매 가격(할인된 가격)은 계산식으로 처리할 예정-->
                        <span class="sr-only">할인된 가격</span>
                        <span class="real-price">18,691</span>
                    </div>
                    <span class="sr-only">원래 가격</span>
                    <span class="price">21,900 원</span>
                    <span class="desc"
                        >멋쟁이 사자처럼의 태킷 스쿨과 바른 교육 이듬이 만났습니다. 유익하고 재미있는 프론트엔드 수업이 될 수 있도록 우리 모두 화이팅
                        해보아요!</span
                    >
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
