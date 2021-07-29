import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexLayout from '../layout/IndexLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: IndexLayout,
    redirect: '/index',
    children: [{
      path: '/index',
      component: () => import('../views/Index/Index'),
      meta: {
        title: '首页',
        icon: 'el-icon-s-release'
      }
    }, {
      path: '/share/forumPost',
      component: () => import('../views/Share/ForumPost'),
      meta: {
        title: '分享',
        icon: 'el-icon-s-release'
      }
    }]
  },
  {
    path: '/index',
    component: () => import('../views/Index/Index'),
    meta: {
      title: '首页',
      icon: 'el-icon-s-release'
    }
  }, {
    path: '/function',
    redirect: '/function/table',
    name: 'function',
    component: IndexLayout,
    meta: {
      title: '功能',
      icon: 'el-icon-s-release'
    },
    children: [
      {
        path: '/function/table',
        component: () => import('../views/Function/Table'),
        meta: {
          title: 'Table表格',
          icon: 'el-icon-s-release'
        }
      },
      {
        path: '/function/table2',
        component: () => import('../views/Function/Table2'),
        meta: {
          title: 'Table表格2',
          icon: 'el-icon-s-release'
        }
      }, {
        path: '/function/upload',
        component: () => import('../views/Function/Upload'),
        meta: {
          title: '上传',
          icon: 'el-icon-s-release'
        }
      }
    ]
  }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
