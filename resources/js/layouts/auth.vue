<template>
  <div class="h-full">
    <div
      class="flex flex-col justify-center min-h-screen py-12 layout sm:px-6 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <a href="/">
          <Logo class="w-auto h-16 mx-auto text-indigo-600" />
        </a>

        <h2
          class="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900"
        >
          {{ title }}
        </h2>
        <p class="mt-2 text-sm leading-5 text-center text-gray-600 max-w">
          Or
          <router-link
            tag="a"
            :to="subtitleLink"
            class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
          >
            {{ subtitle }}
          </router-link>
        </p>
      </div>

      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Logo from '@/components/Logo.vue'
import { Component, Vue, Mixins } from 'vue-property-decorator'
import GlobalHelper from '@/mixins/GlobalHelper'

@Component({
  components: {
    Logo
  }
})
export default class AuthLayout extends Mixins(GlobalHelper) {
  get loadedView(): string | null | undefined {
    return this.$route.name
  }
  get isLogin(): boolean {
    return this.$route.fullPath.includes('login')
  }
  get title(): string {
    switch (this.loadedView) {
      case 'login':
        return 'Sign in to your account'
      case 'register':
        return 'Create a new account'
      case 'forgot':
        return 'Forgot password'
      case 'reset':
        return 'Reset password'
      default:
        return ''
    }
  }
  get subtitle(): string {
    switch (this.loadedView) {
      case 'login':
        return 'create a new account'
      default:
        return 'sign in to your account'
    }
  }
  get subtitleLink(): string {
    switch (this.loadedView) {
      case 'login':
        return '/auth/register'
      case 'register':
        return '/auth/login'
      case 'forgot':
        return '/auth/login'
      case 'reset':
        return '/auth/login'
      default:
        return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  background-color: rgba(249, 250, 251, 1);
}
</style>
