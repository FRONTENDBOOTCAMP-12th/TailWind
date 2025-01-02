import { css } from 'lit';

export default css`
    :host {
        display: block;
        border-bottom: 1px solid var(--gray--400);
    }

    .product-detail-container {
        display: flex;
        flex-direction: column;
        gap: 48px;
        width: 1050px;
        height: 100%;
        margin: 0 auto;
        padding-block: 40px;
    }

    .skeleton-container {
        display: flex;
        flex-direction: column;
        gap: 48px;
    }

    .header-skeleton {
        display: flex;
        gap: 90px;
    }

    .image-skeleton {
        width: 570px;
        height: 552px;
        background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
        animation: shimmer 1.5s infinite;
    }

    .info-skeleton {
        width: 560px;

        .title-skeleton {
            height: 36px;
            width: 80%;
            background: #f0f0f0;
            margin-bottom: 20px;
        }

        .price-skeleton {
            height: 45px;
            width: 60%;
            background: #f0f0f0;
            margin-bottom: 20px;
        }

        .description-skeleton {
            height: 180px;
            background: #f0f0f0;
        }
    }

    .tab-skeleton {
        .tab-buttons-skeleton {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;

            .tab-button-skeleton {
                width: 120px;
                height: 45px;
                background: #f0f0f0;
            }
        }

        .tab-content-skeleton {
            height: 400px;
            background: #f0f0f0;
        }
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
