<template>
  <div id="note" class="detail">
    <note-sidebar></note-sidebar>
    <div class="note-detail">
      <div class="note-bar">
        <span>创建日期：{{currentNote.createdAtFriendly}}</span>
        <span>更新日期:{{currentNote.updatedAtFriendly}}</span>
        <span>{{currentNote.statusText}}</span>
        <span class="iconfont icon-shanchu"></span>
        <span class="iconfont icon-138-enlarge"></span>
      </div>
      <div class="note-title">
        <input type="text" placeholder="输入标题" :value="currentNote.title">
      </div>
      <div class="editor">
        <textarea :value="currentNote.content" placeholder="输入内容，支持 markdown 格式"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../apis/auth"
import NoteSidebar from "./NoteSidebar"

export default {
  data() {
    return {
      currentNote:{
        title:'我的笔记',
        content:'',
        createdAtFriendly:'1天前',
        updatedAtFriendly:'刚刚',
        statusText:'未更新'
      }
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
  }
}
</script>

<style scoped lang="less">
@import url(../assets/css/note-detail);
#note{
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex:1;
}
</style>
