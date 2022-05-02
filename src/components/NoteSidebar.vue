<template>
  <div class="note-sidebar">
    <el-dropdown class="notebook-title" @command="handleCommand">
          <span class="el-dropdown-link">
            我的笔记本{{ $route.query.noteId }}
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
        <router-link to=" `/note?noteId=${note.id}&notebookId=${curBook.id}` ">
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

export default {
  created() {
    Notebooks.getAll()
      .then(res => {
        this.notebooks = res.data
      })
  },
  data() {
    return {
      notebooks: [],
      notes: [],
      curBook: []
    }
  },
  methods: {
    handleCommand(notebookId) {
      console.log(notebookId)
      if (notebookId !== "trash") {
        Notes.getAll({notebookId})
          .then(res => {
            this.notes = res.data
          })
      }
    },
    addNote() {
      console.log("1")
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar);
</style>

