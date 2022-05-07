import styles from 'bundle-text:./view-home.css';

export default class ViewHome extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <h1>Home</h1>
    `;
  }
}

window.customElements.define('view-home', ViewHome);
