import { LitElement, html, css } from 'lit';
import resetCss from '@/styles/reset.js';

class Register extends LitElement {
    static get styles() {
        return [
            resetCss,
            css`
                .register-container {
                    width: 100%;
                    display: flex;
                    flex-flow: column;
                    padding-block: 5rem;
                    justify-content: center;
                    align-items: center;

                    & .register-title {
                        font-size: var(--label---large);
                        font-weight: 600;
                        margin-bottom: 2.75rem;
                    }

                    & .form-container {
                        position: relative;
                        width: 640px;
                        & hr {
                            border: 0;
                            height: 3px;
                            background-color: black;
                        }
                        & .required-text {
                            position: absolute;
                            right: 0;
                            bottom: 100%;

                            & b {
                                color: var(--info---error);
                            }
                        }

                        & .input-line {
                            display: flex;
                            align-items: center;
                            padding: 1.25rem 0;

                            & c-label {
                                margin-right: 0.5rem;
                            }

                            & c-input {
                                margin-right: 0.5rem;
                            }

                            & .address-container {
                                display: flex;
                                flex-flow: column;
                                gap: 0.25rem;
                                font-size: var(--paragraph---small);
                            }

                            & c-radio-group {
                                width: 333px;
                                display: flex;
                            }
                        }
                    }
                }
            `,
        ];
    }

    render() {
        return html`<div class="register-container">
            <h2 class="register-title">회원가입</h2>
            <form action="" class="form-container">
                <hr />
                <p class="required-text"><b>*</b>필수입력사항</p>
                <span class="input-line">
                    <c-label required>아이디</c-label>
                    <c-input placeholder="아이디를 입력해주세요" classType="register"></c-input>
                    <c-button>중복확인</c-button>
                </span>
                <span class="input-line">
                    <c-label required>비밀번호</c-label>
                    <c-input placeholder="비밀번호를 입력해주세요" classType="register"></c-input>
                </span>
                <span class="input-line">
                    <c-label required>비밀번호 확인</c-label>
                    <c-input placeholder="비밀번호를 한번 더 입력해주세요" classType="register"></c-input>
                </span>
                <span class="input-line">
                    <c-label required>이름</c-label>
                    <c-input placeholder="이름을 입력해주세요" classType="register"></c-input>
                </span>
                <span class="input-line">
                    <c-label required>이메일</c-label>
                    <c-input placeholder="이메일" classType="register"></c-input>
                    <c-button>중복확인</c-button>
                </span>
                <span class="input-line">
                    <c-label required>휴대폰</c-label>
                    <c-input placeholder="숫자만 입력해주세요." classType="register"></c-input>
                    <c-button>인증번호 받기</c-button>
                </span>

                <span class="input-line">
                    <c-label required>주소</c-label>
                    <div class="address-container">
                        <c-button>인증번호 받기</c-button>
                        배송지에 따라 상품 정보가 달라질 수 있습니다.
                    </div>
                </span>
                <span class="input-line">
                    <c-label>성별</c-label>
                    <c-radio-group name="radio">
                        <c-radio id="radio1">남자</c-radio>
                        <c-radio id="radio2">여자</c-radio>
                        <c-radio id="radio3">선택안함</c-radio>
                    </c-radio-group>
                </span>
                <span class="input-line">
                    <c-label>생년월일</c-label>
                </span>
                <span class="input-line">
                    <c-label>추가입력 사항</c-label>
                    <c-radio-group name="radio">
                        <c-radio id="radio1">친구초대 추천인 아이디</c-radio>
                        <c-radio id="radio2">참여 이벤트명</c-radio>
                    </c-radio-group>
                </span>
            </form>
        </div>`;
    }
}

customElements.define('c-register', Register);
console.log('하이');
