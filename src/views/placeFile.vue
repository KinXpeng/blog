<template>
  <div class="place-file">
    <loading-area  v-show="loadingFlag"></loading-area>
    <div class="location">
      <!-- location -->
      <el-card class="now-location">
        <div class="location-info flex">
          <span># 归档</span>
        </div>
      </el-card>
      <!-- place-title -->
      <place-title></place-title>
    </div>
  </div>
</template>

<script>
import loadingArea from '../components/articleList/loadingArea.vue';
import PlaceTitle from '../components/placeFile/placeTitle.vue';
export default {
  components: { loadingArea, PlaceTitle },
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
      font-size: 20px;
      font-family: Georgia, Times, 'Times New Roman', serif;
      // @include font_color("text-color1");
      color: #317adf;
      cursor: default;
    }
    i{
      height:22px;
      line-height:22px;
    }
  }
}
</style>
