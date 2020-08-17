<script lang="ts">
// Based on: https://www.digitalocean.com/community/tutorials/vuejs-vue-pagination-component

import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { UilAngleDoubleRight } from '@iconscout/vue-unicons'
import { UilAngleDoubleLeft } from '@iconscout/vue-unicons'
import { UilAngleRight } from '@iconscout/vue-unicons'
import { UilAngleLeft } from '@iconscout/vue-unicons'

export type PaginationBtn = {
  name: number
  isDisabled: boolean
}

@Component({
  components: {
    UilAngleDoubleRight,
    UilAngleDoubleLeft,
    UilAngleRight,
    UilAngleLeft,
  },
})
export default class Pagination extends Vue {
  @Prop({ default: 3 }) maxVisibleButtons!: number
  @Prop({ required: true }) totalPages!: number
  @Prop({ required: true }) total!: number
  @Prop({ required: true }) currentPage!: number

  get startPage(): number {
    // When on the first page
    if (this.currentPage === 1) {
      return 1
    }
    // When on the last page
    if (this.currentPage === this.totalPages) {
      return this.totalPages - this.maxVisibleButtons
    }
    // When in between
    return this.currentPage - 1
  }

  @Watch('totalPages')
  handleUpdatedTotalPages(): void {
    this.$emit('page-changed', 1)
  }

  get pages(): PaginationBtn[] {
    const range = []

    for (
      let i = this.startPage;
      i <= Math.min(this.startPage + this.maxVisibleButtons, this.totalPages);
      i += 1
    ) {
      range.push({
        name: i,
        isDisabled: i === this.currentPage,
      })
    }

    return range
  }

  get isInFirstPage(): boolean {
    return this.currentPage === 1
  }

  get isInLastPage(): boolean {
    return this.currentPage === this.totalPages
  }

  isPageActive(page: number): boolean {
    return this.currentPage === page
  }

  onClickFirstPage(): void {
    this.$emit('page-changed', 1)
  }
  onClickPreviousPage(): void {
    this.$emit('page-changed', this.currentPage - 1)
  }
  onClickPage(page: number): void {
    this.$emit('page-changed', page)
  }
  onClickNextPage(): void {
    this.$emit('page-changed', this.currentPage + 1)
  }
  onClickLastPage(): void {
    this.$emit('page-changed', this.totalPages)
  }
}
</script>
<template>
  <div class="flex flex-row justify-evenly">
    <TButton
      variant="pagination"
      class="-mr-1"
      :disabled="isInFirstPage"
      :class="{
        disabled: isInFirstPage,
      }"
      @click="onClickFirstPage"
    >
      <UilAngleDoubleLeft size="16" />
    </TButton>
    <TButton
      variant="pagination"
      :disabled="isInFirstPage"
      :class="{
        disabled: isInFirstPage,
      }"
      @click="onClickPreviousPage"
    >
      <UilAngleLeft size="16" />
    </TButton>
    <!-- Range of Page -->
    <TButton
      v-for="page in pages"
      :key="page.name"
      variant="paginationNumber"
      :disabled="page.isDisabled"
      :class="{ active: isPageActive(page.name) }"
      @click="onClickPage(page.name)"
    >
      {{ page.name }}
    </TButton>
    <!-- Range of Page -->
    <TButton
      variant="pagination"
      :disabled="isInLastPage"
      :class="{
        disabled: isInLastPage,
      }"
      @click="onClickNextPage"
    >
      <UilAngleRight size="16" />
    </TButton>
    <TButton
      variant="pagination"
      class="-ml-1"
      :disabled="isInLastPage"
      :class="{
        disabled: isInLastPage,
      }"
      @click="onClickLastPage"
    >
      <UilAngleDoubleRight size="16" />
    </TButton>
  </div>
</template>
<style lang="scss" scoped>
.active {
  @apply bg-primary text-white;
}
.disabled {
  // for some reason disabled: didn't work with vue-tailwindcss
  @apply cursor-not-allowed opacity-50;
  &:hover {
    @apply bg-gray-100 text-gray-400;
  }
}
</style>
