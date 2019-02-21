<template>
  <div class="hello">
    <div class="content">
      <!-- 登陆 start -->
      <div class="login" v-show="showLogin">
        <div>登陆</div>
        <p v-show="showTishi">{{tishi}}</p>
        <el-form class="login-form" :model="user" :rules="rules" status-icon ref="loginForm">
          <el-form-item prop="name">
            <el-input placeholder="请输入用户名" v-model="user.name" clearable value="chen">
              <i slot="prefix" class="icon iconfont icon-yonghu"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input placeholder="请输入密码" type="password" v-model="user.pwd" @keyup.enter.native="login" clearable>
              <i slot="prefix" class="icon iconfont icon-mima"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="login">登陆</el-button>
        <p>没有账号，去
          <span class="reg" @click="ToRegister">注册</span>
        </p>
      </div>
      <!-- 登陆 end -->

      <!-- 注册 start-->
      <!-- <div class="register" v-show="showRegister">
        <div>注册</div>
        <el-form class="login-form" :model="user" :rules="rules" status-icon ref="loginForm">
          <el-form-item prop="name">
            <el-input placeholder="请输入用户名" v-model="newUserName" clearable>
              <i slot="prefix" class="icon iconfont icon-yonghu"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input placeholder="请输入密码" type="password" v-model="newUserPwd" @keyup.enter.native="login" clearable>
              <i slot="prefix" class="icon iconfont icon-mima"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="register">注册</el-button>
        <p>已有账号，去
          <span class="reg" @click="ToLogin">登陆</span>
        </p>
      </div> -->
      <!-- end -->
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie } from '../common/cookie'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      // user: {},
      user: {
        name: 'chen',
        pwd: '123'      },
      // 表单验证
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      },
      showLogin: true,
      showRegister: false,
      showTishi: false,
      tishi: ''
    }
  },
  mounted () {
    // 页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需要登录
    if (getCookie('name')) {
      this.$router.push('/bookIndex')
    }

  },
  methods: {
    login: function () {
      //
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // if (this.user.name === 'chen' && this.user.pwd === '123') {
          //   this.$notify({
          //     type: 'success',
          //     message: '欢迎你,' + this.user.name + '!',
          //     duration: 3000
          //   })
          //   this.$router.push('/bookIndex')

          // } else {
          //   this.$message({
          //     type: 'erro',
          //     message: '密码或账号错误',
          //     showClose: true
          //   })
          //   // console.log('dddd')
          // }
          let newData = { 'name': this.user.name, 'pwd': this.user.pwd }
          // 接口请求
          axios.post('https://www.easy-mock.com/mock/5c28d4432140e71d51972e3a/books/user', newData)
            .then(response => {
              console.log(response)
              if (newData.name !== response.data.data[0].name) {
                console.log(response.data.data[0].name)
                this.tishi = '该用户不存在'
                this.showTishi = true
              } else if (newData.pwd !== response.data.data[0].pwd) {
                console.log(newData.pwd)
                this.tishi = '密码输入错误'
                this.showTishi = true
              } else {
                // console.log(name + ':' + pwd)
                setCookie('name', this.user.name, 1000 * 6)
                setTimeout(function () {
                  this.$router.push('/bookIndex')
                }.bind(this), 1000);
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
        else {
          return false
        }
      })
    },
    ToRegister: function () {
      // this.showLogin = false,
      //   this.showRegister = true
      alert('注册成功')
    }
    // register: function () {
    //   alert('注册成功')
    // },
    // ToLogin: function () {
    //   this.showLogin = true
    //   this.showRegister = false
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* div {
  margin: 0;
  padding: 0;
} */
.reg {
  color: #f56c6c;
  cursor: pointer;
}
.hello {
  width: 100%;
}
.content {
  margin: 0 auto;
  /* box-sizing: content-box; */
  margin-top: 100px;
  padding-top: 10px;
  width: 400px;
  height: 250px;
  text-align: center;
  box-shadow: 0px 0px 12px#CBCBCB;
  border-radius: 4px;
  /* background: #f56c6c; */
}
.login-form {
  /* margin: 0 auto; */
  margin: 10px;
  /* box-sizing: content-box; */
  box-sizing: border-box;
}
</style>
