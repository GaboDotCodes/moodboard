import state from '../../js/State/state';

class NavLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <a href=""><slot>NavLink</slot></a>
    `;
  }

  connectedCallback() {
    const {router, routes } = state.getState();
    if (!routes[this.to.replace('/', '')]) throw new Error(`NavLink to ${this.to} point to an undefined route`)
    this.aEl = this.shadowRoot.querySelector('a');
    this.aEl.href = this.to;
    this.aEl.addEventListener('click', (e) => {
      e.preventDefault();
      router.load(routes[this.to.replace('/', '')]);
    });
  }

  get to() {
    return this.getAttribute('to');
  }

  set to(to) {
    this.setAttribute('to', to);
  }

  get activeClass() {
    return this.getAttribute('active-class');
  }

  set activeClass(activeClass) {
    this.setAttribute('active-class', activeClass);
  }
}

window.customElements.define('nav-link', NavLink);

export default NavLink;
