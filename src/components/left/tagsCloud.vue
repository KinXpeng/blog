<template>
  <div class="tags-cloud">
    <el-card>
      <div slot="header" class="clearfix cloud-title flex">
        <svg class="icon-svg">
          <use xlink:href="#icon-biaoqian"></use>
        </svg>
        <span>标签云</span>
      </div>
      <div class="cloud-list">
        12312
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
.tags-cloud{
  .cloud-title{
    font-size: 15px;
    .icon-svg{
      width:20px;
      height:20px;
    }
    span{
      line-height: 20px;
      margin-left:10px;
    }
  }
  .cloud-list{
    font-size: 14px;
  }
}
</style>
