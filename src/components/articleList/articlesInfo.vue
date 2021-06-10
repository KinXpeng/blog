<template>
  <div class="article-item">
    <div class="article-card">
      <el-card v-for="(item, index) in articleList" :key="index">
        <!-- header -->
        <div class="article-header flex">
          <div class="header-img shadow">
            <el-image
              style="width: 46px; height: 46px"
              :src="item.imgUrl"
              fit="cover"
            ></el-image>
          </div>
          <!-- author -->
          <div class="header-desc">
            <p class="desc-author">{{ item.author }}</p>
            <p class="desc-date">{{ item.date }}</p>
          </div>
        </div>
        <!-- article_desc -->
        <div class="article-desc">{{ item.articleInfo }}</div>
        <!-- icon -->
        <div class="article-icon flex">
          <span><i class="el-icon-view"></i>123</span>
          <span><i class="el-icon-time"></i>112</span>
          <span><i class="el-icon-chat-dot-round"></i>32</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: [
        {
          title: "",
          author: "Author",
          imgUrl: require("../../assets/images/head_img.jpeg"),
          articleInfo: "1231231231231231231你在a你aa速度我去e，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局。",
          date: "1分钟前",
        },
        {
          title: "",
          author: "Author",
          imgUrl: require("../../assets/images/head_img.jpeg"),
          articleInfo: "1231231231231231231你在a你aa速度我去e，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局，测试文章内容布局。",
          date: "1分钟前",
        },
      ],
    };
  },
  methods: {},
  created() {
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/dark.scss";
.article-item {
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
    // article-desc
    .article-desc{
      padding:10px 0;
      font-size: 12px;
      line-height:18px;
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
}
</style>
