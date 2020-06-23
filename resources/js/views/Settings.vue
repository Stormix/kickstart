<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import GlobalHelper from '@/mixins/GlobalHelper'
import AuthHelper from '@/mixins/AuthHelper'
import { UserModel } from '@/types/store'
import MenuItem from '@/components/MenuItem'
import Card from '@/components/Card'

@Component({
  components: {
    MenuItem,
    Card,
  },
})
export default class Settings extends Mixins(GlobalHelper, AuthHelper) {
  public menu: { [key: string]: string | boolean }[] = [
    {
      title: 'Profile',
    },
    {
      title: 'Password',
    },
    {
      title: 'Two-Factor Authentication',
    },
  ]
  public selected = 'Profile'
  public name: string | null | undefined = null
  public email: string | null | undefined = null
  public password_current: string | null | undefined = null
  public password: string | null | undefined = null
  public password_confirm: string | null | undefined = null

  get user(): UserModel | null {
    return this.current
  }

  @Watch('user', { immediate: true, deep: true })
  onPropertyChanged(value: { [key: string]: string | null | undefined }): void {
    if (!value) {
      return
    }
    this.name = value.name
    this.email = value.email
    this.password = value.password
    this.password_confirm = value.password_confirm
  }

  selectTab(item: { [key: string]: string }): void {
    this.selected = item.title
  }

  updatePersonalInformation(): void {
    console.log(this.name, this.email)
  }

  updatePassword(): void {
    console.log(this.password, this.password_confirm, this.password_current)
  }

  enable2FA(): void {
    console.log('Enabled')
  }
}
</script>
<template>
  <div v-if="user" class="flex w-full h-full space-y-0">
    <div class="flex w-full">
      <div class="max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg w-72">
        <v-gravatar
          :email="user.email"
          class="object-cover object-center w-full h-56"
          :size="500"
        />
        <div class="flex items-center px-6 py-3 bg-gray-900">
          <i class="text-green-400 fas fa-circle" />
          <h1 class="mx-3 text-lg font-semibold text-white">Online</h1>
        </div>
        <div class="px-6 py-4">
          <h1 class="text-xl font-semibold text-gray-800">
            {{ user.name }}
          </h1>
          <p class="text-gray-700">
            {{ user.email }}
          </p>
        </div>
        <MenuItem
          v-for="(item, index) in menu"
          :key="`menu-item-${index}`"
          :item="item"
          :selected-tab="selected"
          @select-tab="selectTab"
        />
      </div>
      <div class="flex-1 ml-4">
        <Card v-if="selected == 'Profile'">
          <template #header>
            Profile
          </template>
          <template #content>
            <div class="w-full my-auto">
              <div class="flex flex-wrap mb-6 -mx-3">
                <div class="w-full px-3">
                  <label
                    class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    for="grid-name"
                  >
                    Name
                  </label>
                  <input
                    id="grid-name"
                    v-model="name"
                    class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                  />
                </div>
              </div>

              <div class="flex flex-wrap mb-6 -mx-3">
                <div class="w-full px-3">
                  <label
                    class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    for="grid-email"
                  >
                    Email
                  </label>
                  <input
                    id="grid-email"
                    v-model="email"
                    class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    type="email"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex-1" />
            <button
              type="submit"
              class="justify-center float-right px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              @click="updatePersonalInformation"
            >
              Save Changes
            </button>
          </template>
        </Card>
        <Card v-if="selected == 'Password'">
          <template #header>
            Password
          </template>
          <template #content>
            <div class="w-full my-auto">
              <div class="flex flex-wrap -mx-3">
                <div class="w-full px-3 mb-4">
                  <label
                    class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    for="grid-cpassword"
                  >
                    Current Password
                  </label>
                  <input
                    id="grid-cpassword"
                    v-model="password_current"
                    class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    type="password"
                    placeholder="******************"
                  />
                </div>
                <div class="w-full px-3 mb-4">
                  <label
                    class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    for="grid-password"
                  >
                    Password
                  </label>
                  <input
                    id="grid-password"
                    v-model="password"
                    class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    type="password"
                    placeholder="******************"
                  />
                </div>
                <div class="w-full px-3 mb-4">
                  <label
                    class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    for="grid-passwordc"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="grid-passwordc"
                    v-model="password_confirm"
                    class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    type="password"
                    placeholder="******************"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex-1" />
            <button
              type="submit"
              class="justify-center float-right px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              @click="updatePassword"
            >
              Save Changes
            </button>
          </template>
        </Card>
        <Card v-if="selected == 'Two-Factor Authentication'">
          <template #header>
            Two-Factor Authentication
          </template>
          <template #content>
            <div class="w-full my-auto">
              <div v-if="!user['2fa']" class="">
                You should enable 2FA first.
              </div>
              <div v-else class="">
                Ay lmao
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex-1" />
            <button
              type="submit"
              class="justify-center float-right px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              @click="enable2FA"
            >
              {{ !user['2fa'] ? 'Enable 2FA' : 'Disable 2FA' }}
            </button>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
