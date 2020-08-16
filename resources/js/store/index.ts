import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/modules/user'
import Users from '@/store/modules/admin/users'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: User,
    adminUsers: Users, // Doesn't support nested modules, so prefixing for now
  },
})

export default store
