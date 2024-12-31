import { css } from 'lit';

export default css`
    .container {
        margin-bottom: 5rem;
    }

    .product-list-page {
        margin: 0 auto;
        width: 65.625rem;
        padding: 0 3.125rem;

        > div {
            display: flex;
            gap: 2.9375rem;
        }

        .product-wrap {
            width: 100%;
        }
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
