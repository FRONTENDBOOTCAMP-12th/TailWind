import { LitElement, html, css } from 'lit';
import resetCss from '@/styles/reset.js';
import loginCss from './loginCss';

class Login extends LitElement {
    static get styles() {
        return [resetCss, loginCss];
    }

    render() {
        return html` <div class="login-container">
            <h2 class="login-title">로그인</h2>

            <div class="login-form">
                <c-input placeholder="아이디"></c-input>
                <c-input placeholder="비밀번호"></c-input>

                <span class="find-st">
                    <a href="/">아이디 찾기</a>
                    |
                    <a href="/">비밀번호 찾기</a>
                </span>

                <c-button type="button" mode="fill" size="btn-md">로그인</c-button>
                <c-button type="button" mode="outline" size="btn-md">회원가입</c-button></c-button>
            </div>
        </div>`;
    }
}
customElements.define('c-login', Login);
