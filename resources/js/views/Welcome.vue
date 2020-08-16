<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import GlobalHelper from '@/mixins/GlobalHelper'
import AuthHelper from '@/mixins/AuthHelper'

@Component
export default class Welcome extends Mixins(GlobalHelper, AuthHelper) {
  mounted(): void {
    this.getCurrentUser()
  }
}
</script>
<template>
  <div class="w-full h-full min-h-screen my-auto flex-center position-ref">
    <div class="top-right links">
      <router-link v-if="!isLoggedIn" tag="a" to="/auth/login">
        Login
      </router-link>
      <router-link v-if="!isLoggedIn" tag="a" to="/auth/register">
        Register
      </router-link>
      <router-link v-if="isLoggedIn" tag="a" to="/app">
        Welcome, {{ current.name }}
      </router-link>
      <a v-if="isLoggedIn" href="#" @click.prevent="logout">
        Logout
      </a>
    </div>

    <div class="content">
      <div class="title m-b-md">Kickstart</div>

      <div class="links">
        <a href="#">Docs</a>
        <a href="https://github.com/stormix/kickstart">GitHub</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex-center {
  align-items: center;
  display: flex;
  justify-content: center;
}

.position-ref {
  position: relative;
}

.top-right {
  position: absolute;
  right: 10px;
  top: 18px;
}

.content {
  text-align: center;
}

.title {
  font-size: 84px;
}

.links > a {
  color: #636b6f;
  padding: 0 25px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1rem;
  text-decoration: none;
  text-transform: uppercase;
}

.m-b-md {
  margin-bottom: 30px;
}
</style>
