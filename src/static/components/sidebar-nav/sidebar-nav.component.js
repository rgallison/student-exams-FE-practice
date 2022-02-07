import utils from '../../js/utils.js';

const component = 'sidebar-nav';
const style = utils.getStyle(`components/${component}/${component}.style.css`);
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
            });
        });
    }

    navigate (nav) {
        this.shadowRoot.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('current'));
        nav.classList.add('current');
        this.dispatchEvent(new CustomEvent('navigate', { 
            bubbles: true, 
            composed: true, 
            detail: { 
                navTo: nav.dataset.navTo
            }
        }));
    }
}

window.customElements.define(component, SidebarNav);
