<script lang="ts">
import Logo from '@/components/Logo.vue'
import { Component, Mixins } from 'vue-property-decorator'
import GlobalHelper from '@/mixins/GlobalHelper'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import AuthHelper from '@/mixins/AuthHelper'

@Component({
  components: {
    Logo,
    Navbar,
    Footer,
  },
})
export default class AppLayout extends Mixins(GlobalHelper, AuthHelper) {}
</script>
<template>
  <div class="flex flex-col h-full bg-gray-50">
    <Navbar v-if="current" :user="current" @logout="logout" />
    <header>
      <div class="container px-4 py-6 mx-auto sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          {{ pageTitle }}
        </h1>
      </div>
    </header>
    <main class="flex-1 bg-gray-50">
      <div class="container py-6 mx-auto sm:px-6 lg:px-8">
        <router-view />
      </div>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
