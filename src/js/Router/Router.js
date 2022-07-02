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
    const URI = pathname === '/'
      ? this.#routes.home
      : this.#routes[pathname.replace('/', '')];
      
    Object.keys(this.#routes).forEach(key => {
      const { view, viewName } = this.#routes[key];
      this.#container.insertAdjacentHTML('afterbegin', view);
      const insertedEl = this.#container.querySelector(viewName);
      insertedEl.style.position = 'absolute';
    });
    
    this.load(URI);
    window.addEventListener('popstate', (e) => {
      const { location: { pathname = '/' } } = window;
      const URI = pathname === '/'
        ? this.#routes.home
        : this.#routes[pathname.replace('/', '')];
      this.load(URI);
    })
  }
    
  load(page) {
    const { location: { pathname = '/', href } } = window;
    const params = new URL(href).searchParams;

    const { path, viewName: viewNamePage } = page || this.#routes.error;

    Object.keys(this.#routes).forEach(key => {
      const { viewName } = this.#routes[key];
      const insertedEl = this.#container.querySelector(viewName);
      insertedEl.style.visibility = viewNamePage === viewName ? 'visible': 'hidden';
    });

    if (pathname.replace('/', '') !== path) {
      window.history.pushState({}, null, path);
    }
  }
}

export default Router