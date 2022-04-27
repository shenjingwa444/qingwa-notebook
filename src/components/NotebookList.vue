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
          <router-link class="notebook" v-for="notebook in notebooks" :key="notebook.id" to="/note/1">
            <div>
              <span class="iconfont icon-notebook"></span>
              {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{notebook.createdAt}}</span>
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
      let title = window.prompt("创建笔记本")
      if (title.trim() === "") {
        alert("笔记本名不能为空")
        return
      }
      Notebooks.addNotebook({title})
        .then(res => {
          alert(res.msg)
          this.notebooks.unshift(res.data)
        })
    },
    onEdit(notebook) {
      let title = window.prompt("修改标题", notebook.title)
      Notebooks.updateNotebook(notebook.id, {title})
        .then(res => {
          notebook.title = title
          alert(res.msg)
        })
    },
    onDelete(notebook) {
      let isConfirm = window.confirm("你确定要删除吗？")
      if (isConfirm) {
        Notebooks.deleteNotebook(notebook.id)
          .then(res => {
            this.notebooks.splice(this.notebooks.indexOf(notebook.id),1)
            alert(res.msg)
          })
      }
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
