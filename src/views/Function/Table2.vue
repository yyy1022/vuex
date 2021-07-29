<template>
  <div>
    <div style="height: 100px;width: 90%;margin: auto;border: 1px solid red;" id="box1"></div>
    <el-button type="primary" @click="excelDow" class="btnStyle1"
    >导出
    </el-button>
    <el-button type="text" @click="dialogVisible = true"  v-dialogDrag="{ x: transformX, y: transformY }" :close-on-click-modal="false" :append-to-body="true" :modal-append-to-body="true">点击打开 Dialog</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" id="box"  >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
				</span>
    </el-dialog>
    <el-table
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage*pageSize)"
      border
      style="width: 100%" id="table" :style="styleObject">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row) ">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration">显示总数</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>


    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="日期">
          <el-input v-model="formInline.date" placeholder="日期"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="地址1">
          <el-input v-model="formInline.address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
      // 获取拖拽内容头部
      const dialogHeaderEl = el.querySelector('.el-dialog__header');
      const dragDom = el.querySelector('.el-dialog');
      dragDom.style.transform="translate("+binding.value.x+"px,"+binding.value.y+"px)";
      dialogHeaderEl.style.cursor = 'move';
      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
      // 鼠标按下事件
      dialogHeaderEl.onmousedown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离 (鼠标点击位置距离可视窗口的距离)
        const disX = e.clientX - dialogHeaderEl.offsetLeft;
        const disY = e.clientY - dialogHeaderEl.offsetTop;
        // 获取到的值带px 正则匹配替换
        let styL, styT;
        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (sty.left.includes('%')) {
          styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)+binding.value.x;
          styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)+binding.value.y;
        } else {
          styL = +sty.left.replace(/\px/g, '')+binding.value.x;
          styT = +sty.top.replace(/\px/g, '')+binding.value.y;
        };
        // 鼠标拖拽事件
        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离 （开始拖拽至结束拖拽的距离）
          const l = e.clientX - disX;
          const t = e.clientY - disY;
          let finallyL = l + styL;
          let finallyT = t + styT;
          // 边界值判定 注意clientWidth scrollWidth区别 要减去之前的top left值
          if (finallyL < 0) {顶部
            finallyL = 0
          } else if (finallyL > dragDom.offsetParent.clientWidth - dragDom.clientWidth) {///底部
            finallyL = dragDom.offsetParent.clientWidth - dragDom.clientWidth
          }

          if (finallyT < 0) {顶部
            finallyT = 0
          } else if (finallyT > dragDom.offsetParent.clientHeight - dragDom.clientHeight) (///底部
            finallyT = dragDom.offsetParent.clientHeight - dragDom.clientHeight
          )
          binding.value.x=finallyL;
          binding.value.y=finallyT;
          dragDom.style.transform="translate("+finallyL+"px,"+finallyT+"px)";
          //将此时的位置传出去
          //binding.value({x:e.pageX,y:e.pageY})
        };
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    }
  })


  export default {
    name: 'Table2',


    data () {
      return {
        styleObject: {
          height: '400px',
          overflow: 'scroll'
        },
        testDialog:true,
        transformX:100,
        transformY:200,


        total: 4,
        pageSize: 2,
        currentPage: 1,
        dialogVisible: false,
        formInline: {
          date: '',
          name: '',
          address: ''
        },
        tableData: [

          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          },
        ]
      }
    },
    methods: {
      open:function () {
        this.testDialog=true
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      excelDow () {
        debugger
        import('../../uploader/uploader.js').then(moudle => {
          const tHeader = ['时间', '姓名',  '地址']
          const filterVal = [ 'date', 'name', 'address']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          moudle.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename === '' ? 'filename' : this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      handleEdit (index, row) {
        debugger
        this.dialogVisible = true
        console.log(row)
        this.formInline = {
          date: row.date,
          name: row.name,
          address: row.address
        }
      },
      handleDelete (index, row) {

        this.$confirm('这将会永久删除该行数据，是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

        console.log(index, row)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      onSubmit () {
        debugger

        for (var i in this.formInline) {
          console.log(this.formInline[i])

        }

      }

    },
    mounted () {

      var boxHeight = document.getElementById("box1").offsetHeight; //
      var appHeight = document.getElementById("app").offsetHeight; //
      var tableHeight = document.getElementById("table").offsetHeight; //

      console.log(boxHeight)
      console.log(appHeight)
      tableHeight = appHeight - boxHeight-200
      console.log(tableHeight )
      debugger
      this.styleObject = {
        height: tableHeight+'px',
        overflow: 'scroll'
      }
    }

  }
</script>

<style scoped>

  /deep/ .el-dialog__header {
    padding: 20px 20px 10px;
    background-color: #409eff;
  }

  /deep/ .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #ffffff;
  }

  /deep/ .el-dialog__headerbtn .el-dialog__close {
    /* color: #909399; */
    color: #fff;
  }

  /deep/ .el-form--inline .el-form-item {
    display: block;
    margin-right: 10px;
    vertical-align: top;
  }

  /deep/ .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    width: 50px;
    /*text-align: center;*/
  }
  .el-dialog{
    margin: 0 !important;
    /*transform: translate(366px, 140px);*/
  }

</style>
