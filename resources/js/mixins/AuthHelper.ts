import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { UserModel } from '@/types/store'

const user = namespace('user')

@Component
class AuthHelper extends Vue {
  @user.State
  public current!: UserModel | null

  get isLoggedIn(): boolean {
    return !!this.current || false
  }

  logout(): void {
    this.$store.dispatch('user/logout').then(() => this.$router.push('/'))
  }

  @user.Action
  getCurrentUser!: () => Promise<boolean>
}

export default AuthHelper
