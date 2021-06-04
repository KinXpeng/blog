<template>
  <div class="nav-list">
    <el-card>
      <ul class="list-box">
        <li>
          <svg class="icon-svg">
            <use xlink:href="#icon-weibo"></use>
          </svg>
          <span class="list-text">@倾倾倾风_</span>
        </li>
        <li>
          <svg class="icon-svg">
            <use xlink:href="#icon-github"></use>
          </svg>
          <a class="list-text clickArea" href="https://github.com/KinXpeng/" target="_blank">
            <span>KinXpeng</span>
          </a>
        </li>
        <li>
          <svg class="icon-svg">
            <use xlink:href="#icon-youjian"></use>
          </svg>
          <span class="list-text">kinxpeng@163.com</span>
        </li>
        <li>
          <svg class="icon-svg">
            <use xlink:href="#icon-tupian"></use>
          </svg>
          <span class="list-text">impression</span>
        </li>
        <li>
          <svg class="icon-svg">
            <use xlink:href="#icon-ditu"></use>
          </svg>
          <a class="list-text clickArea" href="https://map.baidu.com/search/beijing" target="_blank">
            <span>中国·北京</span>
          </a>
        </li>
        <li>
          <svg class="icon-svg">
            <use xlink:href="#icon-gengduo"></use>
          </svg>
          <span class="list-text clickArea" @click="moreList">更多资讯</span>
        </li>
      </ul>
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
    // 更多资讯
     moreList() {
      this.$notify({
        message: '暂时没有更多项哦',
        position:'bottom-right'
      });
    },
  },
  created(){
  },
};
</script>

<style lang='scss' scoped>
.nav-list{
  margin-bottom: 6px;
  .list-box{
    li{
      display: flex;
      position: relative;
      left:0;
      height:40px;
      line-height: 40px;
      border-bottom:1px solid #f4f4f4;
      transition: .5s;
      &:last-child{
        border:none;
      }
      &:hover{
        left:10px;
        box-shadow: 3px 3px 10px #eee;
      }
      .icon-svg{
        width:20px;
        height:20px;
        margin:10px;
      }
      .list-text{
        flex: 1;
        overflow: hidden;
        font-size: 13px;
        margin-left: 8px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .clickArea{
        cursor: pointer;
      }
    }
  }
}
</style>
