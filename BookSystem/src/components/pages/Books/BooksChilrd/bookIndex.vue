<template>
  <div class="hello">
    <div class="without" v-show="isShow">
      <p>不好意思，可能是网不好</p>
    </div>
    <ul class="cards" v-show="!isShow">
      <li class="card cardadd">
        <i class="el-icon-plus avatar-uploader-icon" @click="isShowBox"></i>
      </li>
      <li v-for="(books,index) in bookList" class="card cardlist">
        <div class="bookimg">
          <img v-if="books.bookimg" :src="books.bookimg" alt="" class="image">
          <img v-else src="../../../../assets/substitution.jpg" alt="" class="image">
        </div>
        <div style="padding: 14px;">
          <span>
            {{books.bookName}}</span>
          <div class="bottom clearfix">
            <span>{{books.bookAutor}}</span>
          </div>
          <i class="el-icon-close close" @click="remove(index)"></i>
          <el-button type="text" class="button">借阅</el-button>
        </div>
      </li>
      <li class="clear"></li>
    </ul>
    <div class=" uploadbox " v-show="showBox"> </div>

    <!-- 借阅 -->

    <!-- 新增图书 -->
    <el-form :model="form " label-width="80px " class="uploadform " v-show="showBox" :rules="rules" ref="bookForm">
      <el-form-item label="书名 " prop="name">
        <el-input v-model="form.name " clearable></el-input>
      </el-form-item>
      <el-form-item label="作者 " prop="autor">
        <el-input v-model="form.autor " clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="数量 " amount>
        <el-input v-model="form.amount " clearable></el-input>
      </el-form-item> -->
      <el-form-item label="分类 " prop="classification">
        <el-select v-model="form.classification " placeholder="请选择分类 " clearable>
          <el-option label="漫画书 " value="1 "></el-option>
          <el-option label="儿童读物 " value="2 "></el-option>
          <el-option label="故事书 " value="3 "></el-option>
          <el-option label="古文 " value="4 "></el-option>
          <el-option label="哲学伦理 " value="5 "></el-option>
          <el-option label="宗教信仰（民族神话） " value="6 "></el-option>
          <el-option label="历史人文 " value="7 "></el-option>
          <el-option label="艺术文学 " value="8 "></el-option>
          <el-option label="社科图书 " value="9 "></el-option>
          <el-option label="文学 " value="0 "></el-option>
          <el-option label="哲学 " value="11 "></el-option>
          <el-option label="经济 " value="12 "></el-option>
          <el-option label="社会 " value="13 "></el-option>
          <el-option label="科学 " value="14 "></el-option>
          <el-option label="法律 " value="shanghai "></el-option>
          <el-option label="军事 " value="beijing "></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面 " prop="cover">
        <el-upload v-model="form.cover" class="avatar-uploader " action="addressUrl " :show-file-list="false " :on-success="handleAvatarSuccess " :before-upload="beforeAvatarUpload ">
          <img v-if="imageUrl" :src="imageUrl " class="avatar ">
          <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader-bookicon"></i>
        </el-upload>
      </el-form-item>

      <el-button type="primary " @click="onSubmit">立即创建</el-button>
      <el-button @click="cancelBox">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import axios from 'axios';
import { BookIndex } from '../../../api/bookIndex';
export default {
  name: 'bookIndex',
  data () {
    return {
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        autor: [{ required: true, message: '不能为空', trigger: 'blur' }],
        classification: [{ required: true, message: '不能为空', trigger: 'blur' }]
        // cover: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      currentDate: new Date(),
      bookList: [],
      isShow: false,
      form: {
        name: '',  // 书名
        autor: '', // 作者
        // amount: '', // 数量
        classification: '', // 分类
        cover: '' // 封面
      },
      dialogImageUrl: '',
      dialogVisible: false,
      showBox: false,
      imageUrl: '',
      addressUrl: 'https://jsonplaceholder.typicode.com/posts/'
    }
  },
  // created: function () {
  //   axios.get('https://www.easy-mock.com/mock/5c28d4432140e71d51972e3a/books/books')
  //     .then(reponse => {
  //       this.bookList = reponse.data.data
  //       // console.log(reponse.data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }
  methods: {
    init: function () {
      this.getBookIndex()
    },
    getParam: function () {
      const bookimg = this.bookList.bookimg
      const bookName = this.bookList.bookName
      const bookAutor = this.bookList.bookAutor
      let req = {
        bookimg,
        bookName,
        bookAutor
      }
      return req
    },

    // 获取图书列表
    getBookIndex () {
      let req = this.getParam()
      BookIndex(req, (res) => {
        if (res.data && res.data.length) {
          this.bookList = JSON.parse(localStorage.getItem('data')) || res.data,
            this.isShow = false
        } else {
          this.bookList = [],
            this.isShow = true
        }

      }, (err) => {
        console.log(err)
        alert('获取图书列表失败')
      })
    },

    // 进入弹框
    isShowBox: function () {
      this.showBox = true
    },

    // 取消（退出）弹框
    cancelBox: function () {
      this.showBox = false
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      // 文件类型进行判断  
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;

    },

    // 创建新图书
    onSubmit: function () {
      this.$refs.bookForm.validate((valid) => {
        if (valid) {
          this.bookList.push({
            id: 3,
            bookName: this.form.name,
            bookimg: this.form.imageUrl,
            bookAutor: this.form.autor,
            classification: this.form.classification
          })

        }
      })
      this.form.name = '',
        this.form.autor = '',
        this.form.cover = '',
        this.form.classification = '',
        this.showBox = false
    },
    // 删除
    remove (val) {
      this.bookList.splice(val, 1)
    },
  },

  // computed:{
  //   lala:function(){
  //     return this.
  //   }
  // },
  created () {

  },
  watch: {
    bookList: {
      handler () {
        localStorage.setItem('data', JSON.stringify(this.bookList))
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
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  font-size: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 250px;
  height: 250px;
  line-height: 250px;
  text-align: center;
}
.clearfix:after {
  clear: both;
}
.cards {
  position: relative;
}
.cards,
.without {
  width: 100%;
  /* background: #a08; */
  color: #010101;
  clear: both;
}
.clear {
  clear: both;
}
.bookimg {
  height: 160px;
  overflow: hidden;
}
.card {
  width: 250px;
  height: 250px;
  margin: 10px;
  border: 1px solid #efefef;
  float: left;
  border-radius: 2px;
  background: #fff;
  transition: 0.6s;
}
.cardadd {
  border: 1px dashed #d9d9d9;
}
.hello {
  margin: 0 15px;
}
.cardlist:hover {
  box-shadow: 0 0 10px #d9d9d9;
  border-radius: 2px;
}
.cardlist {
  position: relative;
}
.cardadd:hover {
  border-radius: 12px;
  border-color: #409eff;
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
  height: 500px;
  position: fixed;
  top: 30px;
  right: 0;
  left: 0;
  border-radius: 5px;
  padding: 30px 10px;
  margin: auto;
}

.avatar-uploader-bookicon:hover {
  border-color: #409eff;
}
.avatar-uploader-bookicon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/* 关闭 */
.close {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  background: #fafafa;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
.close:hover {
  transition: 0.3s;
  transform: rotate(90deg);
}
</style>
