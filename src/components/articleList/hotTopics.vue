<template>
  <div class="hot-item">
    <!-- loading-area -->
    <loading-area v-show="loadingFlag"></loading-area>
    <div class="nodata" v-show="(articleList.length==0)&&!loadingFlag">没有找到想要的结果哦</div>
    <!-- hot-card -->
    <div class="hot-card">
      <el-card v-for="(item, index) in articleList" :key="index">
        <!-- header -->
        <div class="hot-header flex">
          <div class="header-img shadow">
            <el-image
              style="width: 46px; height: 46px"
              :src="require('../../assets/images/head_img.jpeg')"
              fit="cover"
            ></el-image>
          </div>
          <!-- author -->
          <div class="header-desc">
            <p class="desc-author">倾倾倾风</p>
            <p class="desc-date">{{ item.create_time }}</p>
          </div>
        </div>
        <!-- hot-title -->
        <div class="hot-title flex">
          <div class="title-info">{{item.title}}</div>
          <div class="title-brand flex">
            <span title="转载，侵权删">转</span>
            <!-- <span>荐</span> -->
          </div>
        </div>
        <!-- hot-info -->
        <div class="hot-info markdown-body" v-html="item.content"></div>
        <!-- hot-thumbs -->
        <div class="hot-thumbs">
          <div v-if="item" class="thumbs-item flex">
            <p @click="handleThumbs(item)">
              <svg class="icon-svg">
                <use xlink:href="#icon-dianzan"></use>
              </svg>
              <span>点赞({{item.thumbs}})</span>
            </p>
            <p @click="handleComments(item)">
              <svg class="icon-svg">
                <use xlink:href="#icon-pinglun"></use>
              </svg>
              <span>评论</span>
            </p>
            <p @click="handleComments(item)">
              <svg class="icon-svg">
                <use xlink:href="#icon-xingtuxuetang-fenxiang-"></use>
              </svg>
              <span>分享</span>
            </p>
          </div>
        </div>
      </el-card>
    </div>
    <!-- pagination -->
    <div class="pagination el-card">
      <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        :page-size="1">
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
      thumbsFlag:false, // 是否点赞
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
          article_id:"",
          title:"",
          tags:"", 
          create_time:"",
          category:"hot",
          page:this.page,
          rows:1,
        };
      }
      this.loadingFlag = true;
      await this.$axios.post(this.initApi,this.queryData)
        .then((res)=>{
          this.loadingFlag = false;
          if(res.data.code == 0){
            res.data.data.data.forEach((ele)=>{ // 返回时间处理
              let time = ele.create_time.split('T');
              ele.create_time = time[0] +" "+time[1].split('.')[0];
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
    // 点赞
    async handleThumbs(articleInfo){
      let thumbsArray = JSON.parse(sessionStorage.getItem('thumbsArr'));
      if(thumbsArray && thumbsArray.length>0){
        thumbsArray.forEach((ele)=>{
          if(ele == articleInfo.article_id){
            this.thumbsFlag = true;
          }
        })
      }
      if(JSON.parse(sessionStorage.getItem('thumbs')) && this.thumbsFlag){
        this.$notify({
          type:'error',
          position:'top-right',
          message:'您已经点过赞啦'
        })
      }else{
        articleInfo.thumbs++;
        await this.$axios.post("/blog-api/article/thumbs",{
          article_id:articleInfo.article_id,
          thumbs:articleInfo.thumbs
        })
          .then((res)=>{
            if(res.data.code == 0){
              this.$notify({
                type:'success',
                position:'top-right',
                message:'感谢您的点赞哦'
              })
            }
            sessionStorage.setItem('thumbs',true);
            if(JSON.parse(sessionStorage.getItem('thumbsArr')) == undefined || JSON.parse(sessionStorage.getItem('thumbsArr')) == null){
              sessionStorage.setItem('thumbsArr',JSON.stringify([articleInfo.article_id]));
            }else{
              let thumbsArr1 = JSON.parse(sessionStorage.getItem('thumbsArr'));
              thumbsArr1.push(articleInfo.article_id);
              sessionStorage.setItem('thumbsArr',JSON.stringify(thumbsArr1));
            }
          })
          .catch((err)=>{
            console.log(err);
            this.$notify({
              type:'error',
              position:'top-right',
              message:'可能出了一点点小差错呢'
            })
          })
      }
    },
    // 评论
    handleComments(articleInfo){
      this.$notify({
        type:'info',
        position:'top-right',
        message:'开发中，敬请期待。。。'
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
.hot-item {
  // hot-card
  .hot-card {
    .el-card{
      margin-bottom:8px;
    }
    // hot-header
    .hot-header {
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
    // hot-title
    .hot-title{
      padding:10px 0;
      @include font_color("text-color1");
      .title-info{
        font-size: 14px;
      }
      .title-brand{
        margin-left:10px;
        span{
          position: relative;
          top:-1px;
          background: rgb(208, 88, 245);
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
    // hot-info
    .hot-info{
      padding-bottom:8px;
      margin-bottom:10px;
      font-size: 12px;
      @include font_color("text-color");
      line-height:16px;
    }
    // hot-thumbs
    .hot-thumbs{
      padding:4px 0;
    }
    .thumbs-item{
      &>p{
        flex:1;
        height:20px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        cursor: pointer;
        @include border_right_style("border_right_style");
        &:last-child{
          border-right:none !important;
        }
        &:hover{
          color:#53bdf9;
        }
        .icon-svg{
          width:20px;
          height:20px;
          margin:0 3px;
        }
        span{
          display: inline-block;
          vertical-align: top;
        }
      }
    }
    // markdown-body
    .markdown-body{
      @include font_color("text-color");
      // @include background_color("background_color");
      /deep/ pre{
        font-size: 12px;
        @include background_color("background_color6");
      }
      /deep/ .hljs-center{
        font-size: 13px;
        line-height:20px;
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
