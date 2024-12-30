import { css } from 'lit';

export default css`
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

        .product-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background-color: #f8f8f8;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border-top: 1px solid var(--black);

            }

            th,
            td {
                padding: 17px;
                text-align: left;
                border-bottom: 1px solid var(--gray--300);
            }

            th {
                text-align: center;
                border-top: 2px solid var(--black);
                border-bottom: 1px solid var(--black);
            }

            .review-author {
                font-size: 0.75rem;
                font-weight: 600;
                vertical-align: top;
                width: 15%;
            }

            .review-content-wrapper {
                font-size: 0.75rem;
                font-weight: 400;
                display: flex;
                flex-direction: column;
                gap: 20px;

                .review-title, .review-date {
                    color: var(--gray--400);
                }
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
            padding-bottom: 12px;
            margin: 24px 0 0 0;
            font-weight: 600;

            .total-count {
                font-size: 0.75rem;
                color: var(--content);
            }

            .sort-options {
                display: flex;
                gap: 12px;
                align-items: center;
                font-size: 14px;
                color: var(--gray--300);

                .divider {
                    color: var(--gray--300);
                }

                button {
                    cursor: pointer;

                    &.active {
                        color: var(--content);
                    }
                }
            }
        }

        .qna-row, .notice-row {
            cursor: pointer;

            &:hover {
                background-color: #f5f5f5;
            }

            td:not(:first-child) {
                text-align: center;
                color: var(--gray--400);
            }

            td:first-child {
                width: 60%;
            }

            .secret {
                color: var(--gray--400);
            }
        }

        .expanded-content {
            background-color: #f9f9f9;

            td {
                padding: 20px;
            }
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
            color: white;
        }

        .q-icon {
            background-color: var(--secondary);
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
