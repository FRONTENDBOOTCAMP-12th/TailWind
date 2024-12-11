import { css } from 'lit';

export const modalStyles = css`
    /* 모달 컴포넌트 스타일*/
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;

        &.open {
            display: flex;
        }

        .modal-content {
            display: flex;
            flex-direction: column;
            width: 70vw;
            height: 80%;
            background-color: white;
            padding: 2rem;
            border-radius: 5px;
            overflow: hidden;

            .modal-header {
                display: flex;
                justify-content: space-between;
                padding-bottom: 1.25rem;

                h2 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    margin: 0;
                }

                button {
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    color: #cccccc;
                    text-align: center;
                    width: 30px;
                    height: 30px;
                }
            }

            .product-wrapper {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 16px 0;
                border-top: 1px solid #e1e1e1;
                font-size: 1rem;
                font-weight: 600;

                img {
                    width: 72px;
                    height: 72px;
                }
            }

            .modal-body {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 10px;
                padding: 16px 0;
                border-top: 1px solid #e1e1e1;

                .input-group {
                    display: flex;
                    gap: 10px;

                    &.title-group {
                        align-items: center;
                    }

                    &.content-group {
                        height: 100%;
                        align-items: baseline;
                    }

                    label {
                        width: 80px;
                        font-size: 1rem;
                        font-weight: 600;
                    }

                    input[type='text'],
                    textarea {
                        flex: 1;
                        border: 1px solid #e1e1e1;
                        border-radius: 0.25rem;
                        padding: 10px;
                    }

                    textarea {
                        height: 100%;
                        resize: none;
                    }
                }

                .checkbox-group {
                    position: relative;
                    padding-left: 90px;

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
                        padding-left: 30px;
                        background-image: url('/assets/icon/checkbox-circle-unchecked.svg');
                        background-repeat: no-repeat;
                    }

                    input[type='checkbox']:checked + label {
                        background-image: url('/assets/icon/checkbox-circle-checked.svg');
                    }
                }
            }

            .modal-footer {
                display: flex;
                justify-content: center;
                gap: 10px;
                border-top: 1px solid #e1e1e1;
                padding-top: 1.25rem;

                button {
                    width: 186px;
                    height: 54px;
                    border-radius: 0.25rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    text-align: center;

                    &.cancel-btn {
                        border: 1px solid #c4c4c4;
                        background-color: #fff;
                        color: #333333;
                    }

                    &.register-btn {
                        border: 1px solid #e1e1e1;
                        background-color: #e1e1e1;
                        color: #fff;

                        &.active {
                            background-color: #333333;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
`;
