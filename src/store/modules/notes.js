import Notes from "../../apis/notes"
import {Message} from 'element-ui'
const state = {
  notes: null,
  currentNoteId: null,
}

const getters = {
  notes: state => state.notes || [],
  currentNote: state => {
    if(!Array.isArray(state.notes)) return {}
    if(!state.currentNoteId) return state.notes[0] || {}
    return state.notes.find(note => note.id == state.currentNoteId) || {}
  }
}

const mutations = {
  setCurrentNote(state,payload){
    state.currentNoteId = payload.currentNoteId
  },

  setNotes(state, payload) {
    state.notes = payload.notes || []
  },

  addNote(state, payload) {
    state.notes.unshift(payload.note)
  },

  deleteNote(state, payload) {
    state.notes = state.notes.filter(note => note.id != payload.noteId)
  },

  updateNote(state, payload) {
    let note = state.notes.find(note => note.id == payload.noteId) || {}
    note.title = payload.title
    note.content = payload.content
  }
}

const actions = {
  getNotes({commit}, {notebookId}) {
    return Notes.getAll({notebookId})
      .then(res => {
        commit("setNotes", {notes: res.data})
      })
  },

  addNote({commit},{notebookId,title,content}){
    return Notes.addNote({notebookId},{title,content})
      .then(res=>{
        commit('addNote',{note:res.data})
      })
  },

  deleteNote({commit},{noteId}){
    return Notes.deleteNote({noteId})
      .then(res=>{
        commit('deleteNote',{noteId})
        Message.success(res.msg)
      })
  },

  updateNote({commit},{noteId,title,content}){
    return Notes.updateNote({noteId},{title,commit})
      .then(res=>{
        commit('updateNote',{noteId,title,content})
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
