import { LitElement, html } from 'lit';
import PocketBase from 'pocketbase';
import productListStyle from '@/pages/product-list/productListStyle.js';
import '@/components/side-menu/sideMenu.js';
import '@/components/product-card/productCard.js';
import '@/components/ProductSorting/ProductSorting.js';

// getPbImageURL : 포켓베이스 이미지 가져오는 함수
function getPbImageURL(item, fieldName) {
    const baseURL = import.meta.env.VITE_API_URL;
    return `${baseURL}/api/files/${item.collectionId}/${item.id}/${item[fieldName]}`;
}

class ProductListPage extends LitElement {
    static get styles() {
        return [productListStyle];
    }

    static properties = {
        products: { type: Array },
        filteredProducts: { type: Array },
        selectedCategories: { type: Array },
    };

    constructor() {
        super();
        this.products = [];
        this.filteredProducts = [];
        this.selectedCategories = [];
    }

    async fetchProducts() {
        const pb = new PocketBase(import.meta.env.VITE_API_URL);
        const data = await pb.collection('product').getFullList();
        this.products = data.map((item) => ({
            ...item,
            created: new Date(item.created), // 신상품 순으로 정렬하기 위해 날짜 형식으로 변환
        }));
        this.filteredProducts = [...this.products];
        // 기본 정렬 처리 (신상품순)
        this.handleSortChange({ detail: { order: 'newest' } });
    }

    handleCategoryChange(e) {
        // 이벤트에서 선택된 카테고리 목록 가져오기
        const selectedCategories = e.detail.selectedCategories;

        // 선택된 카테고리 상태 업데이트
        this.selectedCategories = selectedCategories;

        // 선택된 카테고리가 있다면 필터링, 없다면 전체 상품
        if (this.selectedCategories.length > 0) {
            // 필터링된 상품
            this.filteredProducts = this.products.filter((product) => {
                return this.selectedCategories.includes(product.category);
            });
        } else {
            // 전체 상품
            this.filteredProducts = [...this.products];
        }
    }

    handleSortChange(e) {
        const { order } = e.detail;

        if (order === 'newest') {
            this.filteredProducts.sort((a, b) => b.created - a.created);
        } else if (order === 'low-to-high') {
            this.filteredProducts.sort((a, b) => a.price - a.price * (a.discount / 100) - (b.price - b.price * (b.discount / 100)));
        } else if (order === 'high-to-low') {
            this.filteredProducts.sort((a, b) => b.price - b.price * (b.discount / 100) - (a.price - a.price * (a.discount / 100)));
        }

        this.requestUpdate(); // UI 업데이트
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchProducts();
    }

    render() {
        return html`
            <div class="container">
                <h2 class="product-title">베스트</h2>
                <div class="product-list-page">
                    <side-menu @category-change="${this.handleCategoryChange}"></side-menu>
                    <div>
                        <product-sorting .productsNum="${this.filteredProducts.length}" @sort-change="${this.handleSortChange}"></product-sorting>
                        <div class="product-list">
                            ${this.filteredProducts.map(
                                (product) => html`
                                    <product-card
                                        .src="${getPbImageURL(product, 'main_image')}"
                                        .specialDesc="${product.delivery}"
                                        .productName="${product.name}"
                                        .discount="${product.discount}"
                                        .price="${product.price}"
                                        .desc="${product.description}"
                                    ></product-card>
                                `
                            )}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('product-list', ProductListPage);
