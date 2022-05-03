<template>
  <div class="note-sidebar">
    <el-dropdown class="notebook-title" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ currentBook.title }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :key="notebook.id" :command="notebook.id">{{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span class="btn add-note" @click="addNote">添加笔记</span>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${currentBook.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Notebooks from "../apis/notebook"
import Notes from "../apis/notes"
import Bus from '../helpers/bus'
export default {
  created() {
    Notebooks.getAll()
      .then(res => {
        this.notebooks = res.data
        //this.notebooks 里面的 notebook.id 是 number ，this.$route.query.notebookId 是 string ，不能用 ===
        this.currentBook = this.notebooks.find(notebook => notebook.id == this.$route.query.notebookId) || this.notebooks[0] || {}
        return Notes.getAll({notebookId: this.currentBook.id})
      }).then(res => {
      this.notes = res.data
      this.$emit("update:notes", this.notes)
      Bus.$emit('update:notes',this.notes)
    })
  },
  data() {
    return {
      notebooks: [],
      notes: [],
      currentBook: []
    }
  },
  methods: {
    handleCommand(notebookId) {
      if (notebookId === "trash") {
        return this.$router.push({path: "/trash"})
      }
      this.currentBook = this.notebooks.find(notebook => notebook.id === notebookId)
      Notes.getAll({notebookId})
        .then(res => {
          this.notes = res.data
          this.$emit('update:notes',this.notes)
        })
    },
    addNote() {
      Notes.addNote({notebookId:this.currentBook.id})
        .then(res=>{
          this.notes.unshift(res.data)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar);
</style>

