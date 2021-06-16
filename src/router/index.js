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
        component: () => import( '@/views/articleList.vue'),
      },
      // 归档
      {
        path: '/placeFile',
        name: 'placeFile',
        component: () => import( '@/views/placeFile.vue'),
      },
      // 归档
      {
        path: '/createCenter',
        name: 'createCenter',
        component: () => import( '@/views/createCenter.vue'),
        // redirect:''
      },
      // 友情链接
      {
        path: '/friendlyLink',
        name: 'friendlyLink',
        component: () => import( '@/views/friendlyLink.vue'),
        // redirect:''
      },
      // 关于我
      {
        path: '/mine',
        name: 'mine',
        component: () => import( '@/views/mine.vue'),
        // redirect:''
      },
      // 文章详情
      {
        path: '/articleItemInfo',
        name: 'articleItemInfo',
        component: () => import( '@/views/articleItemInfo.vue'),
        // redirect:''
      },
    ]
  },
  // 创作
  {
    path: '/writeArticle',
    name: 'writeArticle',
    component: () => import( '@/views/writeArticle.vue'),
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
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
