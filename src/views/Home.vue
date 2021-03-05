<template>
  <div class="home">
    <el-container>
      <el-aside width="28.5%"> 
        <avatar></avatar>
      </el-aside>
      <el-container class="content">
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import avatar from '../components/avatar.vue'

export default {
  components: { avatar },
  
}
</script>
<style lang="scss" scoped>
.home{
  min-width:900px;
  .el-aside{
    height:100vh;
  }
  .content{
    position: relative;
    width:71.5%;
    height:100vh;
    background:url('../assets/imgs/timer.jpeg') fixed center/cover;
    .el-footer{
      position:absolute;
      right:0;
      bottom: 0;
      width:100%;
      height:20%;
      border:1px solid red;
    }
  }
}
</style>
