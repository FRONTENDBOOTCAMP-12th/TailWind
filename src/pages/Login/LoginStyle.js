import { css } from 'lit';

export default css`
    .login-container {
        width: 100%;
        height: 32.9375rem;
        padding-block: 5rem;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;

        .login-title {
            font-size: var(--label---large);
            font-weight: 600;
            margin-bottom: 2.75rem;
        }

        .login-form {
            display: grid;
            gap: 0.75rem;
            margin-bottom: 1.75rem;
            .find-st {
                text-align: end;
                margin-bottom: 1.75rem;

                & a {
                    font-size: var(--paragraph---small);
                }
            }
        }
    }
`;
