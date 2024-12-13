import { css } from 'lit';

export const buttonStyles = css`
    button {
        width: auto;
        height: auto;
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
