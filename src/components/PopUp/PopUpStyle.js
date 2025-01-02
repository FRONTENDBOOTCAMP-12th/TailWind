import { css } from 'lit';

export default css`
    /* 팝업 컴포넌트 스타일 */
    .popup {
        display: none;
        position: fixed;
        top: 40px;
        left: 170px;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }

    .popup-content {
        background-color: var(--black);
        width: 440px;
        height: 672px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 8px;
        text-align: center;
        overflow: auto;
    }

    .popup-content p {
        margin-top: 20px;
        margin-bottom: 20px;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.25rem;
        letter-spacing: 0.125rem;
        color: var(--white);
    }

    /* 버튼 스타일 */
    .popup-content button {
        width: 100%;
        height: 5.375rem;
        /* margin-top: 20px; */
        cursor: pointer;
        background-color: var(--gray--100);
        color: black;
        border: none;
        border-radius: 0.3125rem;
        font-size: 1.125rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.3s ease;
    }

    .popup-content button:hover {
        background-color: var(--gray--100);
    }

    .button-container {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .button-container button {
        width: 49.8%;
    }
`;
