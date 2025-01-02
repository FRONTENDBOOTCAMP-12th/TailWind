import '@/components/CategoryList/CategoryList.js';
import '@/components/Search/Search.js';
import headerStyle from './HeaderStyle.js';
import resetCss from '@/styles/Reset.js';
import { LitElement, html } from 'lit';
import { pb } from '@/api/PocketHost.js';
import swal from 'sweetalert2';
class Header extends LitElement {
    static properties = {
        isAuth: { type: Boolean },
        user: { type: Object },
        cartItems: { type: Object },
        isVisible: { type: Boolean },
    };

    static get styles() {
        return [resetCss, headerStyle];
    }

    constructor() {
        super();
        this.cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? {};
        this.isVisible = localStorage.getItem('topbarVisible');
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
    }

    fetchData() {
        //로컬 스토리지에 저장되어있는 회원정보 가져오기
        const auth = JSON.parse(localStorage.getItem('auth') ?? '{}');

        const { isAuth, user } = auth;
        this.isAuth = isAuth;
        this.user = user;
    }

    handleCategory(e) {
        const buttonCt = e.currentTarget;

        buttonCt.classList.toggle('isActive');
    }

    handleEscape(e) {
        const buttonCt = this.renderRoot.querySelector('.btn-category');

        if (e.keyCode === 27) {
            buttonCt.classList.remove('isActive');
        }
    }

