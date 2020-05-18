<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
      <form @submit.prevent="authenticate">
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
        </div>

        <div class="mt-6">
          <span class="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              :disabled="!isValid"
              @click.prevent="reset"
            >
              Send password reset link
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
@Component({
  components: {}
})
export default class Reset extends Mixins(GlobalHelper) {
  private email: string = ''
  private startValidation: boolean = false
  get validEmail(): boolean {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (
      !this.startValidation ||
      (this.email.length > 0 && re.test(String(this.email).toLowerCase()))
    )
  }
  get isValid(): boolean {
    return this.validEmail
  }
  reset(): void {
    this.startValidation = true
    const data = {
      email: this.email
    }
    this.$store
      .dispatch('user/reset', data)
      .then(response => {
        if (response.status == 201) {
          // this.$notify({
          //   type: 'success',
          //   message:
          //     'Account created ! Check your email for further instructions.'
          // })
          setTimeout(() => {
            this.$router.push('login')
          }, 2000)
        }
      })
      .catch(error => {
        this.handleError(error)
      })
  }
}
</script>
