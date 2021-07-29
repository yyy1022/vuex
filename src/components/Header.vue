<template>
  <div style="display: flex">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router @select="handleSelect">
      <el-menu-item v-for="(item,index) in list"   :index="item.router"  >{{item.title}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'Header',

    props: {

      list: {
        type: Array,
        default: ''
      },
      activeIndex:{
        type: String,
        default: ''
      },
      keyPath:{
        type:Array,
        default:''
      }
    },
    data () {
      return {


      }
    },
    watch: {
      list: {
        handler(){

        }
      },
      activeIndex:{
        handler(){

        }
      },
      keyPath: {
        handler(){

        }
      },
    },
    methods: {
      handleSelect(key, keyPath) {
        // this.$emit('active',key)
        console.log(key, keyPath);
      }
    },
    mounted () {
      console.log(this.activeIndex)

    }
  }
</script>

<style scoped>

</style>
