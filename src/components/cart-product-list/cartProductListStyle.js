import { css } from 'lit';

export default css`
    .cart-product {
        display: flex;
        gap: 0.5rem;
        height: 7.375rem;
        align-items: center;

        .cart-product-image {
            width: 3.75rem;
        }

        .cart-product-title {
            width: 21.5625rem;
            font-weight: 600;
            font-size: var(--label---medium);
        }

        .cart-product-price {
            width: 7.9375rem;
            text-align: right;
            font-weight: 600;
            font-size: var(--label---medium);
        }

        .product-delete-btn {
            cursor: pointer;
        }
    }
`;
