<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import GlobalHelper from '@/mixins/GlobalHelper'

@Component({
  components: {},
})
export default class SubHeader extends Mixins(GlobalHelper) {
  //
}
</script>
<template>
  <div class="flex items-center w-full px-10 py-4 bg-white shadow-md max-h-20">
    <slot>
      <div class="px-4 text-2xl font-medium text-gray-900 border-r-2">
        {{ pageTitle }}
      </div>
    </slot>
  </div>
</template>
