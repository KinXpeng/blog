<template>
  <div class="article-item">
    <div class="article-card">
      <el-card v-for="(item,index) in articleList" :key="index">
        <div class="article-header flex">
          <div class="header-img">
            <el-image
              style="width: 40px; height: 40px"
              :src="item.imgUrl"
              fit="cover"></el-image>
          </div>
          <div class="header-desc">
            <p>{{item.author}}</p>
            <p>{{item.date}}</p>
          </div>
        </div>
        <div class="article-desc">{{item.articleInfo}}</div>
        <div class="article-icon">1111</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList:[
        {
          title:'',
          author:'kinxpeng',
          imgUrl:require('../../assets/images/head_img.jpeg'),
          articleInfo:'1231231231231231231',
          date:'2021-06-08',
        },
      ],
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
.article-item{
  .article-card{
    .article-header{
      height:50px;
      border:1px solid rgb(95, 223, 144);
    }
  }
}
</style>
