<template>
  <div class="books">
    <div class="topNav">
      <div class="title">喜马拉雅图书租赁系统</div>
      <div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎您，
            <span class="admin">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personalInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>

        </el-dropdown>
      </div>
    </div>
    <div class="leftNav-content">
      <!-- 侧边 -->
      <div class="leftnav">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <div class="collapse" v-model="isCollapse">
          <span @click="open" v-if="isCollapse" class="state">》</span>
          <span @click="shrink" v-if="!isCollapse" class="state">《</span>
        </div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @select="handleSelect" :collapse="isCollapse" active-text-color="#ffd04b" :default-active="defaultUrl">
          <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <span slot="title">图书首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">图书信息</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">借阅信息</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">用户信息</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-location"></i>
            <span slot="title">关于图书</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :key="item" v-for="item in breadcrumbItems">首页/{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="margin-top:10px">
          <router-view></router-view>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie, delCookie } from '../../common/cookie'
export default {
  name: 'books',
  data () {
    return {
      isCollapse: true,
      breadcrumbItems: ['图书首页'],
      name: '',
      defaultUrl: '1'
    }
  },
  mounted () {
    let newname = getCookie('name')
    this.name = newname

    if (newname == '') {
      this.$router.push('/')
    }
  },
  methods: {

    // handleCommand (logout) {
    //   // this.$router.push('/')
    //   // console.log("this is a test");
    //   delCookie('name')
    //   this.$router.push('/')
    // },
    // handleCommand (PersonalInfo) {
    //   // this.$router.push('/')
    //   // console.log("this is a test");
    //   alert('个人信息')
    // },
    handleCommand (command) {
      if (command === 'personalInfo') {
        alert('个人信息')
      }
      if (command === 'logout') {
        delCookie('name')
        this.$router.push('/')
      }
    },
    handleSelect (key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push('/bookIndex');
          this.breadcrumbItems = ['图书首页']
          console.log(this.$router.push)
          break;
        case '2':
          this.$router.push('/bookInformation');
          this.breadcrumbItems = ['图书信息']
          console.log(this.$router.push)
          break;
        case '3':
          this.$router.push('/borrowinfo');
          this.breadcrumbItems = ['借阅信息']
          console.log(this.$router.push)
          break;
        case '4':
          this.$router.push('/userInformation');
          this.breadcrumbItems = ['用户信息']
          console.log(this.$router.push)
          break;
        case '5':
          this.$router.push('/about');
          this.breadcrumbItems = ['关于图书']
          console.log(this.$router.push)
          break;
      }
    },
    shrink: function () {
      this.isCollapse = true
    },
    open: function () {
      this.isCollapse = false
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.books {
  width: 100%;
  // height: 100%;
  // position: fixed;
  min-height: 100%;
  background: rgba(244, 244, 243, 0.4);
}
.topNav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  // background: #bababa;
  background: -webkit-gradient(linear, 0 0, 100% 100%, from(#ace), to(#f96));
  /* justify-content: space-around; */
}
// .leftNav-content {
//   width: 100%;
//   // height: 100%;

// }
.admin {
  color: azure;
}
.el-dropdown-link {
  cursor: pointer;
}
.leftNav-content {
  // height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
// .el-menu--collapse {
//   width: 100%;
// }
// .el-row {
//   height: 100%;
// }
// cc {
//   width: 10%;
// }
.leftnav {
  // height: 100%;
  background: #fff;
  position: relative;
  bottom: 0;
  left: 0;
  margin-right: 10px;
  // width: @cc;
  // float: left;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.state {
  display: inline-block;
  color: rgb(152, 212, 200);
}
.collapse,
.state {
  width: 20px;
  height: 40px;
  border-radius: 0 50% 50% 0;
  // border-radius: 50%;
  background: #0a8;
  // border: 1px solid #0a8;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
}
.collapse {
  position: absolute;
  // top: 45%;
  top: 200px;
  right: -20px;
  // left: 100px;
  z-index: 899;
}
.content {
  // height: auto !important;
  width: 100%;
  margin: 10px 0 0 20px;
  .admin;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px 0 20px 10px;
  // overflow: hidden;
}
.title:hover {
  color: #615f5f;
}
</style>
