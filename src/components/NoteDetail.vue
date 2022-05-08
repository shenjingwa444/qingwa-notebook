<template>
  <div id="note" class="detail">
    <note-sidebar></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">
        请选择笔记
      </div>
      <div class="note-detail-calc" v-show="currentNote.id">
        <div class="note-bar">
          <span>创建日期：{{ currentNote.createdAtFriendly }}</span>
          <span>更新日期:{{ currentNote.updatedAtFriendly }}</span>
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
import NoteSidebar from "./NoteSidebar"
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
    this.checkLogin({path:'./login'})
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
      'checkLogin'
    ]),

    onUpdateNote: _.debounce(function() {
      this.updateNote({ noteId: this.currentNote.id, title: this.currentNote.title, content: this.currentNote.content })
        .then(() => {
          this.statusText = '已保存'
        }).catch(() => {
        this.statusText = '保存出错'
      })
    }, 300),

    onDeleteNote() {
      this.deleteNote({noteId:this.currentNote.id})
        .then(() => {
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
