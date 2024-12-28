import '@/components/Header/CategoryList.js';
import headerStyle from './HeaderStyle.js';
import resetCss from '@/styles/Reset.js';
import { LitElement, html } from 'lit';
import { pb } from '@/api/PocketHost.js';
class Header extends LitElement {
    static properties = {
        isAuth: { type: Boolean },
        user: { type: Object },
    };

    static get styles() {
        return [resetCss, headerStyle];
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
        if (confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('auth');
            pb.authStore.clear();
            location.reload();
            alert('로그아웃');
        } else {
            alert('취소 되었습니다');
        }
    }

    async handleDelete() {
        if (confirm('정말 탈퇴 하시겠습니까?')) {
            try {
                await pb.collection('users').delete(this.user.id);
                localStorage.removeItem('auth');
                pb.authStore.clear();
                location.reload();
                alert('회원탈퇴가 되었습니다');
            } catch {
                alert('실패');
            }
        } else {
            alert('취소 되었습니다');
        }
    }
    render() {
        return html`
            <header class="header">
                <div class="header-inner">
                    <ul class="header-top">
                        <li class="sign-up">
                            ${!this.isAuth ? html`<a href="/src/pages/register/index.html">회원가입</a>` : html`<span>${this.user.name} 님</span>`}
                        </li>
                        <li>
                            ${!this.isAuth
                                ? html` <a href="/src/pages/login/index.html">로그인</a>`
                                : html`<span @click=${this.handleLogout}>로그아웃 /</span> <span @click=${this.handleDelete}>회원탈퇴</span>`}
                        </li>
                        <li class="customer">
                            <a href="/">고객센터</a>
                        </li>
                    </ul>
                    <div class="header-middle">
                        <h1 class="header-logo">
                            <a href="/">
                                <img src="/logo.svg" alt="Karly" />
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
                        <div class="search-bar">
                            <label for="search" class="sr-only">상품 검색</label>
                            <input type="search" id="search" class="inp-search" placeholder="검색어를 입력해주세요" />
                            <button type="button" class="btn-search" aria-label="검색하기"></button>
                        </div>
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
                                    <em class="cart-in" aria-live="assertive" aria-atomic="true" aria-label="장바구니에 담긴 상품 개수">2</em>
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
                                <a href="">신상품</a>
                            </li>
                            <li>
                                <a href="">베스트</a>
                            </li>
                            <li>
                                <a href="">알뜰쇼핑</a>
                            </li>
                            <li>
                                <a href="">특가/혜택</a>
                            </li>
                        </ul>
                        <a href="/" class="delivery-info"><b>샛별·낮</b> 배송안내</a>
                    </nav>
                </div>
            </header>
        `;
    }
}

customElements.define('c-header', Header);
