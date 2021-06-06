<template>
  <div class="container-right">
    <!-- duration-time -->
    <duration-time></duration-time>
    <!-- music -->
    <music></music>
  </div>
</template>

<script>
import durationTime from './durationTime.vue';
import Music from './music.vue';
export default {
  components: { durationTime, Music },
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
  max-width: 260px;
  min-width: 200px;
}
</style>
