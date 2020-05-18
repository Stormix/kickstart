import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import axios, { AxiosResponse } from 'axios'
import { UserModel } from '@/types/store'

@Module({ namespaced: true })
class User extends VuexModule {
  public current: any = null
  // get nameUpperCase() {
  //   return this.name.toUpperCase()
  // }
  @Mutation
  public setCurrentUser(user: UserModel): void {
    this.current = user
  }
  @Action({ rawError: true })
  public registerNewUser(newUser: UserModel): Promise<AxiosResponse> {
    console.log(newUser)
    const { name, email, password } = newUser
    return axios.post('/register', {
      name,
      email,
      password,
      password_confirmation: password
    })
  }
  // this.context.commit('setCurrentUser', newUser)
  // @Action({ rawError: true })
  // public loginUser(newUser: User): void {}
  // @Action({ rawError: true })
  // public verifyAccount(newUser: User): void {}
  // @Action({ rawError: true })
  // public checkResetToken(newUser: User): void {}
}
export default User
