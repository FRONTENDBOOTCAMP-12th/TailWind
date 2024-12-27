import { css } from 'lit';

export default css`
    :host {
        position: absolute;
        display: block;
        top: 50px;
        z-index: 100;
    }

    .bubble {
        position: relative;
        background: #fff;
        padding: 20px;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        min-width: 220px;
        display: flex;
        gap: 12px;
        font-family: 'Noto Sans KR', sans-serif;
    }

    .bubble::before {
        content: '';
        position: absolute;
        top: -8px;
        right: 36px;
        width: 16px;
        height: 16px;
        background: #fff;
        transform: rotate(45deg);
        box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.05);
    }
`;
