<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
      <form>
        <Alert v-if="success" type="success" :content="message" />
        <Alert v-if="error" type="danger" :content="message" />
        <div>
          <label
            for="name"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Name
          </label>

          <div class="mt-1 rounded-md shadow-sm">
            <input
              v-model="name"
              id="name"
              type="text"
              required
              autofocus
              class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              :class="{
                'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': !validName
              }"
            />
          </div>

          <p v-if="!validName" class="mt-2 text-sm text-red-600">
            Username cannot be empty!
          </p>
        </div>

        <div class="mt-6">
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
              type="email"
              required
              class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              :class="{
                'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': !validEmail
              }"
            />
          </div>

          <p v-if="!validEmail" class="mt-2 text-sm text-red-600">
            The email address is not valid!
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
            The password should match the password confirmation and contain
            atleast 8 characters.
          </p>
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
              v-model="password_confirmation"
              id="password_confirmation"
              type="password"
              required
              class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              :class="{
                'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': !validPassword
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
              @click.prevent="register"
            >
              Register
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
  components: {
    Alert
  }
})
export default class Register extends Mixins(GlobalHelper) {
  private name: string = ''
  private password: string = ''
  private email: string = ''
  private password_confirmation: string = ''
  private startValidation: boolean = false
  private success: boolean = false
  private error: boolean = false
  private message: string | null = null
  get validName(): boolean {
    return !this.startValidation || this.name.length > 0
  }
  get validEmail(): boolean {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (
      !this.startValidation ||
      (this.email.length > 0 && re.test(String(this.email).toLowerCase()))
    )
  }
  get validPassword(): boolean {
    return (
      !this.startValidation ||
      (this.password.length > 8 && this.password === this.password_confirmation)
    )
  }
  get isValid(): boolean {
    return this.validName && this.validEmail && this.validPassword
  }

  register(): void {
    this.startValidation = true
    this.success = false
    this.error = false
    const data = {
      name: this.name,
      email: this.email,
      password: this.password
    }
    this.$store
      .dispatch('user/registerNewUser', data)
      .then(response => {
        console.log(response)
        if (response.status == 201) {
          this.success = true
          this.message =
            'Account created ! Check your email for further instructions.'
          setTimeout(() => {
            this.$router.push('/auth/login')
          }, 2000)
        }
      })
      .catch(error => {
        this.error = true
        this.message = this.handleError(error)
      })
  }
}
</script>
