import '@/components/ProductPagination/ProductPagination.js';
import '@/components/ProductSorting/ProductSorting.js';
import productListStyle from './ProductListStyle.js';
import '@/components/ProductCard/ProductCard.js';
import '@/components/SideMenu/SideMenu.js';
import '@/components/Spinner/Spinner.js';
import { LitElement, html } from 'lit';
import PocketBase from 'pocketbase';

class ProductListPage extends LitElement {
    static get styles() {
        return [productListStyle];
    }

    static properties = {
        products: { type: Array },
        filteredProducts: { type: Array },
        paginatedProducts: { type: Array },
        selectedCategories: { type: Array },
        currentPage: { type: Number },
        itemsPerPage: { type: Number },
        activeSortOrder: { type: String }, // 현재 활성화된 정렬 상태
        loading: { type: Boolean },
    };

    constructor() {
        super();
        this.products = [];
        this.filteredProducts = [];
        this.paginatedProducts = [];
        this.selectedCategories = [];
        this.currentPage = 1;
        this.itemsPerPage = 15;
        this.activeSortOrder = 'newest'; // 기본 정렬은 신상품순
        this.loading = true;
    }

    async fetchProducts() {
        // loading spinner 사용을 위한 try catch
        try {
            this.loading = true;
            const pb = new PocketBase(import.meta.env.VITE_API_URL);
            const data = await pb.collection('product').getFullList();
            this.products = data.map((item) => ({
                ...item,
                created: new Date(item.created), // 날짜 변환
            }));

            this.filteredProducts = [...this.products];
        } catch (err) {
            console.error(err);
        } finally {
            this.loading = false;
        }

        // 초기 정렬
        this.applySorting();
        this.updatePaginatedProducts();
    }

    applySorting() {
        // 할인된 가격 계산 함수
        const getDiscountedPrice = (product) => product.price * (1 - (product.discount || 0) / 100);

        if (this.activeSortOrder === 'newest') {
            this.filteredProducts.sort((a, b) => b.created - a.created);
        } else if (this.activeSortOrder === 'low-to-high') {
            this.filteredProducts.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b));
        } else if (this.activeSortOrder === 'high-to-low') {
            this.filteredProducts.sort((a, b) => getDiscountedPrice(b) - getDiscountedPrice(a));
        }
    }

    updatePaginatedProducts() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
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

        // 현재 활성화된 정렬 적용
        this.applySorting();

        // 첫 페이지로 이동
        this.currentPage = 1;
        this.updatePaginatedProducts();
    }

    handleSortChange(e) {
        const { order } = e.detail;
        this.activeSortOrder = order; // 활성화된 정렬 상태 업데이트

        // 정렬 적용
        this.applySorting();

        // 첫 페이지로 이동
        this.currentPage = 1;
        this.updatePaginatedProducts();
    }

    handlePageChange(e) {
        this.currentPage = e.detail.page;
        this.updatePaginatedProducts();

        // 스크롤을 최상단으로 이동
        window.scrollTo({
            top: 0,
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchProducts();
    }

    render() {
        if (this.loading) {
            return html` <c-spinner></c-spinner>`;
        } else {
            return html`
                <div class="container">
                    <div class="product-list-page">
                        <h2 class="product-title">베스트</h2>
                        <div>
                            <side-menu @category-change="${this.handleCategoryChange}"></side-menu>
                            <div class="product-wrap">
                                <product-sorting
                                    .productsNum="${this.filteredProducts.length}"
                                    @sort-change="${this.handleSortChange}"
                                ></product-sorting>
                                <div class="product-list">
                                    ${this.paginatedProducts.map((product) => html`<product-card idx=${JSON.stringify(product)}></product-card>`)}
                                </div>
                                <product-pagination
                                    .totalItems="${this.filteredProducts.length}"
                                    .itemsPerPage="${this.itemsPerPage}"
                                    .currentPage="${this.currentPage}"
                                    @page-change="${this.handlePageChange}"
                                ></product-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('product-list', ProductListPage);
