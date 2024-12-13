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

            .purchase-container {
                background-color: yellow;
                width: 100px;
                height: 100px;
            }
        }
    }
`;
