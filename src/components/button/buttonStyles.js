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
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        text-align: center;

        &.outline {
            border: 1px solid var(--gray--200);
            background-color: #fff;
            color: var(--content);
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
    }
`;
