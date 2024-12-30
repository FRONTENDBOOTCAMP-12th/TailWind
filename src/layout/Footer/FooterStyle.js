import { css } from 'lit';

export default css`
    .wrapper {
        display: flex;
        flex-flow: column;
        justify-content: center;
        width: 71.875rem;
        margin: 0 auto;
        color: var(--content);
        a {
            text-decoration: none;
        }
    }

    .footer-container {
        display: flex;
        margin-top: 1.75rem;
        height: 25rem;
        justify-content: space-between;
    }

    address {
        font-style: normal;
    }

    /*고객센터*/
    .address-1 {
        display: flex;
        flex-flow: column;
    }

    .center-title {
        font-weight: Bold;
        font-size: var(--heading--large);
        margin: 0;
        color: var(--content);
    }

    .contact-number {
        display: flex;
        align-items: center;
        font-size: var (--label---medium);
        font-weight: 600;
        gap: 0.5rem;
        margin: 0;
        margin-block: 1rem;

        strong {
            font-size: var(--heading---x-x-l);
            font-weight: bold;
        }
    }
    .contact-sns {
        list-style-type: none;
        padding: 0;
        margin: 0;

        li {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            height: 3.25rem;
        }
    }

    .contact-box {
        border: 0.125rem solid var(--gray--200);
        font-size: var(--paragraph---medium);
        margin: 0;
        width: 8.75rem;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .contact-description {
        margin-left: 1rem;
        display: flex;
        flex-flow: column;
        gap: 0.3125rem;
        p {
            margin: 0;
            font-size: var(--paragraph---medium);
        }
    }

    .guest-container {
        .contact-guest {
            font-size: var(--paragraph---small);
            margin: 0;
            display: flex;
            font-weight: regular;
            margin: 0.35rem;
            a {
                margin: 0;
                color: var(--primary);
                margin-left: 0.35rem;
            }
        }
    }

    /* 사업자 정보 등 */
    .address-2 {
    }

    .introduce-karly {
        display: flex;
        width: 34.25rem;
        height: 1.625rem;
        justify-content: space-between;
        p {
            margin: 0;
            font-size: var(--paragraph---medium);
        }
    }

    .info {
        margin-block: 1.75rem;
        span {
            display: flex;
            font-size: var(--paragraph---small);
            gap: 0.5rem;
            height: 1.1875rem;
            p {
                margin: 0;
            }
        }
    }

    .karly-color {
        color: var(--primary);
    }

    .sns-container {
        display: flex;
        gap: 1.25rem;
        img {
            width: 1.875rem;
            height: 1.875rem;
        }
    }

    /* 인증 */
    .auth-container {
        display: flex;
        justify-content: space-between;
        border-top: 0.0625rem solid var(--gray--100);
    }

    .auth-info {
        display: flex;
        align-items: start;
        padding-top: 1.5rem;
        padding-bottom: 2rem;

        p {
            margin: 0;
            font-size: 0.625rem;
            margin-left: 0.5rem;
            width: 13.125rem;
            line-height: 1.5;
        }
    }

    /* 가장 밑 footer */
    .footer-style {
        background-color: var(--gray--50);
        height: 6.75rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        p {
            color: var(--gray--400);
            font-size: 0.625rem;
            text-align: center;
            line-height: 1.5;
        }

        & P:nth-child(2) {
            margin-top: 0.625rem;
        }
    }
`;
