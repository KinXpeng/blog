import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 引入scss样式文件
import "./assets/scss/reset.scss";
// 引入axios
import axios from "axios";
axios.defaults.baseURL = 'https://api.kinxpeng.com:3000/'
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

// 路由守卫
router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth){
    if(store.state.username){
      next()
    }else{
      next({path:'/login'})
    }
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
