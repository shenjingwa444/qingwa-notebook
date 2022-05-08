<template>
  <div id="note" class="detail">
    <div class="note-sidebar">
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ note.updatedAtFriendly }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
        <div class="note-bar" v-if="true">
          <span>创建日期：{{ currentTrashNote.createdAtFriendly }}</span>
          <span> | </span>
          <span>更新日期:{{ currentTrashNote.updatedAtFriendly }}</span>
          <span> | </span>
          <span> 所属笔记本：{{belongTo}}</span>
          <a class="btn action" @click="onRevert">恢复</a>
          <a class="btn action" @click="onDelete">彻底删除</a>
          <div class="note-title">
            <span>{{currentTrashNote.title}}</span>
          </div>
          <div class="editor">
            <div class="preview markdown-body" v-html="compiledMarkdown"></div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions, mapMutations} from "vuex"
import MarkdownIt from "markdown-it"
let md = MarkdownIt()

export default {
  data() {
    return {
      belongTo:'11',
    }
  },
  created() {
    this.getTrashNotes()
      .then(() => {
        this.setCurrentTrashNote({ curTrashNoteId: this.$route.query.noteId })
      })
  },
  computed: {
    ...mapGetters([
      'trashNotes',
      'currentTrashNote'
    ]),
    compiledMarkdown() {
      return md.render(this.currentTrashNote.content || "")
    },
  },
  methods: {
    ...mapActions([
      'getTrashNotes',
      'deleteTrashNote',
      'revertTrashNote'
    ]),
    ...mapMutations([
      'setCurrentTrashNote'
    ]),
    onRevert(){
      this.revertTrashNote({noteId:this.$route.query.noteId})
    },
    onDelete(){
      this.deleteTrashNote({noteId:this.$route.query.noteId})
    },
  },
  beforeRouteUpdate(to,from,next){
    this.setCurrentTrashNote({currentTrashNoteId:to.query.noteId})
    next()
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/trash-detail);

</style>
