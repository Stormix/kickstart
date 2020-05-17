import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

@Module({ namespaced: true })
class User extends VuexModule {
  public name: string = ''
  get nameUpperCase() {
    return this.name.toUpperCase()
  }
  @Mutation
  public setName(newName: string): void {
    this.name = newName
  }
  @Action({ rawError: true })
  public updateName(newName: string): void {
    this.context.commit('setName', newName)
  }
}
export default User
