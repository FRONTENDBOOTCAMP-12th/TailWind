import categoryStyle from './CategoryListStyle.js';
import resetCss from '@/styles/Reset.js';
import { LitElement, html } from 'lit';

class categoryList extends LitElement {
    //필요 프로퍼티 선언 연결링크,src,alt,text
    static properties = {
        category: { type: Array },
    };

    constructor() {
        // 생성자
        super();

        this.listPage = '/src/pages/productlist/index.html';
        // 이 데이터 값들도 데이터 파일 만들어서 추후에 분리할 예정
        this.category = [
            { link: this.listPage, src: '/assets/Gift.svg', alt: '선물 박스 아이콘', text: '선물하기' },
            { link: this.listPage, src: '/assets/Vegetable.svg', alt: '채소 아이콘', text: '채소' },
            { link: this.listPage, src: '/assets/Fruit.svg', alt: '과일 견과 쌀 아이콘', text: '과일·견과·쌀' },
            { link: this.listPage, src: '/assets/SeaFood.svg', alt: '수산 해산 건어물 아이콘', text: '수산·해산·건어물' },
            { link: this.listPage, src: '/assets/Meat.svg', alt: '정육 계란 아이콘', text: '정육·계란' },
            { link: this.listPage, src: '/assets/Cook.svg', alt: '국 반찬 메인 요리 아이콘', text: '국·반찬·메인요리' },
            { link: this.listPage, src: '/assets/Salad.svg', alt: '샐러드 간편식 아이콘', text: '샐러드·간편식' },
            { link: this.listPage, src: '/assets/Oil.svg', alt: '면 양념 오일 아이콘', text: '면·양념·오일' },
            { link: this.listPage, src: '/assets/Coffee.svg', alt: '생수 음료 우유 커피 아이콘', text: '생수·음료·우유·커피' },
            { link: this.listPage, src: '/assets/Snack.svg', alt: '간식 과자 떡 아이콘', text: '간식·과자·떡' },
            { link: this.listPage, src: '/assets/Bread.svg', alt: '베이커리 치즈 델리 아이콘', text: '베이커리·치즈·델리' },
            { link: this.listPage, src: '/assets/Health.svg', alt: '건강식품 아이콘', text: '건강식품' },
            { link: this.listPage, src: '/assets/Wine.svg', alt: '와인 아이콘', text: '와인' },
            { link: this.listPage, src: '/assets/TraditionalLiquor.svg', alt: '전통주 아이콘', text: '전통주' },
            { link: this.listPage, src: '/assets/Detergent.svg', alt: '생활용품 리빙 캠핑 아이콘', text: '생활용품·리빙·캠핑' },
            { link: this.listPage, src: '/assets/Cosmetics.svg', alt: '스킨케어 메이크업 아이콘', text: '스킨케어·메이크업' },
            { link: this.listPage, src: '/assets/Shampoo.svg', alt: '헤어 바디 구강 아이콘', text: '헤어·바디·구강' },
            { link: this.listPage, src: '/assets/Food.svg', alt: '주방용품 아이콘', text: '주방용품' },
            { link: this.listPage, src: '/assets/HomeAppliances.svg', alt: '가전제품 아이콘', text: '가전제품' },
            { link: this.listPage, src: '/assets/Dog.svg', alt: '반려동물 아이콘', text: '반려동물' },
            { link: this.listPage, src: '/assets/Baby.svg', alt: '베이비 키즈 완구 아이콘', text: '베이비·키즈·완구' },
            { link: this.listPage, src: '/assets/Travel.svg', alt: '여행 티켓 아이콘', text: '여행·티켓' },
        ];
    }

    static get styles() {
        return [resetCss, categoryStyle];
    }

    render() {
        return html`
            ${this.category.map(
                (category) => html`
                    <li>
                        <a href="${category.link}">
                            <img src="${category.src}" alt="${category.alt}" />
                            ${category.text}
                        </a>
                    </li>
                `
            )}
        `;
    }
}

customElements.define('c-category', categoryList);
