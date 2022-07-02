import styles from 'bundle-text:./view-profile.css';
import state from '../../js/State/state';

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

  connectedCallback() {
    const favorites = state.getState('favorites');
  }
}

window.customElements.define('view-profile', ViewProfile);
