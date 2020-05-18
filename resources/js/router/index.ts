import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome.vue'
import AuthLayout from '@/layouts/auth.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Reset from '@/views/auth/Reset.vue'
import Verify from '@/views/auth/Verify.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
      meta: {
        title: 'Welcome'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    // {
    //   path: '/email/verify/:id',
    //   name: 'verify',
    //   component: Verify,
    //   meta: {
    //     title: 'Email verification'
    //   }
    // },
    {
      path: '/auth',
      name: 'auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: Login,
          meta: {
            title: 'Login'
          }
        },
        {
          name: 'register',
          path: 'register',
          component: Register,
          meta: {
            title: 'Register'
          }
        },
        {
          name: 'reset',
          path: 'reset',
          component: Reset,
          meta: {
            title: 'Reset Password'
          }
        }
      ]
    }
  ]
})
