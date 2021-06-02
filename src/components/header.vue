<template>
  <div class="header-group">
    <el-col :span="3">
      <div class="header-title">
        <p>倾倾倾风</p>
      </div>
    </el-col>
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
    <el-col :span="7">
      <div class="header-search">
        <i class="el-icon-search"></i>
      </div>
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
          path:'/writeArticle',
          icon:'#icon-liucheng'
        },
        {
          title:'创作',
          class:'',
          path:'/login',
          icon:'#icon-xingxing'
        },
        {
          title:'友情链接',
          class:'',
          path:'/writeArticle',
          icon:'#icon-lianjie1'
        },
        {
          title:'关于我',
          class:'',
          path:'/writeArticle',
          icon:'#icon-zhuti'
        },
      ],
      actIndex:0,
    };
  },
  methods: {
    // 导航栏点击切换
    toggleTab(item,index){
      if(index != this.actIndex){
        this.tabList.forEach((ele)=>{
          ele.class = '';
        })
        item.class = 'active';
        this.actIndex = index;
        this.$router.push({path:item.path});
      }
    },
  },
  created() {

  },
  mounted(){
    
  },
};
</script>

<style lang="scss" scoped>
.header-group{
  width:92%;
  margin:0 auto;
  line-height: 40px;
  // 标题
  .header-title{
    line-height:40px;
    text-align: center;
    font-size: 20px;
    p{
      width: 100%;
      font-weight: 600;
      font-family:   Georgia, Times, 'Times New Roman', serif;
      letter-spacing:2px;
    }
  }
  // 头部导航
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
          background-color: #f4f4f4;
        }
        .iconfont{
          margin-right:2px;
        }
        .icon-svg{
          width:16px;
          height:16px;
          margin:12px 2px;
        }
      }
      .active{
        background-color: #f7f7f7;
        &:hover{
          background-color: #f7f7f7;
        }
      }
    }
  }
  // 搜索
  .header-search{
    text-align: center;
    border:1px solid red;
  }
}
</style>
