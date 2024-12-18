import { LitElement, html } from 'lit';
import resetCss from '@/styles/reset.js';
import registerCss from '@/pages/register/registerCss.js';
import { pb } from '@/api/pockethost.js';
class Register extends LitElement {
    static properties = {
        idInputValue: { type: String },
    };

    constructor() {
        super();
        this.inputs = {
            idField: '',
            pw: '',
            pwCheck: '',
            userName: '',
            email: '',
            number: '',
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
    }

    async fetchData() {}
    static get styles() {
        return [resetCss, registerCss];
    }
    //input 값 받아오는 함수
    handleInput(e) {
        const input = e.composedPath().find((el) => el.tagName === 'INPUT');
        if (!input) return;

        const id = input.id;
        const value = input.value;

        this.inputs[id] = value;
    }

    //포켓 호스트에 값을 전송하는 함수
    handleRegister() {
        console.log(this.inputs['idField']);
        pb.collection('test_user')
            .create({
                userid: this.inputs['idField'],
                pw: this.inputs['pwField'],
                name: this.inputs['nameField'],
                email: this.inputs['emailField'],
                phoneNumber: this.inputs['numberField'],
            })
            .then(() => {
                console.log('완료');
            })
            .catch(() => {
                console.log('실패');
            });
    }
    // 비밀번호 확인 함수
    handlePwCheck(e) {
        this.handleInput(e);

        if (this.inputs['pwField'] === this.inputs['pwCheckField']) {
            return;
        }
    }
    // 중복확인 함수

    async handleDuplication(e) {
        const value = this.inputs[e.target.dataset.id];
        const field = e.target.dataset.field;

        try {
            const result = await pb.collection('test_user').getList(1, 1, { filter: `${field} = '${value}'` });

            if (!(result.items.length === 0)) {
                console.log('있음');
                return true;
            }
        } catch {
            console.log('없음');
            return false;
        }

        //const value = this.inputs[];
        //console.log(value);
    }
    render() {
        return html`
            <div class="register-container">
                <h2 class="register-title">회원가입</h2>
                <form class="form-container">
                    <hr class="top-line" />
                    <p class="required-text"><b>*</b>필수입력사항</p>
                    <span class="input-line">
                        <c-label required>아이디</c-label>
                        <c-input
                            placeholder="아이디를 입력해주세요"
                            classType="register"
                            id="idField"
                            @input="${this.handleInput}"
                            errorMessage="6자 이상 16자 이하의 영문"
                            required
                        ></c-input>
                        <c-button data-id="idField" data-field="userid" @click=${this.handleDuplication}>중복확인</c-button>
                    </span>
                    <span class="input-line">
                        <c-label required>비밀번호</c-label>
                        <c-input
                            placeholder="비밀번호를 입력해주세요"
                            classType="register"
                            id="pwField"
                            @input="${this.handleInput}"
                            required
                        ></c-input>
                    </span>
                    <span class="input-line">
                        <c-label required>비밀번호 확인</c-label>
                        <c-input
                            placeholder="비밀번호를 한번 더 입력해주세요"
                            classType="register"
                            id="pwCheckField"
                            @input="${this.handlePwCheck}"
                            required
                        ></c-input>
                    </span>
                    <span class="input-line">
                        <c-label required>이름</c-label>
                        <c-input
                            placeholder="이름을 입력해주세요"
                            classType="register"
                            id="nameField"
                            @input="${this.handleInput}"
                            required
                        ></c-input>
                    </span>
                    <span class="input-line">
                        <c-label required>이메일</c-label>
                        <c-input placeholder="이메일" classType="register" id="emailField" @input="${this.handleInput}" required></c-input>
                        <c-button data-id="emailField" data-field="email" @click=${this.handleDuplication}>중복확인</c-button>
                    </span>
                    <span class="input-line">
                        <c-label required>휴대폰</c-label>
                        <c-input
                            placeholder="숫자만 입력해주세요."
                            classType="register"
                            id="numberField"
                            @input="${this.handleInput}"
                            required
                        ></c-input>
                        <c-button>인증번호 받기</c-button>
                    </span>

                    <span class="input-line">
                        <c-label required>주소</c-label>
                        <div class="address-container">
                            <c-button>주소 찾기</c-button>
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

                <div class="terms-container">
                    <c-label required>이용약관동의</c-label>
                    <div class="check-container">
                        <span class="all-check">
                            <c-checkbox>
                                <div>
                                    전체동의합니다
                                    <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다</p>
                                </div>
                            </c-checkbox>
                        </span>
                        <span class="part-check">
                            <c-checkbox>이용약관 동의(필수)</c-checkbox>
                            <p>약관보기</p>
                        </span>
                        <span class="part-check"
                            ><c-checkbox>개인정보 수집 · 이용 동의 (필수)</c-checkbox>
                            <p>약관보기</p></span
                        >
                        <span class="part-check"
                            ><c-checkbox>무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)</c-checkbox>
                            <p>약관보기</p></span
                        >
                        <span class="part-check"
                            ><c-checkbox>본인은 만 14세 이상입니다. (필수)</c-checkbox>
                            <p>약관보기</p></span
                        >
                    </div>
                </div>

                <c-button type="submit" mode="fill" size="btn-md" @click=${this.handleRegister}>가입하기</c-button>
            </div>
        `;
    }
}

customElements.define('c-register', Register);
