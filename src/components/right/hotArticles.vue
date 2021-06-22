<template>
  <div class="hot-articles">
    <el-card>
      <div class="article-title flex">
        <svg class="icon-svg">
          <use xlink:href="#icon-dushu"></use>
        </svg>
        <span class="title-info">热门文章</span>
      </div>
      <div class="articles-list">
        <ul>
          <li class="list-item" v-for="(item,index) in hotArticleList" :key="index" @click="hotArticleInfo(item.article_id)">
            <p class="item-title">{{item.title}}</p>
            <div class="item-desc flex">
              <span><i class="el-icon-view"></i>{{item.view_count}}</span>
              <span><i class="el-icon-time"></i>{{item.create_time}}</span>
              <span><i class="el-icon-chat-dot-round"></i>0</span>
            </div>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotArticleList:[],
    };
  },
  methods:{
    // 数据初始化
    async getInitArticleList(){
      let queryData = {
        article_id:"",
        title:"",
        tags:"", 
        create_time:"",
        category:"article",
        page:1,
        rows:10,
      };
      await this.$axios.post('/blog-api/article/list',queryData)
        .then((res)=>{
          if(res.data.code == 0){
            res.data.data.data.forEach((ele)=>{ // 返回时间处理
              ele.create_time = ele.create_time.split('T')[0];
            })
            // console.log(res.data.data);
            this.hotArticleList = res.data.data.data;
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
    // 点击查看文章详情
    hotArticleInfo(hotId){
      this.resetSetItem('articleId',hotId);
      this.$router.push({name:'articleItemInfo'});
    },
  },
  created(){
    this.getInitArticleList(); // 初始化数据
  },
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/dark.scss';
.hot-articles{
  margin-bottom: 8px;
  // title
  .article-title{
    @include border_bottom_style("border_bottom_style");
    padding-bottom: 10px;
    .icon-svg{
      width:18px;
      height:18px;
      cursor: default;
    }
    .title-info{
      margin-left: 10px;
      font-size: 14px;
      line-height: 18px;
      cursor: default;
    }
  }
  // articles-list
  .articles-list{
    padding-top:10px;
    font-size: 12px;
    .list-item{
      position: relative;
      left:0;
      cursor: pointer;
      padding: 3px;
      transition: .5s;
      @include border_bottom_style("border_bottom_style1");
      &:hover{
        left:3px;
        @include box_shadow("box_shadow");
      }
    }
    .list-item:last-child{
      border:none !important;
    }
    .item-title{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      // white-space: nowrap;
      // font-family: Georgia, 'Times New Roman', Times, serif;
      height:32px;
      line-height: 16px;
    }
    .item-desc{
      margin-top:6px;
      span{
        // flex:1;
        margin:0 3px;
        transform: scale(0.9);
        i{
          margin-right: 2px;
        }
      }
    }
  }
}
</style>