    handleLogout() {
        swal.fire({
            title: '로그아웃',
            text: '로그아웃 하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: 'gray',
            confirmButtonText: '로그아웃',
            cancelButtonText: '취소',
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                localStorage.removeItem('auth');
                pb.authStore.clear();
                location.reload();
            }
        });
    }

    async handleDelete() {
        swal.fire({
            title: '회원탈퇴',
            text: '정말 탈퇴 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: 'gray',
            confirmButtonText: '탈퇴하기',
            cancelButtonText: '취소',
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                try {
                    await pb.collection('users').delete(this.user.id);
                    localStorage.removeItem('auth');
                    pb.authStore.clear();
                    location.reload();
                    swal.fire({
                        title: '회원탈퇴 완료',
                        text: '다음에 또 만나요',
                        icon: 'success',
                    });
                } catch (error) {
                    alert('회원탈퇴 실패');
                }
            }
        });
    }

    firstUpdated() {
        window.addEventListener('scroll', this._onScroll.bind(this));
    }

    _onScroll() {
        const stickyHeader = this.shadowRoot.querySelector('.header.sticky');
        const defaultHeader = this.shadowRoot.querySelector('.header.default');

        if (window.scrollY > 70) {
            stickyHeader.classList.add('active');
            defaultHeader.classList.add('noactive');
        } else {
            stickyHeader.classList.remove('active');
            defaultHeader.classList.remove('noactive');
        }
    }

    handleClose() {
        this.isVisible = true;
        localStorage.setItem('topbarVisible', this.isVisible);
    }

    render() {
        return html`
            <header class="header default">
                <div class="header-topbar  ${this.isVisible ? 'hidden' : ''}"">
                    <p>지금 가입하고 인기상품 100원에 받아가세요!</p>
                    <button @click="${this.handleClose}">
                        <img src="/assets/Close.png" alt="닫기" />
                    </button>
                </div>
                <div class="header-inner">
                    <ul class="header-top">
                        <li class="sign-up">
                            ${
                                !this.isAuth
                                    ? html`<a href="/src/pages/register/index.html">회원가입</a>`
                                    : html`<div class="user-menu" @click="${this.handleCategory}">
                                          <button>${this.user.name} 님 ▼</button>
                                          <ul class="user-list">
                                              <li><button type="button" @click=${this.handleLogout}>로그아웃</button></li>
                                              <li><button type="button" @click=${this.handleDelete}>회원탈퇴</button></li>
                                          </ul>
                                      </div>`
                            }
                        </li>
                        <li>${!this.isAuth ? html` <a href="/src/pages/login/index.html">로그인</a>` : html`<span>환영합니다 !</span>`}</li>
                        <li class="customer">
                            <a href="/">고객센터</a>
                        </li>
                    </ul>
                    <div class="header-middle">
                        <h1 class="header-logo">
                            <a href="/">
                                <img src="/logo.webp" alt="네이처카트" />
                            </a>
                        </h1>
                        <ul class="karly-menu">
                            <li class="active">
                                <a href="/">마켓칼리</a>
                            </li>
                            <li>
                                <a href="/">뷰티칼리</a>
                            </li>
                        </ul>
                        <search-bar></search-bar>
                        <ul class="util-menu">
                            <li>
                                <a href="/">
                                    <picture>
                                        <source srcset="/assets/ico-header-location1x.webp 1x, /assets/ico-header-location2x.webp 2x" />
                                        <img src="/assets/ico-header-location.png" alt="배송지" />
                                    </picture>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <picture>
                                        <source srcset="/assets/ico-header-like1x.webp 1x, /assets/ico-header-like2x.webp 2x" />
                                        <img src="/assets/ico-header-like.png" alt="관심있는 상품" />
                                    </picture>
                                </a>
                            </li>
                            <li>
                                <a href="/src/pages/cart/index.html">
                                    <picture>
                                        <source srcset="/assets/ico-header-cart1x.webp 1x, /assets/ico-header-cart2x.webp 2x" />
                                        <img src="/assets/ico-header-cart.png" alt="장바구니" />
                                    </picture>
                                    <em
                                        class="cart-in ${Object.keys(this.cartItems).length > 0 ? '' : 'sr-only'}"
                                        aria-live="assertive"
                                        aria-atomic="true"
                                        aria-label="장바구니에 담긴 상품 개수"
                                        >${Object.keys(this.cartItems).length}</em
                                    >
                                </a>
                            </li>
                        </ul>
                    </div>
                    <nav class="header-bottom">
                        <div class="category-menu">
                            <button type="button" class="btn-category" @click="${this.handleCategory}" @keyup="${this.handleEscape}">카테고리</button>
                            <ul class="category-list" @keyup="${this.handleEscape}">
                                <c-category></c-category>
                            </ul>
                        </div>

                        <ul class="gnb-menu">
                            <li>
                                <a href="/src/pages/ProductList/">신상품</a>
                            </li>
                            <li>
                                <a href="/src/pages/ProductList/">베스트</a>
                            </li>
                            <li>
                                <a href="/src/pages/ProductList/">알뜰쇼핑</a>
                            </li>
                            <li>
                                <a href="/src/pages/ProductList/">특가/혜택</a>
                            </li>
                        </ul>
                        <a href="/" class="delivery-info"><b>샛별·낮</b> 배송안내</a>
                    </nav>
                </div>
            </header>
            <header class="header sticky">
                <div class="header-inner">
                    <nav class="header-bottom">
                        <div class="category-menu">
                            <button type="button" class="btn-category" @click="${this.handleCategory}" @keyup="${this.handleEscape}">카테고리</button>
                            <ul class="category-list" @keyup="${this.handleEscape}">
                                <c-category></c-category>
                            </ul>
                        </div>

                        <ul class="gnb-menu">
                            <li>
                                <a href="/src/pages/ProductList/">신상품</a>
                            </li>
                            <li>
                                <a href="/src/pages/ProductList/">베스트</a>
                            </li>
                            <li>
                                <a href="/src/pages/ProductList/">알뜰쇼핑</a>
                            </li>
                            <li>
                                <a href="/src/pages/ProductList/">특가/혜택</a>
                            </li>
                        </ul>
                        <search-bar classType="sticky"></search-bar>
                        <ul class="util-menu">
                            <li>
                                <a href="/">
                                    <picture>
                                        <source srcset="/assets/ico-header-location1x.webp 1x, /assets/ico-header-location2x.webp 2x" />
                                        <img src="/assets/ico-header-location.png" alt="배송지" />
                                    </picture>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <picture>
                                        <source srcset="/assets/ico-header-like1x.webp 1x, /assets/ico-header-like2x.webp 2x" />
                                        <img src="/assets/ico-header-like.png" alt="관심있는 상품" />
                                    </picture>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <picture>
                                        <source srcset="/assets/ico-header-cart1x.webp 1x, /assets/ico-header-cart2x.webp 2x" />
                                        <img src="/assets/ico-header-cart.png" alt="장바구니" />
                                    </picture>
                                    <em
                                        class="cart-in ${(Object.keys(this.cartItems).length ?? 0) > 0 ? '' : 'sr-only'}"
                                        aria-live="assertive"
                                        aria-atomic="true"
                                        aria-label="장바구니에 담긴 상품 개수"
                                        >${Object.keys(this.cartItems).length}</em
                                    >
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;
    }
}

customElements.define('c-header', Header);
