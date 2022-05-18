import Route from "./Route";

class Router {
  #container;
  #routes;
  constructor(container, routes) {
    if (!(container instanceof Element)) throw new Error('Container must be an Element, use document.querySelector');
    Object.keys(routes).forEach(key => {
      if (!(routes[key] instanceof Route)) throw new Error(`routes.${key} must be an instance of Route`);
    })
    if(!routes.error) throw new Error(`Routes must include an error route`);
    if(!routes.home) throw new Error(`Routes must include a home route`);
    this.#container = container;
    this.#routes = routes;
    this.initRouter();
  }

  initRouter() {
    const { location: { pathname = '/' } } = window;
    console.log();
    if (pathname.slice(0,7) !== '/assets') {
      const URI = pathname === '/'
        ? this.#routes.home
        : this.#routes[pathname.replace('/', '')];
      this.load(URI);
    }
  }

  load(page) {
    const { path, view } = page || this.#routes.error;
    this.#container.innerHTML = view;
    window.history.pushState({}, null, path);
  }
}

export default Router