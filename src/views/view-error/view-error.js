import styles from 'bundle-text:./view-error.css';

export default class ViewError extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <h1>Error</h1>
    `;
  }
}

window.customElements.define('view-error', ViewError);
