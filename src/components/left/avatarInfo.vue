<template>
  <div class="avatar-info el-card">
    <div class="avatar-back"></div>
    <div class="avatar-desc">
      <!-- avatar-head -->
      <div class="avatar-head">
        <!-- avatar-img -->
        <div class="avatar-img radius">
          <img class="img-info" src="../../assets/images/head_img.jpeg" alt="">
          <svg class="icon-svg" @click="enterLoginPages">
            <use xlink:href="#icon-shoucang"></use>
          </svg>
        </div>
        <!-- avatar-title -->
        <p class="avatar-title">@KinXpeng</p>
      </div>
      <!-- avatar-word -->
      <div class="avatar-word">
        <span>春风也有春风愁，不劳春风解我忧。</span>
        <p></p>
      </div>
      <!-- avatar-detail -->
      <div class="avatar-detail">
        <ul>
          <li v-for="(item,index) in avatarDetailList" :key="index">
            <span>{{item.countNum}}</span>
            <p class="detail-title">{{item.countName}}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- nav-list -->
    <div class="nav-list">
      <ul class="flex">
        <li v-for="(item,index) in navList" :key="index">
          <span class="list-item" @click="handleLink(item)">
            <svg class="icon-svg">
              <use :xlink:href="item.icon"></use>
            </svg>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // avatar-detail
      avatarDetailList:[], // 文章、点赞数量
      loginCount:0,
      startTime:0,
      lastTime:0,
      navList:[
        {
          icon:'#icon-github1',
          url:'https://github.com/KinXpeng',
        },
        {
          icon:'#icon-qq-line',
          url:'#',
        },
        {
          icon:'#icon-weibo1',
          url:'https://weibo.com/u/5123434857/home',
        },
        {
          icon:'#icon-wangyiyunyinle1',
          url:'https://music.163.com/#/user/home?id=116809620',
        },
        {
          icon:'#icon-youjian1',
          url:'#',
        },
        {
          icon:'#icon-weixin1',
          url:'#',
        },
        {
          icon:'#icon-zhihu',
          url:'https://www.zhihu.com/people/mu-yu-cheng-feng-15-61',
        },
        {
          icon:'#icon-bilibili',
          url:'https://space.bilibili.com/19802757',
        },
        {
          icon:'#icon-tieba',
          url:'https://tieba.baidu.com/home/main?id=tb.1.bf5eac07.j7T__u0AaxYN00ol1uCSDg&fr=userbar',
        },
        {
          icon:'#icon-tuitexiaoniao',
          url:'https://twitter.com/?request_context=signup',
        },
        {
          icon:'#icon-csdn',
          url:'https://blog.csdn.net/kinxpeng?spm=1001.2101.3001.5343',
        },
      ],
    };
  },
  methods: {
    // 进入登录页面
    enterLoginPages(){
      if(this.loginCount == 0){
        this.startTime = new Date();
        this.lastTime = this.startTime;
      }else if(this.loginCount >= 1){
        let nextTime = new Date();
        if (nextTime - this.startTime >= 3000) {
          // 超过3秒重置
          this.startTime = nextTime;
          this.lastTime = nextTime;
          this.loginCount = 0;
        } else {
          this.lastTime = nextTime;
        }
        if (this.loginCount === 3) {
          // 大于三次重置
          this.$router.push({name:'login'});
          this.startTime = nextTime;
          this.lastTime = nextTime;
          this.loginCount = 0;
        } 
      }
      this.loginCount++;
    },
    // 文章、说说、点赞数量查询
    async initAvatarNum(){
      await this.$axios.post('/blog-api/article/count')
        .then((res)=>{
          if(res.data.code == 0){
            this.avatarDetailList = res.data.data;
          }
        })
        .catch((err)=>{
          console.log(err);
        })
    },
    // 点击图标跳转
    handleLink(item){
      if(item.url != '#'){
        window.open(item.url);
      }else{
        console.log(item);
      }
    },
  },
  created() {
    this.initAvatarNum(); // 初始化 文章、说说、点赞数量
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/dark.scss";
.avatar-info {
  margin-bottom: 6px;
  .avatar-back {
    // border:1px solid red;
    width: 100%;
    height: 60px;
    background: url("../../assets/images/blog_xiamu.jpeg") center/cover;
  }
  .avatar-desc {
    user-select: none;
    width: 100%;
    height: 180px;
    .avatar-head {
      display: flex;
      height: 60px;
      margin-top: -15px;
      // avatar-img
      .avatar-img {
        // overflow: hidden;
        position: relative;
        width: 60px;
        height:60px;
        margin-left: 15px;
        border-radius: 50%;
        background-color: #fff;
        padding:2px;
        .img-info{
          width:100%;
          height:100%;
          border-radius: 50%;
        }
        .icon-svg{
          position: absolute;
          bottom:-10px;
          right:-5px;
          width:16px;
          height:16px;
          margin:12px 2px;
          border-radius: 50%;
          background-color: #fff;
          padding:2px;
          z-index:999;
        }
      }
      // avatar-title
      .avatar-title {
        position: relative;
        top:30px;
        left:12px;
        width: 60%;
        @include font_color("text-color1");
      }
    }
    .avatar-word{
      height:50px;
      padding:10px 20px;
      font-size: 12px;
      line-height:20px;
      text-align: center;
      p{
        width:80%;
        height:10px;
        margin:0 auto;
        border-bottom:1px solid rgba(0,120,231,.1);
      }
    }
    // avatar-detail
    .avatar-detail {
      height: 60px;
      margin-top:10px;
      ul{
        display: flex;
        padding:0 10px;
        height:100%;
        li{
          flex: 1;
          font-size: 12px;
          text-align: center;
          padding-top:10px;
          span{
            font-size: 14px;
            color: #317adf;
            font-weight: bold;
            font-family: Arial, Helvetica, sans-serif;
          }
          .detail-title{
            height:40px;
            line-height: 40px;
            color:#666;
          }
        }
      }
    }
  }
  // nav-list
  .nav-list{
    ul{
      flex-wrap: wrap;
      padding:0 10px 8px;
      justify-content: center;
    }
    li{
      width:20%;
      text-align: center;
      .list-item{
        display: inline-block;
        padding:6px;
        border-radius: 50%;
        cursor: pointer;
        &:hover{
          background-color: rgba(0,120,231,.1);
        }
      }
      .icon-svg{
        width:20px;
        height:20px;
      }
    }
  }
}
</style>
