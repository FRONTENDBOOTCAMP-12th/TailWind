import { css } from 'lit';

export const checkboxStyles = css`
    input[type='checkbox'] {
        margin: 0;
        position: absolute;
        width: 24px;
        height: 24px;
        appearance: none;
    }

    label {
        display: inline-block;
        line-height: 24px;
        padding-left: 30px; // SVG 공간 확보
    }

    svg {
        position: absolute;
        width: 24px;
        height: 24px;

        circle {
            fill: #fff;
            stroke: #ddd;
        }

        path {
            fill: #ddd;
        }
    }

    input[type='checkbox']:checked ~ svg circle {
        fill: var(--primary);
        stroke: none;
    }

    input[type='checkbox']:checked ~ svg path {
        fill: #fff;
    }
`;
