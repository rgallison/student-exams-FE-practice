import utils from '../../js/utils.js';

const component = 'loading-spinner';
const style = utils.getStyle(`components/${component}/${component}.style.css`);
const template = document.createElement('template');
template.innerHTML = `
    <div class="ellipsis-loader"><div></div><div></div><div></div><div></div></div>`;

class LoadingSpinner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback () {
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define(component, LoadingSpinner);