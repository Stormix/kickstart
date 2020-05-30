<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import GlobalHelper from '@/mixins/GlobalHelper'

@Component({
  components: {},
})
export default class Profile extends Mixins(GlobalHelper) {
  //
}
</script>
<template>
  <div class="w-full h-full">
    <!-- Replace with your content -->
    <div class="px-4 py-6 sm:px-0">
      <div class="border-4 border-gray-200 border-dashed rounded-lg h-96">
        <h1 class="text-4xl">
          Profile
        </h1>
      </div>
    </div>
    <!-- /End replace -->
  </div>
</template>
