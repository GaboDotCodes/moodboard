import '../../components/results-layout/results-layout'

import styles from 'bundle-text:./view-home.css';

export default class ViewHome extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <results-layout query="cats"></results-layout>
    `;
  }
}

window.customElements.define('view-home', ViewHome);
