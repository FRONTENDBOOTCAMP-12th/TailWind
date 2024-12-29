import { LitElement, html } from 'lit';
import searchStyle from '@/components/Search/SearchStyle.js';
import resetCss from '@/styles/Reset.js';

class SearchBar extends LitElement {
    static get styles() {
        return [resetCss, searchStyle];
    }
    render() {
        return html`
            <div class="search-bar">
                <label for="search" class="sr-only">상품 검색</label>
                <input type="search" id="search" class="inp-search" placeholder="검색어를 입력해주세요" />
                <button type="button" class="btn-search" aria-label="검색하기"></button>
            </div>
        `;
    }
}

customElements.define('search-bar', SearchBar);
