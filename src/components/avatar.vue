<template>
  <div class="avatar">
    <div class="head_back">
      <div class="head_img">
        <img :src="require('../assets/imgs/head_img.jpeg')" alt="">
      </div>
    </div>
    <div class="head_name">
      <div class="username">倾倾倾风</div>
      <div class="introduction">一个爱鼓捣前端的产品汪！</div>
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
  height:30vw;
  min-height: 260px;
  max-height: 400px;
  border:1px solid red;
  .head_back{
    width:28.5vw;
    height:17.67vw;
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
  .head_name{
    margin-top:6vw;
    text-align: center;
    .username{
      color:#333;
      text-shadow: 5px 5px #ddd;
      font-size:1.4em;
      font-weight:lighter;
      font-family: 'Times New Roman','Microsoft yahei',
    }
    .introduction{
      margin-top:10px;
      color: lightseagreen;
      font-weight: lighter;
      font-size: 12px;
      font-family: 'Times New Roman','Microsoft yahei',
    }
  }
}
</style>
