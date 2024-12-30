import { LitElement, html } from 'lit';
import resetCss from '@/styles/Reset.js';
import AddAdddressStyle from './AddAddressStyle.js';
import { pb } from '@/api/PocketHost.js';
import '@/components/CheckBox/CheckBox.js';
import { handleFindAddr } from '@/api/AddressApi.js';

class AddAddress extends LitElement {
    static styles = [resetCss, AddAdddressStyle];

    static properties = {
        auth: { type: Object },
        user: { type: Object },
        userAddress: { type: Array },
        inputs: { type: Object },
    };

    constructor() {
        super();
        this.auth = JSON.parse(localStorage.getItem('auth')).user;
        this.user = this.userAddress = [];
        this.inputs = { addressField: '' };
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchUserAddress();
    }

    async fetchUserAddress() {
        try {
            this.user = await pb.collection('users').getFirstListItem(`id = "${this.auth.id}"`);

            this.userAddress = await pb.collection('user_address').getFullList({
                filter: `user="${this.auth.id}"`,
            });
        } catch (err) {
            console.error(err);
        }
    }

    async handleChangeAddress(e) {
        const new_address = e.target.textContent;
        this.auth.address = new_address;

        // window.close();
        this.requestUpdate();
    }

    async handleAddAddress() {
        console.log(this.auth.id);
        handleFindAddr(this.inputs, '_self', this.auth.id);
    }

    render() {
        return html`
            <h2 class="address-title">배송지 목록</h2>
            <div class="address-container">
                <c-checkbox ?checked=${true} @checkbox-change=${this.handleChangeAddress} class="address-info"
                    >&nbsp;&nbsp;${this.user.address}<br />&nbsp;&nbsp;(기본 배송지)</c-checkbox
                >
                ${this.userAddress.map((idx) => {
                    return html` <c-checkbox @checkbox-change=${this.handleChangeAddress} class="address-info"
                        >&nbsp;&nbsp;${idx.user_address}</c-checkbox
                    >`;
                })}
            </div>

            <button type="button" class="add-address-btn" @click=${this.handleAddAddress}>+ 새 배송지 추가</button>
        `;
    }
}

customElements.define('add-address', AddAddress);
