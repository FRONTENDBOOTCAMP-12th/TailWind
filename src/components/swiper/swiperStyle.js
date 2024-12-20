import { css } from 'lit';

export const MainpagesStyles = css`
    .mainbanner {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120rem;
        height: 23.125rem;

        & img {
            max-width: 100%;
        }
    }

    h3 {
        text-align: center;
    }

    .itembox {
        /* background-color: blue; */
        list-style: none;
        display: flex;
        justify-content: center;

        & img {
            width: 250px;
            height: 320px;
        }

        .iteminfo {
            padding: 10px;
            margin: 10 auto;
            display: block;
            text-align: left;
            width: 250px;
            justify-content: center;
            font-size: 14px;

            .itembrand {
                font-weight: 700;
                color: gray;
                margin: 0;
            }

            .itemname {
                font-weight: 700;
                color: black;
                margin: 5px 0;
            }

            .discount {
                display: flex;
                margin: 0;

                .discountrate {
                    font-weight: 700;
                    color: red;
                    padding-right: 10px;
                }

                .discountprice {
                    font-weight: 700;
                }
            }

            .itemprice {
                color: gray;
                text-decoration: line-through;
                margin: 0;
            }
        }
    }

    .banner2 {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 65.625rem;
        height: 13.6875rem;

        & img {
            max-width: 100%;
        }
    }

    .swiper {
        width: 100%;
        height: 300px;
    }
    .swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        background: #ddd;
    }
`;
