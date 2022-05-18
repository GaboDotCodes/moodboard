import styles from 'bundle-text:./view-profile.css';

export default class ViewProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <h1>Profile</h1>
    `;
  }
}

window.customElements.define('view-profile', ViewProfile);
