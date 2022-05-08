import '../../components/search-component/search-component'

import styles from 'bundle-text:./view-home.css';

export default class ViewHome extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <search-component></search-component>
    `;
  }
}

window.customElements.define('view-home', ViewHome);
