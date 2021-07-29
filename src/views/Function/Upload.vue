<template>
  <div>
    <el-form label-width="80px" :model="newFrom">
      <template v-for="item in list">
        <el-form-item v-if="item.type=='text'" :label="item.name">
          <el-input v-model="newFrom[item.id]"></el-input>
          <!--          <el-input v-model="newFrom.item.id"></el-input>-->
        </el-form-item>
        <el-form-item :label="item.name" v-if="item.type=='select'">
          <el-select v-model="newFrom[item.id]" :placeholder="item.placeholder">
            <template v-for="i in item.content1">
              <el-option :label="i.lable" :value="i.value"></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item :label="item.name" v-if="item.type=='date'">
          <el-date-picker type="date" placeholder="选择日期" v-model="newFrom[item.id]"
                          style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item :label="item.name" v-if="item.type=='checkbox'">
          <el-checkbox-group v-model="newFrom[item.id]">
            <template v-for="i in item.content1">
              <el-checkbox :label="i.lable" name="type" :value="i.value"></el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="item.name" v-if="item.type=='radio'">
          <el-radio-group v-model="newFrom[item.id]">
            <template v-for="i in item.content1">
              <el-radio :label="i"></el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>


    <div>
      <el-upload class="upload-demo"
                 action="上传的地址"
                 list-type="picture-card"
                 :limit='5'

                 :auto-upload="false"
                 :on-exceed='uploadOverrun'
                 :on-preview="handleContImgPreview"
                 :on-remove='handleRmove'
                 :http-request='submitUpload'
                 :file-list="fileList"
                 ref="upload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :close-on-click-modal="false">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-button @click='submitAssess'>提交到服务器</el-button>
      // 提交的服务器
    </div>
    <div></div>
  </div>

</template>

<script>
  export default {
    name: 'Upload',
    data () {
      return {
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        list: [{

          name: '姓名',
          type: 'text',
          content: '小明',
          placeholder: '请输入姓名',
          id: 'one'
        }, {
          name: '身高',
          type: 'text',
          value: 'aaaaa',
          placeholder: '请输入姓名',
          id: 'two',
          content: '18'
        }, {
          type: 'date',
          name: '时间',
          value: '',
          placeholder: '请选择时间',
          id: 'three'
        }, {
          type: 'select',
          name: '内容',
          content1: [{
            lable: '内容一',
            value: '衣服',

          },
            {
              lable: '内容二',
              value: '衣服'
            }],
          content: '衣服',
          placeholder: '请选择内容',
          id: 'kiuy1'
        },
          {
            type: 'checkbox',
            name: '活动性质',
            content1: [{
              lable: '内容一',
              value: '衣服',

            },
              {
                lable: '内容二',
                value: '衣服'
              }],
            value: '',
            placeholder: '请选择活动性质',
            id: 'four',
            content: []
          },
          {
            type: 'radio',
            name: '形式',
            content1: ['线上', '本地 '],
            value: '',
            placeholder: '请选择形式',
            id: 'weee',
            content: '线上'
          }

        ],
        newFrom: {},
        // form: {}
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      onSubmit () {
        for (var i in this.newFrom) {
          console.log(this.newFrom[i])

        }
      },
      getForm () {
        // debugger
        for (var i = 0; i < this.list.length; i++) {
          // console.log(this.list[i].type == 'checkbox')
          // console.log(this.list[i].value)
          if (this.list[i].type == 'checkbox') {
            this.$set(this.newFrom, this.list[i].id, [])

            // this.newFrom[this.list[i].type] = []
          } else {
            this.$set(this.newFrom, this.list[i].id, '')
            // this.newFrom[this.list[i].type] = this.list[i].value
          }

        }
      },
      changepic () {
        // $('#prompt3').css('display', 'none')
        var reads = new FileReader()
        f = document.getElementById('file').files[0]
        reads.readAsDataURL(f)
        reads.onload = function (e) {
          document.getElementById('img3').src = this.result
          $('#img3').css('display', 'block')
        }
      }
    },
    created () {
      this.getForm()
      console.log(this.newFrom)
    }
  }
</script>

<style scoped>
  #imgPreview {
    width: 40%;
    height: 180px;
    margin: 10px auto 0px auto;
    border: 1px solid black;
    text-align: center;
  }

  #prompt3 {
    width: 100%;
    height: 180px;
    text-align: center;
    position: relative;
  }

  #imgSpan {
    position: absolute;
    top: 60px;
    left: 40px;
  }

  .filepath {
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  #img3 {
    height: 100%;
    width: 100%;
    display: none;
  }

</style>



