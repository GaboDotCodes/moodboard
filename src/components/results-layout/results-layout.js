import '../masonry-layout/masonry-layout'
import '../simple-card/simple-card'

import { getImages } from '../../js/helpers/pexels';

import styles from 'bundle-text:./results-layout.css';
import state from '../../js/State/state';

class ResultsLayout extends HTMLElement {
  constructor() {
    super();
    this.lastElement = null;
    this.observerCallback = this.observerCallback.bind(this);
    this.listener = this.listener.bind(this);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <span>Search for something to inspiration!</span>
      <masonry-layout></masonry-layout>
    `;
  }

  async observerCallback ([{ isIntersecting }]) {
    if (isIntersecting && this.nextPage) {
      const { next_page, page, photos } = await getImages(this.query, this.page + 1);
      const cards = photos.map(({ alt, id, src: { medium } }) =>
      `<simple-card id='card-id-${id}' title='${alt}' image-url='${medium}'></simple-card>`
      )
      this.masonryLayout.cards = [ ...this.masonryLayout.cards, ...cards];
      this.nextPage = next_page;
      this.page = page;
    }
  }

  listener(_oldState, newState) {
    this.query = newState;
  }

  connectedCallback() {
    this.masonryLayout = this.shadowRoot.querySelector('masonry-layout');
    this.observer = new IntersectionObserver(this.observerCallback, { threshold: 0.2 });
    state.subscribe('query', this.listener)
  }

  disconnectedCallback() {
    state.unsubscribe('query', this.listener);
  }

  get query() {
    return this.getAttribute('query')
  }

  set query(value) {
    this.setAttribute('query', value)
  }

  get page() {
    return parseInt(this.getAttribute('page'))
  }

  set page(value) {
    this.setAttribute('page', value)
  }

  get nextPage() {
    return this.getAttribute('next-page')
  }

  set nextPage(value) {
    this.setAttribute('next-page', value)
  }

  static observedAttributes = ['query', 'page'];

  async attributeChangedCallback(attr, _oldValue, newValue) {
    switch (attr) {
      case 'query':
        this.shadowRoot.querySelector('span').innerHTML = `Results by "${newValue}"`;
        const { next_page, page, photos } = await getImages(newValue);
        this.nextPage = next_page;
        this.page = page;
        const cards = photos.map(({ alt, id, src: { medium } }) =>
          `<simple-card id='card-id-${id}' title='${alt}' image-url='${medium}'></simple-card>`
        )
        this.masonryLayout.cards = cards;
        this.lastElement = this.masonryLayout.shadowRoot.lastElementChild.lastElementChild;
        this.observer.observe(this.lastElement)
        break;
        case 'page':
          if (this.page > 1) {
            this.observer.unobserve(this.lastElement)
            this.lastElement = this.masonryLayout.shadowRoot.lastElementChild.lastElementChild;
            this.observer.observe(this.lastElement)
          }
        break;
    }
  }
}

window.customElements.define('results-layout', ResultsLayout);

export default ResultsLayout;