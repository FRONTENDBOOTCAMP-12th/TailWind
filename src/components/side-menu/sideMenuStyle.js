import { css } from 'lit';

export default css`
    .product-side-menu {
        width: 220px;

        > li {
            border-bottom: 1px solid #e1e1e1;

            &.menu-reset a {
                display: flex;
                justify-content: space-between;
                align-items: center;

                span {
                    font-size: 10px;
                    color: #a6a6a6;
                }

                &::after {
                    display: none;
                }
            }

            a {
                position: relative;
                display: block;
                padding: 16px 0;
                text-decoration: none;

                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    right: 0;
                    top: 17px;
                    width: 18px;
                    height: 18px;
                    background: url(/assets/icon/ico-arr-sidemenu.svg) center / 100% no-repeat;
                }

                &.active::after {
                    transform: rotate(180deg);
                }

                &.active + .category-list {
                    display: block;
                }
            }
        }

        .category-list {
            display: none;

            li {
                display: flex;
                align-items: center;
                padding: 10px 0 14px 0;

                .product-count {
                    padding-left: 5px;
                    font-size: 12px;
                    color: #a6a6a6;
                }
            }
        }
    }
`;
