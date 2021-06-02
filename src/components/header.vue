<template>
  <div class="header-group">
    <el-col :span="8">
      <div class="header-title">
        <img v-if="false" class="header-logo" src="../assets/images/logo.png" alt="">
        <p>倾倾倾风博客管理系统</p>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="header-navbar">
        <ul ref="tabList">
          <li :class="item.class" v-for="(item,index) in tabList" :key="index" @click="toggleTab(item,index)">{{item.title}}</li>
        </ul>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="header-avator">
        <div class="header-img">
          <img src="../assets/images/head.jpg" alt="">
        </div>
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
          path:'/'
        },
        {
          title:'写文章',
          class:'',
          path:'/writeArticle'
        },
        {
          title:'333',
          class:'',
          path:'/writeArticle'
        },
        {
          title:'444',
          class:'',
          path:'/writeArticle'
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
  // 标题
  .header-title{
    display: flex;
    line-height:50px;
    text-align: right;
    font-size: 20px;
    .header-logo{
      height:40px;
      margin:5px;
    }
    p{
      width: 100%;
      text-align: center;
    }
  }
  // 头部导航
  .header-navbar{
    ul{
      display: flex;
      justify-content: space-around;
      line-height: 50px;
      height:50px;
      li{
        flex:1;
        text-align: center;
        cursor: pointer;
        &:hover{
          background-color: #4b367e;
        }
      }
      .active{
        background-color: #3837a6;
        font-weight: bold;
        &:hover{
          background-color: #3837a6;
        }
      }
    }
  }
  // 头像
  .header-avator{
    .header-img{
      float:right;
      overflow: hidden;
      width:40px;
      height:40px;
      border:2px solid #ccc;
      border-radius: 50%;
      margin:5px 40px 0 0;
      cursor: pointer;
      &:hover{
        border-color:greenyellow;
      }
      img{
        width:100%;
        height:100%;
      }
    }
  }
}
</style>
