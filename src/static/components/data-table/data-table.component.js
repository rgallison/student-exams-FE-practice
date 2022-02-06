import singular from '../../js/singular.js';
import style from './data-table.style.js'

const template = document.createElement('template');

export default class DataTable extends HTMLElement {
    constructor(dataType) {
        super();
        this.dataType = dataType;
        this.data = null;
        this.tableHeaderClass = 'table-header';
        this.tableContainerClass = 'table-wrapper';
        template.innerHTML = `
            <div class="${this.tableHeaderClass}"></div>
            <div class="${this.tableContainerClass}"></div>`;
    }

    set data (data) {
        if (data) {
            this.setContent(data[this.dataType]);
        }
    }

    connectedCallback () {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["type","data"];
    }

    attributeChangedCallback (name, oldVal, newVal) {
        switch (name) {
            case 'type':
                this.dataType = this.getAttribute('type');
                this.setHeader();
                this.setLoader();
                break;
        } 
    }

    setContent (data) {
        console.log(data)
        let table = `<table><tbody>`;
        let cols = this.getAttribute('columns').split(',');
        table += cols.reduce((acc, c) => `${acc}<th>${this.transformLabel(c)}</th>`, '<tr>') + '</tr>';
        for (let item of data) {
            table += '<tr>';
            cols.forEach(col => {
                table += `<td class="${col}">${this.transform(col, item[col])}</td>`
            });
            table += '</tr>';       
        }
        table += '</tbody></table>';

        let tableContainer = this.shadowRoot.querySelector(`.${this.tableContainerClass}`);
        tableContainer.innerHTML = table;
        // tableContainer.dispatchEvent(new Event(this.tableContainerClass));
    }

    setHeader () {
        this.shadowRoot.querySelector(`.${this.tableHeaderClass}`).innerHTML =  `All ${this.dataType}`;
    }

    setLoader (){
        let loader = `<p><loading-spinner></loading-spinner>`;
        if (this.dataType) {
            loader += `Loading ${this.dataType}`;
        }
        loader += '</p>'
        this.shadowRoot.querySelector(`.${this.tableContainerClass}`).innerHTML = loader;
    }

    getData (url) {
        fetch(url)
            .then(resp => resp.json())
            .then(data => this.setContent(data))
            .catch(err => console.log(err));
    }

    transform (type, data) {
        switch (type) {
            case 'id':
                return `${singular(this.dataType)} ${data}`;
            case 'average':
                return `${Math.round(data * 100)}%`;
            default:
                return data;
        }
    }

    // Normally, I can utlize translations to handle this
    transformLabel (type) {
        switch (type) {
            case 'id':
                return `${singular(this.dataType)} ID`;
            case 'average':
                return `Avg ${singular(this.dataType)} Grade`;
            case 'studentCount':
                return 'Students';
            default:
                return type;
        }
    }
}

window.customElements.define('data-table', DataTable);