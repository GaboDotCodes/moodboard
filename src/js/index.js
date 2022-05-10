import "../views/view-error/view-error";
import "../views/view-home/view-home";

import Router from "./Router/Router";
import routes from "./Router/routes";
import state from "./State/state";

window.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('#root');
  state.dispatch('router', 'set', new Router(container, routes));
  const router = state.getState('router')
  router.load(routes.home)
  state.subscribe('favorites', (_oldState, newState) => {
    const favorites = newState;
    console.log(favorites);
  })
})



