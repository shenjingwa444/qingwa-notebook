<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>
    <div class="note-detail" >
      <div class="note-empty" v-show="!currentNote.id">
        请选择笔记
      </div>
      <div v-show="currentNote.id">
        <div class="note-bar">
          <span>创建日期：{{ currentNote.createdAtFriendly }}</span>
          <span>更新日期:{{ currentNote.updatedAtFriendly }}</span>
          <span>{{ currentNote.statusText }}</span>
          <span class="iconfont icon-shanchu"></span>
          <span class="iconfont icon-138-enlarge"></span>
        </div>
        <div class="note-title">
          <input type="text" placeholder="输入标题" v-model:value="currentNote.title">
        </div>
        <div class="editor">
          <textarea :value="currentNote.content" placeholder="输入内容，支持 markdown 格式"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../apis/auth"
import NoteSidebar from "./NoteSidebar"
import Bus from "../helpers/bus"

export default {
  data() {
    return {
      currentNote: {},
      notes: []
    }
  },
  components: {
    NoteSidebar
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: "/login"})
        }
      })
      ,
      Bus.$once("update:notes", val => {
        this.currentNote = val.find(note => note.id==this.$route.query.noteId) || {}
      })
  },
  beforeRouteUpdate(to, from, next) {
    this.currentNote = this.notes.find(note => note.id == to.query.noteId) ||{}
    next()
  },
}
</script>

<style scoped lang="less">
@import url(../assets/css/note-detail);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
