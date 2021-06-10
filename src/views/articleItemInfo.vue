<template>
  <div class="article-item-info">
    <!-- article-info -->
    <div class="article-info">
      <el-card>
        <div class="info-back" @click="backArticleList">
          <i class="el-icon-arrow-left back"></i>
        </div>
        <div class="info-desc" v-if="articleList.length>0">
          <div class="info-title">{{articleList[0].title}}</div>
          <div class="info-tags">
            <div class="tags-top flex">
              <span>{{articleList[0].create_time}}</span>
            </div>
          </div>
          <div class="markdown-body" v-html="articleList[0].content"></div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleId:'',
      articleList:[],
    };
  },
  methods:{
    // 数据初始化
    async getInitArticleList(){
      let queryData = {
        article_id:sessionStorage.getItem('articleId'),
        title:"",
        tags:"", 
        create_time:"",
        category:""
      };
      await this.$axios.post('/blog-api/article/list',queryData)
        .then((res)=>{
          if(res.data.code == 0){
            res.data.data.forEach((ele)=>{ // 返回时间处理
              let createTime = ele.create_time.split('T');
              ele.create_time = createTime[0] +' '+ createTime[1].split('.')[0];
            })
            // console.log(res.data.data);
            this.articleList = res.data.data;
          }else{
            this.$notify({
              type:'error',
              position:'top-right',
              message:res.data.msg
            })
          }
        })
        .catch((err)=>{
          console.log(err);
        })
    },
    // 返回
    backArticleList(){
      this.$router.push({path:'/'});
    },
  },
  created(){
    this.getInitArticleList(); // 数据初始化
  },
};
</script>

<style lang='scss' scoped>
@import "@/assets/scss/dark.scss";
.article-item-info{
  width:97%;
  margin:0 auto;
  // article-info
  .article-info{
    .info-back{
      width:25px;
      height:25px;
      line-height: 25px;
      text-align: center;
      transition: .5s;
      cursor: pointer;
      &:hover{
        @include background_color("background_color3");
      }
    }
    .info-tags{
      height:50px;
      line-height: 25px;
      font-size: 12px;
      border-radius: 4px;
      margin:10px 0;
      padding:0 10px;
      background: #f6f8fa;
    }
    .info-title{
      font-size:20px;
      text-align:center;
      line-height:30px;
      font-weight: bold;
    }
  }
}
</style>
