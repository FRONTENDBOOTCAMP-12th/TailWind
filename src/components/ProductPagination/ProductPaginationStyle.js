import { css } from 'lit';

export default css`
    .product-pagination {
        display: flex;
        margin: 3.75rem auto 0;
        width: fit-content;
        border: 1px solid #e1e1e1;

        & li {
            & button {
                text-align: center;
                line-height: 2.25rem;
                width: 2.125rem;
                height: 2.125rem;
                color: var(--content);
                font-size: 0.75rem;
                cursor: pointer;
            }
        }
        å & li + li {
            border-left: 1px solid #e1e1e1;
        }
    }
`;
