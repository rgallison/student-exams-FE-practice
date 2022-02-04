import './components/header-nav/header-nav.component.js';
import './components/loading-spinner/loading-spinner.component.js';
import './components/data-table/data-table.component.js';

const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="app.style.css"/>
    <header-nav></header-nav>
    <main>
        <data-table type="exams" src="/api/v1/exams"></data-table>
    </main>`;

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback () {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('app-container', AppContainer);