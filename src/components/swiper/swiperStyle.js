import { css } from 'lit';

export const SwiperStyles = css`
    /* 스와이퍼 컴포넌트 스타일 */
    .mainbanner {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120rem;
        height: 23.125rem;
        z-inex: 100;

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
