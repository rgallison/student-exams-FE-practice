import './components/header-nav/header-nav.component.js';
import './components/loading-spinner/loading-spinner.component.js';
import './components/sidebar-nav/sidebar-nav.component.js';
import DataTable from './components/data-table/data-table.component.js';
import utils from './js/utils.js';

const tableData = {
    exams: { src: '/api/v1/exams', columns: 'id,average,studentCount'},
    students: { src: '/api/v1/students', columns: 'id,average' }
}

const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="app.style.css"/>
    <header-nav></header-nav>
    <sidebar-nav></sidebar-nav>
    <main><h3>Dashboard</h3></main>`;

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.dataTable = new DataTable();
    }

    connectedCallback () {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.sidebar = this.shadowRoot.querySelector('sidebar-nav');
        this.main = this.shadowRoot.querySelector('main');

        this.addEventListener('navigate', ev => {
            let navTo = ev.detail ? ev.detail.navTo : null;
            this.main.innerHTML = '';
            this.sidebar.setAttribute('selected', navTo)
            
            switch(navTo){
                case 'exams':
                case 'students':
                    this.main.appendChild(this.dataTable);
                    this.dataTable.setAttribute('columns', tableData[navTo].columns);
                    this.dataTable.setAttribute('src', tableData[navTo].src);
                    this.dataTable.setAttribute('type', navTo);
                    this.populateData(navTo);
                    break;
                case 'home':
                default:
                    let h3 = this.main.appendChild(document.createElement('h3'));
                    h3.textContent = 'Dashboard';
                    break;
            }


        });
    }

    async populateData (navTo) {
        let data = await utils.fetchData(tableData[navTo].src);
        let processedData = await this.processData(data, navTo);
        this.dataTable.data = processedData;
    }

    async processData (data, type) {
        if (type === 'students') {
            const promises = data.map(async (s) => Promise.resolve(utils.fetchData(`/api/v1/students/${s}`)));
            let responses = await Promise.all(promises);
            responses = responses.map((s, i) => {
                return {id: data[i], ...s};
            })
            data = { students: responses };
        }

        return data;
    }
}

window.customElements.define('app-container', AppContainer);