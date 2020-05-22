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
              v-model="email"
              id="email"
              name="email"
              type="email"
              required
              autofocus
              class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              :class="{
                'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': !validEmail
              }"
            />
          </div>
          <p v-if="!validEmail" class="mt-2 text-sm text-red-600">
            The email address is not valid!
          </p>
          <p
            v-if="this.errors"
            class="mt-2 text-sm text-red-600"
          >
          <ul>
            <li 
            v-for="err in this.errors.email"
            :key="err"
            >
              {{ err }}
            </li>
          </ul>
          </p>
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
              v-model="password"
              id="password"
              type="password"
              required
              class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              :class="{
                'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': !validPassword
              }"
            />
          </div>
          <p v-if="!validPassword" class="mt-2 text-sm text-red-600">
            The password cannot be empty!
          </p>
          
          <p
            v-if="this.errors"
            class="mt-2 text-sm text-red-600"
          >
          <ul>
            <li 
            v-for="err in this.errors.password"
            :key="err"
            >
              {{ err }}
            </li>
          </ul>
          </p>
        </div>

        <div class="flex items-center justify-between mt-6">
          <div class="flex items-center">
            <input
              v-model="remember"
              id="remember"
              type="checkbox"
              class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
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
            >
            </a>

            <router-link
              tag="a"
              to="/auth/forgot"
              class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
            >
              Forgot your password?
            </router-link>
          </div>
        </div>

        <div class="mt-6">
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
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator'
import GlobalHelper from '@/mixins/GlobalHelper'
import Alert from '@/components/Alert.vue'
@Component({
  components: { Alert }
})
export default class Login extends Mixins(GlobalHelper) {
  private email: string = ''
  private password: string = ''
  private remember: boolean = false
  private startValidation: boolean = false
  private verify: boolean = false
  private redirectTo: string = '/home' //TODO: make this an env variable
  private error: boolean = false
  private errors: Object = {}
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
  created() {
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
      this.redirectTo = this.$route.query.redirectFrom.toString() || '/home'
    }
  }
  login(): void {
    this.error = false
    this.startValidation = true
    const data = {
      email: this.email,
      password: this.password,
      remember: this.remember
    }
    this.$store
      .dispatch('user/loginUser', data)
      .then(response => {
        if (this.verify) {
          window.location.href = this.redirectTo
        } else {
          this.$router.replace(this.redirectTo)
        }
      })
      .catch(error => {
        this.error = true
        this.message = this.handleError(error)
        this.errors = error.response?.data.errors
      })
  }
}
</script>
