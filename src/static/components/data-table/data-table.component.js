import singular from '../../js/singular.js';
import style from './data-table.style.js'

const template = document.createElement('template');

class DataTable extends HTMLElement {
    constructor() {
        super();
        this.dataType = this.getAttribute('type');
        this.header = `<div class="table-label">All ${this.dataType}</div>`
        this.content = `<div class="table-content"><p><loading-spinner></loading-spinner>Loading ${this.dataType}</p></div>`;
        this.tableConatinerClass = '.table-content';
        template.innerHTML = `
            ${this.header}
            <div class="table-wrapper">${this.content}</div>`;

        setTimeout(this.getData.bind(this, this.getAttribute('src')), 5000);
    }

    connectedCallback () {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["src"];
    }

    attributeChangedCallback (name, oldVal, newVal) {
        if (name === 'src') {
            this.getData(newVal);
        }
    }

    setContent (data) {
        this.data = data[this.dataType];
        console.log(data)
        let table = `<table><tbody>`;
        let cols = this.getAttribute('columns').split(',');
        table += cols.reduce((acc, c) => `${acc}<th>${this.transformLabel(c)}</th>`, '<tr>') + '</tr>';
        for (let item of this.data) {
            table += '<tr>';
            cols.forEach(col => {
                table += `<td class="${col}">${this.transform(col, item[col])}</td>`
            });
            table += '</tr>';       
        }
        table += '</tbody></table>';

        let tableContainer = this.shadowRoot.querySelector(this.tableConatinerClass);
        tableContainer.innerHTML = table;
        tableContainer.dispatchEvent(new Event(this.tableConatinerClass));
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