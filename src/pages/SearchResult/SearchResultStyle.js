import { css } from 'lit';

export default css`
    .container {
        margin-bottom: 5rem;
    }

    .product-list-page {
        margin: 0 auto;
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

    .product-num {
        margin-bottom: 1.25rem;
        font-size: 1rem;
        color: var(--content);
    }
`;
