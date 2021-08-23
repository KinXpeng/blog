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
          <li :style="'background:'+changeTagsStyle()" v-show="(item.tags) && (item.category!='moment')" v-for="(item,index) in cloudList" :key="index" @click="handleCloudItem(item)">{{item.tags}}</li>
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
    // tags背景色
    changeTagsStyle(){
      let r = Math.round(Math.random()*255);
      let g = Math.round(Math.random()*255);
      let b = Math.round(Math.random()*255);
      let a = JSON.parse((Math.random()*0.8).toFixed(1))+0.2;
      return 'rgba('+r+','+g+','+b+','+a+')';
    },
  },
  created(){
    this.initTagsList(); // 初始化标签云
    // this.changeTagsStyle(); // 初始化标签背景色
  },
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/dark.scss';
.tags-cloud{
  width:100%;
  font-family: Georgia, Times, 'Times New Roman', serif;
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
        // @include border_style("border_style1");
        padding:3px 4px;
        margin:3px 3px;
        font-size: 12px;
        color:#fff;
        border-radius: 2px;
        // @include font_color("text-color");
        cursor: pointer;
        transition: .5s;
        &:hover{
          // border:1px solid skyblue;
          // @include border_style("border_style2");
          box-shadow: 1px 1px 2px #ccc;
        }
      }
    }
  }
}
</style>
