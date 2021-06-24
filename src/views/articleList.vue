<template>
  <div class="article-list">
    <div class="article-header">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="全部" name="first">
          <whole-articles></whole-articles>
        </el-tab-pane>
        <el-tab-pane label="文章" name="second">
          <whole-articles :category="'article'"></whole-articles>
        </el-tab-pane>
        <el-tab-pane label="热门" name="third">
          <hot-topics></hot-topics>
        </el-tab-pane>
        <el-tab-pane label="说说" name="fourth">
          <moments-info></moments-info>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import HotTopics from '../components/articleList/hotTopics.vue';
import momentsInfo from '../components/articleList/momentsInfo.vue';
import wholeArticles from '../components/articleList/wholeArticles.vue';
export default {
  components: { wholeArticles, momentsInfo,  HotTopics },
  data() {
    return {
      activeName:'first',
    };
  },
  methods:{
    // 标签切换时
    handleTabClick(tab){ // 点击tab的时候刷新数据
      if(tab.$children[0]){
        tab.$children[0].tags = '';
        tab.$children[0].getInitArticleList();
      }
      this.$store.state.searchValue = '';
    },
  },
  created(){
  },
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/dark.scss';
.article-list{
  margin:0 auto;
  padding-top: 1px;
  .el-tabs{
    /deep/ .el-tabs__header{
      padding:3px 15px 0;
      border-radius: 4px;
      margin:0 8px;
      @include background_color("background_color");
      .el-tabs__nav-wrap::after{
        background: none;
      }
      .is-top{
        .el-tabs__item{
          @include font_color("text-color");
        }
      }
    }
    .el-tab-pane{
      overflow: hidden;
      @include font_color("text-color");
      font-size: 14px;
      padding:8px;
      // height:300px;
    }
  }
}
</style>
<style scoped>
.el-tabs /deep/ .el-tabs__header{
  box-shadow: 0 0 4px rgb(26 26 26 / 10%);
}
</style>
