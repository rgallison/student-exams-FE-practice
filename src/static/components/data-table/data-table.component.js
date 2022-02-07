import utils from '../../js/utils.js';
import singular from '../../js/singular.js';

const component = 'data-table';
const style = utils.getStyle(`components/${component}/${component}.style.css`);
const template = document.createElement('template');

export default class DataTable extends HTMLElement {
    constructor(dataType) {
        super();
        this.attachShadow({mode: 'open'});
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
            this.generateTable(data[this.dataType], this.getAttribute('columns'), true);
        }
    }

    connectedCallback () {
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
                this.setHeader(`All ${this.dataType}`);
                this.setLoader();
                break;
        } 
    }

    generateTable (data, columns, includeClickHandler) {
        let table = document.createElement('table');
        let tbody = table.createTBody();
        let cols = columns.split(',');

        //Adding headers
        cols.reduce((row, c) => {
            let th = document.createElement('th');
            row.appendChild(th);
            th.innerHTML = this.transformLabel(c);
            return row;
        }, tbody.insertRow());

        // adding table data
        for (let item of data) {
            //row
            let tr = tbody.insertRow();
            if (includeClickHandler){
                tr.addEventListener('click', ev => {
                    utils.fetchData(`${this.getAttribute('src')}/${item.id}`, (data) => {
                        tableContainer.innerHTML = '';
                        this.setHeader(`${singular(this.dataType)} ${item.id}`, { label: 'Average', text: Math.round(data.average * 100)+ '%'});
                        this.generateTable(this.addRank(data.results), 'studentId,score,rank')
                    });
                });
            }
            //cells
            cols.forEach((col, i) => {
                let transformed = this.transform(col, item[col]);
                let cell = tr.insertCell(i);
                if (transformed) cell.append(document.createTextNode(transformed));
            });
        }

        let tableContainer = this.shadowRoot.querySelector(`.${this.tableContainerClass}`);
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
        // tableContainer.dispatchEvent(new Event(this.tableContainerClass));
    }

    setHeader (headerText, subtitle) {
        if (subtitle) {
            headerText += `<div class="subtitle">${subtitle.label}: ${subtitle.text}</div>`
        }
        this.shadowRoot.querySelector(`.${this.tableHeaderClass}`).innerHTML = headerText;
    }

    setLoader (){
        let loader = `<p><loading-spinner></loading-spinner>`;
        if (this.dataType) {
            loader += `Loading ${this.dataType}`;
        }
        loader += '</p>'
        this.shadowRoot.querySelector(`.${this.tableContainerClass}`).innerHTML = loader;
    }

    addRank(data) {
        let rank = {};
        let sorted = [...data].sort((a,b) => b.score - a.score);
        sorted.forEach((s, i) => rank[s.studentId] = i+1);
        data.forEach(s => s.rank = rank[s.studentId]);

        return data;
    };

    transform (type, data) {
        switch (type) {
            case 'id':
                return `${singular(this.dataType)} ${data}`;
            case 'average':
            case 'score':
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
            case 'studentId':
                return 'Student Name';
            default:
                return type;
        }
    }
}

window.customElements.define(component, DataTable);