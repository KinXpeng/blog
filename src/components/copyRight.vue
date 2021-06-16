<template>
  <div id="copyright">
    <p class="right-num">
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target='_blank'>津ICP备17007810号-1</a>
    </p>
    <p class="right-info">Designed and developed by KinXpeng.</p>
    <p class="right-info">Copyright&copy;2017-2021 kinxpeng.com. All Rights Reserved.</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#copyright{
  width:100%;
  height:100%;
  font-family: Georgia, 'Times New Roman', Times, serif;
  .right-num{
    width:100%;
    height:40px;
    text-align:center;
    line-height: 40px;
    font-weight: 300;
    a{
      margin:0 auto;
      color:#666;
    }
    a:hover{
      color:#000;
    }
  }
  .right-info{
    width:100%;
    height:20px;
    text-align: center;
    line-height: 20px;
    color:#333;
  }
}
</style>