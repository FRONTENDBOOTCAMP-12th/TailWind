import { css } from 'lit';
export default css`
    .amount-container {
        border: 1px solid var(--gray--200);
        display: flex;
        align-items: center;
        width: 5.25rem;
        height: 1.875rem;
        flex-direction: row;
        justify-content: space-between;

        .plus-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            background-color: transparent;
            border: none;
            display: inline-flex;
            color: var(--content);
        }

        .minus-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            background-color: transparent;
            border: none;
            display: inline-flex;
            color: var(--content);

            &:disabled {
                color: var(--gray--300);
            }
        }
    }
`;
