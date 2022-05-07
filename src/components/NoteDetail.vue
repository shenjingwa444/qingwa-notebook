<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">
        请选择笔记
      </div>
      <div class="note-detail-calc" v-show="currentNote.id">
        <div class="note-bar">
          <span>创建日期：{{ currentNote.friendlyCreatedAt }}</span>
          <span>更新日期:{{ currentNote.friendlyUpdatedAt }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-shanchu" @click="onDeleteNote"></span>
          <el-tooltip class="item" effect="dark" content="预览" placement="bottom">
            <span v-show="!isShowPreview" class="iconfont icon-editor1" @click="isShowPreview=!isShowPreview"></span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <span v-show="isShowPreview" class="iconfont icon-041preview" @click="isShowPreview=!isShowPreview"></span>
          </el-tooltip>
          <div class="note-title">
            <input type="text" placeholder="输入标题" v-model:value="currentNote.title" @input="onUpdateNote"
                   @keydown="statusText='输入中'">
          </div>
          <div class="editor">
            <textarea v-show="!isShowPreview" v-model:value="currentNote.content" placeholder="输入内容，支持 markdown 格式"
                      @input="onUpdateNote" @keydown="statusText='输入中'"></textarea>
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
import {mapGetters,mapActions,mapMutations} from 'vuex'

let md = MarkdownIt()
export default {
  data() {
    return {
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
  },
  computed: {
    ...mapGetters([
      'notes',
      'currentNote'
    ]),
    previewContent() {
      return md.render(this.currentNote.content || "")
    },
  },
  methods: {
    ...mapMutations([
      'setCurrentNote'
    ]),
    ...mapActions([
      'deleteNote',
      'updateNote',
    ]),
    onUpdateNote: _.debounce(function () {
      this.updateNote({noteId:this.currentNote.id,title:this.currentNote.title,content:this.currentNote.content})
        .then(res => {
          this.statusText = "已保存"
        }).catch(err =>{
          console.log(err)
          this.statusText = "保存错误"
      }
      )
    }, 300),
    onDeleteNote() {
      this.deleteNote({noteId:this.currentNote.id})
      Notes.deleteNote({noteId: this.currentNote.id})
        .then(data => {
          this.$router.replace({path: "/note"})
        })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurrentNote({currentNoteId:to.query.noteId})
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
