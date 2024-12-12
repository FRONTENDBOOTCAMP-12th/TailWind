import { LitElement, html } from 'lit';
import resetCss from '@/styles/reset.js';
import categoryCss from './categoryListCss.js';

class categoryList extends LitElement {
    //필요 프로퍼티 선언 연결링크,src,alt,text
    static properties = {
        link: { type: String },
        src: { type: String },
        alt: { type: String },
        text: { type: String },
    };

    constructor() {
        // 생성자
        super();
        this.link = '/';
        this.src = '/assets/Gift.svg';
        this.alt = '선물 박스 아이콘';
        this.text = '선물하기';
    }

    static get styles() {
        return [resetCss, categoryCss];
    }

    render() {
        return html` <li>
            <a href="${this.link}"> <img src="${this.src}" alt="${this.alt}" />${this.text}</a>
        </li>`;
    }
}

customElements.define('c-category', categoryList);
