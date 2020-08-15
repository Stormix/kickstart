<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class MenuTitle extends Vue {
  @Prop({ required: false }) expand = true
}
</script>
<template>
  <div
    class="flex items-center w-full px-4 py-3 text-sm font-medium tracking-tight text-center text-gray-400 uppercase cursor-pointer"
    :class="{
      'text-lg': !expand,
      'font-bold': !expand,
    }"
  >
    <slot v-if="expand" />
    <div v-else class="w-full">...</div>
  </div>
</template>
