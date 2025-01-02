import { css } from 'lit';

export default css`
    .recommend-text {
        font-size: var(--heading---x-l);
        font-weight: 600;
        text-align: center;
        margin-top: 2.5rem;
    }

    swiper-container {
        width: 100%;
    }

    swiper-slide {
        width: 15rem;
    }

    .move-productlist {
        height: 20rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .view-all-icon {
        cursor: pointer;
        aspect-ratio: 1/1;
        color: var(--primary);
        border: 1px solid var(--gray--100);
        border-radius: 50%;
        padding: 1rem;

        &:hover {
            background-color: var(--gray--50);
        }
    }

    .view-all-text {
        cursor: pointer;
        margin-top: 1rem;
        font-size: var(--label---medium);
        font-weight: 500;
    }

    .swiper-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 65.625rem;
        margin-top: 1.75rem;
        margin-bottom: 2.5rem;
        margin-inline: auto;

        .prev-btn,
        .next-btn {
            position: absolute;
            top: 8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 3rem;
            height: 3rem;
            padding: 1rem;
            z-index: 10;
            border-radius: 50%;
            box-shadow: 0 0 3px var(--gray--200);
            color: var(--gray--400);
            background-color: var(--white);
            cursor: pointer;

            &:hover {
                color: var(--primary);
            }
        }

        .prev-btn {
            display: none;
            left: -2rem;
        }

        .next-btn {
            right: -1rem;
        }
    }
`;
