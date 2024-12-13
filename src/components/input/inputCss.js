import { css } from 'lit';

export default css`
    .input-container {
        display: flex;
        flex-flow: column;
        .input-st {
            width: 25rem;
            height: 3.125rem;
            padding-inline: 1.25rem;
            border: 1px solid var(--gray--300);
            border-radius: 0.25rem;
        }
        .error-message {
            height: 1.5rem;
            display: flex;
            align-items: center;
            font-size: var(--paragraph---small);
            color: var(--info---error);
            display: none;
        }
    }
`;
