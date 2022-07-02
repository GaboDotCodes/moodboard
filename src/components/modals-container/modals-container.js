import styles from 'bundle-text:./modals-container.css'

class ModalsContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <div class='modals-container'>
        <slot></slot>
      </div>
    `;
  }
}

window.customElements.define('modals-container', ModalsContainer);

export default ModalsContainer;
