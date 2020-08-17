<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { UserModel } from '@/types/store'
import GlobalHelper from '@/mixins/GlobalHelper'
import AuthHelper from '@/mixins/AuthHelper'
import SubHeader from '@/components/SubHeader'
import Card from '@/components/Card'
import { UilUserPlus } from '@iconscout/vue-unicons'
import { UilExport } from '@iconscout/vue-unicons'
import { UilEdit } from '@iconscout/vue-unicons'
import { UilTrash } from '@iconscout/vue-unicons'
import Table from '@/components/Datatables/Table'
import { Column } from '@/components/Datatables/Table.vue'
import moment from 'moment'
import { RoleModel } from '@/types/store'
const users = namespace('adminUsers')
@Component({
  components: {
    SubHeader,
    Card,
    UilUserPlus,
    UilExport,
    Table,
  },
})
export default class Home extends Mixins(GlobalHelper, AuthHelper) {
  @users.State((s) => s.all)
  public users!: UserModel[] | null

  get columns(): Column[] {
    return [
      { title: 'User ID', field: 'id', sortable: true, primary: true },
      {
        title: 'Username',
        field: 'name',
        format: (v: string, item: UserModel): string => {
          let isAuthenticatedUser = this.current?.id === item.id ? '(You)' : ''
          return `${v} ${isAuthenticatedUser}`
        },
      },
      { title: 'Email', field: 'email', sortable: true },
      {
        title: 'Roles',
        field: 'roles',
        array: true,
        arrayItemValue: (item: RoleModel): string => item.name,
        arrayComponentProps: (item: RoleModel): any => {
          return {
            is: 'TTag',
            'tag-name': 'span',
            variant: item.name == 'Admin' ? 'badge-success' : 'badge',
          }
        },
      },
      {
        title: 'Created At',
        field: 'created_at',
        format: (v: string): string => moment(v).format('MMM Do YY'),
      },
      {
        title: 'Actions',
        actions: true,
        actionButtons: [
          {
            icon: {
              is: UilEdit,
              size: 16,
            },
            text: 'Edit',
            component: {
              is: 'TButton',
              variant: 'icon',
            },
            handler: (item: UserModel): void => console.log('Edit: ', item),
          },
          {
            icon: {
              is: UilTrash,
              size: 16,
            },
            text: 'Delete',
            component: {
              is: 'TButton',
              variant: 'icon',
            },
            handler: (item: UserModel): void => console.log('Delete: ', item),
          },
        ],
      },
    ]
  }

  query = { limit: 10, offset: 0, sort: 'id', order: true }
  data = []
  total = 0

  async created(): Promise<void> {
    await this.$store.dispatch('adminUsers/getAll')
  }
}
</script>
<template>
  <div class="w-full h-full">
    <SubHeader>
      <div class="px-4 text-2xl font-medium text-gray-900 border-r-2">
        {{ pageTitle }}
      </div>
      <div class="ml-4 font-medium text-gray-500">{{ users.length }} total</div>
    </SubHeader>
    <div class="w-full h-full panel">
      <Card class="w-full">
        <template #header>
          <div>
            <div class="text-xl font-medium text-gray-900">
              User Management
            </div>
            <div class="">
              This is a subtitle
            </div>
          </div>
          <div class="flex items-center">
            <t-button>
              <UilUserPlus size="24px" class="mr-2" /> New User
            </t-button>
            <t-button variant="secondary">
              <UilExport size="24px" class="mr-2" /> Export
            </t-button>
          </div>
        </template>
        <template #content>
          <Table
            :query="query"
            :data="users"
            :columns="columns"
            data-key="id"
          />
        </template>
      </Card>
    </div>
  </div>
</template>
