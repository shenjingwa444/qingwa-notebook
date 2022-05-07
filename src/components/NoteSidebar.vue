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
import {mapGetters,mapActions,mapMutations} from 'vuex'

export default {
  created() {
    this.getNotebooks()
      .then(()=>{
        this.setCurrenBook({currentBookId:this.$route.query.notebookId})
        return this.getNotes({notebookId:this.currentBook.id})
      }).then(() => {
        this.setCurrentNote({currentNoteId:this.$route.query.noteId})
    })
  },
  data() {
    return {}
  },
  computed:{
    ...mapGetters([
      'notes',
      'notebooks',
      'currentBook',
    ])
  },
  methods: {
    ...mapActions([
      'getNotebooks',
      "getNotes",
      'addNote'
    ]),
    ...mapMutations([
      'setCurrenBook',
      'setCurrentNote'
    ]),
    handleCommand(notebookId) {
      if (notebookId === "trash") {
        return this.$router.push({path: "/trash"})
      }
      this.$store.commit('setCurrenBook',{currentBookId:notebookId})
      this.getNotes({notebookId})
    },
    addNote() {
      this.addNote({notebookId:this.currentBook.id})
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar);
</style>

