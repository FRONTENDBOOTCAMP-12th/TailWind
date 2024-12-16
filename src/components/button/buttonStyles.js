import { css } from 'lit';

export const buttonStyles = css`
    :host {
        width: 100%;
        height: 100%;
    }

    .c-button {
        width: 100%;
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
            width: 8.9375rem;
            height: 2.75rem;
        }

        &.btn-md {
        }
    }
`;
