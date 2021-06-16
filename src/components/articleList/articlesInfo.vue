<template>
  <div class="article-item">
    <!-- loading-area -->
    <loading-area v-show="loadingFlag"></loading-area>
    <!-- article-card -->
    <div class="article-card">
      <el-card v-for="(item, index) in articleList" :key="index">
        <!-- header -->
        <div class="article-header flex">
          <div class="header-img shadow">
            <el-image
              style="width: 46px; height: 46px"
              :src="require('../../assets/images/head_img.jpeg')"
              fit="cover"
            ></el-image>
          </div>
          <!-- author -->
          <div class="header-desc">
            <p class="desc-author">KinXpeng</p>
            <p class="desc-date">{{ item.create_time }}</p>
          </div>
        </div>
        <!-- article-title -->
        <div class="article-title" @click="lookArticleInfo(item.article_id)">{{item.title}}</div>
        <!-- article-info -->
        <div class="article-info" v-html="item.content"></div>
        <!-- icon -->
        <div class="article-icon flex">
          <span><i class="el-icon-view"></i>123</span>
          <span><i class="el-icon-price-tag"></i>{{item.tags}}</span>
          <span><i class="el-icon-orange"></i>{{item.category}}</span>
        </div>
      </el-card>
    </div>
    <!-- pagination -->
    <div class="pagination el-card">
      <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        :page-size="5">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import loadingArea from './loadingArea.vue';
export default {
  components: { loadingArea },
  data() {
    return {
      articleId:'',
      articleList: [], // 返回的文章列表
      loadingFlag:false,
      total:0,
      page:1,
    };
  },
  methods: {
    // 页码 
    handleCurrentChange(page){
      this.page = page;
      this.getInitArticleList();
    },
    // 数据初始化
    async getInitArticleList(){
      let queryData = {
        article_id:this.articleId,
        title:"",
        tags:"", 
        create_time:"",
        category:"",
        page:this.page,
        rows:5,
      };
      this.loadingFlag = true;
      await this.$axios.post('/blog-api/article/list',queryData)
        .then((res)=>{
          this.loadingFlag = false;
          if(res.data.code == 0){
            res.data.data.data.forEach((ele)=>{ // 返回时间处理
              ele.create_time = ele.create_time.split('T')[0];
            })
            // console.log(res.data.data);
            this.total = res.data.data.records;
            this.articleList = res.data.data.data;
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
    // 查看文章明细
    lookArticleInfo(articleId){
      sessionStorage.setItem('articleId',articleId);
      this.$router.push({name:'articleItemInfo'});
    },
  },
  created() {
    this.getInitArticleList(); // 数据初始化
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/dark.scss";
.article-item {
  // article-card
  .article-card {
    .el-card{
      margin-bottom:8px;
    }
    // article-header
    .article-header {
      height: 50px;
      // header-img
      .header-img{
        width:50px;
        height:50px;
        border-radius: 50%;
        background: #fff;
        text-align: center;
        .el-image{
          margin-top:2px;
          border-radius: 50%;
        }
      }
      // header-desc
      .header-desc{
        padding-left:15px;
        line-height:25px;  
        .desc-author{
          font-size: 15px;
          @include font_color("text-color1");
        }
        .desc-date{
          font-size: 12px;
          transform: scale(.8);  
          transform-origin: 0 0;
        }
      }
    }
    // article-title
    .article-title{
      padding:10px 0 5px;
      font-size: 14px;
      cursor: pointer;
      &:hover{
        @include font_color("text-color1");
      }
    }
    // article-info
    .article-info{
      overflow: hidden;
      height:34px;
      padding-bottom:4px;
      margin-bottom:5px;
      font-size: 12px;
      color:#999aa9;
      line-height:16px;
    }
    // article-icon
    .article-icon{
      span{
        padding:0 10px;
        font-size: 12px;
        color:#bfc3c8;
        i{
          margin-right: 2px;
        }
      }
    }
  }
  // pagination
  .pagination{
    // border:1px solid red;
    text-align: center;
    .el-pagination{
      @include font_color("text-color");
      /deep/ button{
        @include font_color("text-color");
        @include background_color("background_color8");
      }
      /deep/ .el-pager{
        li{
          @include background_color("background_color8");
        }
      }
    }
  }
}
</style>
