import styles from 'bundle-text:./masonry-layout.css';

class MasonryLayout extends HTMLElement {
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
    this.container = this.shadowRoot.querySelector('.container');
  }

  get cards() {
    return JSON.parse(this.getAttribute('cards'))
  }

  set cards(value) {
    this.setAttribute('cards', JSON.stringify(value))
  }

  static observedAttributes = ['cards'];

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case 'cards':
        this.container.innerHTML = this.cards.join('');
        break;
    }
  }
}

window.customElements.define('masonry-layout', MasonryLayout);

export default MasonryLayout;
