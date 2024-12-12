import { LitElement, html } from 'lit';
import reset from '@/styles/reset.js';
import footerCss from './footerCss.js';

class Footer extends LitElement {
    static get styles() {
        return [reset, footerCss];
    }

    render() {
        return html` <footer>
            <div class="wrapper">
                <div class="footer-container">
                    <address class="address-1">
                        <h3 class="center-title">고객행복센터</h3>
                        <p class="contact-number"><strong> 1644-1105</strong> 월 ~ 토요일 오전 7시 - 오후 6시</p>
                        <ul class="contact-sns">
                            <li>
                                <p class="contact-box">카카오톡 문의</p>
                                <div class="contact-description">
                                    <p>월~토요일 | 오전 7시 - 오후 6시</p>
                                    <p>일/공휴일 | 오전 7시 - 오후 1시</p>
                                </div>
                            </li>
                            <li>
                                <p class="contact-box">1:1 문의</p>
                                <div class="contact-description">
                                    <p>365일</p>
                                    <p>고객센터 운영시간에 순차적으로 답변드리겠습니다.</p>
                                </div>
                            </li>
                            <li>
                                <p class="contact-box">대량주문 문의</p>
                                <div class="contact-description">
                                    <p>월~금요일 | 오전 9시 - 오후 6시</p>
                                    <p>점심시간 | 낮 12시 - 오후 1시</p>
                                </div>
                            </li>
                        </ul>
                        <div class="guest-container">
                            <span class="contact-guest"
                                >비회원 문의 :
                                <a href="mailto:asdf@naver.com">asdf@naver.com</a>
                            </span>
                            <span class="contact-guest"
                                >비회원 대량주문 문의 :
                                <a href="mailto:asdf@naver.com">asdf@naver.com</a>
                            </span>
                        </div>
                    </address>

                    <address class="address-2">
                        <span class="introduce-karly">
                            <p>칼리소개</p>
                            <p>칼리소개영상</p>
                            <p>인재채용</p>
                            <p>이용약관</p>
                            <p>개인정보처리방침</p>
                            <p>이용안내</p>
                        </span>

                        <div class="info">
                            <span>
                                <p>법인명 (상호) : 주식회사 칼리</p>
                                |
                                <p>법인명 (상호) : 주식회사 칼리</p>
                                |
                                <a href="/" class="karly-color">사업자 정보 확인</a>
                            </span>
                            <span>
                                <p>통신판매업 : 제 2005-서울강남-00000 호</p>
                                |
                                <p>개인정보보호책임자 : 홍길동</p>
                            </span>
                            <span>
                                <p>주소 : 서울특별시 강남구 테헤란로 5003, 28층(역삼동)</p>
                                |
                                <p>대표이사 : 심선범</p>
                            </span>
                            <span>
                                <p>입점문의 : 입점문의하기</p>
                                |
                                <p>제휴문의</p>
                                :
                                <a href="mailto:business@karlycorp.com" class="karly-color">business@karlycorp.com</a>
                            </span>
                            <span>
                                <p>채용문의</p>
                                :
                                <a href="mailto:recruit@karlycorp.com" class="karly-color">recruit@karlycorp.com</a>
                            </span>
                            <span>
                                <p>팩스 : 070 - 1111 - 2222</p>
                            </span>
                        </div>
                        <span class="sns-container">
                            <a href="/" target="_blank" rel="noopener noreferrer">
                                <img src="/assets/Blog.svg" alt="블로그 아이콘" />
                            </a>
                            <a href="/" target="_blank" rel="noopener noreferrer">
                                <img src="/assets/FaceBook.svg" alt="페이스북 아이콘" />
                            </a>
                            <a href="/" target="_blank" rel="noopener noreferrer">
                                <img src="/assets/Instagram.svg" alt="인스타그램 아이콘" />
                            </a>
                            <a href="/" target="_blank" rel="noopener noreferrer">
                                <img src="/assets/Naver.svg" alt="네이버 글쓰기 아이콘" />
                            </a>
                            <a href="/" target="_blank" rel="noopener noreferrer">
                                <img src="/assets/Youtube.svg" alt="유튜브 아이콘" />
                            </a>
                        </span>
                    </address>
                </div>

                <span class="auth-container">
                    <div class="auth-info">
                        <img src="/assets/ISMS.svg" alt="" />
                        <p>
                            [인증범위] 마켓칼리 쇼핑몰 서비스 개발 운영 (심사받지 않은 물리적 인프라 제외)
                            <br />[유효기간] 2022.01.19 ~ 2025.01.18
                        </p>
                    </div>
                    <div class="auth-info">
                        <img src="/assets/ePRIVACY.svg" alt="" />
                        <p>
                            개인정보보호 우수 웹사이트
                            <br />
                            개인정보처리시스템 인증 (ePRIVACY PLUS)
                        </p>
                    </div>
                    <div class="auth-info">
                        <img src="/assets/payments.svg" alt="" />
                        <p>
                            토스페이먼츠 구매안전(에스크로) 서비스를<br />
                            이용하실 수 있습니다.
                        </p>
                    </div>
                    <div class="auth-info">
                        <img src="/assets/ourBank.svg" alt="" />
                        <p>고객님이 현금으로 결제한 금액에 대해 우리은행과 채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.</p>
                    </div>
                </span>
            </div>

            <div class="footer-style">
                <p>
                    마켓컬리에서 판매되는 상품 중에는 마켓컬리에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다. <br />
                    마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질,
                    교환/환불 등 의무와 책임을 부담하지 않습니다.
                </p>
                <p>© KURLY CORP. ALL RIGHTS RESERVED</p>
            </div>
        </footer>`;
    }
}

customElements.define('x-footer', Footer);
