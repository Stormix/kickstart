/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import '@/bootstrap'
import Vue from 'vue'
import Router from '@/router'
import Store from '@/store'
import App from '@/App.vue'
import VueHead from 'vue-head'
import VueClosable from 'vue-closable'
import Gravatar from 'vue-gravatar'
import Lang from 'laravel-vue-lang'
import VueSweetalert2 from 'vue-sweetalert2'

import 'sweetalert2/dist/sweetalert2.min.css'

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.use(VueHead)
Vue.use(VueClosable)
Vue.component('VGravatar', Gravatar)
Vue.use(Lang, {
  locale: 'en',
  fallback: 'en',
})
Vue.use(VueSweetalert2)
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = new Vue({
  router: Router,
  store: Store,
  render: (h) => h(App),
}).$mount('#app')
