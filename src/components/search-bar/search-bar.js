import styles from "bundle-text:./search-bar.css";
import state from "../../js/State/state";

class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.searchHandler = this.searchHandler.bind(this);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
      ${styles}
    </style>
    <form>
      <input type="text"/>
      <button type="submit">Buscar</button>
    </form>
    `;
  }

  /**
   * 
   * @param {Event} e 
   */
  searchHandler(e) {
    e.preventDefault();
    state.dispatch('query.set', this.input.value);
  }

  connectedCallback() {
    this.form = this.shadowRoot.querySelector('form');
    this.input = this.shadowRoot.querySelector('input');
    this.form.addEventListener('submit', this.searchHandler)
  }

  disconnectedCallback() {
    this.form.removeEventListener('submit', this.searchHandler)
  }
}

window.customElements.define('search-bar', SearchBar);

export default SearchBar;