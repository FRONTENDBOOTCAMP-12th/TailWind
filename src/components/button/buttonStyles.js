import { css } from 'lit';

export const buttonStyles = css`
    :host {
        width: 100%;
        height: 100%;
    }

    .c-button {
        width: auto;
        height: 100%;
        min-width: 150px;
        border-radius: 0.25rem;
        font-size: var(--label---medium);
        font-weight: 600;
        cursor: pointer;
        text-align: center;

        &.outline {
            border: 1px solid var(--primary);
            background-color: #fff;
            color: var(--primary);
        }

        &.fill {
            border: 1px solid var(--gray--100);
            background-color: var(--gray--100);
            color: #fff;

            &:not(:disabled) {
                background-color: var(--primary);
                color: #fff;
            }
        }

        &.btn-sm {
            height: 44px;
            padding: 10px;
        }

        &.btn-md {
            height: 54px;
            padding: 15px;
        }
    }
`;
