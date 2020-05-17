<template>
  <div class="details">
    <div class="username">User: {{ nameUpperCase }}</div>
    <input :value="name" @keydown="updateName($event.target.value)" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const user = namespace('user')

@Component
export default class ExampleComponent extends Vue {
  @user.State
  public name!: string

  @user.Getter
  public nameUpperCase!: string

  @user.Action
  public updateName!: (newName: string) => void
}
</script>
