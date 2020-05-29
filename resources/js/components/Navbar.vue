<template>
  <nav class="border-b border-gray-200">
    <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            class="inline-flex items-center justify-center p-2 text-gray-900 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            aria-label="Main menu"
            aria-expanded="false"
            @click="open = !open"
          >
            <!-- Icon when menu is closed. -->
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg
              class="block w-6 h-6"
              :class="{ hidden: open, block: !open }"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Icon when menu is open. -->
            <!-- Menu open: "block", Menu closed: "hidden
            "-->
            <svg
              class="hidden w-6 h-6"
              :class="{ hidden: !open, block: open }"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="flex items-center justify-center flex-1 h-full sm:justify-start">
          <div class="items-center justify-center flex-shrink-0">
            <Logo class="block w-auto h-8 my-auto" />
          </div>
          <div class="hidden h-full sm:block sm:ml-6">
            <div class="flex h-full">
              <router-link
                v-for="(item, index) in menuItems"
                :key="item.path"
                tag="div"
                :to="item.path"
                :class="{ 'ml-5': index > 0 }"
                class="relative z-10 flex px-3 py-2 ml-4 leading-5 text-gray-500 transition duration-150 ease-in-out border-b-2 border-white hover:text-gray-900 hover:border-indigo-600"
                exactActiveClass="px-3 py-2 font-bold leading-5 text-gray-900 transition duration-150 ease-in-out border-indigo-600"
              >
                <div class="block my-auto">{{ item.name }}</div>
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- Profile dropdown -->
          <div v-if="user" class="relative ml-3">
            <div>
              <button
                class="flex text-sm transition duration-150 ease-in-out border-2 border-transparent rounded-full focus:outline-none focus:border-white"
                id="user-menu"
                aria-label="User menu"
                aria-haspopup="true"
                @click="dropdown = !dropdown"
                ref="profileToggle"
              >
                <img
                  class="w-8 h-8 rounded-full"
                  :src="`https://api.adorable.io/avatars/285/${user.email}`"
                />
              </button>
            </div>
            <!--
              Profile dropdown panel, show/hide based on dropdown state.
              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            <transition
              name="custom-classes-transition"
              enter-class="transform scale-95 opacity-0"
              enter-active-class="transition duration-100 ease-out"
              enter-to-class="transform scale-100 opacity-100"
              leave-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-if="dropdown"
                v-closable="{
                  exclude: ['profileToggle'],
                  handler: 'closeProfileDropdown',
                }"
                class="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg"
              >
                <div
                  class="py-1 bg-white rounded-md shadow-xs"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <router-link
                    tag="a"
                    class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    to="/app/settings"
                    active-class="text-white bg-blue-700"
                  >Settings</router-link>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    @click.prevent="logout"
                  >Sign out</a>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!--
      Mobile menu, toggle classes based on menu state.
      Menu open: "block", Menu closed: "hidden"
    -->
    <div class="sm:hidden" :class="{ hidden: !open, block: open }">
      <div class="px-2 pt-2 pb-3">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          tag="a"
          :to="item.path"
          class="block px-3 py-2 mt-1 text-base font-medium transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-900"
          exactActiveClass="block px-3 py-2 text-base font-medium text-white transition duration-150 ease-in-out bg-gray-900 rounded-md"
        >{{ item.name }}</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Logo from '@/components/Logo.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Logo,
  },
  props: {
    user: {
      type: Object || null,
      required: true,
    },
  },
})
export default class Navbar extends Vue {
  private open: Boolean = false
  private dropdown: Boolean = false
  private menuItems: Array<Object> = [
    {
      name: 'Dashboard',
      path: '/app',
    },
    {
      name: 'Settings',
      path: '/app/settings',
    },
  ]
  closeProfileDropdown(): void {
    this.dropdown = false
  }
  logout(): void {
    this.$emit('logout')
  }
}
</script>
