<template>
  <div class="note-sidebar">
    <el-dropdown v-if="currentBook.id" class="notebook-title" @command="handleCommand" placement="bottom">
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
    <span v-if="currentBook.id" class="btn add-note" @click="onAddNote">添加笔记</span>
    <span v-if="!currentBook.id" class="notebook-title">无笔记本</span>
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
        this.setCurrentBook({currentBookId:this.$route.query.notebookId})
        if(this.currentBook.id) return this.getNotes({notebookId:this.currentBook.id})
      }).then(() => {
        this.setCurrentNote({currentNoteId:this.$route.query.noteId})
        this.$router.replace({
          path:'/note',
          query:{
            noteId:this.currentNote.id,
            notebookId:this.currentBook.id
          }
        })
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
      'currentNote'
    ])
  },
  methods: {
    ...mapActions([
      'getNotebooks',
      "getNotes",
      'addNote'
    ]),
    ...mapMutations([
      'setCurrentBook',
      'setCurrentNote'
    ]),
    handleCommand(notebookId) {
      if (notebookId === "trash") {
        return this.$router.push({path: "/trash"})
      }
      this.setCurrentBook({currentBookId:notebookId})
      this.getNotes({notebookId})
        .then(()=>{
          this.setCurrentNote()
          this.$router.replace({
            path: "/note",
            query: {
              noteId: this.currentNote.id,
              notebookId: this.currentBook.id
            }
          })
        })
    },
    onAddNote() {
      this.addNote({notebookId:this.currentBook.id})
        .then(()=>{
          this.setCurrentNote()
          this.$router.replace({
            path:'/note',
            query:{
              noteId:this.currentNote.id,
              notebookId:this.currentBook.id
            }
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-sidebar);
</style>

