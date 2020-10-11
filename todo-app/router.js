import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Kalender from "./components/Kalender";
import Todotinder from "./components/Todotinder";
import Einstellungen from "./components/Einstellungen";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/kalender',
      name: 'kalender',
      component: Kalender
    },
    {
      path: '/todotinder',
      name: 'todotinder',
      component: Todotinder
    },
    {
      path: '/einstellungen',
      name: 'home',
      component: Einstellungen
    }

  ]
})
