import { css } from 'lit';

export default css`
    :host {
        display: flex;
        width: 100%;
        line-height: 24px;

        input[type='radio'] {
            appearance: none;
            position: absolute;
            width: 24px;
            height: 24px;
            margin: 0;
        }

        label {
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            padding-left: 30px;
            font-size: 14px;
            color: #333;
            font-weight: 600;
            width: 100%;
        }

        label::before {
            content: '';
            width: 24px;
            height: 24px;
            border: 1px solid #c4c4c4;
            border-radius: 50%;
            display: inline-block;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            background-color: #fff;
            box-sizing: border-box;
        }

        input[type='radio']:checked + label::before {
            border-color: var(--primary);
            background-color: var(--primary);
        }

        input[type='radio']:checked + label::after {
            content: '';
            width: 10px;
            height: 10px;
            background-color: var(--gray--100);
            border-radius: 50%;
            display: block;
            position: absolute;
            left: 7px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
`;
