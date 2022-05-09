import Auth from "../../apis/auth"
import router from '../../router/index'
const state = {
  user: null
}

const getters = {
  username: state => state.user === null ? "未登录" : state.user.username,

  slug: state => state.user === null ? "未" : state.user.username.charAt(0)
}

const mutations = {
  setUser(state, payload) {
    state.user = payload.user
  },
}

const actions = {
  login({commit}, {username, password}) {
    return Auth.login({username, password})
      .then(res => {
        commit("setUser", {user: res.data})
      })
  },
  logout({commit},payload={path:'/login'}){
    return Auth.logout()
      .then(res=>{
        commit('setUser',{user:null})
        router.push(payload)
          .then()
      })
  },
  register({commit},{username,password}){
    return Auth.register({username,password})
      .then(res=>{
        commit('setUser',{user:res.data})
      })
  },

  checkLogin({commit,state},payload){
    if(state.user !== null) return Promise.resolve()
    return Auth.getInfo()
      .then(res=>{
        if (!res.isLogin) {
           router.push(payload)
             .then(res=>{})
        }else{
          this.username = res.data.username
          commit('setUser',{user:res.data})
        }
      })
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
