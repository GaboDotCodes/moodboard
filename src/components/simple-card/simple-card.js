export default class SimpleCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const html = `
      <h1 class='btn-primary'>Hola</h1>
    `;
    this.shadowRoot.innerHTML = `
    ${html}
    `;
  }
}

window.customElements.define('simple-card', SimpleCard);
