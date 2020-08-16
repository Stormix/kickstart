<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Card extends Vue {}
</script>
<template>
  <div
    class="flex flex-col w-full h-full px-8 py-4 bg-white rounded-lg shadow-md"
  >
    <div class="flex items-center justify-between pb-4 mb-4">
      <slot name="header" />
    </div>
    <div class="flex flex-1">
      <slot name="content" />
    </div>
    <div class="flex items-center justify-between">
      <slot name="footer" />
    </div>
  </div>
</template>
