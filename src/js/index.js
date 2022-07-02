import "../components/nav-menu/nav-menu";

import "../views/view-error/view-error";
import "../views/view-home/view-home";
import "../views/view-profile/view-profile";

import "../components/modals-container/modals-container";

import Router from "./Router/Router";
import routes from "./Router/routes";
import state from "./State/state";

window.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('#root');
  state.dispatch('router', 'set', new Router(container, routes));
  state.dispatch('routes', 'set', routes);
  
  container.insertAdjacentHTML('beforebegin', '<nav-menu></nav-menu>');
  const navMenu = document.querySelector('nav-menu');
  navMenu.menuItems = [
    { link: '/home', text: 'Inicio' },
    { link: '/profile', text: 'Perfil' },
  ];

  container.insertAdjacentHTML('afterend', '<modals-container></modals-container>');
});
