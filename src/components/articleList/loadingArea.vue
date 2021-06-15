<template>
  <div class="loading-area">
    <div class="loading-icon">
      <svg class="icon-svg icon1">
        <use xlink:href="#icon-fsux_banyuanhuantu"></use>
      </svg>
      <svg class="icon-svg icon2">
        <use xlink:href="#icon-fsux_banyuanhuantu"></use>
      </svg>
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
  height:40px;
  line-height: 40px;
  margin-bottom: 8px;
  text-align: center;
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
      transform: scale(0.6) rotate(90deg);
      animation: loadingAnimat 1s linear infinite alternate;
    }
    .icon2{
      transform: rotate(270deg);
      animation: loadingAnimat1 1s linear infinite alternate;
    }
  }
}
@keyframes loadingAnimat {
  from{transform: scale(0.6) rotate(90deg);;}
  to{transform: scale(0.6) rotate(360deg);;}
}
@keyframes loadingAnimat1 {
  from{transform: rotate(270deg);}
  to{transform: rotate(0deg);}
}
</style>
