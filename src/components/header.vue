<template>
  <div class="header-group">
    <!-- title -->
    <el-col :span="3">
      <div class="header-title">
        <p>倾倾倾风</p>
      </div>
    </el-col>
    <!-- navbar -->
    <el-col :span="13">
      <div class="header-navbar">
        <ul>
          <li v-show="!((item.name=='writeArticle')&&!isLoginFlag)" :class="item.class" v-for="(item,index) in tabList" :key="index" @click="toggleTab(item,index)">
            <svg class="icon-svg">
              <use :xlink:href="item.icon"></use>
            </svg>
            <span class="bar-text">{{item.title}}</span>
          </li>
        </ul>
      </div>
    </el-col>
    <!-- search -->
    <el-col :span="6">
      <div class="header-search">
        <el-input ref="searchInput" @change="handleChange" v-model="searchValue" clearable :class="crtlInput"></el-input>
        <div class="search-icon" :class="crtlInput"><i class="el-icon-search" @click="handleSearch"></i></div>
      </div>
    </el-col>
    <!-- night -->
    <el-col class="header-night" :span="1">
      <i :class="nightModeFlag?'el-icon-moon-night':'el-icon-sunrise-1'" @click="changeNight"></i>
    </el-col>
    <!-- login -->
    <el-col v-if="isLoginFlag" class="header-login" :span="1">
      <el-popconfirm
        title="是否退出登录？"
        :hide-icon="true"
        @confirm="exitLogin"
        cancel-button-type="warning"
      >
        <el-avatar shape="square"  slot="reference" :size="34" fit="cover" title="用户已登录" :src="require('../assets/images/head_img.jpeg')"></el-avatar>
      </el-popconfirm>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabList:[
        {
          title:'首页',
          class:'active',
          path:'/',
          name:'articleList',
          icon:'#icon-shouyexuanzhong'
        },
        
        {
          title:'归档',
          class:'',
          path:'/placeFile',
          name:'placeFile',
          icon:'#icon-liucheng'
        },
        {
          title:'文章',
          class:'',
          path:'/writeArticle', // '/login',
          name:'writeArticle', // '/login',
          icon:'#icon-sign-review'
        },
        {
          title:'创作',
          class:'',
          path:'/createCenter', 
          name:'createCenter', 
          icon:'#icon-xingxing'
        },
        {
          title:'友情链接',
          class:'',
          path:'/friendlyLink',
          name:'friendlyLink',
          icon:'#icon-lianjie1'
        },
        {
          title:'关于我',
          class:'',
          path:'/mine',
          name:'mine',
          icon:'#icon-zhuti'
        },
      ],
      actIndex:0,
      searchValue:'',
      crtlInput:'crtlInput',
      nightModeFlag:false,
    };
  },
  watch:{
  },
  computed:{
    isLoginFlag(){
      return sessionStorage.getItem('cookie')?true:false
    },
  },
  methods: {
    // 导航栏点击切换
    toggleTab(item,index){
      if(index != this.actIndex){
        this.tabList.forEach((ele)=>{
          ele.class = '';
        });
        item.class = 'active';
      }
      this.actIndex = index;
      sessionStorage.setItem('curIndex',index);
      this.$router.push({name:item.name});
    },
    // 刷新页面路由切换
    handleRouter(name){
      switch(name){
        case 'articleList':
          this.changeActive(0);
          break;
        case 'placeFile':
          this.changeActive(1);
          break;
        case 'writeArticle':
          this.changeActive(2);
          break;
        case 'createCenter':
          this.changeActive(3);
          break;
        case 'friendlyLink':
          this.changeActive(4);
          break;
        case 'mine':
          this.changeActive(5);
          break;
      };
    },
    // active状态
    changeActive(index){
      this.tabList.forEach((ele)=>{
        ele.class = '';
      });
      this.tabList[index].class = 'active';
    },
    handleChange(val){
      if(val.trim()){
        this.handleSearch();
      }
    },
    // 控制搜索框
    handleSearch(){
      if(this.searchValue){
        this.$store.state.searchValue = this.searchValue;
      }else{
        if(this.crtlInput ==''){
          this.$store.state.searchValue = this.searchValue;
        }
        this.crtlInput = this.crtlInput =='crtlInput'?'':'crtlInput';
      }
    },
    // 切换夜间模式
    changeNight(){
      this.nightModeFlag = !this.nightModeFlag;
      sessionStorage.setItem('nightFlag',this.nightModeFlag);
      if(this.nightModeFlag){
        window.document.documentElement.setAttribute( "data-theme", 'dark' );
        this.$store.state.nightModeFlag = true;
      }else{
        window.document.documentElement.setAttribute( "data-theme", 'light' );
        this.$store.state.nightModeFlag = false;
      };
      // location.reload();
    },
    // 退出登录
    exitLogin(){
      sessionStorage.setItem('cookie','');
      this.$router.push({path:'/'});
      location.reload();
    },
  },
  created() {
    // 夜间模式状态
    if(sessionStorage.getItem('nightFlag') === "" || sessionStorage.getItem('nightFlag') == null){
      sessionStorage.setItem('nightFlag',JSON.stringify(this.nightModeFlag));
    }else{
      this.nightModeFlag = JSON.parse(sessionStorage.getItem('nightFlag'));
    }
    if(this.nightModeFlag){
      window.document.documentElement.setAttribute( "data-theme", 'dark' );
      this.$store.state.nightModeFlag = true;
    }else{
      window.document.documentElement.setAttribute( "data-theme", 'light' );
      this.$store.state.nightModeFlag = false;
    }
     // active状态切换
    this.handleRouter(this.$route.name);
    if(sessionStorage.getItem('curIndex') ){
      this.actIndex = sessionStorage.getItem('curIndex');
    }
  },
  mounted(){
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/dark.scss';
.header-group{
  width:92%;
  min-width: 980px;
  margin:0 auto;
  line-height: 40px;
  height:40px;
  transition: .5s;
  // title
  .header-title{
    line-height:40px;
    text-align: center;
    font-size: 20px;
    p{
      width: 100%;
      font-weight: 600;
      font-family: Georgia, Times, 'Times New Roman', serif;
      letter-spacing:2px;
    }
  }
  // navbar
  .header-navbar{
    ul{
      display: flex;
      height:40px;
      li{
        display: flex;
        // width:auto;
        padding:0 10px;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        &:hover{
          @include background_color("background_color3");
        }
        .icon-svg{
          width:16px;
          height:16px;
          margin:12px 2px;
        }
      }
      .active{
        @include background_color("background_color2");
        &:hover{
          @include background_color("background_color2");
        }
      }
    }
  }
  // search
  .header-search{
    display: flex;
    .crtlInput{
      width: 0;
    }
    .el-input{
      overflow: hidden;
      transition: .5s;
      /deep/.el-input__inner{
        width:100%;
        height:30px;
        @include background_color("background_color");
        @include border_style("border_style1");
        &:focus{
          border:1px solid #666 !important;
        }
      }
    }
    .search-icon{
      width:15%;
      text-align: center;
      cursor: pointer;
      .el-icon-search{
        color:#666;
        &:hover{
          @include font_color("text-color1");
        }
      }
    }
  }
  // night
  .header-night{
    color:#666;
    &:hover{
      @include font_color("text-color1");
    }
  }
  // login
  .header-login{
    width:36px;
    height:36px;
    margin:2px;
    text-align: center;
    border-radius: 4px;
    // border:1px solid red;
    font-size: 12px;
    @include box_shadow("box_shadow");
    cursor: pointer;
    .el-avatar{
      margin-top:1px;
    }
  }
}
// 媒体查询
@media screen and (max-width: 1040px) {
  .header-group {
    width:98%;
  }
}
</style>
