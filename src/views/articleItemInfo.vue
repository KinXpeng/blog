<template>
  <div class="article-item-info">
    <loading-area  v-show="loadingFlag"></loading-area>
    <!-- article-info -->
    <div class="article-info" v-show="!loadingFlag">
      <!-- location -->
      <el-card class="now-location">
        <div v-if="articleList[0]" class="location-info flex">
          <span>当前位置：</span>
          <span class="location-desc" @click="backArticleList">首页</span>
          <i class="el-icon-arrow-right"></i>
          <span v-text="(articleList[0].category=='article')?'文章':'说说'"></span>
          <i class="el-icon-arrow-right"></i>
          <span class="location-title">{{articleList[0].title}}</span>
        </div>
      </el-card>
      <!-- desc -->
      <el-card>
        <!-- back -->
        <div v-if="false" class="info-back" @click="backArticleList">
          <i class="el-icon-arrow-left back"></i>
        </div>
        <!-- info -->
        <div class="info-desc" v-if="articleList.length>0">
          <div class="info-title">{{articleList[0].title}}</div>
          <div class="info-tags">
            <div class="tags-top flex">
              <svg class="icon-svg">
                <use v-if="articleList[0].category=='article'" xlink:href="#icon-biaoqian1"></use>
                <use v-else-if="articleList[0].category=='moment'" xlink:href="#icon-biaoqian2"></use>
                <use v-else xlink:href="#icon-biaoqian3"></use>
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
      <!-- opertion -->
      <el-card class="article-opertion">
        <div v-if="articleList[0]" class="opertion-item flex">
          <p @click="handleThumbs(articleList[0])">
            <svg class="icon-svg">
              <use xlink:href="#icon-dianzan"></use>
            </svg>
            <span>点赞({{articleList[0].thumbs}})</span>
          </p>
          <p>
            <svg class="icon-svg">
              <use xlink:href="#icon-qiandai"></use>
            </svg>
            <span>打赏</span>
          </p>
          <p>
            <svg class="icon-svg">
              <use xlink:href="#icon-pinglun"></use>
            </svg>
            <span>评论</span>
          </p>
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
      articleList:[],
      loadingFlag:false,
      article_id:'',
    };
  },
  methods:{
    // 数据初始化
    async getInitArticleList(){
      let queryData = {
        article_id:this.article_id,
        title:"",
        tags:"", 
        create_time:"",
        category:"",
        page:1,
        rows:1,
      };
      this.loadingFlag = true;
      await this.$axios.post('/blog-api/article/list',queryData)
        .then((res)=>{
          this.loadingFlag = false;
          if(res.data.code == 0){
            res.data.data.data.forEach((ele)=>{ // 返回时间处理
              let createTime = ele.create_time.split('T');
              ele.create_time = createTime[0] +' '+ createTime[1].split('.')[0];
            })
            // console.log(res.data.data);
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
    // 返回
    backArticleList(){
      this.$router.push({path:'/'});
      // this.$router.go(-1);
    },
    // 点赞
    async handleThumbs(articleInfo){
      if(sessionStorage.getItem('thumbs')){
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
            sessionStorage.setItem('thumbs',false);
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
  },
  created(){
    this.article_id = sessionStorage.getItem('articleId');
    this.getInitArticleList(); // 数据初始化
    window.addEventListener('setItem',()=>{
      if(this.article_id != sessionStorage.getItem('articleId')){
        this.article_id = sessionStorage.getItem('articleId');
        this.getInitArticleList();
      }
    })
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
    // now-location
    .now-location{
      font-size: 14px;
      margin-bottom: 8px;
      .location-info{
        height:22px;
        line-height:22px;
        .location-title{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 300px;
        }
        .location-desc{
          &:hover{
            color:#53bdf9;
          }
          cursor: pointer;
        }
      }
      i{
        height:22px;
        line-height:22px;
      }
    }
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
    // article-opertion
    .article-opertion{
      margin:8px 0;
      .opertion-item{
        &>p{
          flex:1;
          height:30px;
          text-align: center;
          line-height: 30px;
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
            margin:5px;
          }
          span{
            display: inline-block;
            vertical-align: top;
          }
        }
      }
    }
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