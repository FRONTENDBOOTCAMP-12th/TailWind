import { LitElement, html, css } from 'lit';
import resetCss from '@/styles/reset.js';

class Login extends LitElement {
    static get styles() {
        return [
            resetCss,
            css`
                .login-container {
                    width: 100%;
                    height: 32.9375rem;
                    padding-block: 5rem;
                    display: flex;
                    flex-flow: column;
                    justify-content: center;
                    align-items: center;

                    .login-title {
                        font-size: var(--label---large);
                        font-weight: 600;
                        margin-bottom: 2.75rem;
                    }

                    .login-form {
                        display: grid;
                        gap: 0.75rem;
                        margin-bottom: 1.75rem;
                    }

                    .find-st {
                        text-align: end;
                        & a {
                            font-size: var(--paragraph---small);
                        }
                    }

                    .button-st {
                        background-color: red;
                        width: 21.25rem;
                        height: 3.375rem;
                        text-align: center;
                    }

                    .button-st:first-of-type {
                        margin-bottom: 0.75rem;
                    }
                }
            `,
        ];
    }

    render() {
        return html` <div class="login-container">
            <h2 class="login-title">로그인</h2>

            <div class="login-form">
                <c-input></c-input>
                <c-input></c-input>

                <span class="find-st">
                    <a href="/">아이디 찾기</a>
                    |
                    <a href="/">비밀번호 찾기</a>
                </span>
            </div>

            <button type="button" onclick="location.href='/'" class="button-st">회원가입</button>
            <button type="button" onclick="location.href='/'" class="button-st">회원가입</button>
        </div>`;
    }
}
customElements.define('c-login', Login);
