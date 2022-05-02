<template>
  <div id="note" class="detail">
    <NoteSidebar/>
    <div id="note-detail">
      <h1>{{ msg }} : {{ $route.query.notebookId }}</h1>
      <h1>笔记本 : {{ $route.query.noteId }}</h1>
    </div>
  </div>
</template>

<script>
import Auth from "../apis/auth"
import NoteSidebar from "./NoteSidebar"

export default {
  data() {
    return {
      msg: "笔记详情页"
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
#note{
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex:1;
}
</style>
