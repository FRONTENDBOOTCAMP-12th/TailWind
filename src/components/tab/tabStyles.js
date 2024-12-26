import { css } from 'lit';

export const tabStyles = css`
    :host {
        display: block;
    }
    .tab-header {
        display: flex;
        text-align: center;
        font-size: 1rem;
        font-weight: 600;
        height: 54px;

        button {
            flex: 1;
            background: var(--gray--50);
            border: 1px solid var(--gray--300);
            cursor: pointer;

            &.active {
                color: var(--primary);
                border: 1px solid var(--gray--100);
                border-bottom: 0px;
                font-weight: bold;
            }
        }
    }

    .tab-content {
        display: flex;
        flex-direction: column;
        gap: 40px;

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;

            th,
            td {
                border: 1px solid #ccc;
            }
            th,
            td {
                padding: 10px;
                text-align: left;
            }
        }

        .table-header {
            margin-bottom: 20px;

            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;

                h2 {
                    display: inline-block;
                    font-size: var(--heading---x-l);
                }
            }

            p {
                font-size: 1rem;
                color: var(--content);
                font-weight: 600;
            }

            ul {
                margin-bottom: 10px;
                padding-left: 20px;

                li {
                    font-size: 0.75rem;
                    color: var(--gray--500);
                    list-style: disc;
                }
            }
        }
    }
`;
