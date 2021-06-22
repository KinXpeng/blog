<template>
  <div class="article-item">
    <!-- loading-area -->
    <loading-area v-show="loadingFlag"></loading-area>
    <div class="nodata" v-show="(articleList.length==0)&&!loadingFlag">没有找到想要的结果哦</div>
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
        <div class="article-title flex">
          <div class="title-info">{{item.title}}</div>
          <div class="title-brand flex">
            <span>新</span>
            <!-- <span>荐</span> -->
          </div>
        </div>
        <!-- article-info -->
        <div class="article-info markdown-body" v-html="item.content"></div>
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
      tags:'',
      articleList: [], // 返回的文章列表
      loadingFlag:false,
      initApi:'',
      queryData:{},
      total:0,
      page:1,
    };
  },
  computed:{
    searchVal(){
      return this.$store.state.searchValue
    },
  },
  watch:{
    searchVal:{
      handler(newVal,oldVal){
        this.tags = '';
        this.getInitArticleList(newVal);
      }
    }
  },
  methods: {
    // 页码 
    handleCurrentChange(page){
      this.page = page;
      this.getInitArticleList(this.searchVal);
    },
    // 数据初始化
    async getInitArticleList(searchVal){
      if(searchVal){ // 模糊搜索时
        this.initApi = '/blog-api/article/likeSearch';
        this.queryData = {
          likeValue:searchVal,
          page:this.page,
          rows:5
        };
      }else{ // 初始化查询
        this.initApi = '/blog-api/article/listMoments';
        this.queryData = {
          article_id:"",
          title:"",
          tags:"", 
          create_time:"",
          category:"moments",
          page:this.page,
          rows:5,
        };
      }
      this.loadingFlag = true;
      await this.$axios.post(this.initApi,this.queryData)
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
          this.$notify({
            type:'error',
            position:'top-right',
            message:'网络开小差了哦，请稍后再尝试！'
          })
          console.log(err);
        })
    },
  },
  created() {
    this.getInitArticleList(this.searchVal); // 数据初始化
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
      @include font_color("text-color1");
      .title-brand{
        margin-left:10px;
        span{
          position: relative;
          top:-1px;
          background: rgb(105, 165, 14);
          border-radius: 3px;
          font-size: 12px;
          color:#fff;
          padding:2px;
          cursor: default;
          margin-right: 5px;
          &:nth-child(2){
            background: rgb(146, 189, 224);
          }
        }
      }
      
    }
    // article-info
    .article-info{
      padding-bottom:8px;
      margin-bottom:10px;
      font-size: 12px;
      @include font_color("text-color");
      line-height:16px;
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

  // nodata
  .nodata{
    text-align:center;
    margin-bottom:8px;
    color:#666;
    line-height:150px;
  }
}

// 滚动条部分
// pre
/deep/ pre::-webkit-scrollbar {
  width: 10px;
  height: 0;
}
/deep/ .markdown-body:hover pre::-webkit-scrollbar {
  width: 10px;
  height: 4px;
}
/deep/ pre::-webkit-scrollbar-thumb { //滑块部分
  border-radius: 5px;
  background-color: #aaa;
}
/deep/ pre::-webkit-scrollbar-track { //轨道部分
  @include background_color("background_color2");
  border-radius: 5px;
}

// hljs
/deep/ pre .hljs::-webkit-scrollbar {
  width: 10px;
  height: 0;
}
/deep/ .markdown-body:hover pre .hljs::-webkit-scrollbar {
  width: 10px;
  height: 4px;
}
/deep/ pre .hljs::-webkit-scrollbar-thumb { //滑块部分
  border-radius: 5px;
  background-color: #aaa;
}
/deep/ pre .hljs::-webkit-scrollbar-track { //轨道部分
  @include background_color("background_color2");
  border-radius: 5px;
}
</style>
