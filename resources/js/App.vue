<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class App extends Vue {}
</script>
<template>
  <div class="h-full min-h-screen">
    <router-view />
  </div>
</template>
