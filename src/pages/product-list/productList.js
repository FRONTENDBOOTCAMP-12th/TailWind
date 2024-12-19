import { LitElement, html } from 'lit';
import PocketBase from 'pocketbase';
import productListStyle from '@/pages/product-list/productListStyle.js';
import '@/components/side-menu/sideMenu.js';
import '@/components/product-card/productCard.js';

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
        isLoading: { type: Boolean },
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
        this.products = data;
        this.filteredProducts = [...this.products];
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

    connectedCallback() {
        super.connectedCallback();
        this.fetchProducts();
    }

    render() {
        return html`
            <div class="container">
                <div class="product-list-page">
                    <side-menu @category-change="${this.handleCategoryChange}"></side-menu>
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
        `;
    }
}

customElements.define('product-list', ProductListPage);
