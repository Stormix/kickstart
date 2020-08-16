import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import axios, { AxiosResponse } from 'axios'
import { UserModel } from '@/types/store'

@Module({ namespaced: true })
class Users extends VuexModule {
  public all: UserModel[] = []

  @Mutation
  public setUsers(users: UserModel[]): void {
    this.all = users
  }

  @Action({ rawError: true })
  public getAll(): Promise<void> {
    return axios.get('/api/admin/users').then(({ data }) => {
      this.context.commit('setUsers', data.data)
    })
  }
}
export default Users
