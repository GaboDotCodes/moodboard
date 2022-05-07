import "../views/view-error/view-error";
import "../views/view-home/view-home";

import Router from "./Router/Router";
import routes from "./Router/routes";

const container = document.querySelector('#root');

const router = new Router(container, routes);

router.load(routes.home);
