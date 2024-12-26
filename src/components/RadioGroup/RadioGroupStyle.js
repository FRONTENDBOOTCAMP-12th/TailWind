import { css } from 'lit';

export default css`
    :host {
        display: block;
        width: 100%;
    }

    .radio-container {
        display: flex;
        width: 100%;
    }

    ::slotted(c-radio) {
        flex: 1;
        min-width: 0;
    }
`;
