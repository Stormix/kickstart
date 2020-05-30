<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import GlobalHelper from '@/mixins/GlobalHelper'
import Alert from '@/components/Alert.vue'
@Component({
  components: { Alert },
})
export default class Login extends Mixins(GlobalHelper) {
  private email = ''
  private password = ''
  private remember = false
  private startValidation = false
  private verify = false
  private redirectTo = '/app' //TODO: make this an env variable
  private error = false
  private errors: { [key: string]: string } = {}
  private message: string | null = null
  get validEmail(): boolean {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (
      !this.startValidation ||
      (this.email.length > 0 && re.test(String(this.email).toLowerCase()))
    )
  }
  get validPassword(): boolean {
    return !this.startValidation || this.password.length > 0
  }
  get isValid(): boolean {
    return this.validEmail && this.validPassword
  }
  created(): void {
    if (
      'id' in this.$route.query &&
      'hash' in this.$route.query &&
      'signature' in this.$route.query &&
      'expires' in this.$route.query
    ) {
      this.verify = true
      const { id, hash, signature, expires } = this.$route.query
      this.redirectTo = `/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`
    }
    if ('redirectFrom' in this.$route.query) {
      this.redirectTo = this.$route.query.redirectFrom.toString() || '/app'
    }
  }
  login(): void {
    this.error = false
    this.startValidation = true
    const data = {
      email: this.email,
      password: this.password,
      remember: this.remember,
    }
    this.$store
      .dispatch('user/loginUser', data)
      .then(() => {
        if (this.verify) {
          window.location.href = this.redirectTo
        } else {
          this.$router.replace(this.redirectTo)
        }
      })
      .catch((error) => {
        this.error = true
        this.message = this.handleError(error)
        this.errors = error.response?.data.errors
      })
  }
}
</script>

<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
      <form @submit.prevent="authenticate">
        <Alert
          v-if="verify"
          type="info"
          content="Please login to verify your account !"
        />
        <Alert v-if="error" type="danger" :content="message" />
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Email address
          </label>

          <div class="mt-1 rounded-md shadow-sm">
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              autofocus
              class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              :class="{
                'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': !validEmail,
              }"
            />
          </div>
          <p v-if="!validEmail" class="mt-2 text-sm text-red-600">
            The email address is not valid!
          </p>
          <div v-if="errors" class="mt-2 text-sm text-red-600">
            <ul>
              <li v-for="err in errors.email" :key="err">
                {{ err }}
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-6">
          <label
            for="password"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Password
          </label>

          <div class="mt-1 rounded-md shadow-sm">
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              :class="{
                'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': !validPassword,
              }"
            />
          </div>
          <p v-if="!validPassword" class="mt-2 text-sm text-red-600">
            The password cannot be empty!
          </p>

          <div v-if="errors" class="mt-2 text-sm text-red-600">
            <ul>
              <li v-for="err in errors.password" :key="err">
                {{ err }}
              </li>
            </ul>
          </div>
        </div>

        <div class="flex items-center justify-between mt-6">
          <div class="flex items-center">
            <input
              id="remember"
              v-model="remember"
              type="checkbox"
              class="w-4 h-4 transition duration-150 ease-in-out text-primary form-checkbox"
            />

            <label
              for="remember"
              class="block ml-2 text-sm leading-5 text-gray-900"
            >
              Remember
            </label>
          </div>

          <div class="text-sm leading-5">
            <a
              href="#"
              class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
            />

            <router-link
              tag="a"
              to="/auth/forgot"
              class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
            >
              Forgot your password?
            </router-link>
          </div>
        </div>

        <div class="my-6">
          <span class="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              :disabled="!isValid"
              @click.prevent="login"
            >
              Sign in
            </button>
          </span>
        </div>
        <div class="grid gap-0 mb-6 sm:grid-cols-3">
          <hr class="hidden mt-3 border-gray-400 sm:block" />
          <span class="text-sm font-normal text-center text-gray-700 bg-white">
            Or continue with
          </span>
          <hr class="hidden mt-3 border-gray-400 sm:block" />
        </div>
        <div class="grid grid-cols-3 gap-2">
          <button
            type="button"
            class="relative w-full py-1 text-sm font-semibold text-center text-gray-600 transition-all duration-200 border border-gray-400 border-solid rounded shadow-sm focus:outline-none hover:border-indigo-600"
          >
            <i class="text-lg fab fa-google" style="line-height: 28px;" />
          </button>
          <button
            type="button"
            class="relative w-full px-0 py-1 text-sm font-semibold text-center text-gray-600 transition-all duration-200 border border-gray-400 border-solid rounded shadow-sm focus:outline-none hover:border-indigo-600"
          >
            <i class="text-lg fab fa-twitter" style="line-height: 28px;" />
          </button>
          <button
            type="button"
            class="relative w-full px-0 py-1 text-sm font-semibold text-center text-gray-600 transition-all duration-200 border border-gray-400 border-solid rounded shadow-sm focus:outline-none hover:border-indigo-600"
          >
            <i class="text-lg fab fa-linkedin" style="line-height: 28px;" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
