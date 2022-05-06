import styles from 'bundle-text:./simple-card.css';

export default class SimpleCard extends HTMLElement {
  constructor() {
    super();
    this.like = this.like.bind(this)
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <img class="main-image" src='${this.imageUrl}'/>
      <footer>
        <section>
          <h1>${this.title}</h1>
          ${this.description? `<span>${this.description}</span>`: ''}
        </section>
        <div id="like-button" class="like-button">
          ${this.liked
            ? `<img class="image-button" src='./assets/heart-solid.svg'>`
            : `<img class="image-button" src='./assets/heart-regular.svg'>`}
        </div>
      </footer>
    `;
  }

  get id() {
    return this.getAttribute('id')
  }

  set id(value) {
    this.setAttribute('id', value)
  }

  get title() {
    return this.getAttribute('title')
  }

  set title(value) {
    this.setAttribute('title', value)
  }

  get description() {
    return this.getAttribute('description')
  }
  
  set description(value) {
    this.setAttribute('description', value)
  }

  get imageUrl() {
    return this.getAttribute('image-url')
  }

  set imageUrl(value) {
    this.setAttribute('image-url', value)
  }

  get liked() {
    return this.getAttribute('liked') === 'true';
  }

  set liked(value) {
    this.setAttribute('liked', value)
  }

  connectedCallback() {
    this.likeButton = this.shadowRoot.querySelector('#like-button');
    this.likeButton.addEventListener('click', this.like)
  }

  disconnectedCallback() {
    this.likeButton.removeEventListener('click', this.like)
  }
  
  like() {
    this.liked = !this.liked;
  }

  static observedAttributes = ["liked"];

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'liked':
        this.updateLikedButton()
        break;
      }
  }
  
  updateLikedButton() {
    if (this.likeButton) {
      this.likeButton.innerHTML = this.liked
        ? `<img class="image-button" src='./assets/heart-solid.svg'>`
        : `<img class="image-button" src='./assets/heart-regular.svg'>`
    }
  }
}

window.customElements.define('simple-card', SimpleCard);
