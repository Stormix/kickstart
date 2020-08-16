<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { UilAngleDown } from '@iconscout/vue-unicons'
import { UilAngleUp } from '@iconscout/vue-unicons'

export type Column = {
  title: string
  field: string
  sortable?: boolean
  primary?: boolean
  isArray?: boolean
  arrayKey?: string
  format?: (value: string) => string
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
  },
})
export default class Table extends Vue {
  @Prop({ required: true }) columns!: Column[]
  @Prop({ required: true }) data!: ReadonlyArray<any>
  @Prop({ required: true }) query!: Query
  @Prop() keyword!: string
  @Prop({ required: true }) dataKey!: string

  sortBy!: string
  get sortFn(): (a: any, b: any) => number {
    console.log(this.query)
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
    return data.sort(this.sortFn)
  }

  setSort(key: string, order = false): void {
    this.query.sort = key
    this.query.order = order
  }

  public getSort(key: string, order = false): boolean {
    return this.query.sort == key && this.query.order == order
  }
}
</script>

<template>
  <div class="min-w-full">
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr class="items-center">
          <th
            v-for="col in columns"
            :key="`th:${col.field}`"
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
            v-for="col in columns"
            :key="`td:${col.field}:${item[dataKey]}`"
            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
          >
            <div v-if="col.isArray" class="">
              <t-tag
                v-for="subItem in item[col.field]"
                :key="`td:${col.field}:${item[dataKey]}:${
                  subItem[col.arrayKey]
                }`"
                tag-name="span"
                variant="badgeSuccess"
              >
                {{ subItem[col.arrayKey] }}
              </t-tag>
            </div>
            <div v-else class="">
              {{ col.format ? col.format(item[col.field]) : item[col.field] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
