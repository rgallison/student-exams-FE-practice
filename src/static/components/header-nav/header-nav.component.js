import utils from '../../js/utils.js';

const component = 'header-nav';
const style = utils.getStyle(`components/${component}/${component}.style.css`);
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
        this.shadowRoot.querySelector('#logo').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('navigate', { 
                bubbles: true, 
                composed: true, 
                detail: { 
                    navTo: 'home'
                }
            }));
        })
    }
}

window.customElements.define(component, HeaderNav);
