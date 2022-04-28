<template>
  <div id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate">
        <i class="iconfont icon-note"></i>
        新建笔记本
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link class="notebook" v-for="notebook in notebooks" :key="notebook.id" :to="`note?notebookId=${notebook.id}`">
            <div>
              <span class="iconfont icon-notebook"></span>
              {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from "../apis/auth"
import Notebooks from "../apis/notebook"
import {friendlyDate} from "../helpers/util"

export default {
  data() {
    return {
      notebooks: []
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: "/login"})
        }
        Notebooks.getAll()
          .then(res => {
            this.notebooks = res.data
          })
      })
  },
  methods: {
    onCreate() {
      this.$prompt('请输入新笔记本标题', '创建笔记名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({value}) => {
        return Notebooks.addNotebook({title: value})
      }).then((res) => {
        res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
        this.notebooks.unshift(res.data)
        this.$message({
          type: 'success',
          message: res.msg
        });
      })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('请输入新笔记标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue:notebook.title,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({value})=>{
        title = value
        return Notebooks.updateNotebook(notebook.id,{title})
      }).then((res) => {
        console.log(title)
        notebook.title = title
        this.$message.success(res.msg);
      })
    },
    onDelete(notebook) {
      this.$confirm('确认要删除笔记本吗?', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=> {
        return Notebooks.deleteNotebook(notebook.id)
      }).then((res) => {
        this.notebooks.splice(this.notebooks.indexOf(notebook),1)
        this.$message.success(res.msg);
      })
    },
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

  main {
    padding: 30px 40px;

    .layout {
      margin: 0 auto;
      max-width: 966px;

      h3 {
        font-size: 12px;
        color: #000;
      }

      .book-list {
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        font-size: 14px;
        background-color: #fff;
        border-radius: 4px;
        font-weight: bold;
        line-height: 50px;

        span {
          font-size: 12px;
          font-weight: bold;
          color: #b3c0c8;
        }

        .notebook {
          display: block;
          cursor: pointer;
          height: 50px;
          border: 1px solid #ccc;
          border-radius: 3px;
          padding-left: 5px;
          padding-right: 5px;
          outline: none;

          .action, .date {
            float: right;
          }

          span {
            margin-left: 5px;
            margin-right: 5px;
          }

          .iconfont {
            color: #1687ea;
            margin-right: 10px;
          }

          :hover {
            background-color: #f7fafd;
          }
        }
      }
    }

    .error-msg {
      font-size: 12px;
      color: red;
    }
  }
}
</style>
