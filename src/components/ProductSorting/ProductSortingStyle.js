import { css } from 'lit';

export default css`
    .product-top-menu {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.25rem;
        font-size: 1rem;
    }

    .product-num {
        color: var(--content);
    }

    .product-sorting-list {
        display: flex;
        column-gap: 1.0625rem;
        color: #a6a6a6;

        & li {
            position: relative;
        }

        & li + li::before {
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -0.5625rem;
            width: 1px;
            height: 0.625rem;
            background-color: #a6a6a6;
        }

        .btn-product-sort {
            cursor: pointer;

            &.active {
                color: var(--content);
            }
        }
    }
`;
