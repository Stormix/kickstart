<script lang="ts">
import Logo from '@/components/Logo.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Logo,
  },
})
export default class Footer extends Vue {}
</script>
<template>
  <footer class="w-full text-gray-700 bg-white body-font">
    <div class="flex flex-col items-center px-5 py-4 sm:flex-row">
      <a
        class="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start"
      >
        <Logo class="block w-auto h-8 my-auto" />

        <span class="ml-3 text-xl">Kickstart</span>
      </a>
      <p
        class="mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0"
      >
        © 2020 Kickstart —
        <a
          href="https://stormix.co"
          class="ml-1 text-gray-600"
          rel="noopener noreferrer"
          target="_blank"
        >
          @stormix.co
        </a>
      </p>
      <span
        class="inline-flex justify-center mt-4 sm:ml-auto sm:mt-0 sm:justify-start"
      >
        <a
          href="https://github.com/stormix/kickstart"
          class="ml-3 text-gray-500"
        >
          <i class="fab fa-github" /> View on Github
        </a>
      </span>
    </div>
  </footer>
</template>
