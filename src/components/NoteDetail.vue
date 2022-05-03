<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">
        请选择笔记
      </div>
      <div class="note-detail-calc" v-show="currentNote.id">
        <div class="note-bar">
          <span>创建日期：{{ currentNote.createdAtFriendly }}</span>
          <span>更新日期:{{ currentNote.updatedAtFriendly }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-shanchu" @click="deleteNote"></span>
          <el-tooltip class="item" effect="dark" content="预览" placement="bottom">
            <span v-show="!isShowPreview" class="iconfont icon-editor1" @click="isShowPreview=!isShowPreview"></span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <span v-show="isShowPreview" class="iconfont icon-041preview" @click="isShowPreview=!isShowPreview"></span>
          </el-tooltip>
          <div class="note-title">
            <input type="text" placeholder="输入标题" v-model:value="currentNote.title" @input="updateNote"
                   @keydown="statusText='输入中'">
          </div>
          <div class="editor">
            <textarea v-show="!isShowPreview" v-model:value="currentNote.content" placeholder="输入内容，支持 markdown 格式"
                      @input="updateNote" @keydown="statusText='输入中'"></textarea>
            <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../apis/auth"
import NoteSidebar from "./NoteSidebar"
import Bus from "../helpers/bus"
import Notes from "../apis/notes"
import _ from "lodash"
import MarkdownIt from "markdown-it"

let md = MarkdownIt()
console.log(md)
export default {
  data() {
    return {
      currentNote: {},
      notes: [],
      statusText: "笔记未改动",
      isShowPreview: false
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
        this.currentNote = val.find(note => note.id == this.$route.query.noteId) || this.notes[0] || {}
      })
  },
  computed: {
    previewContent() {
      return md.render(this.currentNote.content || "")
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.currentNote = this.notes.find(note => note.id == to.query.noteId) || {}
    next()
  },
  methods: {
    updateNote: _.debounce(function () {
      Notes.updateNote({noteId: this.currentNote.id}, {
        title: this.currentNote.title,
        content: this.currentNote.content
      })
        .then(res => {
          this.statusText = "已保存"
        }).catch(err =>
        this.statusText = "保存错误"
      )
    }, 300),
    deleteNote() {
      Notes.deleteNote({noteId: this.currentNote.id})
        .then(data => {
          this.$message.success(data.msg)
          this.notes.splice(this.notes.indexOf(this.currentNote), 1)
          this.$router.replace({path: "/note"})
        })
    }
  }
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
