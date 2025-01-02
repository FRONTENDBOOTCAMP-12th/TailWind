import { css } from 'lit';

export default css`
    /* 중간베너 컴포넌트 스타일 */

    .bannermiddle {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 65.625rem;
        max-width: 100%;
        height: 13.6875rem;
        text-decoration: none;

        & img {
            max-width: 100%;
            height: auto;
        }
    }
`;
