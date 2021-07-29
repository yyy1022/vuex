<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"></router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
  export default {
    watch: {
      $route() {
        if (this.$route.meta.title) {
          document.title = this.$route.meta.title;
        } else {
          document.title = "首页";
        }
      }
    },
    mounted() {
     /* window.addEventListener('load', () => { // 滚动事件变为 scroll
        if (this.$route.path !== '/index') { // /print 表示首页
          this.$router.replace('/index') // 切换到首页
        }
      })*/
    },
    created () {

    }
  };
</script>
<style lang="stylus">
*{
  margin 0;
  padding 0
}
</style>
