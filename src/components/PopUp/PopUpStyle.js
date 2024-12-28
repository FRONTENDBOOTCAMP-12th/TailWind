import { css } from 'lit';

export default css`
    /* 팝업 컴포넌트 스타일 */
    .popup {
        background-color: var(--black);
        width: 27.5rem;
        height: 42rem;
        border-radius: 3%;
    }

    .popup-text {
        display: flex;
        flex-direction: column;
        width: 27.5rem;
        height: 36.625rem;
        justify-content: center;
        align-items: center;

        & p {
            color: var(--white);
            text-align: center;
            line-height: 1.8;
        }
    }

    .popup-close {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 27.5rem;
        height: 5.375rem;
        color: var(--black);
        border: none;
        background-color: var(--gray--100);

        & button {
            display: flex;
            align-items: center;
            justify-content: center;
            display: flex;
            width: 50%;
            border: 1px solid var(--gray--500);
        }

        .todaypopup-close {
            border-bottom-left-radius: 8%;
        }

        .nowpopup-close {
            border-bottom-right-radius: 8%;
        }
    }
`;
