import { css } from 'lit';

export default css`
    /* 상품 추가 모달 스타일링 */

    .add-cart {
        background-color: rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        display: none;

        &.visible {
            display: block;
        }
    }

    /* 모달 창 스타일링 */
    .add-cart-container {
        background-color: var(--white);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 24.75rem;
        border-radius: 1rem;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.75rem;

        /* 제품 정보 스타일링 */
        .item-title {
            font-size: var(--label---medium);
            font-weight: bold;
            line-height: 150%;
            color: var(--content);
        }

        .total-price-container {
            display: flex;
            justify-content: space-between;
            margin-top: 0.75rem;

            .item-price {
                font-size: var(--label---medium);
                line-height: 150%;
                font-weight: bold;
            }

            /* 제품 수량 설정 스타일링 */
            .amount-container {
                border: 1px solid var(--gray--200);
                display: flex;
                align-items: center;
                width: 5.25rem;
                height: 1.875rem;
                flex-direction: row;
                justify-content: space-between;

                .plus-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 30px;
                    background-color: transparent;
                    border: none;
                    display: inline-flex;
                    color: var(--content);
                }

                .minus-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 30px;
                    background-color: transparent;
                    border: none;
                    display: inline-flex;
                    color: var(--content);

                    &:disabled {
                        color: var(--gray--300);
                    }
                }
            }
        }

        /* 제품 총액 스타일링 */
        .sum-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: first baseline;
            margin-bottom: 0.25rem;

            .sum {
                right: 0;
                font-size: var(--label---medium);
                line-height: 150%;
                color: var(--content);
                font-weight: bold;
            }

            .total-price {
                font-size: var(--heading---x-l);
                font-weight: bold;
                line-height: 140%;
            }
        }

        /* 적립 텍스트 스타일링 */
        .saving-container {
            float: right;
            display: flex;
            gap: 0.75rem;
            align-items: center;

            .saving {
                background-color: #fa622f;
                color: var(--white);
                border-radius: 0.0625rem;
                font-size: var(--label---small);
                font-weight: 500;
                line-height: 150%;
                padding-inline: 0.5rem;
            }

            .saving-info {
                font-size: var(--label---medium);
                font-weight: bold;
            }
        }

        /* 상품 장바구니에 추가 확인,취소 버튼 스타일링 */
        .add-confirm-container {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            font-size: var(--label---medium);
            text-align: center;
            font-weight: bold;

            .add-cancel {
                width: 10.875rem;
                padding-block: 0.9375rem;
                background-color: transparent;
                border-radius: 0.25rem;
                border: 1px solid var(--gray--400);
                color: var(--content);
            }

            .add-confirm {
                width: 10.875rem;
                background-color: var(--primary);
                color: var(--white);
                border-radius: 0.25rem;
                border: 1px solid var(--primary);
                padding-block: 0.9375rem;
            }
        }
    }
`;
