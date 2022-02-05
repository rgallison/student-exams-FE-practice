import './components/header-nav/header-nav.component.js';
import './components/loading-spinner/loading-spinner.component.js';
import './components/data-table/data-table.component.js';
import './components/sidebar-nav/sidebar-nav.component.js';

const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="app.style.css"/>
    <header-nav></header-nav>
    <sidebar-nav></sidebar-nav>
    <main>
        <data-table type="exams" src="/api/v1/exams" columns="id,average,studentCount"></data-table>
    </main>`;

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback () {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.addEventListener('navigate', ev => {
            this.shadowRoot.querySelector('data-table').setAttribute('type', ev.detail.navTo);
            this.shadowRoot.querySelector('data-table').setAttribute('src', ev.detail.data.src);
            this.shadowRoot.querySelector('data-table').setAttribute('columns', ev.detail.data.columns);
        });
    }
}

// sidebarNav.addEventListener('nav-clicked', ev => console.log(ev));

window.customElements.define('app-container', AppContainer);