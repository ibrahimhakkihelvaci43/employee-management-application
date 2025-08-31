import { Router } from '@vaadin/router';

import './pages/home';
import './pages/create-employee';

let router: Router;

function initializeRouter() {
  const outlet = document.querySelector('#router-outlet');
  if (outlet) {
    router = new Router(outlet);
    
    router.setRoutes([
      {
        path: '/',
        component: 'home-page'
      },
      {
        path: '/create-employee',
        component: 'create-employee'
      },
      {
        path: '(.*)',
        redirect: '/'
      }
    ]);
  }
}

setTimeout(() => {
  initializeRouter();
}, 100);

export const navigateTo = (path: string) => {
  Router.go(path);
};

export const getCurrentRoute = () => {
  return router?.location?.pathname || '/';
};
