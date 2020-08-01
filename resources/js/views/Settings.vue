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
  menu: { [key: string]: string | boolean }[] = [
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
  selected = 'Profile'
  name: string | null = null
  email: string | null = null
  password: string | null = null
  password_confirm: string | null = null
  password_current: string | null = null
  showQR = false
  QRurl = ''
  passcode = ''
  loading = false

  get user(): UserModel | null {
    return this.current
  }

  @Watch('user', { immediate: true, deep: true })
  onPropertyChanged(value: { [key: string]: string | null }): void {
    this.name = value.name
    this.email = value.email
  }

  selectTab(item: { [key: string]: string }): void {
    this.selected = item.title
  }

  updatePersonalInformation(): void {
    this.$store
      .dispatch('user/updateUserProfile', {
        name: this.name,
        email: this.email,
      })
      .then((response) => {
        if (response.status == 200) {
          this.$store.commit('user/update', response.data.data)
          this.$swal({
            icon: 'success',
            title: 'Saved !',
            text: 'Your profile has been updated.',
          })
        }
      })
      .catch((error) => {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: this.handleError(error),
        })
      })
  }

  updatePassword(): void {
    this.loading = true
    this.$store
      .dispatch('user/updateUserPassword', {
        password: this.password,
        password_current: this.password_current,
        password_confirm: this.password_confirm,
      })
      .then((response) => {
        this.loading = false
        if (response.status == 200) {
          this.$swal({
            icon: 'success',
            title: 'Saved !',
            text: 'Your profile has been updated.',
          })
        }
      })
      .catch((error) => {
        this.loading = false
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: this.handleError(error),
        })
      })
  }

  enable2FA(): void {
    if (!this.user || !this.user['2fa']) {
      this.$store
        .dispatch('user/prepareTwoFactor')
        .then(() => {
          this.generateImageFrom(this.QR?.as_qr_code)
          this.showQR = true
        })
        .catch((error) => {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: this.handleError(error),
          })
        })
    }
  }

  generateImageFrom(svg: string | undefined): void {
    if (!svg) {
      return
    }
    let blob = new Blob([svg], { type: 'image/svg+xml' })
    this.QRurl = URL.createObjectURL(blob)
  }

  confirm2FA(): void {
    this.$store
      .dispatch('user/confirmTwoFactor', this.passcode)
      .then(() => {
        if (!this.recoveryCodes) {
          throw new Error('Missing recovery codes')
        }
        let codes = this.recoveryCodes.map(
          (i: { [key: string]: string }) => `<li>${i.code}</li>`
        )
        this.showQR = false
        this.$swal({
          title: 'Two-Factor authentication enabled!',
          icon: 'success',
          html: `Here are your recovery codes, make sure you copy
          them somewhere safe. <ul>${codes.join(' ')}</ul>`,
        })
      })
      .catch((error) => {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          html: this.handleError(error),
        })
      })
  }

  disable2FA(): void {
    this.$store
      .dispatch('user/disableTwoFactorAuth', this.passcode)
      .catch((error) => {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          html: this.handleError(error),
        })
      })
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
              class="flex items-center float-right px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              @click="updatePassword"
            >
              <div v-if="loading" class="mr-2 text-white spin-donut" />
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
              <div v-if="!user['2fa'] && !showQR" class="">
                You should enable 2FA first.
              </div>
              <div v-else-if="showQR" class="flex flex-row">
                <div class="">
                  <h2 class="text-2xl">Enable Two-factor Authentication</h2>
                  Now that you enabled two factor authentication, you'll need to
                  go through the following steps to use it.
                  <ol class="mt-10 ml-6 list-decimal">
                    <li>
                      Download a two-factor authentication app like
                      <a href="#" class="underline text-primary">
                        Google Authenticator
                      </a>
                    </li>
                    <li>
                      Scan the QR code, or enter this key
                      <code class="font-bold">{{ QR.as_string }}</code>
                      into your two factor autentication app.
                    </li>
                    <li>
                      After you scan the QR code or input the key above, your
                      two factor authentication app will provide you with a
                      unique passcode. Enter that below.
                    </li>
                  </ol>

                  <div class="mt-4">
                    <div class="w-full px-3 mb-4">
                      <input
                        v-model="passcode"
                        class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="******"
                      />
                    </div>
                  </div>
                </div>

                <img :src="QRurl" />
              </div>

              <div v-else class="">
                Click the button to disable 2FA.
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex-1" />
            <button
              v-if="!user['2fa'] && !showQR"
              type="submit"
              class="justify-center float-right px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              @click="enable2FA"
            >
              Enable 2FA
            </button>
            <button
              v-if="user['2fa']"
              type="submit"
              class="justify-center float-right px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              @click="disable2FA"
            >
              Disable 2FA
            </button>
            <button
              v-if="showQR"
              type="submit"
              class="justify-center float-right px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
              @click="confirm2FA"
            >
              Confirm Code
            </button>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
