import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import axios, { AxiosResponse } from 'axios'
import { UserModel } from '@/types/store'

@Module({ namespaced: true })
class User extends VuexModule {
  public current: any = null
  @Mutation
  public setCurrentUser(user: UserModel): void {
    this.current = user
  }
  @Mutation
  public unsetCurrentUser(): void {
    this.current = null
  }
  @Action({ rawError: true })
  public registerNewUser(newUser: UserModel): Promise<AxiosResponse> {
    const { name, email, password } = newUser
    return axios.post('/register', {
      name,
      email,
      password,
      password_confirmation: password,
    })
  }
  @Action({ rawError: true })
  public async loginUser(user: UserModel): Promise<void> {
    const { remember, email, password } = user
    await axios.get('/sanctum/csrf-cookie')
    return axios
      .post('/login', {
        email,
        password,
        remember, // Not used for now
      })
      .then(({ status }) => {
        if (status == 204) {
          this.context.dispatch('getCurrentUser')
        }
      })
  }
  @Action({ rawError: true })
  public async getCurrentUser(): Promise<boolean> {
    return axios
      .get('/api/user')
      .then(({ data }) => this.context.commit('setCurrentUser', data))
      .then(() => true)
      .catch(() => false)
  }
  @Action({ rawError: true })
  public async forgotPassword(email: string): Promise<void> {
    return axios.post('/password/email', {
      email,
    })
  }
  @Action({ rawError: true })
  logout() {
    return axios
      .post('/logout')
      .then(() => this.context.commit('unsetCurrentUser'))
  }
}
export default User
