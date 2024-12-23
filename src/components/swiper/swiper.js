import { LitElement, html } from 'lit';
import { register } from 'swiper/element/bundle';
import reset from '@/styles/reset.js';
import { SwiperStyles } from './swiperStyle';

register();

class ProductSwiper extends LitElement {
    static styles = [reset, SwiperStyles];

    render() {
        return html`
            <body>
                <swiper-container autoplay="true" autoplay-delay="3000" disableOnInteraction="true" navigation="true" pagination="true" loop="true">
                    <img class="swiper-slide" src="/public/assets/main-banner-1.png" alt="이 주의 특가 한 눈에 보기" />
                    <img class="swiper-slide" src="/public/assets/main-banner-2.png" alt="특가부터 인기 브랜드까지 최대 77% 할인 + 쿠폰팩" />
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </swiper-container>
                <hr />
                <h3>이 상품 어때요?</h3>
                           <!-- 상품정보는 componets의 product-card를 get 예정 -->
                           <swiper-container disableOnInteraction="true" navigation="true">
                           
                           <ul class="itembox">
                           <li>
                               <img src="/public/item1.png" />
                               <div class="iteminfo">
                                   <p class="itembrand">[풀무원]</p>
                                   <p class="itemname">탱탱쫄면 (4개입)</p>
                                   <div class="discount">
                                       <p class="discountrate">20%</p>
                                       <p class="discountprice">3,000원</p>
                                   </div>
                                   <p class="itemprice">5,000원</p>
                                   <p class="itemexplanation">풀무원의 탱탱하고 맛있는 쫄면</p>
                               </div>
                           </li>
                           <li>
                               <img src="/public/item2.png" />
                               <div class="iteminfo">
                                   <p class="itembrand">[풀무원]</p>
                                   <p class="itemname">탱탱쫄면 (4개입)</p>
                                   <div class="discount">
                                       <p class="discountrate">20%</p>
                                       <p class="discountprice">3,000원</p>
                                   </div>
                                   <p class="itemprice">5,000원</p>
                                   <p class="itemexplanation">풀무원의 탱탱하고 맛있는 쫄면</p>
                               </div>
                           </li>
               
                           <li>
                               <img src="/public/item1.png" />
                               <div class="iteminfo">
                                   <p class="itembrand">[풀무원]</p>
                                   <p class="itemname">탱탱쫄면 (4개입)</p>
                                   <div class="discount">
                                       <p class="discountrate">20%</p>
                                       <p class="discountprice">3,000원</p>
                                   </div>
                                   <p class="itemprice">5,000원</p>
                                   <p class="itemexplanation">풀무원의 탱탱하고 맛있는 쫄면</p>
                               </div>
                           </li>
                           <li>
                               <img src="/public/item2.png" />
                               <div class="iteminfo">
                                   <p class="itembrand">[풀무원]</p>
                                   <p class="itemname">탱탱쫄면 (4개입)</p>
                                   <div class="discount">
                                       <p class="discountrate">20%</p>
                                       <p class="discountprice">3,000원</p>
                                   </div>
                                   <p class="itemprice">5,000원</p>
                                   <p class="itemexplanation">풀무원의 탱탱하고 맛있는 쫄면</p>
                               </div>
                           </li>
                           
                       </ul>
                       <div class="swiper-button-next"></div>
                       <div class="swiper-button-prev"></div>
                           </swiper-container>
    </div>
    <hr />
    <!-- 배너 -->
    <!-- 하이퍼 링크 나중에 추가하기 -->
    <div class="banner2">
        <img src="/public/assets/medium-banner.png" alt="10월 컬리마켓 할인 적립률 up + 3종 쿠폰팩" />
    </div>

    <hr />
            </body>
        `;
    }
}

customElements.define('product-swiper', ProductSwiper);
