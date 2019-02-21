<template>
  <div class="hello">
    <!-- <div>
      <el-button type="primary">主要按钮</el-button>
    </div> -->
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
        <el-table-column prop="Borrower" label="借阅人" sortable>
          <template slot-scope="scope">
            <div>
              <p>
                <!-- {{stampToDate(scope.row.date)}} -->
                {{scope.row.Borrower}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="borrowDate" label="借书时间" sortable>
          <template slot-scope="scope">
            <div>
              <p>
                {{stampToDate(scope.row.borrowDate)}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="returnDate" label="还书时间" sortable>
          <template slot-scope="scope">
            <div>
              <p>
                {{stampToDate(scope.row.returnDate)}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="classification" label="分类" sortable>
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.classification}}
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
                <span class="check">查看</span>
                <span class="return" v-if="scope.row.returnDate!==''?false:true" @click="returnBook(scope.row)">还书</span>
                <span class="check" v-else @click="remove(scope.row)">删除</span>
                <!-- scope.row.returnDate!==''?false:true -->
              </p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// <!-- import axios from 'axios'; -->
import { stampToDate } from '../../../common/date';
import { borrow } from '../../../api/borrow/borrow'
export default {
  name: 'borrowinfo',
  data () {
    return {
      tableData: [],
      stampToDate: stampToDate,
      isReturn: false
    }
  },
  methods: {
    init: function () {
      this.getBorrowInfo()
    },
    getParams: function () {
      const bookNum = this.tableData.bookNum
      const bookName = this.tableData.bookName
      const bookAutor = this.tableData.bookAutor
      const Borrower = this.tableData.Borrower
      const borrowDate = this.tableData.borrowDate
      const returnDate = this.tableData.returnDate
      const classification = this.tableData.classification
      let req = {
        bookNum,
        bookName,
        bookAutor,
        Borrower,
        borrowDate,
        returnDate,
        classification
      }
      return req
    },
    getBorrowInfo () {
      let req = this.getParams()
      borrow(req, res => {
        if (res.data && res.data.length) {
          this.tableData = JSON.parse(localStorage.getItem('borrowInfo')) || res.data
          console.log('借阅')
          console.log(JSON.parse(localStorage.getItem('borrowInfo')))
        } else {
          this.tableData = []
        }
      }, (err) => {
        // this.logShow('获取借阅信息失败 resError:', err, 'ERROR')
      })
    },
    returnBook (val) {
      var date = Date.parse(new Date())
      // this.tableData
      // alert('确定还书？，当前日期是' + stampToDate(date))
      // val.returnDate = date
      this.$confirm('当前时间为：' + stampToDate(date), '确认还书？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        val.returnDate = date
        this.$message({
          type: 'success',
          message: '还书成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },

    // 删除
    remove (val) {
      this.$confirm('一旦删除就无法找回！', '确定删除此条借阅信息？', {
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

    }
  },
  watch: {
    tableData: {
      handler () {
        localStorage.setItem('borrowInfo', JSON.stringify(this.tableData))
      }, deep: true
    }
  },
  mounted () {
    this.init()
  }
  // created: function () {
  //   axios.get('https://www.easy-mock.com/mock/5c28d4432140e71d51972e3a/books/borrow')
  //     .then(response => {
  //       this.tableData = response.data.data
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.check,
.return {
  color: #409eff;
  cursor: pointer;
}
.hello {
  margin: 0 15px;
}
</style>
