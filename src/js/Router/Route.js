class Route {
  #path;
  #view;

  constructor(path, view) {
    if (typeof path !== 'string') throw new Error('Path must be a string');
    if(!window.customElements.get(view)) throw new Error('View must be a custom element');
    this.#path = path;
    this.#view = view;
  }

  get path() {
    return this.#path;
  }

  get view() {
    return `<${this.#view}></${this.#view}>`;
  }
}

export default Route;