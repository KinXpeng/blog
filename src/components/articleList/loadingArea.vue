<template>
  <div class="loading-area">
    <!-- <div class="loading-icon">
      <svg class="icon-svg icon1">
        <use xlink:href="#icon-fsux_banyuanhuantu"></use>
      </svg>
      <svg class="icon-svg icon2">
        <use xlink:href="#icon-fsux_banyuanhuantu"></use>
      </svg>
    </div> -->
    <div class="loading-animate">
      <!-- <p class="loading-title">LOADING</p> -->
      <div class="loading-dot flex">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods:{
  },
  created(){
  },
};
</script>

<style lang='scss' scoped>
.loading-area{
  // height:40px;
  // line-height: 40px;
  height:20px;
  margin-bottom: 8px;
  text-align: center;
  // loading图标
  .loading-icon{
    position: relative;
    width:40px;
    height:40px;
    margin:0 auto;
    .icon-svg{
      position: absolute;
      top:0;
      left:0;
      width:40px;
      height:40px;
    }
    .icon1{
      transform: scale(0.5) rotate(90deg);
      animation: loadingAnimat 1s linear infinite alternate;
    }
    .icon2{
      transform: scale(0.8) rotate(270deg);
      animation: loadingAnimat1 1s linear infinite alternate;
    }
  }
  // loading-animate
  .loading-animate{
    // height:40px;
    height:20px;
    line-height: 20px;
    .loading-title{
      font-family: verdana;
      animation: loadingText 1s linear infinite alternate;
    }
    .loading-dot{
      // width:94px;
      width:100px;
      height:20px;
      margin:0 auto;
      &>span{
        width:8px;
        height:8px;
        margin:6px 3px;
        border-radius: 50%;
        animation: loadingFalsh 1s linear infinite alternate;
        &:nth-child(1){
          background: #007db6;
        }
        &:nth-child(2){
          background: #008fb2;
          animation-delay:.2s;
        }
        &:nth-child(3){
          background: #009b9e;
          animation-delay:.4s;
        }
        &:nth-child(4){
          background: #00a77d;
          animation-delay:.6s;
        }
        &:nth-child(5){
          background: #00b247;
          animation-delay:.8s;
        }
        &:nth-child(6){
          background: #5ab027;
          animation-delay:1s;
        }
        &:nth-child(7){
          background: #a0b61e;
          animation-delay:1.2s;
        }
      }
    }
  }
}
// 旋转图标
@keyframes loadingAnimat {
  from{transform: scale(0.5) rotate(90deg);;}
  to{transform: scale(0.5) rotate(360deg);;}
}
@keyframes loadingAnimat1 {
  from{transform: scale(0.8) rotate(270deg);}
  to{transform: scale(0.8) rotate(0deg);}
}
// loading dot
@keyframes loadingText {
  to{color: #eee;}
}
@keyframes loadingFalsh {
  to{background: #fff;transform: scale(1.5);}
}
</style>
