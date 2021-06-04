<template>
  <div class="container-right">
    <!-- duration-time -->
    <duration-time></duration-time>
  </div>
</template>

<script>
import durationTime from './durationTime.vue';
export default {
  components: { durationTime },
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
