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
          <li class="list-item" v-for="(item,index) in 6" :key="index">
            <p class="item-title">解决table中翻页序号连续递增的问题解决table中翻页序号连续递增的问题</p>
            <div class="item-desc flex">
              <span><i class="el-icon-view"></i>123</span>
              <span><i class="el-icon-time"></i>112</span>
              <span><i class="el-icon-chat-dot-round"></i>32</span>
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
    };
  },
  methods:{
  },
  created(){
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
      font-family: Georgia, 'Times New Roman', Times, serif;
      height:32px;
      line-height: 16px;
    }
    .item-desc{
      margin-top:6px;
      span{
        flex:1;
        i{
          margin-right: 2px;
        }
      }
    }
  }
}
</style>
