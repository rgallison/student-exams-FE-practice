import style from './sidebar-nav.style.js'

const tableData = {
    exams: { src: '/api/v1/exams', columns: 'id,average,studentCount'},
    students: { src: '/api/v1/students', columns: 'name,grade,rank' }
}
const template = document.createElement('template');
template.innerHTML = `
    <aside>
        <div class="nav-item" data-nav-to="exams">
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
                this.dispatchEvent(new CustomEvent('navigate', { 
                    bubbles: true, 
                    composed: true, 
                    detail: { 
                        navTo: nav.dataset.navTo,
                        data: tableData[nav.dataset.navTo]
                    }
                }));
            });
        });
    }
}

window.customElements.define('sidebar-nav', SidebarNav);
