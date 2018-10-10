import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: 'home' */ './HomePage'),
  },
  {
    name: 'contact',
    path: '/contact',
    component: () => import(/* webpackChunkName: 'contact' */ './ContactPage'),
    props: {
      title: 'Contact Us',
    },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: 'login' */ './LoginPage'),
    props: {
      title: 'Log In',
    },
  },
  {
    name: 'register',
    path: '/register',
    component: () =>
      import(/* webpackChunkName: 'register' */ './RegisterPage'),
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
    component: () => import(/* webpackChunkName: 'admin' */ './AdminPage'),
    props: {
      title: 'Admin Page',
    },
  },

  // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
  {
    name: 'not-found',
    path: '*',
    component: () =>
      import(/* webpackChunkName: 'not-found' */ './NotFoundPage'),
    props: {
      title: 'Page Not Found',
    },
  },
];

export default routes;
