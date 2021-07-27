<template>
  <div class="place-file">
    <loading-area  v-show="loadingFlag"></loading-area>
    <div class="location">
      <!-- location -->
      <el-card class="now-location">
        <div class="location-info flex">
          <span>当前位置：</span>
          <span class="location-desc">归档</span>
            <!-- <i class="el-icon-arrow-right"></i>
            <span>123</span>
            <i class="el-icon-arrow-right"></i>
            <span class="location-title">123</span> -->
        </div>
      </el-card>
      <!-- place-history -->
      <div class="place-history el-card">敬请期待。。。</div>
    </div>
  </div>
</template>

<script>
import loadingArea from '../components/articleList/loadingArea.vue';
export default {
  components: { loadingArea },
  data() {
    return {
      loadingFlag:false,
    };
  },
  methods:{
  },
  created(){
  },
};
</script>

<style lang='scss' scoped>
.place-file{
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
}
</style>
