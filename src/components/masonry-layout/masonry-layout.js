import styles from 'bundle-text:./masonry-layout.css';

class MasonryLayout extends HTMLElement {
  #container;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <div class="container">
      </div>
    `;
  }

  connectedCallback() {
    this.#container = this.shadowRoot.querySelector('.container');
  }

  setCards(newCards) {
    this.#container.innerHTML = newCards.join('');
  }

  addCard(newCard) {
    this.#container.insertAdjacentHTML('beforeend', newCard);
  }

  addCards(newCards) {
    newCards.forEach(newCard => this.addCard(newCard))
  }

  getLastCard() {
    return this.#container.lastElementChild;
  }
}

window.customElements.define('masonry-layout', MasonryLayout);

export default MasonryLayout;
