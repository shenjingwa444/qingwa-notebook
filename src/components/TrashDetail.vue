<template>
  <div id="note" class="detail">
    <div class="note-sidebar">
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id">
          <router-link :to="`/note?noteId=${note.id}`">
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
import Trash from '../apis/trash'
window.trash = Trash

export default {
  data() {
    return {
      currentTrashNote:{
        id:1,
        title:'是我的笔记',
        content:'##hi',
        createdAtFriendly:'1天前',
        updatedAtFriendly:'2小时前'
      },
      belongTo:'11',
      trashNotes:[
        {
          id:1,
          title:'笔记',
          content:'##hi',
          createdAtFriendly:'1天前',
          updatedAtFriendly:'2小时前'
        },

        {
          id:2,
          title:'笔记',
          content:'##hi',
          createdAtFriendly:'1天前',
          updatedAtFriendly:'2小时前'
        }
      ]
    }
  },
  created() {
    this.getNotes({notebookId:6116})
  },
  computed: {
    ...mapGetters([
      "notes",
      "notebooks",
      "currentBook",
      "currentNote"
    ]),
    compiledMarkdown() {
      return md.render(this.currentNote.content || "")
    },
  },
  methods: {
    ...mapActions([
      "getNotebooks",
      "getNotes",
      "addNote",
      "deleteNote",
      "updateNote",
      "checkLogin"
    ]),
    ...mapMutations([
      "setCurrenBook",
      "setCurrentNote"
    ]),
    onRevert(){
      console.log("revert")
    },
    onDelete(){
      console.log("delete")
    },
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/trash-detail);

</style>
