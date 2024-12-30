import { css } from 'lit';

export default css`
    :host {
        display: inline-block;
    }

    .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.2rem 0.6rem;
        font-size: 0.9rem;
        font-weight: bold;
        color: black;
        border-radius: 1px;
        text-transform: uppercase;

        &.success {
            background-color: var(--secondary);
            color: white;
            margin-right: 0.75rem;
        }

        &.normal {
            background-color: white;
            border: 1px solid var(--secondary);
            color: var(--secondary);
        }

        &.info {
            background-color: var(--gray--100);
            margin-right: 1.25rem;
        }
    }
`;
