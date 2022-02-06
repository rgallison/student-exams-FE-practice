import './components/header-nav/header-nav.component.js';
import './components/loading-spinner/loading-spinner.component.js';
import DataTable from './components/data-table/data-table.component.js';
import './components/sidebar-nav/sidebar-nav.component.js';

const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="app.style.css"/>
    <header-nav></header-nav>
    <sidebar-nav></sidebar-nav>
    <main></main>`;

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.dataTable = new DataTable();
    }

    connectedCallback () {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('main').appendChild(this.dataTable);

        this.addEventListener('navigate', ev => {
            this.dataTable.setAttribute('columns', ev.detail.data.columns);
            this.dataTable.setAttribute('type', ev.detail.navTo);
        });

        this.addEventListener('populate-data', ev => {
            this.dataTable.data = ev.detail.data;
        });
    }
}

window.customElements.define('app-container', AppContainer);