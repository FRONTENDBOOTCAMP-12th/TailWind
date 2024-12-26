import { css } from 'lit';

export default css`
    .birth-container {
        display: flex;
        padding: 0.5625rem 1.25rem;
        border: 0.0625rem solid var(--gray--300);
        border-radius: 0.25rem;
        width: 20.8125rem;
        justify-content: center;
        color: var(--gray--400);
        & input {
            width: 100%;
            text-align: center;
        }

        & input:focus {
            outline: none;
        }
        & input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        & input::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
`;
