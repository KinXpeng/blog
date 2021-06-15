<template>
  <div class="container-right">
    <!-- duration-time -->
    <duration-time></duration-time>
    <!-- music -->
    <music></music>
    <!-- hot-articles -->
    <hot-articles></hot-articles>
  </div>
</template>

<script>
import durationTime from './durationTime.vue';
import HotArticles from './hotArticles.vue';
import Music from './music.vue';
export default {
  components: { durationTime, Music, HotArticles },
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
.container-right{
  // float: right;
  max-width: 300px;
  min-width: 200px;
}
</style>
