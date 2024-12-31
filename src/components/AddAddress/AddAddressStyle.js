import { css } from 'lit';

export default css`
    .address-title {
        text-align: center;
        font-size: var(--heading---x-l);
        font-weight: 600;
        margin-block: 3rem;
    }

    .add-address-btn {
        font-size: var(--label---medium);
        font-weight: 600;
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 1rem;
        display: inline-block;
        text-align: center;
        width: 100%;
        cursor: pointer;
        background-color: var(--gray--100);
        box-shadow: 0 0 5px var(--gray--200);
    }

    .address-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;

        c-checkbox {
            width: 90vw;
            border-bottom: 1px solid var(--gray--100);
            padding: 1rem;
        }
    }

    .address-info {
        font-size: var(--label---medium);
        font-weight: 600;
    }
`;
