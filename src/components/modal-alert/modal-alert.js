import styles from 'bundle-text:./modal-alert.css'

class ModalAlert extends HTMLElement {
  #timeout;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <div class='modal-alert'><slot></slot></div>
    `;
  }

  connectedCallback() {
    this.#timeout = setTimeout(() => {
      if(this.parentNode) this.parentNode.removeChild(this);
    }, this.timeLive || 500);
    
    if (this.unique) {
      const alerts = [...this.parentNode.childNodes];
      const sameAlerts = alerts
        .map(({id, innerText}, index) => ({
          id,
          index,
          innerText,
          node: this.parentNode.childNodes.item(index),
          timeout: this.parentNode.childNodes.item(index).timeout,
        }))
        .filter(({id}) => id === this.id);
  
      if (sameAlerts.length === 2) {
        window.clearTimeout(sameAlerts[1].timeout);
        sameAlerts[1].node.replaceWith(this);
      };
    }
  }

  get timeout() {
    return this.#timeout;
  }

  get timeLive() {
    return parseInt(this.getAttribute('time-live'));
  }

  set timeLive(timeLive) {
    this.setAttribute('time-live', timeLive);
  }

  get unique() {
    return this.hasAttribute('unique');
  }

  set unique(unique) {
    if (unique) {
      this.setAttribute('unique', '');
    } else {
      this.removeAttribute('unique');
    }
  }
}

window.customElements.define('modal-alert', ModalAlert);

export default ModalAlert;
