import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import axios, { AxiosResponse } from 'axios'
import { UserModel } from '@/types/store'

@Module({ namespaced: true })
class User extends VuexModule {
  public current: UserModel | null = null
  public QR: { [key: string]: string } | null = null
  public recoveryCodes: { code: string; used_at: string }[] | null = null

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
  public async loginUser(user: UserModel): Promise<boolean | void> {
    const { remember, email, password, passcode } = user
    const payload = !passcode
      ? {
          email,
          password,
          remember, // Not used for now
        }
      : {
          email,
          password,
          remember, // Not used for now
          passcode,
        }

    await axios.get('/sanctum/csrf-cookie')
    return axios.post('/login', payload).then(({ status }) => {
      if (status == 204 || status == 200) {
        return this.context.dispatch('getCurrentUser')
      }
    })
  }
  @Action({ rawError: true })
  public async getCurrentUser(): Promise<boolean> {
    return axios
      .get('/api/user')
      .then(({ data }) => this.context.commit('setCurrentUser', data.data))
      .then(() => true)
      .catch(() => false)
  }
  @Action({ rawError: true })
  public async forgotPassword(email: string): Promise<AxiosResponse> {
    return axios.post('/password/email', {
      email,
    })
  }
  @Action({ rawError: true })
  public async resetPassword({
    token,
    email,
    password,
    password_confirmation,
  }: {
    [key: string]: string
  }): Promise<AxiosResponse> {
    return axios.post('/password/reset', {
      token,
      email,
      password,
      password_confirmation,
    })
  }
  @Action({ rawError: true })
  logout(): Promise<void> {
    return axios
      .post('/logout')
      .then(() => this.context.commit('unsetCurrentUser'))
  }
  @Action({ rawError: true })
  updateUserProfile({ name, email }: { [key: string]: string }): Promise<void> {
    return axios.put('/api/user/info', {
      name,
      email,
    })
  }
  @Action({ rawError: true })
  updateUserPassword({
    password,
    password_current,
    password_confirm,
  }: {
    [key: string]: string
  }): Promise<void> {
    return axios.put('/api/user/password', {
      password,
      password_current,
      password_confirm,
    })
  }
  @Action({ rawError: true })
  prepareTwoFactor(): Promise<void> {
    return axios
      .post('/api/user/2fa/prepare')
      .then(({ data }) => this.context.commit('setQR', data.data))
  }
  @Action({ rawError: true })
  confirmTwoFactor(passcode: string): Promise<void> {
    return axios
      .post('/api/user/2fa/confirm', {
        passcode,
      })
      .then(({ data }) => this.context.commit('setRecoveryCodes', data.data))
      .then(() => this.context.dispatch('getCurrentUser'))
  }

  @Action({ rawError: true })
  disableTwoFactorAuth(): Promise<void> {
    return axios
      .post('/api/user/2fa/disable')
      .then(() => this.context.dispatch('getCurrentUser'))
  }
  @Mutation
  update(user: UserModel): void {
    this.current = user
  }
  @Mutation
  setQR(QR: { [key: string]: string }): void {
    this.QR = QR
  }

  @Mutation
  setRecoveryCodes(codes: { code: string; used_at: string }[]): void {
    this.recoveryCodes = codes
  }
}
export default User
