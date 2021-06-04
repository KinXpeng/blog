<template>
  <div class="tags-cloud">
    <el-card>
      <div class="cloud-title flex">
        <svg class="icon-svg">
          <use xlink:href="#icon-biaoqian"></use>
        </svg>
        <span>标签云</span>
      </div>
      <div class="cloud-list">
        <ul class="list-box flex">
          <li v-for="(item,index) in cloudList" :key="index" @click="handleCloudItem(item)">{{item.cloudName}}</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cloudList:[
        {cloudName:"Vue"},
        {cloudName:"前端"},
        {cloudName:"javascript"},
        {cloudName:"html"},
        {cloudName:"WordPress"},
        {cloudName:"腾讯云"},
        {cloudName:"小程序"},
        {cloudName:"uni-app"},
        {cloudName:"pc端rem"},
        {cloudName:"移动端"},
        {cloudName:"h5"},
        {cloudName:"css3"},
        {cloudName:"nodejs"},
        {cloudName:"服务器"},
        {cloudName:"elementui"},
        {cloudName:"vant"},
        {cloudName:"echarts"},
        {cloudName:"swiper"},
        {cloudName:"less"},
        {cloudName:"scss"},
        {cloudName:"github"},
        {cloudName:"easyUI"},
      ],
    };
  },
  methods:{
    // 单个标签点击
    handleCloudItem(item){
      console.log(item.cloudName);
    },
  },
  created(){
  },
};
</script>

<style lang='scss' scoped>
.tags-cloud{
  .cloud-title{
    font-size: 15px;
    border-bottom:1px solid #f2f2f2;
    padding-bottom: 10px;
    margin-bottom: 10px;
    .icon-svg{
      width:18px;
      height:18px;
    }
    span{
      line-height: 20px;
      margin-left:10px;
    }
  }
  .cloud-list{
    font-size: 14px;
    .list-box{
      flex-wrap: wrap;
      li{
        border:1px solid #ddd;
        padding:2px 3px;
        margin:3px 3px;
        font-size: 12px;
        color:#333;
        cursor: default;
        transition: .5s;
        &:hover{
          border:1px solid skyblue;
        }
      }
    }
  }
}
</style>
