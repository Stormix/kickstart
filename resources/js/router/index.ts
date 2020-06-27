import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome.vue'
import AppLayout from '@/layouts/app.vue'
import AuthLayout from '@/layouts/auth.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Reset from '@/views/auth/Reset.vue'
import Forgot from '@/views/auth/Forgot.vue'
import Settings from '@/views/Settings.vue'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
      meta: {
        title: 'Welcome',
        requiresAuth: false,
        redirectsIfAuth: false,
      },
    },
    {
      path: '/app',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
          meta: {
            title: 'Home',
            requiresAuth: true,
            redirectsIfAuth: false,
          },
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings,
          meta: {
            title: 'Settings',
            requiresAuth: true,
            redirectsIfAuth: false,
          },
        },
      ],
    },
    {
      path: '/password/reset/:token',
      component: AuthLayout,
      children: [
        {
          name: 'reset',
          path: '/',
          component: Reset,
          meta: {
            title: 'Reset Password',
            requiresAuth: false,
            redirectsIfAuth: true,
          },
        },
      ],
    },
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
            title: 'Login',
            requiresAuth: false,
            redirectsIfAuth: true,
          },
        },
        {
          name: 'register',
          path: 'register',
          component: Register,
          meta: {
            title: 'Register',
            requiresAuth: false,
            redirectsIfAuth: true,
          },
        },
        {
          name: 'forgot',
          path: 'forgot',
          component: Forgot,
          meta: {
            title: 'Forgot Password',
            requiresAuth: false,
            redirectsIfAuth: true,
          },
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  // TODO: this probably could be refactored
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const hasPermission = await store.dispatch('user/getCurrentUser')
    if (hasPermission) {
      next()
    } else {
      next({
        path: '/auth/login',
        query: { redirectFrom: to.fullPath },
      })
    }
  } else if (to.matched.some((record) => record.meta.redirectsIfAuth)) {
    const hasPermission = await store.dispatch('user/getCurrentUser')
    if (hasPermission) {
      next({
        path: '/app',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
