import { Component, Vue } from 'vue-property-decorator'
import { AxiosError, AxiosResponse } from 'axios'
import { namespace } from 'vuex-class'

const user = namespace('user')

@Component
class AuthHelper extends Vue {
  @user.State
  public current!: any

  get isLoggedIn() {
    return !!this.current || false
  }

  logout() {
    this.$store.dispatch('user/logout').then(() => this.$router.push('/'))
  }

  @user.Action
  getCurrentUser!: () => any
}

export default AuthHelper
