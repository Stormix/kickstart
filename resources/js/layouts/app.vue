<script lang="ts">
import Logo from '@/components/Logo'
import { Component, Mixins } from 'vue-property-decorator'
import GlobalHelper from '@/mixins/GlobalHelper'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar/Sidebar'
import Footer from '@/components/Footer'
import AuthHelper from '@/mixins/AuthHelper'

@Component({
  components: {
    Logo,
    Navbar,
    Footer,
    Sidebar,
  },
})
export default class AppLayout extends Mixins(GlobalHelper, AuthHelper) {
  sidebarOpen = false

  public onToggle(value: boolean): void {
    this.sidebarOpen = value
  }
}
</script>
<template>
  <div class="flex flex-row h-full min-h-screen">
    <Sidebar class="h-full" @toggle="onToggle" />
    <div class="flex flex-col w-full h-full min-h-screen bg-gray-200">
      <Navbar v-if="current" :user="current" @logout="logout" />
      <main class="flex-1 w-full bg-gray-200">
        <router-view />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  </div>
</template>
