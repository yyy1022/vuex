
<template>
  <div>
    <ul class="print-ul">
      <li v-for="(item,index) of tableData" :key="index"
          :id="'printDiv' + index" style="page-break-after:always;" class="page">
        <div>
          <p>{{item.date}}</p>
          <p>{{item.name}}</p>
          <p>{{item.province}}</p>
          <p>{{item.city}}</p>
          <p>{{item.address}}</p>
          <p>{{item.zip}}</p>
        </div>
      </li>
    </ul>
    <div @click="handlePrint">打印</div>
  </div>
</template>

<script>
  export default {
    name: 'ForumPost',
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    methods: {
      handlePrint() {
        debugger
        var newWin = window.open(""); //新打开一个空窗口
        for (var i = 0; i < this.tableData.length; i++) {
          var imageToPrint = document.getElementById("printDiv" + i); //获取需要打印的内容
          newWin.document.write(imageToPrint.outerHTML); //将需要打印的内容添加进新的窗口
        }
        const styleSheet = `<style>li{list-style:none}</style>`;
        newWin.document.head.innerHTML = styleSheet; //给打印的内容加上样式
        newWin.document.close(); //在IE浏览器中使用必须添加这一句
        newWin.focus(); //在IE浏览器中使用必须添加这一句
        setTimeout(function() {
          newWin.print(); //打印
          newWin.close(); //关闭窗口
        }, 100);
      }
    }
  }
</script>

<style>
  .print-ul {
    width: 600px;
    list-style: none;
    border: 1px solid #e8e8e8;
  }
  li{
    width: 100%;
  }
  .page {
    margin-top:20px;
    margin-left:10px;
    margin-right:10px;
    border: initial;
    border-radius: initial;
    width: initial;
    min-height: initial;
    box-shadow: initial;
    background: initial;
    page-break-after: always;
    width:180px;
  }
</style>
