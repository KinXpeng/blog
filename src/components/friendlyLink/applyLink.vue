<template>
  <div class="link-intro">
    <el-card>
      <p class="link-title">申请友链</p>
      <div class="link-line">
        <p class="link-line-border"></p>
      </div>
      <!-- 申请信息 -->
      <div class="apply-info">
        此功能正在紧急开发中。。。
      </div>
    </el-card>
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
@import '@/assets/scss/dark.scss';
.link-intro{
  margin:8px 0;
  .link-title{
    font-size: 18px;
    line-height:24px;
    text-align: center;
    font-family:'Chasing-Light';
    color:transparent;
    background-clip: text;
    background-image:  linear-gradient(to right, #091c85, #152ae0,#67b1f7,#3502f0,#11076e);
  }
  // 标题线
  .link-line{
    width:50%;
    margin:10px auto;
    .link-line-border{
      height:2px;
      margin:4px 0;
      background-image:  linear-gradient(to right, #091c85, #152ae0,#67b1f7,#3502f0,#11076e);
    }
  }
  // 申请信息
  .apply-info{
    text-align: center;
  }
}
</style>
