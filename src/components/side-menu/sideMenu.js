import { LitElement, html } from 'lit';
import reset from '@/styles/reset.js';
import sideMenuStyle from '@/components/side-menu/sideMenuStyle.js';
import '@/components/checkbox/checkbox.js';

class SideMenu extends LitElement {
    // 스타일 지정
    static styles = [reset, sideMenuStyle];

    static properties = {
        category: { type: Array },
    };

    constructor() {
        // 생성자
        super();

        // 이 데이터 값들도 데이터 파일 만들어서 추후에 분리할 예정
        this.category = [
            { link: '/', text: '샐러드 · 간편식' },
            { link: '/', text: '국 · 반찬 · 메인요리' },
            { link: '/', text: '정육 · 계란' },
            { link: '/', text: '과일 · 견과 · 쌀' },
            { link: '/', text: '간식 · 과자 · 떡' },
            { link: '/', text: '생수 · 음료 · 우유 · 커피' },
            { link: '/', text: '수산 · 해산 · 건어물' },
            { link: '/', text: '베이커리 · 치즈 · 델리' },
            { link: '/', text: '건강식품' },
            { link: '/', text: '생활용품 · 리빙 · 캠핑' },
        ];

        this.handleSideMenu = this.handleSideMenu.bind(this);
    }

    handleSideMenu(e) {
        e.preventDefault();
        const menuItem = e.currentTarget; // 클릭된 <li> 요소
        menuItem.classList.toggle('active'); // 'active' 클래스 토글
    }

    // HTML 렌더 부분
    render() {
        return html`
            <ul class="product-side-menu">
                <li class="menu-reset">
                    <a href="/">필터<span>초기화</span></a>
                </li>
                <li>
                    <a href="/" @click="${this.handleSideMenu}">카테고리</a>
                    <ul class="category-list">
                        ${this.category.map(
                            (category) => html`
                                <li>
                                    <c-checkbox>${category.text}</c-checkbox>
                                    <span class="product-count">100</span>
                                </li>
                            `
                        )}
                    </ul>
                </li>
                <li>
                    <a href="/">브랜드</a>
                </li>
                <li>
                    <a href="/">가격</a>
                </li>
                <li>
                    <a href="/">혜택</a>
                </li>
            </ul>
        `;
    }
}

customElements.define('side-menu', SideMenu);
