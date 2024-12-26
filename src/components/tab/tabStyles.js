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

        .review-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            background-color: #f9f9f9;
            margin: 24px 0 12px 0;

            .total-count {
                font-size: 14px;
                color: #333;
            }

            .sort-options {
                display: flex;
                gap: 12px;
                align-items: center;
                font-size: 14px;
                color: #666;

                .divider {
                    color: #e0e0e0;
                }

                button {
                    cursor: pointer;

                    &.active {
                        color: #333;
                        font-weight: 500;
                    }
                }
            }
        }

        .qna-row {
            cursor: pointer;

            &:hover {
                background-color: #f5f5f5;
            }

            .qna-content {
                background-color: #f9f9f9;
            }
        }

        .qna-content td {
            padding: 20px;
        }

        .question,
        .answer {
            display: flex;
            gap: 16px;
            margin: 10px 0;
        }

        .q-icon,
        .a-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }

        .q-icon {
            background-color: #e0e0e0;
        }

        .a-icon {
            background-color: #2196f3;
            color: white;
        }

        .pagination {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;

            button {
                padding: 8px 12px;
                border: 1px solid #ddd;
                background: white;
                cursor: pointer;

                &.active {
                    background: #007bff;
                    color: white;
                    border-color: #007bff;
                }

                &:disabled {
                    background: #eee;
                    cursor: not-allowed;
                }
            }
        }
    }
`;
