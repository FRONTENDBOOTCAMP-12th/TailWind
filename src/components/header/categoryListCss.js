import { css } from 'lit';

export default css`
    a {
        text-decoration: none;
        font-size: var(--label---medium);
        display: flex;
        align-items: center;
        width: 15.4375rem;
        height: 2.5rem;
        padding-block: 0.5rem;
        color: var(--content);
        font-weight: 600;

        & img {
            width: 1.5rem;
            height: 1.5rem;
            margin-left: 0.75rem;
            margin-right: 0.5rem;
            filter: invert(0%) sepia(2%) saturate(17%) hue-rotate(93deg) brightness(96%) contrast(101%);
            /*필터를 씌워서 호버했을 때만 필터가 벗겨져 색상이 변하도록 함 */
        }

        & img[src='/assets/Gift.svg'] {
            filter: none !important;
            /*선물하기 카테고리는 호버시에도 아이콘 필터가 바뀌지 않도록 함 */
        }
    }

    a:hover,
    a:focus {
        background-color: var(--gray--100);
        color: var(--primary);

        & img {
            filter: hue-rotate(0deg);
            /*필터 벗겨지고 본래 설정해놓은 svg 색상 */
        }
    }
`;
