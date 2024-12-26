import { LitElement, html } from 'lit';
import resetCss from '@/styles/reset.js';
import loginCss from './loginCss';
import { pb } from '@/api/pockethost.js';
class Login extends LitElement {
    static properties = {
        hint: { type: Boolean },
    };
    constructor() {
        super();
        this.inputs = {
            idField: '',
            pwField: '',
        };
        this.hint = false;
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

        this.handleHint(e);
    }
    // 유효성을 갖추었는지 값 가져오기
    handleHint(e) {
        const errorMessage = getComputedStyle(
            e
                .composedPath()
                .find((el) => el.classList?.contains('input-container'))
                ?.querySelector('.error-message')
        ).display;

        //display가 none이면 제대로 입력했다는 뜻
        if (errorMessage === 'none') {
            this.hint = true;
        } else {
            this.hint = false;
        }
    }

    //로그인 시도 함수
    async handleLogin() {
        if (this.hint) {
            try {
                const id = this.inputs['idField'];
                const pw = this.inputs['pwField'];

                await pb.collection('users').authWithPassword(id, pw);
                alert('성공');
            } catch {
                alert('실패');
            }
        } else {
            alert('제대로 입력하세요');
        }
    }

    render() {
        return html` <div class="login-container">
            <h2 class="login-title">로그인</h2>

            <div class="login-form">

                <label for="idField" class="sr-only">아이디</label>
                <c-input 
                placeholder="아이디"
                id="idField"
                @input="${this.handleInput}" 
                            errorMessage="숫자만 입력 불가능, 6자 이상"
                            .validation=${/^(?=.*\D).{6,}$/}
                            required></c-input>
                <label for="pwField" class="sr-only">비밀번호</label>
                <c-input 
                placeholder="비밀번호"  
                id="pwField"
                @input="${this.handleInput}" 
                errorMessage="특수문자 포함 최소 6자 이상 16자 이하의 영문"
                .validation=${/^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{6,16}$/}  
                         required></c-input>

                <span class="find-st">
                    <a href="/">아이디 찾기</a>
                    |
                    <a href="/">비밀번호 찾기</a>
                </span>

                <c-button type="submit" mode="fill" size="btn-md" @click ="${this.handleLogin}">로그인</c-button>
                <c-button type="link" mode="outline" size="btn-md">회원가입</c-button></c-button>
            </div>
        </div>`;
    }
}
customElements.define('c-login', Login);
