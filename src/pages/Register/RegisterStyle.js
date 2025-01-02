import { css } from 'lit';

export default css`
    .register-container {
        width: 100%;
        display: flex;
        flex-flow: column;
        padding-block: 5rem 2.5rem;
        justify-content: center;
        align-items: center;

        & .register-title {
            font-size: var(--label---large);
            font-weight: 600;
            margin-bottom: 2.75rem;
        }

        & .form-container {
            position: relative;
            width: 640px;
            & .top-line {
                border: 0;
                height: 2px;
                background-color: black;
            }
            & .required-text {
                position: absolute;
                right: 0;
                bottom: 100%;

                & b {
                    color: var(--info---error);
                }
            }

            & .input-line {
                display: flex;
                align-items: start;
                padding: 1.25rem 0;

                & c-label {
                    margin-right: 0.5rem;
                    padding-block: 0.6875rem;
                }

                & c-input {
                    margin-right: 0.5rem;
                }

                & .address-container {
                    display: flex;
                    flex-flow: column;
                    gap: 0.25rem;
                    font-size: var(--paragraph---small);
                    width: 20.8125rem;
                }

                & c-radio-group {
                    width: 333px;
                    display: flex;
                }
            }
        }

        & .terms-container {
            display: flex;
            border-top: 2px solid var(--content);
            border-bottom: 1px solid var(--gray--200);
            padding: 20px 0;
            width: 40rem;

            & .all-check {
                display: flex;
                & c-checkbox {
                    display: flex;
                    align-items: center;
                    font-size: var(--label---large);
                    font-weight: 600;
                    & p {
                        font-size: var(--paragraph---small);
                        color: var(--gray--400);
                    }
                }
            }
            & .part-check {
                display: flex;
                justify-content: space-between;
                padding: 0.75rem 0;
                align-items: center;

                & button {
                    cursor: pointer;
                    width: 60px;
                    color: var(--primary);
                    font-size: var(--paragraph---small);
                    background: url(/assets/Arrow.svg) right top 0px / 6px auto no-repeat;
                }
            }
        }
        & c-button[type='submit'] {
            padding: 2.5rem 0;
            width: 21.25rem;
        }
    }
`;
