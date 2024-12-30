import { css } from 'lit';

export default css`
    /* 장바구니 전체를 감싸는 태그 */
    .cart-container {
        padding-top: 5rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        /* 장바구니 타이틀 텍스트 */
        .title-text {
            font-size: var(--label---large);
            font-weight: bold;
            color: var(--black);
            margin-bottom: 2.75rem;
        }

        /* 장바구니에 담은 물품 렌더링 및 전체선택 컨테이너 */
        .li-purchase-container {
            display: flex;
            width: 65.625rem;
            gap: 1.5rem;

            /* ul태그 */
            .li-container {
                display: flex;
                flex-direction: column;
                width: 46.375rem;

                /* 전체선택 및 물품 렌더링 개별 태그 */
                li {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: start;
                    justify-content: space-between;
                    overflow: hidden;

                    /* 전체선택 및 선택삭제 CSS */
                    .product-check-container {
                        display: flex;
                        gap: 0.5rem;
                        justify-content: center;
                        font-size: var(--label---medium);
                        font-weight: 600;
                        height: 3.5rem;
                        align-items: center;

                        button {
                            cursor: pointer;
                        }
                    }

                    /* 냉장 식품, 냉동 식품, 상온 식품을 나타내는 제목 바 */
                    .category-bar {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;

                        /* 각각의 물품 타입을 나타내는 텍스트와 아이콘 */
                        .food-category-container {
                            height: 3.5rem;
                            display: flex;
                            gap: 0.75rem;
                            align-items: center;

                            /* 텍스트 */
                            .category-text {
                                font-weight: 600;
                                font-size: var(--label---medium);
                            }
                        }

                        /* 숨김버튼 */
                        .dropdown-btn {
                            cursor: pointer;
                        }
                    }

                    /* 가장 마지막 요소에는 밑줄이 필요 없으므로 제외 */
                    &:not(:last-child) {
                        border-bottom: 1px solid black;
                    }
                }
            }
        }

        /* 배송지와 주문하기를 포함하는 컨테이너 */
        .purchase-container {
            width: 17.75rem;
            position: sticky;
            height: fit-content;
            top: 2rem;

            /* 배송지 컨테이너 */
            .purchase-address {
                padding: 1.25rem;
                border: 1px solid var(--gray--100);
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                font-weight: 600;

                /* 배송지 텍스트와 아이콘 */
                .address-title {
                    color: var(--black);
                    font-size: var(--label---medium);
                    display: flex;
                    align-items: center;
                }

                /* 사용자 배송지 */
                .address-info {
                    color: var(--black);
                    font-size: var(--label---medium);
                }

                /* 샛별배송 텍스트 */
                .delivery-text {
                    color: var(--primary);
                    font-size: var(--label---small);
                }
            }

            /* 가격 컨테이너 */
            .purchase-price {
                padding: 1.25rem;
                margin-bottom: 1rem;
                border: 1px solid var(--gray--100);
                background-color: var(--gray--50);

                /* 금액 정보 컨테이너 */
                .purchase-price-detail {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    padding-bottom: 1.5rem;
                    border-bottom: 2px dotted var(--gray--100);
                    font-size: var(--paragraph---medium);

                    /* 가격만 오른쪽 정렬 */
                    div span:nth-child(2) {
                        float: right;

                        /* 원 이라는 글자만 강조 */
                        b {
                            font-size: var(--label---medium);
                            font-weight: 600;
                        }
                    }
                }

                /* 지불 예상 금액과 적립 */
                .purchase-info {
                    padding-top: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    color: var(--black);

                    /* 총 가격 합산 */
                    .purchase-total-price {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        /* 가격(숫자) 만 강조 */
                        span:nth-child(2) {
                            font-weight: 600;
                            b {
                                font-size: var(--heading---x-l);
                            }
                        }
                    }

                    /* 적립 */
                    .purchase-saving {
                        display: flex;
                        gap: 0.5rem;
                        justify-content: right;
                        font-weight: 600;
                        margin-top: 0.625rem;

                        /* 적립이라고 적힌 카드 스타일링 */
                        span:nth-child(1) {
                            background-color: var(--accent--yellow);
                            color: var(--white);
                            border-radius: 1px;
                            padding-inline: 0.5rem;
                            font-size: var(--label---small);
                        }

                        /* 나머지 글자 스타일링 */
                        span:nth-child(2) {
                            font-size: var(--label---small);
                        }
                    }
                }
            }

            /* 결제 상세 텍스트 */
            .purchase-detail {
                margin-top: 1rem;
                color: var(--gray--400);
                font-size: var(--label---small);
                font-weight: 600;
            }
        }

        /* 물품 렌더링 컨테이너 */
        .cart-product {
            display: flex;
            gap: 0.5rem;
            height: 7.375rem;
            align-items: center;

            /* 렌더링 되는 아이템의 이미지 사이즈 조절 */
            .cart-product-image {
                width: 3.75rem;
            }

            /* 렌더링 되는 아이템의 정보 제목 */
            .cart-product-title {
                width: 21.5625rem;
                font-weight: 600;
                font-size: var(--label---medium);
            }

            /* 각각의 가격 합산 */
            .cart-product-price {
                width: 7.9375rem;
                text-align: right;
                font-weight: 600;
                font-size: var(--label---medium);
            }

            /* x 아이콘(삭제 버튼) */
            .product-delete-btn {
                cursor: pointer;
            }
        }
    }
`;
