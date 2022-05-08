import "../views/view-error/view-error";
import "../views/view-home/view-home";

import Router from "./Router/Router";
import routes from "./Router/routes";
import state from "./State/state";

const container = document.querySelector('#root');

state.dispatch('router.set', new Router(container, routes));

const { router } = state.getState()

router.load(routes.home)