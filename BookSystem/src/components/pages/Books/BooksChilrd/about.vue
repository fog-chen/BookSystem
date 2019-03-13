<template>
  <div class="hello">
    <div class="conter">
      <el-steps direction="vertical" style="height: 300px;width:200px">
        <el-step title="图书馆详情 " :type="adaptertext" :status="histype" @click.native="toBase"></el-step>
        <el-step title="社会教育" :type="adaptertext" :status="edutype" @click.native="toEducation"></el-step>
        <el-step title="读者服务" :type="adaptertext" :status="readtype" @click.native="toreader"></el-step>
      </el-steps>
      <!-- width:300px" -->
      <div class="conter_right mar-r20">
        <keep-alive>
          <!-- 图书馆详情 -->
          <history v-if="curPage=== pageSet.BASE" v-on:nextPage="toEducation"></history>
          <!-- 图书馆详情 -->
        </keep-alive>
        <keep-alive>
          <!-- 社会教育 -->
          <education v-if="curPage=== pageSet.EDU"></education>
          <!-- 社会教育 -->
        </keep-alive>
        <keep-alive>
          <!-- 读者服务 -->
          <reader v-if="curPage=== pageSet.READER"></reader>
          <!-- 读者服务 -->
        </keep-alive>
      </div>

    </div>

  </div>
</template>

<script>
import history from './aboutChild/history'
import education from './aboutChild/education'
import reader from './aboutChild/reader'
export default {
  name: 'about',
  components: {
    history: history,
    education: education,
    reader: reader
  },
  data () {
    return {
      curPage: 'BASE',//默认组件页面
      pageSet: {
        BASE: 'BASE',
        EDU: 'EDU',
        READER: 'READER'
      },
      histype: 'success',
      edutype: '',
      readtype: ''
    }
  },
  methods: {
    toBase: function () {
      this.curPage = this.pageSet.BASE
    },

    toEducation: function () {
      this.curPage = this.pageSet.EDU
    },
    toreader: function () {
      this.curPage = this.pageSet.READER
    }
  },
  computed: {
    adaptertext: function () {
      if (this.curPage === this.pageSet.BASE) {
        this.histype = 'success'
        this.edutype = ''
        this.readtype = ''
      }
      if (this.curPage === this.pageSet.EDU) {
        this.edutype = 'success'
        this.readtype = ''
        this.histype = ''
      }
      if (this.curPage === this.pageSet.READER) {
        this.readtype = 'success'
        this.histype = ''
        this.edutype = ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.conter {
  display: flex;
  justify-content: flex-start;
}
.conter_right {
  width: 100%;
}
</style>
