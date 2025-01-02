import { css } from 'lit';

export default css`
    .search-bar {
        position: relative;
        display: flex;
        justify-content: center;

        &.sticky {
            margin-bottom: 0.875rem;
        }

        .inp-search {
            padding: 0.8125rem 3.125rem 0.8125rem 1.25rem;
            width: 25rem;
            height: 3.75rem;
            border: 1px solid var(--primary);
            border-radius: 0.25rem;
            font-size: var(--paragraph---medium);
            font-weight: 400;

            & ::placeholder {
                color: var(--gray--400);
            }

            &.sticky {
                margin-bottom: 0.875rem;
                width: 14rem;
                height: 46px;
                font-size: 0.875rem;
            }
        }

        .btn-search {
            position: absolute;
            right: 1.25rem;
            top: 50%;
            transform: translatey(-50%);
            padding: 0;
            width: 2.25rem;
            height: 2.25rem;
            background-image: image-set(
                url(/assets/ico-header-search.png),
                url(/assets/ico-header-search1x.webp) 1x,
                url(/assets/ico-header-search2x.webp) 2x
            );
            background-position: center;
            background-size: 100%;
            background-repeat: no-repeat;
            background-color: var(--color-white);
            border: none;
            cursor: pointer;

            &.sticky {
                top: 1.375rem;
                right: 0.7rem;
            }
        }
    }
`;
