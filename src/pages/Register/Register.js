import registerStyle from './RegisterStyle.js';
import resetCss from '@/styles/reset.js';
import { pb } from '@/api/PocketHost.js';
import { LitElement, html } from 'lit';
import { handleFindAddr } from '@/api/AddressApi.js';

class Register extends LitElement {
    static properties = {
        isFormValid: { type: Boolean },
        requiredChecked: { type: Boolean },
    };

    constructor() {
        super();
        this.inputs = {
            idField: '',
            pwField: '',
            pwCheckField: '',
            nameField: '',
            emailField: '',
            numberField: '',
            addressField: '',
            genderField: '',
            birthField: {
                year: '',
                month: '',
                day: '',
            },
            birthDate: '',
        };
        this.hint = '';

        this.isFormValid = false;
        this.requiredChecked = false;
    }
    connectedCallback() {
        super.connectedCallback();
    }

    static get styles() {
        return [resetCss, registerStyle];
    }
    //input 값 받아오는 함수
    handleInput(e) {
        const input = e.composedPath().find((el) => el.tagName === 'INPUT');
        if (!input) return;

        const id = input.id;
        const value = input.value;

        this.inputs[id] = value;

        this.handleHint(e); // e 값을 넘겨주기
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
    //필수 입력 값이 모두 입력되었는지 확인
    handleReuired() {
        const fields = ['idField', 'pwField', 'pwCheckField', 'nameField', 'emailField', 'numberField'];

        return fields.some((field) => this.inputs[field] === '');
    }
    //포켓 호스트에 값을 전송하는 함수
    handleRegister() {
        //필수 입력 값 모두 입력
        if (!this.handleReuired()) {
            //필수 약관 모두 체크
            if (this.requiredChecked) {
                pb.collection('users')
                    .create({
                        userid: this.inputs['idField'],
                        password: this.inputs['pwField'],
                        passwordConfirm: this.inputs['pwCheckField'],
                        name: this.inputs['nameField'],
                        email: this.inputs['emailField'],
                        emailVisibility: true,
                        address: this.inputs['addressField'],
                        phoneNumber: this.inputs['numberField'],
                        birth: this.inputs['birthDate'],
                        gender: [this.inputs['genderField']],
                    })
                    .then(() => {
                        alert('완료!!');
                    })
                    .catch(() => {
                        alert('실패!!');
                    });
            } else {
                alert('필수 약관에 동의해주세요');
            }
        } else {
            alert('필수입력값을 입력하세요');
        }
    }

    // 비밀번호 확인 함수
    handlePwCheck(e) {
        //부모 컴포넌트의 이벤트에서 자식을 찾는 방법 currentTarget
        const errorMessage = e.currentTarget.renderRoot.querySelector('.error-message');

        this.handleInput(e);

        if (this.inputs['pwField'] === this.inputs['pwCheckField']) {
            errorMessage.style.display = 'block';
            errorMessage.style.color = 'dodgerblue';
            errorMessage.textContent = '비밀번호가 일치합니다.';
            return;
        }
    }

    // 중복확인 함수
    async handleDuplication(e) {
        const value = this.inputs[e.target.dataset.id]?.trim(); //입력값
        const field = e.target.dataset.field; //필드명
        const fieldId = e.target.dataset.id; //아이디명

        //hint 값이 true 일경우 ==> 에러메시지 없이 제대로 입력했을 때
        if (this.hint) {
            try {
                // 중복 값이 있는지 확인하는 값 가져오기

                const result = await pb.collection('users').getList(1, 1, { filter: `${field} = '${value}'` });

                //힌트 메세지 태그 가져오기
                const vdMessage = this.renderRoot.querySelector(`#${fieldId}`).shadowRoot.querySelector('.error-message');

                //있는 값이 있으면 길이가 0이 아닐 것이기 때문에
                if (result.items.length > 0) {
                    //중복이 있다는 힌트 메세지로 변경 시켜주기
                    // vdMessage.style.color = 'var(--info---error)';
                    // vdMessage.style.display = 'block';
                    // vdMessage.textContent = '이미 존재하는 값입니다';
                    alert('있음');

                    return true;
                } else {
                    // vdMessage.style.color = 'dodgerblue';
                    // vdMessage.style.display = 'block';
                    // vdMessage.textContent = '사용 가능합니다';
                    alert('없음');
                    return false;
                }
            } catch {
                return false;
            }
        } else {
            alert('제대로 입력하세요');
        }

        //const value = this.inputs[];
        //console.log(value);
    }

    // 성별 택하기
    handleRadio(e) {
        const gender = e.target.id;
        this.inputs['genderField'] = gender;
    }

    //생년월일 값 넣기
    handleBirth(e) {
        const { year, month, day } = e.detail;

        this.inputs.birthField.year = year;
        this.inputs.birthField.month = this.handleZero(month);
        this.inputs.birthField.day = this.handleZero(day);

        this.handleBirthDate(this.inputs.birthField);
    }

    // 형식에 맞게 생년월일 바꾸기
    handleBirthDate({ year, month, day }) {
        this.inputs.birthDate = `${year}-${month}-${day}`;
    }

    //숫자 한개가 들어올 때는 앞에 0을 추가해주는 함수
    handleZero(value) {
        return String(value).padStart(2, '0');
    }

    // 체크 항목 가져오는 함수
    handleChecked(e) {
        return e.target.checked;
    }

    //전체 체크
    handleAllCheck(e) {
        const isChecked = this.handleChecked(e);

        const checks = this.renderRoot.querySelectorAll('.part-check c-checkbox ');

        checks.forEach((check) => {
            check.checked = isChecked; // 부모 상태에 따라 자식 체크박스 설정
        });

        this.handleReCheck(e); // 필수체크 값을 체크 하기 위해서 이벤트를 넘겨줌
    }

    //필수 체크 확인 함수
    handleReCheck(e) {
        const checked = this.handleChecked(e);

        //필수 속성 입력 체크박스만 가지고 오기
        const requiredCk = this.renderRoot.querySelectorAll('c-checkbox[required]');

        //필수 체크라고 되어있는 박스가 모두 체크 되었으면 true를 반환
        this.requiredChecked = Array.from(requiredCk).every((checkbox) => checkbox.checked);
    }

    //주소 찾기 함수
    handleFindAddr() {
        handleFindAddr(this.inputs);
    }

    //html 구조
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
                            errorMessage="숫자만 입력 불가능, 6자 이상"
                            .validation=${/^(?=.*\D).{6,}$/}
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
                            errorMessage="특수문자 포함 최소 6자 이상 16자 이하의 영문"
                            .validation=${/^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{6,16}$/}
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
                            errorMessage="비밀번호가 일치하지 않습니다"
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
                            errorMessage="이름을 올바르게 입력해주세요"
                            .validation=${/^[가-힣A-Za-z]+$/}
                            required
                        ></c-input>
                    </span>
                    <span class="input-line">
                        <c-label required>이메일</c-label>
                        <c-input
                            placeholder="이메일"
                            classType="register"
                            id="emailField"
                            @input="${this.handleInput}"
                            errorMessage="올바른 이메일 형식으로 입력해주세요"
                            .validation=${/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                            required
                        ></c-input>
                        <c-button data-id="emailField" data-field="email" @click=${this.handleDuplication}>중복확인</c-button>
                    </span>
                    <span class="input-line">
                        <c-label required>휴대폰</c-label>
                        <c-input
                            placeholder="숫자만 입력해주세요."
                            classType="register"
                            id="numberField"
                            @input="${this.handleInput}"
                            errorMessage="숫자만 입력해주세요"
                            .validation=${/^\d+$/}
                            required
                        ></c-input>
                        <c-button>인증번호 받기</c-button>
                    </span>

                    <span class="input-line">
                        <c-label required>주소</c-label>
                        <div class="address-container">
                            <c-button @click="${this.handleFindAddr}">주소 찾기</c-button>
                            배송지에 따라 상품 정보가 달라질 수 있습니다.
                        </div>
                    </span>
                    <span class="input-line">
                        <c-label>성별</c-label>
                        <c-radio-group name="radio">
                            <c-radio id="male" @radio-change="${this.handleRadio}">남자</c-radio>
                            <c-radio id="female" @radio-change="${this.handleRadio}">여자</c-radio>
                            <c-radio id="none" @radio-change="${this.handleRadio}">선택안함</c-radio>
                        </c-radio-group>
                    </span>
                    <span class="input-line">
                        <c-label>생년월일</c-label>
                        <c-birth @birth-change="${this.handleBirth}"></c-birth>
                    </span>
                    <span class="input-line">
                        <c-label>추가입력 사항</c-label>
                        <c-radio-group name="radio">
                            <c-radio id="radio1">추천인 아이디</c-radio>
                            <c-radio id="radio2">참여 이벤트명</c-radio>
                        </c-radio-group>
                    </span>
                </form>

                <div class="terms-container">
                    <c-label required>이용약관동의</c-label>
                    <div class="check-container">
                        <span class="all-check">
                            <c-checkbox @checkbox-change="${this.handleAllCheck}">
                                <div>
                                    전체동의합니다
                                    <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다</p>
                                </div>
                            </c-checkbox>
                        </span>
                        <span class="part-check">
                            <c-checkbox @checkbox-change=${this.handleReCheck} required>이용약관 동의(필수)</c-checkbox>
                            <p>약관보기</p>
                        </span>
                        <span class="part-check"
                            ><c-checkbox @checkbox-change=${this.handleReCheck} required>개인정보 수집 · 이용 동의 (필수)</c-checkbox>
                            <p>약관보기</p></span
                        >
                        <span class="part-check"
                            ><c-checkbox>무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)</c-checkbox>
                            <p>약관보기</p></span
                        >
                        <span class="part-check"
                            ><c-checkbox @checkbox-change=${this.handleReCheck} required>본인은 만 14세 이상입니다. (필수)</c-checkbox>
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
