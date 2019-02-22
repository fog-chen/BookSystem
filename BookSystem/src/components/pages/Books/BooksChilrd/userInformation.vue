<template>
  <div class="hello">
    <div class="operation">
      <el-button type="primary" size="small" @click="addUser">添加用户</el-button>
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
                {{scope.row.sex==1?'男':'女'}}
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
                {{scope.row.deposit>=1?'50':'未交'}}
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
    <div class="uploadbox" v-show="showBox"></div>
    <el-form :model="form " label-width="120px " class="uploadform " v-show="showBox" ref="userForm">
      <el-form-item label="用户 " prop="newName" :rules="filter_rules({required:true,msg:'请填写书名'})">
        <el-input v-model="form.newName " clearable></el-input>
      </el-form-item>
      <el-form-item label="年龄 " prop="age" :rules="filter_rules({required:true,type:'numberPositive'})">
        <el-input v-model="form.age " clearable></el-input>
      </el-form-item>

      <el-form-item label="身份证 " prop="ID" :rules="filter_rules({required:true,msg:'请输入身份证号',type:'IdentityCard'})">
        <el-input v-model="form.ID " clearable></el-input>
      </el-form-item>

      <el-form-item label="押金 " prop="deposit" :rules="filter_rules({required:true,msg:'请问是否交押金'})">
        <el-radio v-model="form.deposit" label="1">已交</el-radio>
        <el-radio v-model="form.deposit" label="0">未交</el-radio>
        <span class="mar_l30 font_12">押金50元</span>
      </el-form-item>
      <el-form-item label="性别 " prop="sex" :rules="filter_rules({required:true,msg:'请选择性别'})">
        <el-radio v-model="form.sex" label="1">男</el-radio>
        <el-radio v-model="form.sex" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="信誉分" prop="reputationNum ">
        <el-input v-model="form.reputationNum" :disabled="true"></el-input>
      </el-form-item>

      <el-button type="primary " @click="onSubmit ">立即创建</el-button>
      <el-button @click="cancelBox ">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { userInformation } from '../../../api/userInformation/userInformation'
export default {
  name: 'userInformation',
  data () {
    return {
      tableData: [],
      form: {
        newName: '',
        age: '',
        ID: '',
        deposit: '',
        sex: '',
        reputationNum: '100'
      },
      showBox: false,
      deposit: '',
      sex: ''
    }
  },
  methods: {
    init: function () {
      this.getUserInformation()
    },
    getParams: function () {
      const userName = this.tableData.userName // 用户名
      const borrowNum = this.tableData.borrowNum // 借阅书籍本数
      const returned = this.tableData.returned // 归还本数
      const noReturn = this.tableData.noReturn // 未归还本数
      const sex = this.tableData.sex // 性别
      const age = this.tableData.age // 年龄
      const deposit = this.tableData.deposit // 押金
      const ID = this.tableData.ID // 身份证
      const reputationNum = this.tableData.reputationNum // 信誉分
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
    // 添加新用户
    addUser () {
      this.showBox = true
    },
    // 取消添加新用户
    cancelBox () {
      this.showBox = false
    },
    // 提交添加新用户
    onSubmit () {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.tableData.push({
            userName: this.form.newName,
            borrowNum: '0',
            returned: '0',
            noReturn: '0',
            age: this.form.age,
            ID: this.form.ID,
            deposit: this.form.deposit,
            sex: this.form.sex,
            reputationNum: this.form.reputationNum

          })
          this.form.newName = '',
            this.form.age = '',
            this.form.ID = '',
            this.form.deposit = '',
            this.form.sex = '',
            this.showBox = false
        }

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

    //当tableData数据一发生变化时，就将tableData存到本地
    tableData: {
      handler () {
        localStorage.setItem('userInfo', JSON.stringify(this.tableData))
      }, deep: true // 深度监听
    }
  },
  mounted () {
    this.init()
  }
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
.el-table td {
  padding: 0;
}
.operation {
  margin-bottom: 30px;
}
.uploadbox {
  background-color: #b3b3b3;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=80);
}
.uploadform {
  background-color: #ffffff;
  z-index: 1111;
  width: 600px;
  min-height: 500px;
  position: fixed;
  top: 30px;
  right: 0;
  left: 0;
  border-radius: 5px;
  padding: 30px 10px;
  margin: auto;
}
</style>
