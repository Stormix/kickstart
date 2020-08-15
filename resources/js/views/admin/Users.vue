<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import GlobalHelper from '@/mixins/GlobalHelper'
import SubHeader from '@/components/SubHeader'
@Component({
  components: {
    SubHeader,
  },
})
export default class Home extends Mixins(GlobalHelper) {
  //
}
</script>
<template>
  <div class="w-full h-full">
    <SubHeader>
      <div class="px-4 text-2xl font-medium text-gray-900 border-r-2">
        {{ pageTitle }}
      </div>
      <div class="ml-4 font-medium text-gray-500">
        450 total
      </div>
    </SubHeader>
    <!-- Replace with your content -->
    <div class="container px-4" />
    <!-- /End replace -->
  </div>
</template>
