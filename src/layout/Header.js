import { LitElement, html, css } from 'lit';

class Header extends LitElement {
    static get styles() {
        return css``;
    }

    render() {
        return html`
            <header>
                <h1 class="logo">
                    <a href="/">
                        <img src="/assets/logo.png" alt="Logo" />
                    </a>
                    <span> Na_r </span>
                </h1>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">About</a></li>
                        <li><a href="/">Contact</a></li>
                    </ul>
                </nav>
            </header>
        `;
    }
}

customElements.define('c-header', Header);
