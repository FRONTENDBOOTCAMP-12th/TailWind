import { css } from 'lit';

export const productHeaderStyles = css`
    .product-header {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 20px;
    }

    .product-image {
        width: 430px;
        height: 552px;
        object-fit: contain;
        background-color: #f8f8f8;
    }

    .delivery-type {
        color: #4c4c4c;
        font-size: 14px;
    }

    .product-title {
        font-size: 24px;
        font-weight: 500;
        margin: 0;
        color: #333;
    }

    .product-subtitle {
        font-size: 14px;
        color: #666;
        margin: 0;
    }

    .product-price {
        margin-top: 10px;
    }

    .price {
        font-size: 28px;
        font-weight: bold;
        color: #333;
    }

    .price::after {
        content: '원';
        font-size: 24px;
        margin-left: 2px;
    }

    .delivery-info {
        color: #5f0080;
        font-size: 14px;
        margin: 0;
    }
`;
