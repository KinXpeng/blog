import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//  router push出错
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      // 文章列表
      {
        path: '/',
        name: 'articleList',
        component: () => import(/* webpackChunkName: "articleList" */ '@/views/articleList.vue'),
      },
      // 归档
      {
        path: '/placeFile',
        name: 'placeFile',
        component: () => import(/* webpackChunkName: "placeFile" */ '@/views/placeFile.vue'),
      },
      // 创作中心
      {
        path: '/createCenter',
        name: 'createCenter',
        component: () => import(/* webpackChunkName: "createCenter" */ '@/views/createCenter.vue'),
        // redirect:''
      },
      // 友情链接
      {
        path: '/friendlyLink',
        name: 'friendlyLink',
        component: () => import(/* webpackChunkName: "friendlyLink" */ '@/views/friendlyLink.vue'),
        // redirect:''
      },
      // 关于我
      {
        path: '/mine',
        name: 'mine',
        component: () => import(/* webpackChunkName: "mine" */ '@/views/mine.vue'),
        // redirect:''
      },
      // 文章详情
      {
        path: '/articleItemInfo/:articleId', // 路由参数配置
        name: 'articleItemInfo',
        component: () => import(/* webpackChunkName: "articleItemInfo" */ '@/views/articleItemInfo.vue'),
        // redirect:''
      },
    ]
  },
  // 文章
  {
    path: '/writeArticle',
    name: 'writeArticle',
    component: () => import(/* webpackChunkName: "writeArticle" */ '@/views/writeArticle.vue'),
    meta:{
      requireAuth:true, // 需要登录权限
    },
  },
  // {
  //   path:'*', // 404页面重定向
  //   redirect:'/'
  // },
  // 后台页面路由
  {
    path: '/kx_login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },  
})

export default router
