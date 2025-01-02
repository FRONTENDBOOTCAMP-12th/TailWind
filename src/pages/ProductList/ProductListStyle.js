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

    .product-card-skeleton {
        width: 243px;
    }

    .image-skeleton {
        height: 324px; /* ProductCard와 동일한 높이 */
        background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        margin-bottom: 1rem;
    }

    .content-skeleton {
        padding: 0.5rem;
    }

    .title-skeleton {
        width: 80%;
        height: 1.5rem;
        background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        margin-bottom: 0.75rem;
    }

    .price-skeleton {
        width: 60%;
        height: 1.25rem;
        background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        margin-bottom: 0.5rem;
    }

    .description-skeleton {
        width: 90%;
        height: 1rem;
        background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
`;
