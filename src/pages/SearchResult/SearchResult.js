import { LitElement, html } from 'lit';
import searchResultStyle from './SearchResultStyle.js';
import '@/components/ProductCard/ProductCard.js';
import '@/components/Spinner/Spinner.js';
import PocketBase from 'pocketbase';

class SearchResult extends LitElement {
    static get styles() {
        return [searchResultStyle];
    }

    static properties = {
        productsNum: { type: Number },
        searchResults: { type: Array },
        query: { type: String },
        loading: { type: Boolean },
    };

    constructor() {
        super();
        this.productsNum = 0;
        this.searchResults = [];
        this.query = '';
        this.loading = true;
    }

    connectedCallback() {
        super.connectedCallback();

        // URL에서 검색어 가져오기
        const params = new URLSearchParams(window.location.search);
        this.query = params.get('query') || '';

        // 검색 결과 가져오기
        this.fetchSearchResults(this.query);
    }

    async fetchSearchResults(query) {
        try {
            const pb = new PocketBase(import.meta.env.VITE_API_URL);
            const allProducts = await pb.collection('product').getFullList();

            // 검색어를 기준으로 필터링
            this.searchResults = allProducts.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
            this.productsNum = this.searchResults.length;
        } catch (err) {
            console.error(err);
        } finally {
            this.loading = false;
        }
    }

    render() {
        if (this.loading) {
            return html` <c-spinner></c-spinner>`;
        } else {
            return html`
                <div class="container">
                    <div class="product-list-page">
                        <h2 class="product-title">검색 결과</h2>
                        <p class="product-num">총 ${this.productsNum}개</p>
                        <div class="product-list">
                            ${this.searchResults.map((product) => html`<product-card idx=${JSON.stringify(product)}></product-card>`)}
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('search-result', SearchResult);
