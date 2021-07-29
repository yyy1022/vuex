import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-social-share/dist/client.css'
import Share from "vue-social-share"
import echarts from 'echarts'
// Vue.prototype.$echarts = echarts
Vue.use(Share)
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
