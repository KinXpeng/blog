<template>
  <div class="container-left">
    <!-- avatarInfo -->
    <avatar-info></avatar-info>
    <!-- navList -->
    <nav-list></nav-list>
  </div>
</template>

<script>
import avatarInfo from './avatarInfo.vue';
import NavList from './navList.vue';
export default {
  components: { avatarInfo, NavList },
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
.container-left{
  max-width: 260px;
  min-width: 200px;
}
</style>
