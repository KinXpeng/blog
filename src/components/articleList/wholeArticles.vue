<template>
  <div class="article-item">
    <!-- loading-area -->
    <loading-area v-show="loadingFlag"></loading-area>
    <div class="nodata" v-show="(articleList.length==0)&&!loadingFlag">没有找到想要的结果哦</div>
    <!-- article-card -->
    <div class="article-card">
      <el-card v-for="(item, index) in articleList" :key="index">
        <!-- article-title -->
        <div class="article-title flex" @click="lookArticleInfo(item)">
          <div class="title-info"><span class="title-sigh"># </span>{{item.title}}</div>
        </div>
        <p class="title-line"></p>
        <!-- article-info -->
        <div class="article-info" v-html="item.content"></div>
        <!-- icon -->
        <div class="article-icon flex">
          <div class="flex">
            <span><i class="el-icon-view"></i>{{item.view_count}}</span>
            <!-- <span><i class="el-icon-position"></i>{{item.tags}}</span> -->
            <!-- <span><i class="el-icon-chat-line-round"></i>0</span> -->
          </div>
          <p class="desc-date"><i class="el-icon-time"></i> {{ item.modify_time }}</p>
        </div>
      </el-card>
    </div>
    <!-- pagination -->
    <div class="pagination el-card">
      <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        :page-size="10">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import loadingArea from './loadingArea.vue';
import hljs from '@/assets/js/highlight.js'
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
          rows:10
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
          rows:10,
        };
      }
      this.loadingFlag = true;
      await this.$axios.post(this.initApi,this.queryData)
        .then((res)=>{
          this.loadingFlag = false;
          if(res.data.code == 0){
            res.data.data.data.forEach((ele)=>{ // 返回时间处理
              ele.create_time = ele.create_time.split('T')[0];
              ele.modify_time = ele.modify_time.split('T')[0];
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
    lookArticleInfo(data){
      if(data.category == 'article'){
        this.$router.push({path:'/articleItemInfo/'+data.article_id});
      }else if(data.category == 'hot'){
        this.bus.$emit('switchTab','hot');
      }else{
        this.bus.$emit('switchTab','moment');
      }
      
    },
    // 高亮代码
    async highlighthandle(){
      await hljs;
      let highlight = document.querySelectorAll('code,pre');
      highlight.forEach((block)=>{
        hljs.highlightBlock(block);
      })
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
  mounted(){
    this.highlighthandle();
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
    // article-title
    .article-title{
      padding:5px 0px 10px;
      font-size: 18px;
      .title-info{
        cursor: pointer;
        font-weight: bold;
        font-family: 'Times New Roman', Times, serif;
        // @include font_color("text-color1");
        color:#317adf;
        transition: .5s;
        &:hover{
          // color:#e4524a !important;
          font-size:19px;
        }
        .title-sigh{
          display: inline-block;
          font-family:unset;
          transform: scale(1.2);
          margin-right:5px;
        }
      }
    }
    // title-line
    .title-line{
      width:10%;
      height:2px;
      margin:5px 0 10px;
      border-bottom:3px solid rgba(0, 120, 231, 0.1);
    }
    // article-info
    .article-info{
      overflow: hidden;
      height:128px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      // -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      padding-bottom:8px;
      margin-bottom:10px;
      font-size: 12px;
      font-style: italic;
      // font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      @include font_color("text-color");
      line-height:16px;
      /deep/.hljs{
        @include background_color("background_color8");
      }
    }
    // article-icon
    .article-icon{
      justify-content: space-between;
      span{
        padding-right:40px;
        font-size: 12px;
        color:#7e8081;
        &:hover{
          color:#317adf;
          cursor: default;
        }
        i{
          margin-right: 2px;
        }
      }
      .desc-date{
        font-size: 12px;
        transform: scale(.9);  
        transform-origin: 0 0;
      }
    }
  }
  // pagination
  .pagination{
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
