import '../search-bar/search-bar'
import '../results-layout/results-layout'

import styles from "bundle-text:./search-component.css";

class SearchComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
      ${styles}
    </style>
    <search-bar></search-bar>
    <results-layout></results-layout>
    `;
  }
}

window.customElements.define('search-component', SearchComponent);
