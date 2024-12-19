import { LitElement, html } from 'lit';
import resetCss from '@/styles/reset.js';
import loginCss from './loginCss';
import { pb } from '@/api/pockethost.js';
class Login extends LitElement {
    constructor() {
        super();
        this.inputs = {
            idField: '',
            pwField: '',
        };
    }

    static get styles() {
        return [resetCss, loginCss];
    }

    handleInput(e) {
        const input = e.composedPath().find((el) => el.tagName === 'INPUT');
        if (!input) return;

        const id = input.id;
        const value = input.value;

        this.inputs[id] = value;
    }

    async handleLogin() {
        try {
            const id = this.inputs['idField'];
            const pw = this.inputs['pwField'];

            await pb.collection('users').authWithPassword(id, pw);
            console.log('성공');
        } catch {
            console.log('틀렸어');
        }
    }

    render() {
        return html` <div class="login-container">
            <h2 class="login-title">로그인</h2>

            <div class="login-form">
                <c-input 
                placeholder="아이디"
                id="idField"
                @input="${this.handleInput}" 
                            required></c-input>
                <c-input 
                placeholder="비밀번호"  
                id="pwField"
                @input="${this.handleInput}" 
                            required></c-input>

                <span class="find-st">
                    <a href="/">아이디 찾기</a>
                    |
                    <a href="/">비밀번호 찾기</a>
                </span>

                <c-button type="button" mode="fill" size="btn-md" @click ="${this.handleLogin}">로그인</c-button>
                <c-button type="button" mode="outline" size="btn-md">회원가입</c-button></c-button>
            </div>
        </div>`;
    }
}
customElements.define('c-login', Login);
