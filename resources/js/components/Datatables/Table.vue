<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { UilAngleDown } from '@iconscout/vue-unicons'
import { UilAngleUp } from '@iconscout/vue-unicons'

import TablePagination from '@/components/Datatables/TablePagination'
export type Action = {
  icon: {
    is: string
    size?: number
    [key: string]: any
  }
  text: string
  component: {
    is: string
    [key: string]: any
  }
  handler: (item: any) => void
}

export type Column = {
  title: string
  field?: string
  sortable?: boolean
  primary?: boolean
  array?: boolean
  arrayItemValue?: (value: any) => string
  arrayComponentProps?: (value: any) => string
  format?: (value: string, item?: any) => string
  actions?: boolean
  actionButtons?: Action[]
  checkbox?: boolean
  checkboxValue?: (item: any) => boolean
  checkboxHandler?: (item: any) => void
  checkboxText?: (item: any) => string
}

export type Query = {
  limit: number
  offset: number
  sort: string
  order: boolean
}

@Component({
  components: {
    UilAngleDown,
    UilAngleUp,
    TablePagination,
  },
})
export default class Table extends Vue {
  @Prop({ required: true }) columns!: Column[]
  @Prop({ required: true }) data!: ReadonlyArray<any>
  @Prop({ required: true }) query!: Query
  @Prop() keyword!: string
  @Prop({ required: true }) dataKey!: string

  sortBy!: string

  resultsPerPage = 10
  currentPage = 1

  get totalResults(): number {
    return this.data?.length || 0
  }
  get totalPages(): number {
    return Math.ceil(this.totalResults / this.resultsPerPage) || 0
  }

  public get range(): string {
    const start = Math.max((this.currentPage - 1) * this.resultsPerPage, 0)
    const end = Math.min(start + this.resultsPerPage, this.totalResults)
    return `${start + 1}-${end}`
  }

  get sortFn(): (a: any, b: any) => number {
    return (a: any, b: any): number => {
      if (a[this.query.sort] > b[this.query.sort]) {
        return this.query.order ? 1 : -1
      } else if (a[this.query.sort] < b[this.query.sort]) {
        return this.query.order ? -1 : 1
      } else {
        return 0
      }
    }
  }
  get items(): any {
    const data = [...this.data]

    const start = Math.max((this.currentPage - 1) * this.resultsPerPage, 0)
    const end = Math.min(start + this.resultsPerPage, this.totalResults)

    return data.slice(start, end).sort(this.sortFn)
  }

  setSort(key: string, order = false): void {
    this.query.sort = key
    this.query.order = order
  }

  public getSort(key: string, order = false): boolean {
    return this.query.sort == key && this.query.order == order
  }

  public goToPage(page: number): void {
    this.currentPage = page
  }
}
</script>

<template>
  <div class="min-w-full">
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr class="items-center">
          <th
            v-for="(col, i) in columns"
            :key="`th:${i}`"
            class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-400 uppercase border-b border-gray-200"
          >
            <div class="flex flex-row items-center">
              <div
                :class="{
                  'text-primary': col.primary,
                }"
              >
                {{ col.title }}
              </div>
              <div v-if="col.sortable" class="flex flex-col ml-4">
                <div
                  :class="{
                    'text-primary': getSort(col.field),
                    'text-indigo-300': !getSort(col.field),
                  }"
                  @click="setSort(col.field)"
                >
                  <UilAngleUp size="14" class="cursor-pointer" />
                </div>
                <div
                  class="-mt-1"
                  :class="{
                    'text-primary': getSort(col.field, true),
                    'text-indigo-300': !getSort(col.field, true),
                  }"
                  @click="setSort(col.field, true)"
                >
                  <UilAngleDown size="14" class="cursor-pointer" />
                </div>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="item in items" :key="`row:${item[dataKey]}`">
          <td
            v-for="(col, i) in columns"
            :key="`td:${i}:${item[dataKey]}`"
            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
          >
            <div v-if="col.array" class="">
              <!-- eslint-disable-next-line vue/require-component-is-->
              <component
                v-for="subItem in item[col.field]"
                :key="`td:array:${item[dataKey]}:${col.arrayItemValue(
                  subItem
                )}`"
                v-bind="col.arrayComponentProps(subItem)"
              >
                {{ col.arrayItemValue(subItem) }}
              </component>
            </div>
            <div v-else-if="col.actions" class="">
              <!-- eslint-disable-next-line vue/require-component-is-->
              <component
                v-for="action in col.actionButtons"
                :key="`td:action:${action.text}:${item[dataKey]}`"
                v-bind="action.component"
                @click="action.handler(item)"
              >
                <component
                  :is="action.icon.is"
                  v-tippy
                  :content="action.text"
                  :size="action.icon.size.toString()"
                />
              </component>
            </div>
            <div v-else-if="col.checkbox" class="">
              <component
                :is="'TToggle'"
                :key="`td:checkbox:${item[dataKey]}`"
                v-tippy
                :content="col.checkboxText(item)"
                :checked="col.checkboxValue(item)"
                @click="col.checkboxHandler(item)"
              />
            </div>
            <div v-else class="">
              {{
                col.format ? col.format(item[col.field], item) : item[col.field]
              }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex flex-row items-center justify-between mt-4">
      <TablePagination
        :total-pages="totalPages"
        :total="totalResults"
        :current-page="currentPage"
        @page-changed="goToPage"
      />
      <div class="flex flex-row items-center">
        <div class="">
          <TRichSelect
            v-model="resultsPerPage"
            :options="[5, 10, 50, 100]"
            :hide-search-box="true"
          />
        </div>
        <div class="ml-2">Showing {{ range }} of {{ totalResults }}</div>
      </div>
    </div>
  </div>
</template>
