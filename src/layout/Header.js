import { LitElement, html } from 'lit';
import resetCss from '@/styles/reset.js';
import headerCss from './headerCss';
import '@/components/header/categoryList.js';
class Header extends LitElement {
    static get styles() {
        return [resetCss, headerCss];
    }

    render() {
        return html`
            <header class="header">
                <div class="header-inner">
                    <ul class="header-top">
                        <li class="sign-up">
                            <a href="/">회원가입</a>
                        </li>
                        <li>
                            <a href="/">로그인</a>
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
                            <button type="button" class="btn-category">카테고리</button>
                            <ul class="category-list">
                                <c-category link="/" src="/assets/Gift.svg" alt="선물 박스 아이콘" text="선물하기"></c-category>
                                <c-category link="/" src="/assets/Vegetable.svg" alt="채소 아이콘" text="채소"></c-category>
                                <c-category link="/" src="/assets/Fruit.svg" alt="과일 견과 쌀 아이콘" text="과일·견과·쌀"></c-category>
                                <c-category link="/" src="/assets/SeaFood.svg" alt="수산 해산 건어물 아이콘" text="수산·해산·건어물"></c-category>
                                <c-category link="/" src="/assets/Meat.svg" alt="정육 계란 아이콘" text="정육·계란"></c-category>
                                <c-category link="/" src="/assets/Cook.svg" alt="국 반찬 메인 요리 아이콘" text="국·반찬·메인요리"></c-category>
                                <c-category link="/" src="/assets/Salad.svg" alt="샐러드 간편식 아이콘" text="샐러드·간편식"></c-category>
                                <c-category link="/" src="/assets/Oil.svg" alt="면 양념 오일 아이콘" text="면·양념·오일"></c-category>
                                <c-category
                                    link="/"
                                    src="/assets/Coffee.svg"
                                    alt="생수 음료 우유 커피 아이콘"
                                    text="생수·음료·우유·커피"
                                ></c-category>
                                <c-category link="/" src="/assets/Snack.svg" alt="간식 과자 떡 아이콘" text="간식·과자·떡"></c-category>
                                <c-category link="/" src="/assets/Bread.svg" alt="베이커리 치즈 델리 아이콘" text="베이커리·치즈·델리"></c-category>
                                <c-category link="/" src="/assets/Health.svg" alt="건강식품 아이콘" text="건강식품"></c-category>
                                <c-category link="/" src="/assets/Wine.svg" alt="와인 아이콘" text="와인"></c-category>
                                <c-category link="/" src="/assets/TraditionalLiquor.svg" alt="전통주 아이콘" text="전통주"></c-category>
                                <c-category
                                    link="/"
                                    src="/assets/Detergent.svg"
                                    alt="생활용품 리빙 캠핑 아이콘"
                                    text="생활용품·리빙·캠핑"
                                ></c-category>
                                <c-category link="/" src="/assets/Cosmetics.svg" alt="스킨케어 메이크업 아이콘" text="스킨케어·메이크업"></c-category>
                                <c-category link="/" src="/assets/Shampoo.svg" alt="헤어 바디 구강 아이콘" text="헤어·바디·구강"></c-category>
                                <c-category link="/" src="/assets/Food.svg" alt="주방용품 아이콘" text="주방용품"></c-category>
                                <c-category link="/" src="/assets/HomeAppliances.svg" alt="가전제품 아이콘" text="가전제품"></c-category>
                                <c-category link="/" src="/assets/Dog.svg" alt="반려동물 아이콘" text="반려동물"></c-category>
                                <c-category link="/" src="/assets/Baby.svg" alt="베이비 키즈 완구 아이콘" text="베이비·키즈·완구"></c-category>
                                <c-category link="/" src="/assets/Travel.svg" alt="여행 티켓 아이콘" text="여행·티켓"></c-category>
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
