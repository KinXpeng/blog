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
import "./assets/scss/dark.scss";
import "./assets/scss/index.css";
// 矢量图
import "./assets/iconfont/iconfont.css"
import "./assets/iconfont/iconfont"
// mavonEditor
import  mavonEditor  from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import "./assets/scss/markdown.min.css";

import "./assets/scss/codeStyle.css"

Vue.use(mavonEditor);
// 引入axios
import axios from "axios";
// 服务器https
axios.defaults.baseURL = 'https://api.kinxpeng.com:3000/'
// 本地http
// axios.defaults.baseURL = 'http://localhost:3000/'
// 请求携带cookie
// axios.defaults.withCredentials=true; 
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

// 路由守卫
router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth){
    if(sessionStorage.getItem('cookie')){
      next()
    }else{
      next({name:'login'})
    }
  }else{
    next()
  }
})
// 定义设置cookie方法
Vue.prototype.setCookie = function(name, value, day) {
  if (day !== 0) {
    //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    var curDate = new Date();
    var curTamp = curDate.getTime();
    var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
    var passedTamp = curTamp - curWeeHours;
    var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
    var leftTime = new Date();
    leftTime.setTime(leftTamp + curTamp);
    document.cookie = name + "=" + escape(value) + ";expires=" + leftTime.toGMTString();
  } else {
    document.cookie = name + "=" + escape(value);
  }
};

// sessionStorage监听方法
Vue.prototype.resetSetItem = function (key, newVal) {
  // 创建一个StorageEvent事件
  var newStorageEvent = document.createEvent('StorageEvent');
  const storage = {
    setItem: function (k, val) {
      sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent)
    }
  }
  return storage.setItem(key, newVal);
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
