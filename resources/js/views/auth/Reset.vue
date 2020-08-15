<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import GlobalHelper from '@/mixins/GlobalHelper'
import Alert from '@/components/Alert.vue'
@Component({
  components: {
    Alert,
  },
})
export default class Reset extends Mixins(GlobalHelper) {
  password = ''
  email = ''
  password_confirmation = ''
  startValidation = false
  success = false
  error = false
  errors: { [key: string]: string } = {}
  message: string | null = null

  mounted(): void {
    if (this.$route.query.email) {
      this.email = (this.$route.query?.email as string) || ''
    }
  }

  get validEmail(): boolean {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (
      !this.startValidation ||
      (this.email.length > 0 && re.test(String(this.email).toLowerCase()))
    )
  }
  get token(): string {
    return this.$route.params.token || 'unset'
  }
  get validPassword(): boolean {
    return (
      !this.startValidation ||
      (this.password.length > 8 && this.password === this.password_confirmation)
    )
  }
  get isValid(): boolean {
    return this.validEmail && this.validPassword
  }
  reset(): void {
    this.success = false
    this.error = false
    this.errors = {}
    this.startValidation = true
    this.$store
      .dispatch('user/resetPassword', {
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        token: this.token,
      })
      .then((response) => {
        if (response.status == 200) {
          this.success = true
          this.message = `Your password has been reset! You'll be redirected shortly.`
        }
        setTimeout(() => {
          this.$router.push('/app')
        }, 1000)
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
      <form>
        <Alert v-if="success" type="success" :content="message" />
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

        <div class="mt-6">
          <label
            for="password_confirmation"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Confirm Password
          </label>

          <div class="mt-1 rounded-md shadow-sm">
            <input
              id="password_confirmation"
              v-model="password_confirmation"
              type="password"
              required
              class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              :class="{
                'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': !validPassword,
              }"
            />
          </div>
        </div>

        <div class="mt-6">
          <span class="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              :disabled="!isValid"
              @click.prevent="reset"
            >
              Update Password
            </button>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>
