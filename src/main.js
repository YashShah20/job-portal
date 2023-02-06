import Vue from 'vue'
import App from './App.vue'
import routes from './routes';

import { createPinia, PiniaVuePlugin } from 'pinia'

import 'bootstrap'
import 'jquery/src/jquery'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'

import VueRouter from 'vue-router';

console.log(VueRouter)
Vue.use(VueRouter);
Vue.use(PiniaVuePlugin)

const pinia = createPinia();

const router = new VueRouter({
  routes
})
Vue.config.productionTip = false

// eslint-disable-next-line 
new Vue({
  render: h => h(App),
  router,
  pinia
}).$mount('#app')

Vue.use(router)
