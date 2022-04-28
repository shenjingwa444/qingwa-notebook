<template>
  <div id="note-detail">
    <h1>{{msg}} : {{ $route.query.notebookId }}</h1>
    <h1>笔记本 : {{ $route.query.noteId }}</h1>
  </div>
</template>

<script>
import Auth from '../apis/auth'
export default {
  data () {
    return {
      msg: '笔记详情页'
    }
  },
  created(){
    Auth.getInfo()
      .then(res=>{
        if(!res.isLogin){
          this.$router.push({path:'/login'})
        }
      })
  }
}
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
