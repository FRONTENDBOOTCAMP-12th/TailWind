import { css } from 'lit';

export default css`
    /* 줄바꿈 허용을 위한 container설정 */
    .product-card-container {
        width: 15rem;
        overflow-wrap: break-word;
    }

    .img-container {
        position: relative;
        width: 15.5626rem;
        height: 324px;

        .image-skeleton {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }

        .product-img {
            /* 해당 컴포넌트에 맞는 사이즈로 조정 */
            width: 100%;
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
        .product-tag {
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

    @keyframes shimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
`;
