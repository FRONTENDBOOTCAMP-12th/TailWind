import { css } from 'lit';

export default css`
    .product-pagination {
        display: flex;
        margin: 60px auto 0;
        width: fit-content;
        border: 1px solid #e1e1e1;

        & li {
            & button {
                text-align: center;
                line-height: 36px;
                width: 34px;
                height: 34px;
                color: var(--content);
                font-size: 12px;
                cursor: pointer;
            }
        }

        & li + li {
            border-left: 1px solid #e1e1e1;
        }
    }
`;
