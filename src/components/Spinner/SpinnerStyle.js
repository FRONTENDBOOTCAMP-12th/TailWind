import { css } from 'lit';

export default css`
    /* 로딩 스피너 */
    .loader {
        width: 80px;
        height: 80px;
        border: 5px solid var(--white);
        border-bottom-color: var(--primary);
        border-radius: 50%;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        margin-block: 35vh;
        margin-inline: auto;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
