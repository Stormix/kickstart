<script lang="ts">
import { Component, Vue, Watch, Emit } from 'vue-property-decorator'
import Logo from '@/components/Logo'
import MenuItem from '@/components/Sidebar/Menu/Item'
import MenuTitle from '@/components/Sidebar/Menu/Title'
import { UilBars } from '@iconscout/vue-unicons'
import { UilAngleDoubleRight } from '@iconscout/vue-unicons'
import { UilAngleDoubleLeft } from '@iconscout/vue-unicons'
import { UilUsersAlt } from '@iconscout/vue-unicons'
import { UilDashboard } from '@iconscout/vue-unicons'
import { UilCog } from '@iconscout/vue-unicons'

@Component({
  components: {
    Logo,
    MenuItem,
    MenuTitle,
    UilBars,
    UilAngleDoubleRight,
    UilAngleDoubleLeft,
    UilUsersAlt,
    UilDashboard,
    UilCog,
  },
})
export default class Sidebar extends Vue {
  isOpen = true
  hover = false

  @Watch('isOpen')
  @Emit('toggle')
  toggled(): boolean {
    return this.isOpen
  }

  public toggle(): void {
    this.isOpen = !this.isOpen
  }

  get showFullSidebar(): boolean {
    return this.isOpen || this.hover
  }

  mounted(): void {
    this.$emit('toggle', this.isOpen)
  }
}
</script>
<template>
  <div
    class="z-10 flex-col items-center hidden h-full min-h-screen py-4 rounded-lg shadow-xl lg:block sidebar"
    :class="{
      'w-16': !showFullSidebar,
      'max-w-xs': showFullSidebar,
    }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div
      class="flex flex-row items-center"
      :class="{ 'px-4': showFullSidebar }"
    >
      <div
        class="flex font-medium text-gray-900 title-font"
        :class="{ 'px-8': showFullSidebar }"
      >
        <Logo class="block w-auto h-8" :class="{ 'px-4': !showFullSidebar }" />
        <span v-show="showFullSidebar" class="mx-3 text-xl">Kickstart</span>
      </div>
      <div class="text-indigo-500" @click="toggle">
        <UilAngleDoubleLeft
          v-show="isOpen"
          size="32px"
          class="relative z-0 mt-1 cursor-pointer"
        />
        <UilAngleDoubleRight
          v-show="hover && !isOpen"
          size="32px"
          class="relative z-0 mt-1 cursor-pointer"
        />
      </div>
    </div>
    <div class="flex flex-col flex-1 w-full mt-8">
      <MenuItem
        :item="{ name: 'Dashboard', route: '/app' }"
        :expand="showFullSidebar"
      >
        <template #icon>
          <UilDashboard size="24px" class="cursor-pointer" />
        </template>
      </MenuItem>
      <MenuTitle :expand="showFullSidebar">Admin</MenuTitle>
      <MenuItem
        :item="{ name: 'Users', route: '/app/users' }"
        :expand="showFullSidebar"
      >
        <template #icon>
          <UilUsersAlt size="24px" class="cursor-pointer" />
        </template>
      </MenuItem>
      <MenuTitle :expand="showFullSidebar">User</MenuTitle>
      <MenuItem
        :item="{ name: 'Settings', route: '/app/settings' }"
        :expand="showFullSidebar"
      >
        <template #icon>
          <UilCog size="24px" class="cursor-pointer" />
        </template>
      </MenuItem>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.sidebar {
}
</style>
