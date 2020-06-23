<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class MenuItem extends Vue {
  @Prop({ required: true }) readonly item!: { [key: string]: string | boolean }
  @Prop({ required: true }) readonly selectedTab!: string
  get isActive(): boolean {
    return this.item.title == this.selectedTab
  }
}
</script>

<template>
  <div
    v-if="item"
    class="flex items-center w-full px-6 py-4 cursor-pointer hover:text-white hover:bg-gray-700"
    :class="{
      'text-white': isActive,
      'bg-gray-700': isActive,
      'text-gray-700': !isActive,
      'bg-white': !isActive,
    }"
    @click="$emit('select-tab', item)"
  >
    <i v-if="item.icon" :class="item.icon" />
    <h1 class="px-2 text-sm">{{ item.title }}</h1>
  </div>
</template>
