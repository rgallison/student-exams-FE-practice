import style from "./header-nav.style.js";
const template = document.createElement('template');
template.innerHTML = `
    <header>
        <div id="logo"><img src="images/logo.png"/></div>
    </header>`;

class HeaderNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback () {
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('header-nav', HeaderNav);
