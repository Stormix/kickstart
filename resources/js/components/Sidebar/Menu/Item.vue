<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

export type Item = {
  name: string
  route: string
}

@Component({})
export default class MenuItem extends Vue {
  @Prop({ required: true }) item!: Item
  @Prop({ default: true }) expand!: boolean

  get active(): boolean {
    const matchedRoute = this.$route.matched[1].path
    return (
      matchedRoute == this.item.route || matchedRoute == `${this.item.route}/`
    )
  }
}
</script>
<template>
  <router-link
    tag="div"
    :to="item.route"
    class="flex items-center w-full py-4 cursor-pointer hover:bg-gray-100 hover:text-indigo-500"
    :class="{
      'text-indigo-500': active,
      'bg-gray-100': active,
      'pl-4': expand,
      'px-2': !expand,
      'justify-center': !expand,
    }"
  >
    <slot name="icon" />
    <div v-show="expand" class="ml-2">
      {{ item.name }}
    </div>
  </router-link>
</template>
