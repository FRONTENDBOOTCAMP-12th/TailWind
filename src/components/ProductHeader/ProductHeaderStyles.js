import { css } from 'lit';

export default css`
    .product-header {
        display: flex;
        gap: 90px;

        .product-image {
            width: 400px;
            height: 100%;
            object-fit: contain;
            background-color: #f8f8f8;
        }

        .product-info-wrapper {
            display: flex;
            flex-direction: column;
            width: 560px;
            gap: 16px;

            .delivery-type {
                font-weight: 700;
                font-size: 1.3rem;
                color: var(--gray--500);
            }

            .product-title {
                font-size: 1.7rem;
                font-weight: 600;
                color: var(--content);
            }

            .product-subtitle {
                font-size: 1rem;
                color: var(--gray--400);
            }

            .product-price {
                display: flex;
                align-items: center;
                font-weight: 600;
                font-size: 1.7rem;
                color: var(--content);
            }

            .product-price::after {
                content: '원';
                font-size: 1rem;
                font-weight: 700;
                margin-left: 4px;
            }

            .delivery-info {
                color: var(--primary);
                font-size: 1rem;
                font-weight: 600;
            }

            .product-info-table {
                border-collapse: collapse;
                width: 100%;
                text-align: left;
                border-block: 1px solid var(--gray--100);

                th,
                td {
                    font-size: 0.75rem;
                    font-weight: 600;
                    border-block: 1px solid var(--gray--100);
                    vertical-align: baseline;
                    padding-block: 1rem;
                    color: var(--gray--500);

                    .sub-desc {
                        color: var(--gray--400);
                    }
                }

                .product-option-box {
                    display: flex;
                    flex-direction: column;
                    border: 1px solid var(--gray--100);
                    padding: 12px 16px;
                    gap: 0.75rem;

                    .product-option-value {
                        display: flex;
                        justify-content: space-between;
                        align-items: end;
                        gap: 0.75rem;
                    }
                }
            }

            .product-total-price-box {
                display: flex;
                flex-direction: column;
                gap: 8px;
                align-items: end;
                padding-block: 1.75rem;
                font-size: 1rem;
                font-weight: 600;
                color: var(--black);

                .product-total-price {
                    display: flex;
                    align-items: center;
                    gap: 4px;

                    span {
                        font-size: 1.75rem;
                        color: var(--content);
                        margin-left: 17px;
                    }
                }
            }

            .product-btn-box {
                display: flex;
                justify-content: end;
                gap: 12px;
            }
        }
    }
`;
