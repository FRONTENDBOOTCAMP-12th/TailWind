import { css } from 'lit';

export default css`
    .c-label {
        color: #000;
        display: inline-block;
        width: 8.3125rem;
        .required {
            color: red;
            position: relative;
            font-size: 12px;
            margin-left: 2px;
            top: -5px;
        }
    }
`;
