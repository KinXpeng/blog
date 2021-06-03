<template>
  <div class="avatar-info el-card">
    <div class="avatar-back"></div>
    <div class="avatar-desc"></div>
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
.avatar-info{
  .avatar-back{
    // border:1px solid red;
    width:100%;
    height:60px;
    background:url('../../assets/images/blog_xiamu.jpeg') center/cover;
  }
  .avatar-desc{
    width:100%;
    height:120px;
  }
}
</style>
