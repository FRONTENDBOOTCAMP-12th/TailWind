import { LitElement, html, css } from 'lit';
import resetCss from '@/styles/reset.js';

class Register extends LitElement {
    static get styles() {
        return [
            resetCss,
            css`
                .register {
                    & .register-title {
                        font-size: var(--label---large);
                        font-weight: 600;
                        margin-bottom: 2.75rem;
                    }
                }
            `,
        ];
    }

    render() {
        return html`<div class="register">
            <h2 class="register-title">회원가입</h2>
            <form action="">
                <c-label>아이디</c-label>
            </form>
        </div>`;
    }
}

customElements.define('c-register', Register);
console.log('하이');
