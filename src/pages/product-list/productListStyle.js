import { css } from 'lit';

export default css`
    .product-list-page {
        display: flex;
        margin: 0 auto;
        gap: 47px;
        width: 1050px;
        padding: 0 50px;
    }

    .product-list {
        display: flex;
        column-gap: 18px;
        row-gap: 46px;
        flex-wrap: wrap;
    }

    .product-title {
        margin: 48px 0;
        text-align: center;
        color: var(--black);
    }
`;
