import { css } from 'lit';

export default css`
    /* 팝업 컴포넌트 스타일 */
    .popup {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8); /* 배경을 검은색으로 설정 */
        justify-content: center;
        align-items: center;
    }

    /* 팝업 박스 스타일 */
    .popup-content {
        background-color: black;
        width: 440px;
        height: 672px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 8px;
        text-align: center;
        overflow: auto;
    }

    /* 텍스트를 가로 세로 중앙 정렬 */
    .popup-content p {
        margin-top: 20px;
        margin-bottom: 20px;
        flex-grow: 1; /* 텍스트가 중앙에 위치하도록 성장 */
        display: flex;
        justify-content: center; /* 세로 중앙 정렬 */
        align-items: center; /* 가로 중앙 정렬 */
        font-size: 20px; /* 글자 크기 크게 설정 */
        letter-spacing: 2px; /* 자간을 조금 더 넓게 설정 */
        color: white; /* 글자 색을 하얀색으로 변경 */
    }

    /* 버튼 스타일 */
    .popup-content button {
        width: 1200%; /* 버튼의 너비를 100%로 설정 (팝업 너비에 맞게) */
        height: 86px; /* 버튼의 높이를 86px로 설정 */
        /* margin-top: 20px; */
        cursor: pointer;
        background-color: #d3d3d3; /* 배경을 회색으로 설정 */
        color: black; /* 글자 색을 검은색으로 설정 */
        border: none;
        border-radius: 5px;
        font-size: 18px;
        display: flex;
        justify-content: center; /* 가로 중앙 정렬 */
        align-items: center; /* 세로 중앙 정렬 */
        transition: background-color 0.3s ease;
    }

    /* 버튼 호버 효과 */
    .popup-content button:hover {
        background-color: #a9a9a9; /* 호버 시 배경이 짙은 회색으로 변경 */
    }

    /* 하단 버튼들을 왼쪽과 오른쪽에 배치 */
    .button-container {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .button-container button {
        width: 49.8%; /* 버튼을 각각 왼쪽, 오른쪽으로 배치 */
    }
`;
