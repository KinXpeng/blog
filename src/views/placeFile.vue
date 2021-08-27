<template>
  <div class="place-file">
    <loading-area  v-show="loadingFlag"></loading-area>
    <div class="location">
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
</style>
