import { css } from 'lit';

export default css`
    /* resetCss가 적용이 안돼서 임시적으로 export하도록 설정 */
    html,
    body,
    div,
    span,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    abbr,
    address,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    samp,
    small,
    strong,
    sub,
    sup,
    var,
    b,
    i,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        font-size: 100%;
        vertical-align: baseline;
        background: transparent;
    }
    body {
        line-height: 1;
    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }
    nav ul {
        list-style: none;
    }
    blockquote,
    q {
        quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: none;
    }
    a {
        margin: 0;
        padding: 0;
        font-size: 100%;
        vertical-align: baseline;
        background: transparent;
    }
    ins {
        background-color: #ff9;
        color: #000;
        text-decoration: none;
    }
    mark {
        background-color: #ff9;
        color: #000;
        font-style: italic;
        font-weight: bold;
    }
    del {
        text-decoration: line-through;
    }
    abbr[title],
    dfn[title] {
        border-bottom: 1px dotted;
        cursor: help;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #ccc;
        margin: 1em 0;
        padding: 0;
    }
    input,
    select {
        vertical-align: middle;
    }

    /* 상품 추가 모달 스타일링 */

    .add-cart {
        background-color: rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;

        &.visible {
            display: block;
        }
    }

    /* 모달 창 스타일링 */
    .add-cart-container {
        background-color: var(--white);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 21.75rem;
        height: 15.25rem;
        border-radius: 1rem;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.75rem;

        /* 제품 정보 스타일링 */
        .item-title {
            font-size: var(--label---medium);
            line-height: 150%;
            color: var(--content);
        }

        .total-price-container {
            display: flex;
            justify-content: space-between;
            margin-top: 0.75rem;

            .item-price {
                font-size: var(--label---medium);
                line-height: 150%;
                font-weight: bold;
            }

            /* 제품 수량 설정 스타일링 */
            .amount-container {
                border: 1px solid var(--gray--200);
                display: flex;
                width: 5.25rem;
                height: 1.875rem;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                gap: 0.1875rem;
                font-size: var(--label---medium);

                .plus-button {
                    background-color: transparent;
                    border: none;
                    font-size: 1.5rem;
                    height: 1.875rem;
                }

                .minus-button {
                    background-color: transparent;
                    border: none;
                    font-size: 2rem;

                    &:disabled {
                        color: var(--gray--300);
                    }
                }
            }
        }

        /* 제품 총액 스타일링 */
        .sum-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: first baseline;
            margin-bottom: 0.25rem;

            .sum {
                right: 0;
                font-size: var(--label---medium);
                line-height: 150%;
                color: #333;
            }

            .total-price {
                font-size: var(--heading---x-l);
                font-weight: bold;
                line-height: 140%;
            }
        }

        /* 적립 텍스트 스타일링 */
        .saving-container {
            float: right;
            display: flex;
            gap: 0.75rem;
            align-items: center;

            .saving {
                background-color: #fa622f;
                color: var(--white);
                border-radius: 0.0625rem;
                font-size: var(--label---small);
                font-weight: 500;
                line-height: 150%;
                padding-inline: 0.5rem;
            }

            .saving-info {
                font-size: var(--label---medium);
                font-weight: bold;
            }
        }

        /* 상품 장바구니에 추가 확인,취소 버튼 스타일링 */
        .add-confirm-container {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            font-size: var(--label---medium);

            .add-cancel {
                width: 10.875rem;
                padding-block: 0.9375rem;
                background-color: transparent;
                border-radius: 0.25rem;
                border: 1px solid var(--gray--400);
                color: var(--content);
            }

            .add-confirm {
                width: 10.875rem;
                background-color: var(--primary);
                color: var(--white);
                border-radius: 0.25rem;
                border: 1px solid var(--primary);
                padding-block: 0.9375rem;
            }
        }
    }
`;
