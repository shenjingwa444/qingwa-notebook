<template>
  <div id="notebook-list">
    <header>
      <a href="#" class="btn" @click="onCreate">
        <i class="iconfont icon-note"></i>
        新建笔记本
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表</h3>
        <div  class="book-list">
          <a href="#" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>笔记本标题1<span>3</span>
              <span class="action" @click="onEdit">编辑</span>
              <span class="action" @click="onDelete">删除</span>
              <span class="date">3天前</span>
            </div>
          </a>
          <a href="#" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>笔记本标题2
              <span>55</span>
              <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">5天前</span>
            </div>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from "../apis/auth"
import Notebooks from '../apis/notebook'

export default {
  data() {
    return {
      msg: "笔记本列表"
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: "/login"})
        }
      })
  },
  methods:{
    onCreate(){
      console.log("create..")
    },
    onEdit(){
      console.log("edited..")
    },
    onDelete(){
      console.log("delete..")
    }
  }
}
</script>

<style scoped lang="less">
#notebook-list {
  flex: 1;

  header {
    padding: 12px;
    border-bottom: 1px solid #ccc;

    .btn {
      font-size: 12px;
      color: #666;
      margin-left: 10px;

      .iconfont {
        font-size: 12px;
      }
    }
  }
  main{
    padding:30px 40px;
    .layout{
      margin:0 auto;
      max-width:966px;
      h3{
        font-size:12px;
        color:#000;
      }
      .book-list{
        margin-top:10px;
        margin-left:auto;
        margin-right:auto;
        font-size:14px;
        background-color: #fff;
        border-radius:4px;
        font-weight:bold;
        line-height: 50px;
        span{
          font-size:12px;
          font-weight:bold;
          color:#b3c0c8;
        }
        .notebook{
          display:block;
          cursor:pointer;
          height: 50px;
          border: 1px solid #ccc;
          border-radius: 3px;
          padding-left:5px;
          padding-right:5px;
          outline: none;
          .action,.date{
            float:right;
          }
          span{
            margin-left:5px;
            margin-right:5px;
          }
          .iconfont{
            color:#1687ea;
            margin-right:10px;
          }
          :hover{
            background-color: #f7fafd;
          }
        }
      }
    }
    .error-msg{
      font-size:12px;
      color:red;
    }
  }
}
</style>
