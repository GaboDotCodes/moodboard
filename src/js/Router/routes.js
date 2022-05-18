import Route from "./Route";

const routes = {
  home: new Route('home', 'view-home'),
  error: new Route('error', 'view-error'),
  profile: new Route('profile', 'view-profile'),
};

export default routes;