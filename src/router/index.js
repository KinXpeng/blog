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
    // meta:{
    //   requireAuth:true
    // },
    children:[
      // 文章列表
      {
        path: '',
        name: 'articleList',
        component: () => import( '@/views/articleList.vue')
      },
      // 写文章
      {
        path: '/writeArticle',
        // name: 'writeArticle',
        component: () => import( '@/views/writeArticle.vue')
      },
    ]
  },
  // 后台页面路由
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
