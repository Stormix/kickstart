<template>
  <div>
    <h1 class="text-4xl">Home Page</h1>
    <!-- <example /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator'
import GlobalHelper from '@/mixins/GlobalHelper'

@Component
export default class Home extends Mixins(GlobalHelper) {
  //
}
</script>
