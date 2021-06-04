<template>
  <div class="header-group">
    <!-- title -->
    <el-col :span="3">
      <div class="header-title">
        <p>倾倾倾风</p>
      </div>
    </el-col>
    <!-- navbar -->
    <el-col :span="14">
      <div class="header-navbar">
        <ul>
          <li :class="item.class" v-for="(item,index) in tabList" :key="index" @click="toggleTab(item,index)">
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
        <el-input ref="searchInput" v-model="searchValue" clearable :class="crtlInput"></el-input>
        <div class="search-icon" :class="crtlInput"><i class="el-icon-search" @click="handleSearch"></i></div>
      </div>
    </el-col>
    <!-- night -->
    <el-col class="header-night" :span="1">
      <i :class="nightModeFlag?'el-icon-moon-night':'el-icon-moon'" @click="changeNight"></i>
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
          icon:'#icon-shouyexuanzhong'
        },
        
        {
          title:'归档',
          class:'',
          path:'/placeFile',
          icon:'#icon-liucheng'
        },
        {
          title:'创作',
          class:'',
          path:'/writeArticle', // '/login',
          icon:'#icon-xingxing'
        },
        {
          title:'友情链接',
          class:'',
          path:'/friendlyLink',
          icon:'#icon-lianjie1'
        },
        {
          title:'关于我',
          class:'',
          path:'/mine',
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
      this.$router.push({path:item.path});
    },
    // 刷新页面路由切换
    handleRouter(path){
      switch(path){
        case '/':
          this.changeActive(0);
          break;
        case '/placeFile':
          this.changeActive(1);
          break;
        case '/writeArticle':
          this.changeActive(2);
          break;
        case '/friendlyLink':
          this.changeActive(3);
          break;
        case '/mine':
          this.changeActive(4);
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
    // 控制搜索框
    handleSearch(){
      if(this.searchValue){
        console.log(this.searchValue);
      }else{
        this.crtlInput = this.crtlInput =='crtlInput'?'':'crtlInput';
      }
    },
    // 切换夜间模式
    changeNight(){
      this.nightModeFlag = !this.nightModeFlag;
      sessionStorage.setItem('nightFlag',this.nightModeFlag);
      if(this.nightModeFlag){
        window.document.documentElement.setAttribute( "data-theme", 'dark' );
      }else{
        window.document.documentElement.setAttribute( "data-theme", 'light' );
      };
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
    }else{
      window.document.documentElement.setAttribute( "data-theme", 'light' );
    }
     // active状态切换
    this.handleRouter(this.$route.path);
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
  margin:0 auto;
  line-height: 40px;
  height:40px;
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
}
</style>
