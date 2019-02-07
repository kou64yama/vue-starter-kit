import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: 'home' */ './HomePage.vue'),
  },
  {
    name: 'contact',
    path: '/contact',
    component: () =>
      import(/* webpackChunkName: 'contact' */ './ContactPage.vue'),
    props: {
      title: 'Contact Us',
    },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: 'login' */ './LoginPage.vue'),
    props: {
      title: 'Log In',
    },
  },
  {
    name: 'register',
    path: '/register',
    component: () =>
      import(/* webpackChunkName: 'register' */ './RegisterPage.vue'),
    props: {
      title: 'New User Registration',
    },
  },
  {
    name: 'about',
    path: '/about',
    component: () => import(/* webpackChunkName: 'about' */ './AboutPage'),
  },
  {
    name: 'privacy',
    path: '/privacy',
    component: () => import(/* webpackChunkName: 'privacy' */ './PrivacyPage'),
  },
  {
    name: 'admin',
    path: '/admin',
    component: () => import(/* webpackChunkName: 'admin' */ './AdminPage.vue'),
    props: {
      title: 'Admin Page',
    },
  },

  // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
  {
    name: 'not-found',
    path: '*',
    component: () =>
      import(/* webpackChunkName: 'not-found' */ './NotFoundPage.vue'),
    props: {
      title: 'Page Not Found',
    },
  },
];

export default routes;
