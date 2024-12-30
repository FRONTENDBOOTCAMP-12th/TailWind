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
`;
