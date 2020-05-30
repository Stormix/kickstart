const errors: { [key: string]: string } = {
  NO_USER: 'No user matching these credentials!',
  NOT_VERIFIED: "Please verify you're email!",
  INCORRECT: 'These credentials do not match our records.',
  RESET: 'Please reset your password!',
  MISSING: 'Missing fields.',
  ALREADY_EXISTS: 'A user with this email address already exists.',
  MISSING_TOKEN: 'Missing token. Try again later or contact founders.',
  BAD_TOKEN: 'Invalid/Expired token. Try again later or contact founders.',
}

import { Component, Vue } from 'vue-property-decorator'
import { AxiosError, AxiosResponse } from 'axios'
@Component
class GlobalHelper extends Vue {
  public head() {
    return {
      title: {
        inner: this.pageTitle,
      },
    }
  }
  get pageTitle(): string {
    return this.$route.meta?.title
  }
  handleError(error: AxiosError | null = null): string {
    if (!error) {
      console.error('Something went wrong')
      return `Something went wrong`
    }
    if (error && error.response && error.response.status <= 422) {
      return `${error.response.data.message || 'Not provided'}`
    } else {
      return `Something went wrong. Error: ${
        error.response?.data.error || 'Not provided'
      }`
    }
  }
}

export default GlobalHelper
