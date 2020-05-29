<template>
  <div class="h-full">
    <Navbar :user="current" @logout="logout" />
    <header class="bg-white">
      <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          {{ pageTitle }}
        </h1>
      </div>
    </header>
    <main>
      <div class="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Logo from '@/components/Logo.vue'
import { Component, Vue, Mixins } from 'vue-property-decorator'
import GlobalHelper from '@/mixins/GlobalHelper'
import Navbar from '@/components/Navbar.vue'
import AuthHelper from '@/mixins/AuthHelper'

@Component({
  components: {
    Logo,
    Navbar,
  },
})
export default class AppLayout extends Mixins(GlobalHelper, AuthHelper) {}
</script>
