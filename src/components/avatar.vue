<template>
  <div class="avatar">
    <div class="head_back">
      <div class="head_img">
        <img :src="require('../assets/imgs/head_img.jpeg')" alt="">
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
.avatar{
  height:25vh;
  min-height: 150px;
  max-height: 210px;
  .head_back{
    width:100%;
    height:100%;
    background:url('../assets/imgs/blog_xiamu.jpeg') center/cover;
    .head_img{
      position: relative;
      top:6vw;
      left:6vw;
      overflow: hidden;
      width:16vw;
      height:16vw;
      border-radius: 50%;
      border:4px solid #fff;
      box-shadow: 5px 5px 10px #aaa;
      transition: .5s;
      &:hover{
        border:4px solid rgb(84, 190, 249);
        transform: scale(.5);
      }
      img{
        width:100%;
        height:100%;
      }
    }
  }
}
</style>
