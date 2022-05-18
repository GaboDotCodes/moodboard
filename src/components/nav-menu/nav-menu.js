import '../nav-link/nav-link';

import styles from 'bundle-text:./nav-menu.css';

class NavMenu extends HTMLElement {
  #menuItems;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
    <style>
     ${styles}
    </style>
    <nav></nav>
    `;
  }

  connectedCallback() {
    this.navEl = this.shadowRoot.querySelector('nav');
  }

  get menuItems() {
    return this.#menuItems;
  }

  set menuItems(items) {
    if (!Array.isArray(items)) throw new Error('items must be an array');
    if( items.length === 0 ) throw new Error('items must not be an empty array')
    const completed = items.every((item) => item.link && item.text);
    if (!completed) throw new Error('Items must have link and text properties');
    this.#menuItems = items;
    this.update();
  }

  update() {
    const menuItemsTags = this.menuItems.map(({ link, text }) =>
      `<li><nav-link to=${link}><span>${text}</span></nav-link></li>`)
    this.navEl.innerHTML = `<ul>${menuItemsTags.join('')}</ul>`;
  }
}

window.customElements.define('nav-menu', NavMenu);

export default NavMenu;
