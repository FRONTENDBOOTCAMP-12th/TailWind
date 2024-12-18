import { LitElement, html } from 'lit';
import PocketBase from 'pocketbase';
import reset from '@/styles/reset.js';
import sideMenuStyle from '@/components/side-menu/sideMenuStyle.js';
import '@/components/checkbox/checkbox.js';

class SideMenu extends LitElement {
    static styles = [reset, sideMenuStyle];

    static properties = {
        category: { type: Array },
        products: { type: Array },
        categoryCounts: { type: Object },
        selectedCategories: { type: Array },
    };

    constructor() {
        super();
        this.category = [
            '샐러드 · 간편식',
            '국 · 반찬 · 메인요리',
            '정육 · 계란',
            '과일 · 견과 · 쌀',
            '간식 · 과자 · 떡',
            '생수 · 음료 · 우유 · 커피',
            '수산 · 해산 · 건어물',
            '베이커리 · 치즈 · 델리',
            '건강식품',
            '생활용품 · 리빙 · 캠핑',
        ];
        this.products = [];
        this.categoryCounts = {};
        this.selectedCategories = [];
    }

    async fetchProducts() {
        const pb = new PocketBase(import.meta.env.VITE_API_URL);
        const data = await pb.collection('product').getFullList();
        this.products = data;
        this.calcCategoryCounts();
    }

    calcCategoryCounts() {
        const counts = {};

        // 각 상품을 순회하며 카테고리별로 개수를 계산
        for (const product of this.products) {
            const category = product.category;
            if (!counts[category]) {
                counts[category] = 0; // 카테고리가 없으면 0으로 초기화
            }
            counts[category] += 1; // 카테고리 상품 개수 증가
        }

        this.categoryCounts = counts;
    }

    // 체크박스 클릭 시 해당 카테고리 분류
    handleCheckboxChange(e) {
        const category = e.currentTarget.dataset.category; // 클릭된 체크박스의 카테고리 가져오기
        const checked = e.detail.checked; // 체크박스 상태 가져오기 (true or false)

        if (checked) {
            // 체크박스가 선택되었으면 카테고리 추가
            this.selectedCategories.push(category);
        } else {
            // 체크박스가 해제되었으면 카테고리 제거
            this.selectedCategories = this.selectedCategories.filter((cat) => cat !== category);
        }

        // 부모 컴포넌트에 선택된 카테고리를 알림
        this.dispatchEvent(
            new CustomEvent('category-change', {
                // 선택된 카테고리 목록을 담는 객체
                detail: { selectedCategories: this.selectedCategories },
                bubbles: true,
                composed: true,
            })
        );
    }

    // 카테고리 분류 초기화
    resetFilters(e) {
        e.preventDefault();
        this.selectedCategories = [];
        this.dispatchEvent(
            new CustomEvent('category-change', {
                detail: { selectedCategories: [] },
                bubbles: true,
                composed: true,
            })
        );
    }

    // 카테고리 메뉴 토글
    handleCategoryMenu(e) {
        e.preventDefault();
        const menuItem = e.currentTarget; // 클릭된 메뉴 아이템
        menuItem.classList.toggle('active'); // 'active' 클래스 토글
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchProducts();
    }

    render() {
        return html`
            <ul class="product-side-menu">
                <li class="menu-reset">
                    <a href="/" @click="${this.resetFilters}">필터<span>초기화</span></a>
                </li>
                <li>
                    <a href="/" @click="${this.handleCategoryMenu}">카테고리</a>
                    <ul class="category-list">
                        ${this.category.map(
                            (group) => html`
                                <li>
                                    <c-checkbox
                                        @checkbox-change="${this.handleCheckboxChange}"
                                        data-category="${group}"
                                        .checked="${this.selectedCategories.includes(group)}"
                                    >
                                        ${group}
                                    </c-checkbox>
                                    <span class="product-count">${this.categoryCounts[group] || 0}</span>
                                </li>
                            `
                        )}
                    </ul>
                </li>
            </ul>
        `;
    }
}

customElements.define('side-menu', SideMenu);
