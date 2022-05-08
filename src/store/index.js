import Vue from 'vue'
import Vuex from 'vuex'
import notebooks from './modules/notebooks'
import notes from './modules/notes'
import user from './modules/user'
import trash from './modules/trash'
Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    notebooks,
    notes,
    user,
    trash
  }
})
