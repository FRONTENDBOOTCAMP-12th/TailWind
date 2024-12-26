import { css } from 'lit';

export default css`
    .product-list-page {
        display: flex;
        margin: 0 auto;
        gap: 2.9375rem;
        width: 65.625rem;
        padding: 0 3.125rem;
    }

    .product-list {
        display: flex;
        column-gap: 1.125rem;
        row-gap: 2.875rem;
        flex-wrap: wrap;
    }

    .product-title {
        margin: 3rem 0;
        text-align: center;
        color: var(--black);
    }
`;
