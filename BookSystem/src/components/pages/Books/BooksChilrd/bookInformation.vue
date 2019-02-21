<template>
  <div class="hello">
    <div class="without" v-show="isShow">
      <p>不好意思，可能是网不好</p>
    </div v-show="!isShow">
    <div>
      <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" border>
        <el-table-column prop="bookNum" label="编号" sortable>
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.bookNum}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="bookName" label="书名" sortable>
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.bookName}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="bookAutor" label="作者" sortable>
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.bookAutor}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="入库时间" sortable>
          <template slot-scope="scope">
            <div>
              <p>
                {{stampToDate(scope.row.date)}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="bookNumber" label="数量" sortable>
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.bookNumber}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="borrow" label="借阅数量" sortable>
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.borrow}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="noBorrow" label="未归还数量" sortable>
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.noBorrow}}
                <!-- {{scope.row.date}} -->
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="classification" label="分类" sortable>
          <template slot-scope="scope ">
            <div>
              <p>
                {{scope.row.classification}}
                <!-- {{scope.row.date}} -->
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <div>
              <p>
                <!-- <el-button>查看</el-button>
                <el-button>还书</el-button> -->
                <span class="check">修改</span>
                <span class="return" @click="deleteRow(scope.row)">删除</span>
              </p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { stampToDate } from '../../../common/date';
// import { test } from '../../../common/date';
import { Bookinformation } from '../../../api/bookinformation/bookinformation'
import axios from 'axios';
export default {
  name: 'bookInformation',
  data () {
    return {
      tableData: [],
      stampToDate: stampToDate,
      isShow: false
    }
  },
  methods: {
    init: function () {
      this.getBookInformation()
    },
    getParams: function () {
      const bookNum = this.tableData.bookNum
      const bookName = this.tableData.bookName
      const bookAutor = this.tableData.bookAutor
      const data = this.tableData.data
      const bookNumber = this.tableData.bookNumber
      const borrow = this.tableData.borrow
      const noBorrow = this.tableData.noBorrow
      const classification = this.tableData.classification
      let req = {
        bookNum,
        bookName,
        bookAutor,
        data,
        bookNumber,
        borrow,
        noBorrow,
        classification
      }
      return req
    },
    getBookInformation () {
      let req = this.getParams()
      Bookinformation(req, (res) => {
        if (res.data && res.data.length) {
          this.tableData = JSON.parse(localStorage.getItem('bookInfor')) || res.data,
            this.isShow = false
        } else {
          this.tableData = [],
            this.isShow = true
        }

      }, (err) => {
        this.logShow('获取图书信息失败', err, 'ERROR')
      })
    },

    //移除一行  删除
    deleteRow (val) {
      this.$confirm('一旦删除就无法找回！', '确定删除此条图书信息？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData = this.tableData.filter(item => item !== val)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },

  },
  watch: {
    tableData: {
      handler () {
        localStorage.setItem('bookInfor', JSON.stringify(this.tableData))
      }, deep: true

    },
    //  bookList: {
    //   handler () {
    //     localStorage.setItem('data', JSON.stringify(this.bookList))
    //   }, deep: true
    // }
  },
  mounted () {
    this.init()
  }
  // created: function () {
  //   axios.get('https://www.easy-mock.com/mock/5c28d4432140e71d51972e3a/books/bookinformation')
  //     .then(reponse => {
  //       this.tableData = reponse.data.data
  //       // console.log(reponse.data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })

  // }
  // methods: {
  // test1: function () {
  //   console.log(stampToDate(1546584194))
  // }
  // }
}
</script>

<style scoped>
.hello {
  margin: 0 15px;
}
.check,
.return {
  color: #409eff;
  cursor: pointer;
}
</style>
