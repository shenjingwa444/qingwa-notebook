<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">
            <h3 @click="showRegister">创建账户</h3>
            <transition name="slide">
              <div v-bind:class="{show: isShowRegister}" class="register">
                <input type="text" v-model="register.username" placeholder="用户名">
                <input type="password" v-model="register.password" @keyup.enter="onRegister" placeholder="密码">
                <p v-bind:class="{error: register.isError}"> {{ register.notice }}</p>
                <div class="button" @click="onRegister">创建账号</div>
              </div>
            </transition>
            <h3 @click="showLogin">登录</h3>
            <transition name="slide">
              <div v-bind:class="{show: isShowLogin}" class="login">
                <input type="text" v-model="login.username" placeholder="输入用户名">
                <input type="password" v-model="login.password" @keyup.enter="onLogin" placeholder="密码">
                <p v-bind:class="{error: login.isError}"> {{ login.notice }}</p>
                <div class="button" @click="onLogin"> 登录</div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import { mapActions } from "vuex"

export default {
  data() {
    return {
      isShowLogin: true,
      isShowRegister: false,
      login: {
        username: "",
        password: "",
        notice: "输入用户名和密码",
        isError: false
      },
      register: {
        username: "",
        password: "",
        notice: "创建账号后，请记住用户名和密码",
        isError: false
      }
    }
  },
  methods: {
    ...mapActions({
      loginUser: "login",
      registerUser:'register'
    }),
    showLogin() {
      this.isShowLogin = true
      this.isShowRegister = false
    },
    showRegister() {
      this.isShowLogin = false
      this.isShowRegister = true
    },
    onRegister() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)) {
        this.register.isError = true
        this.register.notice = "用户名3~15个字符，仅限于字母数字下划线中文"
        return
      }
      if (!/^.{6,16}$/.test(this.register.password)) {
        this.register.isError = true
        this.register.notice = "密码长度为6~16个字符"
        return
      }

      this.registerUser({
        username: this.register.username,
        password: this.register.password
      }).then(() => {
        this.register.isError = false
        this.register.notice = ""
        this.$router.push({path: "notebooks"})
      }).catch(err => {
        this.register.isError = true
        this.register.notice = err.msg
      })
    },
    onLogin() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)) {
        this.login.isError = true
        this.login.notice = "用户名3~15个字符，仅限于字母数字下划线中文"
        return
      }
      if (!/^.{6,16}$/.test(this.login.password)) {
        this.login.isError = true
        this.login.notice = "密码长度为6~16个字符"
        return
      }
      this.loginUser({
        username: this.login.username,
        password: this.login.password
      }).then(() => {
        this.login.isError = false
        this.login.notice = ""
        this.$router.push({path:"/notebooks"})
      }).catch(data => {
        this.login.isError = true
        this.login.notice = data.msg
      })
    }
  }
}
</script>


<style lang="less" scoped>
@import url(../assets/css/login);
</style>
