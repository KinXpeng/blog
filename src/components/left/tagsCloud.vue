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
          <li v-show="(item.tags) && (item.category!='moment')" v-for="(item,index) in cloudList" :key="index" @click="handleCloudItem(item)">{{item.tags}}</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cloudList:[],
    };
  },
  methods:{
    // 单个标签点击
    handleCloudItem(item){
      this.$router.push({name:'articleList'});
      this.resetSetItem('tagsCloud',item.tags);
    },
    // tags列表
    async initTagsList(){
      await this.$axios.post("/blog-api/article/tagsInfo")
        .then((res)=>{
          if(res.data.code == 0){
            // console.log(res);
            this.cloudList = res.data.data;
          }
        })
        .catch((err)=>{
          console.log(err);
        })
    },
  },
  created(){
    this.initTagsList(); // 初始化标签云
  },
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/dark.scss';
.tags-cloud{
  .cloud-title{
    font-size: 15px;
    border-bottom:1px solid #f2f2f2;
    @include border_bottom_style("border_bottom_style");
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
        @include border_style("border_style1");
        padding:2px 3px;
        margin:3px 3px;
        font-size: 12px;
        color:#333;
        @include font_color("text-color");
        cursor: default;
        transition: .5s;
        &:hover{
          // border:1px solid skyblue;
          @include border_style("border_style2");
        }
      }
    }
  }
}
</style>
