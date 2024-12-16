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

                            & c-input {
                                margin: 0 0.5rem;
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
            </form>
        </div>`;
    }
}

customElements.define('c-register', Register);
console.log('하이');
