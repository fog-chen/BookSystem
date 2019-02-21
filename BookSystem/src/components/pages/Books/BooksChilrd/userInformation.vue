<template>
  <div class="hello">
    <div class="operation">
      <el-button type="primary" size="small">添加用户</el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" border>
        <el-table-column prop="userName" label="用户">
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.userName}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="borrowNum" label="借阅书籍本数">
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.borrowNum}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="returned" label="归还本数">
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.returned}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="noReturn" label="未归还本数">
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.noReturn}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.sex===1?'男':'女'}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄">
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.age}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="deposit" label="押金">
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.deposit}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ID" label="身份证" width="150px">
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.ID}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="reputationNum" label="信誉分">
          <template slot-scope="scope">
            <div>
              <p>
                {{scope.row.reputationNum}}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <div>
              <p>
                <span class="check">详情</span>
                <span class="check" @click="remove(scope.row)">删除</span>
              </p>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { userInformation } from '../../../api/userInformation/userInformation'
export default {
  name: 'userInformation',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    init: function () {
      this.getUserInformation()
    },
    getParams: function () {
      const userName = this.tableData.userName
      const borrowNum = this.tableData.borrowNum
      const returned = this.tableData.returned
      const noReturn = this.tableData.noReturn
      const sex = this.tableData.sex
      const age = this.tableData.age
      const deposit = this.tableData.deposit
      const ID = this.tableData.ID
      const reputationNum = this.tableData.reputationNum
      let req = {
        userName,
        borrowNum,
        returned,
        noReturn,
        sex,
        age,
        deposit,
        ID,
        reputationNum
      }
      return req
    },
    getUserInformation () {
      let req = this.getParams()
      userInformation(req, res => {
        if (res.data && res.data.length) {
          this.tableData = JSON.parse(localStorage.getItem('userInfo')) || res.data
        } else {
          this.tableData = []
        }
      }, (err) => {
        this.logShow('获取用户信息失败', err, 'ERROR')
      })
    },

    // 删除
    remove (val) {
      this.$confirm('一旦删除就无法找回！', '确定删除此条用户信息？', {
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
        localStorage.setItem('userInfo', JSON.stringify(this.tableData))
      }, deep: true
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin: 0 15px;
}
.check,
.return {
  color: #409eff;
  cursor: pointer;
}
.el-table td {
  padding: 0;
}
.operation {
  margin-bottom: 30px;
}
</style>
