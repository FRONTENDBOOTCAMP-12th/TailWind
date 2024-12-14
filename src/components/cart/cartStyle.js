import { css } from 'lit';

export default css`
    .cart-container {
        padding-top: 5rem;
        height: 59.0625rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        .title-text {
            font-size: var(--label---large);
            font-weight: bold;
            color: var(--black);
            margin-bottom: 2.75rem;
        }

        .li-purchase-container {
            display: flex;
            width: 65.625rem;
            gap: 1.5rem;

            .li-container {
                display: flex;
                flex-direction: column;
                width: 46.375rem;

                li {
                    display: flex;
                    align-items: center;
                    height: 3.5rem;
                    justify-content: space-between;

                    .product-check-container {
                        display: flex;
                        gap: 0.5rem;
                    }

                    .food-category-container {
                        display: flex;
                        gap: 0.75rem;
                        align-items: center;
                    }

                    &:not(:last-child) {
                        border-bottom: 1px solid black;
                    }
                }
            }
        }
    }

    .purchase-container {
        width: 17.75rem;

        .purchase-address {
            padding: 1.25rem;
            border: 1px solid var(--gray--100);
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            font-weight: 600;

            .address-title {
                color: var(--black);
                font-size: var(--label---medium);
                display: flex;
                align-items: center;
            }

            .address-info {
                color: var(--black);
                font-size: var(--label---medium);
            }

            .delivery-text {
                color: var(--primary);
                font-size: var(--label---small);
            }

            .delivery-btn {
                width: 15.25rem;
                height: 2.75rem;
                border: 1px solid var(--primary);
                border-radius: 0.25rem;
                text-align: center;
                color: var(--primary);
                font-size: var(--label---medium);
            }
        }

        .purchase-price {
            padding: 1.25rem;
            border: 1px solid var(--gray--100);
            background-color: var(--gray--50);

            .purchase-price-detail {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                padding-bottom: 1.5rem;
                border-bottom: 2px dotted var(--gray--100);
                font-size: var(--paragraph---medium);

                div span:nth-child(2) {
                    float: right;

                    b {
                        font-size: var(--label---medium);
                        font-weight: 600;
                    }
                }
            }

            .purchase-info {
                padding-top: 1.5rem;
                display: flex;
                flex-direction: column;
                color: var(--black);

                .purchase-total-price {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    span:nth-child(2) {
                        font-weight: 600;
                        b {
                            font-size: var(--heading---x-l);
                        }
                    }
                }

                .purchase-saving {
                    display: flex;
                    gap: 0.5rem;
                    justify-content: right;
                    font-weight: 600;
                    margin-top: 0.625rem;

                    span:nth-child(1) {
                        background-color: var(--accent--yellow);
                        color: var(--white);
                        border-radius: 1px;
                        padding-inline: 0.5rem;
                        font-size: var(--label---small);
                    }

                    span:nth-child(2) {
                        font-size: var(--label---small);
                    }
                }
            }
        }

        .purchase-confirm {
            width: 100%;
            height: 2.75rem;
            background-color: var(--primary);
            color: var(--white);
            text-align: center;
            border-radius: 0.25rem;
            margin-top: 1rem;
        }

        .purchase-detail {
            margin-top: 1rem;
            color: var(--gray--400);
            font-size: var(--label---small);
            font-weight: 600;
        }
    }
    .cart-product {
        display: flex;
        gap: 0.5rem;
        height: 7.375rem;
        align-items: center;

        .cart-product-image {
            width: 3.75rem;
            height: 4.875rem;
        }

        .cart-product-title {
            width: 21.5625rem;
        }

        .cart-product-price {
            width: 7.9375rem;
            text-align: right;
        }

        .cart-product-delete {
            width: 1.875rem;
            height: 1.875rem;
        }
    }
`;
