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
        <div class="article-title flex" @click="lookArticleInfo(item.article_id)">
          <div class="title-info">{{item.title}}</div>
          <div class="title-brand flex">
            <span>原</span>
            <span v-show="page!=1">荐</span>
            <span v-if="page==1">新</span>
          </div>
        </div>
        <!-- article-info -->
        <div class="article-info" v-html="item.content"></div>
        <!-- icon -->
        <div class="article-icon flex">
          <span><i class="el-icon-view"></i>{{item.view_count}}</span>
          <span><i class="el-icon-orange"></i>{{item.tags}}</span>
          <span><i class="el-icon-chat-dot-round"></i>0</span>
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
  props:['category'],
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
        this.initApi = '/blog-api/article/list';
        this.queryData = {
          article_id:this.articleId,
          title:"",
          tags:this.tags, 
          create_time:"",
          category:this.category,
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
    // 查看文章明细
    lookArticleInfo(articleId){
      sessionStorage.setItem('articleId',articleId);
      this.$router.push({name:'articleItemInfo'});
    },
  },
  created() {
    this.getInitArticleList(this.searchVal); // 数据初始化
    window.addEventListener('setItem',()=>{
      if(this.tags != sessionStorage.getItem('tagsCloud')){
        this.tags = sessionStorage.getItem('tagsCloud');
        this.getInitArticleList('');
      }
    });
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
      .title-info{
        cursor: pointer;
        &:hover{
          @include font_color("text-color1");
        }
      }
      .title-brand{
        margin-left:10px;
        span{
          position: relative;
          top:-1px;
          background: salmon;
          border-radius: 3px;
          font-size: 12px;
          color:#fff;
          padding:2px;
          cursor: default;
          margin-right: 5px;
          &:nth-child(2){
            background: rgb(146, 189, 224);
          }
          &:nth-child(3){
            background: rgb(105, 165, 14);
          }
        }
      }
      
    }
    // article-info
    .article-info{
      overflow: hidden;
      height:34px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      padding-bottom:8px;
      margin-bottom:10px;
      font-size: 12px;
      @include font_color("text-color");
      line-height:16px;
    }
    // article-icon
    .article-icon{
      span{
        padding-right:40px;
        font-size: 12px;
        color:#b4b7b9;
        &:hover{
          color:#53bdf9;
          cursor: pointer;
        }
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

  // nodata
  .nodata{
    text-align:center;
    margin-bottom:8px;
    color:#666;
    line-height:150px;
  }
}
</style>
