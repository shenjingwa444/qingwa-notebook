import Notebooks from "../../apis/notebooks"
import {Message} from "element-ui"

const state = {
  notebooks: [],
  currentBook: ""
}

const getters = {
  notebooks: state => state.notebooks || [],
}

const mutations = {
  setNotebooks(state, payload) {
    state.notebooks = payload.notebooks
  },

  addNotebook(state, payload) {
    state.notebooks.unshift(payload.notebook)
  },

  deleteNotebook(state, payload) {
    state.notebooks = state.notebooks.filter(notebook => notebook.id != payload.notebookId) || {}
  },

  updateNotebook(state, payload) {
    let notebook = state.notebooks.find(notebook => notebook.id == payload.notebookId) || {}
    notebook.title = payload.title
  }
}

const actions = {
  getNotebooks({commit}) {
    Notebooks.getAll()
      .then(res => {
        commit("setNotebooks", {notebooks: res.data})
      })
  },

  addNotebook({commit}, payload) {
    return Notebooks.addNotebook({title: payload.title})
      .then(res => {
        commit("addNotebook", {notebook: res.data})
        Message.success(res.data)
      })
  },

  deleteNotebook({commit}, payload) {
    Notebooks.deleteNotebook(payload.notebookId)
      .then(res => {
        commit("deleteNotebook", {notebookId: payload.notebookId})
        Message.success(res.data)
      })
  },

  updateNotebook({commit}, payload) {
    Notebooks.updateNotebook(payload.notebookId, {title: payload.title})
      .then(res => {
        commit("updateNotebook", {notebookId: payload.notebookId, title: payload.title})
        Message.success(res.data)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
