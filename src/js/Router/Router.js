import Route from "./Route";

class Router {
  #container;
  #routes;
  constructor(container, routes) {
    if (!(container instanceof Element)) throw new Error('Container must be an Element, use document.querySelector');
    Object.keys(routes).forEach(key => {
      if (!(routes[key] instanceof Route)) throw new Error(`routes.${key} must be an instance of Route`);
    })
    this.#container = container;
    this.#routes = routes;
  }

  load(page) {
    const { path, view } = page || this.#routes.error;
    this.#container.innerHTML = view;
    window.history.pushState({}, null, path);
  }
}

export default Router