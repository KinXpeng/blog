<template>
  <div class="article-item-info">
    <loading-area  v-show="loadingFlag"></loading-area>
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
              <svg class="icon-svg">
                <use xlink:href="#icon-shuben"></use>
              </svg>
              <span class="tags-name">KinXpeng</span>
              <span>{{articleList[0].create_time}}</span>
            </div>
            <div class="tag-bottom flex">
              <p class="bottom-category">分类栏目：<span class="tag-button">{{articleList[0].category}}</span></p>
              <p class="bottom-tags">文章标签：<span class="tag-button">{{articleList[0].tags}}</span></p>
            </div>
          </div>
          <div class="markdown-body" v-html="articleList[0].content"></div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import loadingArea from '../components/articleList/loadingArea.vue';
export default {
  components: { loadingArea },
  data() {
    return {
      articleId:'',
      articleList:[],
      loadingFlag:false,
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
      this.loadingFlag = true;
      await this.$axios.post('/blog-api/article/list',queryData)
        .then((res)=>{
          this.loadingFlag = false;
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
          this.loadingFlag = false;
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
    }// info-tags
    .info-tags{
      height:50px;
      line-height: 25px;
      font-size: 12px;
      border-radius: 4px;
      margin:10px 0;
      padding:0 10px;
      @include background_color("background_color6");
      .tags-top{
        .icon-svg{
          width:20px;
          height:20px;
          margin:4px 4px 0 0;
        }
        .tags-name{
          margin:0 10px 0 0;
          color:#b59551;
        }
      }
      .tag-bottom{
        p{
          padding:0 5px;
          .tag-button{
            @include border_style("border_style3");
            border-radius: 2px;
            padding:0 3px;
            color:#75c1ea;
            @include background_color("background_color");
          }
        }
      }
    }
    .info-title{
      font-size:20px;
      text-align:center;
      line-height:30px;
      font-weight: bold;
      @include font_color("text-color1");
    }
    // markdown-body
    .markdown-body{
      @include font_color("text-color1");
      @include background_color("background_color");
      /deep/ pre{
        font-size: 12px;
        @include background_color("background_color6");
      }
    }
  }
}
// /deep/ pre::-webkit-scrollbar{
//   display: none;
// }
</style>