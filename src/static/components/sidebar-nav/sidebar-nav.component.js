import style from './sidebar-nav.style.js'

const tableData = {
    exams: { src: '/api/v1/exams', columns: 'id,average,studentCount'},
    students: { src: '/api/v1/students', columns: 'name,grade,rank' }
}
const template = document.createElement('template');
template.innerHTML = `
    <aside>
        <div class="nav-item exams" data-nav-to="exams">
            <span class="dot"></span>
            Exams
        </div>
        <div class="nav-item" data-nav-to="students">
            <span class="dot"></span>
            Students
        </div>
    </aside>`;

class SidebarNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback () {
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelectorAll('.nav-item').forEach((nav) => { 
            nav.addEventListener('click', ev => {
                this.navigate(nav);

                this.getData(tableData[nav.dataset.navTo].src, (data) => {
                    this.dispatchEvent(new CustomEvent('populate-data', { 
                        bubbles: true, 
                        composed: true, 
                        detail: { data }
                    }));
                })
            });
        });
    }

    navigate (nav) {
        this.shadowRoot.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('current'));
        nav.classList.add('current')
        this.dispatchEvent(new CustomEvent('navigate', { 
            bubbles: true, 
            composed: true, 
            detail: { 
                navTo: nav.dataset.navTo,
                data: tableData[nav.dataset.navTo]
            }
        }));
    }

    getData (url, callback) {
        fetch(url)
            .then(resp => resp.json())
            .then(data => callback(data))
            .catch(err => console.log(err));
    }
}

window.customElements.define('sidebar-nav', SidebarNav);
