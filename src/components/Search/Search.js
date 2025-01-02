import { LitElement, html } from 'lit';
import searchStyle from '@/components/Search/SearchStyle.js';
import resetCss from '@/styles/Reset.js';

class SearchBar extends LitElement {
    static get styles() {
        return [resetCss, searchStyle];
    }

    static properties = {
        inputValue: { type: String },
        classType: { type: String },
    };

    constructor() {
        super();
        this.inputValue = '';
        this.classType = '';
    }

    connectedCallback() {
        super.connectedCallback();

        // URL에서 검색어 가져오기
        const params = new URLSearchParams(window.location.search);
        const query = params.get('query');
        if (query) {
            this.inputValue = decodeURIComponent(query); // 검색어 설정
        }
    }

    handleInput(e) {
        this.inputValue = e.target.value; // 검색 입력 값 업데이트
        console.log(this.classType);
    }

    handleKeydown(e) {
        if (e.key === 'Enter') {
            // Enter 키를 누르면 검색버튼이 실행되게 한다.
            this.handleSearch();
        }
    }

    handleSearch() {
        const query = encodeURIComponent(this.inputValue); // 검색어 URL 인코딩
        window.location.href = `/src/pages/SearchResult/index.html?query=${query}`; // 페이지 이동
    }

    render() {
        return html`
            <div class="search-bar">
                <label for="search" class="sr-only">상품 검색</label>
                <input
                    type="search"
                    .value=${this.inputValue}
                    @input=${this.handleInput}
                    @keydown=${this.handleKeydown}
                    id="search"
                    class="inp-search ${this.classType}"
                    placeholder="검색어를 입력해주세요"
                />
                <button type="button" class="btn-search ${this.classType}" aria-label="검색하기" @click=${this.handleSearch}></button>
            </div>
        `;
    }
}

customElements.define('search-bar', SearchBar);
