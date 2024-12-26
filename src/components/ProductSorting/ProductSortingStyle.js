import { css } from 'lit';

export default css`
    .product-top-menu {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        font-size: 16px;
    }

    .product-num {
        color: var(--content);
    }

    .product-sorting-list {
        display: flex;
        column-gap: 17px;
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
            left: -9px;
            width: 1px;
            height: 10px;
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
