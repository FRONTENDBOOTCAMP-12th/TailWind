import { LitElement, html, css } from 'lit';
import reset from '/src/styles/reset.js';

class Sidbar extends LitElement {
    static proper;

    static styles = [
        reset,
        css`
            .sidebar {
                width: 6.25rem;
                height: 12.5rem;
                position: fixed;
                border: 0.0625rem solid gray;
                background-color: white;
                text-align: center;
                overflow: hidden;

                & p {
                    font-size: 0.625rem;
                    margin: 0.625rem;
                }
            }

            .products {
                list-style: none;
                padding: 0;
                margin: 0;
                max-height: 8.125rem;
                overflow-y: auto;
            }

            .products li {
                margin: 0.25rem 0;
            }

            .products li img {
                width: 2.5rem;
                height: 3.2131rem;
                object-fit: cover;
            }
        `,
    ];

    render() {
        return html`
            <div id="app">
                <div class="sidebar">
                    <div class="scrollUp">▲</div>
                    <p>최근 본 상품</p>
                    <ul class="products">
                        <li><img src="/public/item1.png" alt="상품 이미지 1" /></li>
                        <li><img src="/public/item2.png" alt="상품 이미지 2" /></li>
                        <li><img src="/public/item1.png" alt="상품 이미지 3" /></li>
                    </ul>
                    <div class="scrollDown">▼</div>
                </div>
            </div>
        `;
    }
}

customElements.define('sid-bar', Sidbar);
