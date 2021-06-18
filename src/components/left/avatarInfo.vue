<template>
  <div class="avatar-info el-card">
    <div class="avatar-back"></div>
    <div class="avatar-desc">
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
      <!-- avatar-detail -->
      <div class="avatar-detail">
        <ul>
          <li v-for="(item,index) in avatarDetailList" :key="index">
            <span>{{item.totals}}</span>
            <p class="detail-title">{{item.detailTitle}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // avatar-detail
      avatarDetailList:[
        {
          detailTitle:'文章',
          totals:112,
        },
        {
          detailTitle:'说说',
          totals:80,
        },
        {
          detailTitle:'创作',
          totals:24,
        },
      ],
      loginCount:0,
      startTime:0,
      lastTime:0,
    };
  },
  methods: {
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
  },
  created() {
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
    height: 140px;
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
    // avatar-detail
    .avatar-detail {
      height: 80px;
      ul{
        display: flex;
        padding:0 10px;
        height:100%;
        li{
          flex: 1;
          font-size: 12px;
          text-align: center;
          padding-top:30px;
          span{
            font-size: 14px;
            color: deepskyblue;
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
}
</style>
