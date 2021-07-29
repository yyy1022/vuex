<template>
  <el-container>
    <div class="el-header">
      <div
        style="background-color:#1e3124;color: #FFFFFF;height: 60px;overflow: hidden;text-align: center;line-height: 60px ;"
        id="title" :style="{width:changeWidth}">
        <img
          src="https://img1.360buyimg.com/da/jfs/t1/27372/17/11503/92614/5c90a46aEc2ddc4e5/ac95311cf47f6c4b.gif?v=0.49164510686941965"
          width="30px" height="30px" style="vertical-align: middle;margin-right: 15px">
        <span>vue后台管理框架</span>
        <P>解决解决军军</P>
      </div>
      <i class="el-icon-s-fold" v-show="!isCollapse" @click="hide" style="font-size: 22px;vertical-align: middle"></i>
      <i class="el-icon-s-unfold" v-show="isCollapse" @click="show" style="font-size: 22px; vertical-align: middle"></i>
      <div style="margin-left: 50px;" v-for="(item,index) in breadList" :to="item.path" :key="index">{{
        item.meta.title}}
      </div>
      <button @click="toggleFull">全屏</button>
      <Header :list="list" :activeIndex="activeIndex" :keyPath="keyPath"></Header>
    </div>
    <div style=" border-right: solid 1px #e6e6e6;" class="el-aside">
      <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
               :collapse="isCollapse" style="height: 100%" router @select="handleSelect" :default-active="activeIndex">

        <el-menu-item index="/index">
          <i class="el-icon-s-data"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="">
          <template slot="title">
            <i class="el-icon-s-data"></i>
            <span slot="title">功能</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/function/table">table</el-menu-item>
            <el-menu-item index="/function/table2">table2</el-menu-item>

            <el-menu-item index="/function/upload">上传</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/share/forumPost">
          <i class="el-icon-menu"></i>
          <span slot="title">分享</span>
        </el-menu-item>
        <el-menu-item index="" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>


    <el-main class="el-main">
      <router-view></router-view>
    </el-main>

  </el-container>
</template>

<script>
  import Header from '../components/Header'

  export default {
    name: 'IndexLayout',
    components: {
      Header
    },
    data: function () {
      return {
        breadList: [{
          meta: {
            title: '首页'
          }
        }],
        activeIndex: '/index',
        isCollapse: false,
        titleText: '首页',
        changeWidth: '200px',
        keyPath: [],
        list: []
      }
    },
    watch: {

      $route: {
        handler (route) {
          debugger
          var state = localStorage.getItem('tacken')

          if (state == 'true') {
            this.keyPath = JSON.parse(localStorage.getItem('keyPath'))
            this.list = JSON.parse(localStorage.getItem('list'))
            this.titleText = localStorage.getItem('titleText')
            this.activeIndex = localStorage.getItem('activeIndex')
          } else {

          }

          let allList = route.matched.filter(item => {
            if (item.meta && item.meta.title) {
              if (item.redirect) {
                item.path = ''
              }
              return true
            }
          })
          this.breadList = allList
          if (this.$route.meta.title) {
            localStorage.setItem('tacken', true)
            this.titleText = this.$route.meta.title
            var obj = {
              title: this.titleText,
              router: this.activeIndex,
            }
            console.log(this.list)

            console.log(this.list.includes(obj))
            if (this.list.length > 0) {
              for (var i = 0; i < this.list.length; i++) {
                if (!this.list.includes(obj)) {//includes 检测数组是否有某个值
                  this.list.push(obj)
                }
              }
            } else {
              this.list.push(obj)
            }

            var obj = {}

            this.list= this.list.reduce(function (item, next) {

              obj[next.title] ? '' : obj[next.title] = true && item.push(next)

              return item

            }, [])
            console.log(this.list)
            localStorage.setItem('activeIndex', this.activeIndex)
            localStorage.setItem('list', JSON.stringify(this.list))
            localStorage.setItem('titleText', this.titleText)
          } else {
            this.titleText = '首页'
          }
        },
        immediate: true
      }

    },
    methods: {
      // zidingyi (msg) {
      //   this.activeIndex = msg
      // },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      handleSelect (key, keyPath) {
        localStorage.setItem('keyPath', JSON.stringify(keyPath))
        this.activeIndex = key
        this.keyPath = keyPath
        localStorage.setItem('activeIndex', this.activeIndex)
      },
      hide () {
        this.isCollapse = true
        this.changeWidth = '65px'

      },
      show () {
        this.isCollapse = false
        this.changeWidth = '200px'
      },
      toggleFull () {
        let element = document.documentElement
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen()
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen()
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
          } else if (element.msRequestFullscreen) {
// IE11
            element.msRequestFullscreen()
          }
        }
        this.fullscreen = !this.fullscreen
      }
    },
    mounted () {
      debugger
      console.log(localStorage.getItem('tacken'))
      console.log(localStorage.getItem('list'))
      console.log(localStorage.getItem('titleText'))
      console.log(localStorage.getItem('activeIndex'))
      var state = localStorage.getItem('tacken')
      if (state == 'true') {
        this.keyPath = JSON.parse(localStorage.getItem('keyPath'))
        this.list = JSON.parse(localStorage.getItem('list'))
        this.titleText = localStorage.getItem('titleText')
        this.activeIndex = localStorage.getItem('activeIndex')
        // this.breadList = localStorage.getItem('breadList')s

      } else {

      }

    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
  }

  .el-menu {
    border-right: solid 1px transparent;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #FFF;
  }

  .el-aside {
    overflow: hidden;
    box-sizing: border-box;
    flex-shrink: 0;
    height: 100vh;
    color: #333;

    margin-top: 60px;
    position: fixed;
    /*height: 100%;*/
  }

  .el-header {

    color: #333;

    line-height: 60px;
    position: fixed;
    width: 100%;
    padding: 0;
    /*height: 100%;*/
    /*margin-left: 200px;*/
    background-color: #ffffff;
    -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    border: 1px solid #e6e6e6;
    height: 60px;
    z-index: 200;
    display: flex;

  }


  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    /*line-height: 160px;*/
    margin-top: 60px;
    margin-left: 200px;
    height: 90vh;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  #title:hover {
    background-color: #1e3124;
  }

  #title {
    background-color: #1e3124;
    float: left;
    transition: width 0.3s;
    border-right: solid 1px transparent;
    /*min-width: 100%;*/
  }
</style>
