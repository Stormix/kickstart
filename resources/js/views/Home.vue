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
    <SubHeader />
    <!-- Replace with your content -->
    <div class="container px-4">
      Dumb stuff
    </div>
    <!-- /End replace -->
  </div>
</template>
